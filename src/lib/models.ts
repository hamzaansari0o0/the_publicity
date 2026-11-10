import type { ObjectId } from "mongodb";

/** A message sent through the contact form. Collection: `inquiries` */
export type InquiryDoc = {
  _id?: ObjectId;
  name: string;
  email: string;
  phone?: string;
  businessType?: string;
  service?: string;
  message: string;
  status: "new" | "contacted" | "closed";
  source: "website";
  createdAt: Date;
};

/** A trackable QR destination. Collection: `qrlinks` */
export type QrLinkDoc = {
  _id?: ObjectId;
  /** Short code used in the printed QR: https://your-site.com/r/<slug> */
  slug: string;
  /** Human label, e.g. "Cafe flyer - Gulberg zone 2" */
  label: string;
  /** Where the visitor is sent (WhatsApp, website, social page...) */
  destination: string;
  createdAt: Date;
};

export type Device = "mobile" | "tablet" | "desktop" | "bot" | "unknown";

/** One scan of a QR code. Collection: `scans` */
export type ScanDoc = {
  _id?: ObjectId;
  slug: string;
  at: Date;
  device: Device;
  country?: string;
  referrer?: string;
  userAgent?: string;
};
