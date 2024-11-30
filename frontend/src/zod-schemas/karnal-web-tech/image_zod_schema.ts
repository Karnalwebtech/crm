import { z } from "zod";

export const imageSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long." }),
  description: z.string().nullable(), // Allows string or null
  alt: z.string().nullable(),         // Allows string or null
  metaTitle: z
    .string()
    .min(10, { message: "Meta title must be at least 10 characters long." })
    .max(60, { message: "Meta title must not exceed 60 characters." })
    .nullable(), // Allows string or null
  metaDescription: z
    .string()
    .min(50, {
      message: "Meta description must be at least 50 characters long.",
    })
    .max(160, { message: "Meta description must not exceed 160 characters." })
    .nullable(), // Allows string or null
  metaCanonicalUrl: z.string().nullable(), // Allows string or null
});
