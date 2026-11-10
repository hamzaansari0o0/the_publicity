import { connection } from "next/server";
import { json } from "@/lib/http";
import { getCollections, isDbConfigured } from "@/lib/mongodb";

/** Public scan counter for the homepage demo QR code (only the `demo` slug). */
export async function GET() {
  // Always evaluate per request - never bake this answer in at build time.
  await connection();

  if (!isDbConfigured()) {
    return json({ configured: false, scans: null });
  }

  try {
    const { scans } = await getCollections();
    const count = await scans.countDocuments({
      slug: "demo",
      device: { $ne: "bot" },
    });
    return json({ configured: true, scans: count });
  } catch (error) {
    console.error("[qr] could not read demo scan count:", error);
    return json({ configured: true, scans: null });
  }
}
