import { z } from "zod";
import { BUSINESS_TYPES, SERVICE_INTERESTS } from "@/data/forms";

/** Optional select fields arrive as "" when untouched. */
const optionalEnum = <T extends readonly [string, ...string[]]>(values: T) =>
  z.union([z.enum(values), z.literal("")]).optional();

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Name is too long."),
  email: z
    .string()
    .trim()
    .max(120, "Email is too long.")
    .pipe(z.email("Please enter a valid email address.")),
  phone: z
    .string()
    .trim()
    .max(25, "Phone number is too long.")
    .regex(/^[+\d\s()-]*$/, "Use digits, spaces and + ( ) - only.")
    .optional(),
  businessType: optionalEnum(BUSINESS_TYPES),
  service: optionalEnum(SERVICE_INTERESTS),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (at least 10 characters).")
    .max(2000, "Message is too long (2000 characters max)."),
  /**
   * Honeypot - real visitors never see or fill this field. It is deliberately
   * accepted here (not rejected) so the route can fake a success for bots.
   */
  website: z.string().max(500).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Slug used in QR links: https://site.com/r/<slug> */
export const qrSlugSchema = z
  .string()
  .regex(/^[a-z0-9](?:[a-z0-9-]{0,38}[a-z0-9])?$/, "Invalid QR code.");
