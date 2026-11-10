import { after, connection, NextResponse, type NextRequest } from "next/server";
import { whatsappLink } from "@/data/site";
import { detectDevice } from "@/lib/device";
import { getCollections, isDbConfigured } from "@/lib/mongodb";
import type { ScanDoc } from "@/lib/models";
import { qrSlugSchema } from "@/lib/validators";

/**
 * QR redirect: https://your-site.com/r/<slug>
 *
 * Every printed QR code points here. We look up where the slug should go,
 * count the scan (after the response is sent, so scanning stays instant) and
 * forward the visitor. 307 keeps browsers from caching the hop, otherwise
 * repeat scans would never be counted.
 */
export async function GET(request: NextRequest, ctx: RouteContext<"/r/[slug]">) {
  await connection();

  const slug = (await ctx.params).slug.toLowerCase();
  const home = new URL("/", request.nextUrl.origin);

  if (!qrSlugSchema.safeParse(slug).success) {
    return NextResponse.redirect(home, 307);
  }

  let destination: string | null = null;

  if (isDbConfigured()) {
    try {
      const { qrLinks } = await getCollections();
      destination = (await qrLinks.findOne({ slug }))?.destination ?? null;
    } catch (error) {
      console.error("[qr] could not look up QR link:", error);
    }
  }

  // Built-in destination for the homepage demo code.
  if (!destination && slug === "demo") {
    destination =
      whatsappLink("Hi! I scanned your QR code.") ??
      new URL("/contact", request.nextUrl.origin).toString();
  }

  // Unknown code (or database down): send people to the homepage rather than an error page.
  if (!destination || !/^https?:\/\//i.test(destination)) {
    return NextResponse.redirect(home, 307);
  }

  if (isDbConfigured()) {
    const userAgent = request.headers.get("user-agent");
    const referer = request.headers.get("referer");
    let referrer: string | undefined;
    try {
      referrer = referer ? new URL(referer).host : undefined;
    } catch {
      referrer = undefined;
    }

    const scan: ScanDoc = {
      slug,
      at: new Date(),
      device: detectDevice(userAgent),
      country: request.headers.get("x-vercel-ip-country") ?? undefined,
      referrer,
      userAgent: userAgent?.slice(0, 200),
    };

    after(async () => {
      try {
        const { scans } = await getCollections();
        await scans.insertOne(scan);
      } catch (error) {
        console.error("[qr] could not record scan:", error);
      }
    });
  }

  return NextResponse.redirect(destination, {
    status: 307,
    headers: { "Cache-Control": "no-store" },
  });
}
