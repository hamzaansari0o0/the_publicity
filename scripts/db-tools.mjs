#!/usr/bin/env node
/**
 * The Publicity - database helper (until an admin dashboard exists).
 *
 * Run through the npm scripts, which load `.env` automatically:
 *
 *   npm run qr:create -- <slug> <destination-url> [label words...]
 *   npm run qr:list
 *   npm run qr:stats  -- <slug>
 *   npm run inquiries -- [how-many]
 *
 * `qr:create` also writes print-ready QR files to ./qr-codes/ (SVG + PNG).
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { MongoClient } from "mongodb";
import QRCode from "qrcode";

const SLUG = /^[a-z0-9](?:[a-z0-9-]{0,38}[a-z0-9])?$/;
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

const [command, ...args] = process.argv.slice(2);

function usage() {
  console.log(`
The Publicity - database helper

  npm run qr:create -- <slug> <destination-url> [label words...]
      Create a trackable QR link and export print-ready QR files.
      e.g. npm run qr:create -- cafe-gulberg "https://wa.me/923001234567?text=Hi" Cafe flyer - Gulberg

  npm run qr:list
      List all QR links with their scan counts.

  npm run qr:stats -- <slug>
      Scans per day (last 14 days) and per device for one QR link.

  npm run inquiries -- [how-many]
      Show the latest contact-form messages (default 10).
`);
}

function fail(message) {
  console.error(`\n✖ ${message}\n`);
  process.exit(1);
}

function validDestination(value) {
  try {
    return /^https?:$/.test(new URL(value).protocol);
  } catch {
    return false;
  }
}

if (!command || command === "help" || command === "--help") {
  usage();
  process.exit(0);
}

const uri = process.env.MONGODB_URI?.trim();
if (!uri) fail("MONGODB_URI is not set. Add it to your .env file (see .env.example).");

const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 8000,
  ignoreUndefined: true,
});

try {
  await client.connect();
  const db = client.db(process.env.MONGODB_DB?.trim() || "the_publicity");
  const qrLinks = db.collection("qrlinks");
  const scans = db.collection("scans");

  switch (command) {
    case "qr:create": {
      const [slugArg, destination, ...labelWords] = args;
      const slug = slugArg?.toLowerCase();
      if (!slug || !destination) {
        usage();
        fail("Usage: npm run qr:create -- <slug> <destination-url> [label words...]");
      }
      if (!SLUG.test(slug)) {
        fail("Slug may only contain a-z, 0-9 and hyphens (2-40 characters, not starting/ending with '-').");
      }
      if (!validDestination(destination)) {
        fail("Destination must be a full http(s) URL, e.g. https://wa.me/923001234567");
      }

      await qrLinks.createIndex({ slug: 1 }, { unique: true });
      try {
        await qrLinks.insertOne({
          slug,
          label: labelWords.join(" ").trim() || slug,
          destination,
          createdAt: new Date(),
        });
      } catch (error) {
        if (error?.code === 11000) fail(`A QR link with the slug "${slug}" already exists.`);
        throw error;
      }

      const trackedUrl = `${SITE}/r/${slug}`;
      const outDir = path.resolve("qr-codes");
      await mkdir(outDir, { recursive: true });
      const svg = await QRCode.toString(trackedUrl, {
        type: "svg",
        margin: 2,
        errorCorrectionLevel: "H",
      });
      await writeFile(path.join(outDir, `${slug}.svg`), svg);
      await QRCode.toFile(path.join(outDir, `${slug}.png`), trackedUrl, {
        width: 1200,
        margin: 2,
        errorCorrectionLevel: "H",
      });

      console.log(`
✔ QR link created
  slug        ${slug}
  sends to    ${destination}
  QR encodes  ${trackedUrl}
  files       qr-codes/${slug}.svg  (vector - use this for print)
              qr-codes/${slug}.png
`);
      if (SITE.includes("localhost")) {
        console.log(
          "  ⚠ NEXT_PUBLIC_SITE_URL is still localhost - set your real domain in .env before\n    generating QR codes for print, otherwise the printed code will not work.\n",
        );
      }
      break;
    }

    case "qr:list": {
      const links = await qrLinks.find().sort({ createdAt: -1 }).toArray();
      if (links.length === 0) {
        console.log("\nNo QR links yet. Create one with: npm run qr:create -- <slug> <destination-url>\n");
        break;
      }
      const counts = new Map(
        (
          await scans
            .aggregate([
              { $match: { device: { $ne: "bot" } } },
              { $group: { _id: "$slug", n: { $sum: 1 } } },
            ])
            .toArray()
        ).map((row) => [row._id, row.n]),
      );
      console.log("");
      for (const link of links) {
        console.log(`${String(counts.get(link.slug) ?? 0).padStart(6)} scans  ${link.slug.padEnd(22)} ${link.label}`);
        console.log(`${" ".repeat(14)}→ ${link.destination}`);
      }
      console.log("");
      break;
    }

    case "qr:stats": {
      const slug = args[0]?.toLowerCase();
      if (!slug) fail("Usage: npm run qr:stats -- <slug>");
      const link = await qrLinks.findOne({ slug });
      const human = { slug, device: { $ne: "bot" } };
      const total = await scans.countDocuments(human);
      const since = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);

      const byDay = await scans
        .aggregate([
          { $match: { ...human, at: { $gte: since } } },
          { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$at" } }, n: { $sum: 1 } } },
          { $sort: { _id: 1 } },
        ])
        .toArray();
      const byDevice = await scans
        .aggregate([
          { $match: { slug } },
          { $group: { _id: "$device", n: { $sum: 1 } } },
          { $sort: { n: -1 } },
        ])
        .toArray();

      console.log(`\n${slug}${link ? `  (${link.label})` : "  (no QR link with this slug - showing recorded scans only)"}`);
      console.log(`Total scans (bots excluded): ${total}\n`);
      console.log("Last 14 days");
      if (byDay.length === 0) console.log("  no scans yet");
      for (const row of byDay) console.log(`  ${row._id}  ${String(row.n).padStart(4)}  ${"█".repeat(Math.min(row.n, 40))}`);
      console.log("\nBy device");
      if (byDevice.length === 0) console.log("  no scans yet");
      for (const row of byDevice) console.log(`  ${String(row._id).padEnd(8)} ${row.n}`);
      console.log("");
      break;
    }

    case "inquiries": {
      const limit = Math.min(Math.max(Number.parseInt(args[0] ?? "10", 10) || 10, 1), 100);
      const rows = await db.collection("inquiries").find().sort({ createdAt: -1 }).limit(limit).toArray();
      if (rows.length === 0) {
        console.log("\nNo messages yet.\n");
        break;
      }
      console.log("");
      for (const row of rows) {
        console.log(`${row.createdAt.toISOString().replace("T", " ").slice(0, 16)}  [${row.status}]  ${row.name} <${row.email}>${row.phone ? `  ${row.phone}` : ""}`);
        const meta = [row.businessType, row.service].filter(Boolean).join(" · ");
        if (meta) console.log(`    ${meta}`);
        console.log(`    ${row.message.replace(/\s+/g, " ").slice(0, 220)}`);
        console.log("");
      }
      break;
    }

    default:
      usage();
      fail(`Unknown command: ${command}`);
  }
} catch (error) {
  fail(error instanceof Error ? error.message : String(error));
} finally {
  await client.close();
}
