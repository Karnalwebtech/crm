import { z } from "zod";

// Define the address schema
const address_schema = z.object({
  address_line_1: z
    .string({ required_error: "Address line 1 is required" })
    .optional(),
  address_line_2: z.string().optional(), // Optional field
  city: z.string({ required_error: "City is required" }).optional(),
  state: z.string({ required_error: "State is required" }).optional(),
  pin_code: z
  .string()
  // .regex(/^\d{6}$/, { message: "Pin code must be a valid 6-digit number" })
  .optional(),
  country: z.string({ required_error: "Country is required" }).optional(),
});

// Define the vendor schema
export const customer_schema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Name cannot be empty" }),
  status: z
    .string({ required_error: "Status is required" })
    .min(1, { message: "Status cannot be empty" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email format" })
    .optional(),
  phone: z
    .string({ required_error: "Phone is required" })
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number can't be longer than 15 digits" }),
  company: z.string({ required_error: "Company is required" }).optional(),
  gstin: z
    .union([
      z
        .string()
        .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}Z[0-9A-Z]{1}$/, {
          message: "Invalid GSTIN format",
        }),
      z.null(), // Allow null
      z.undefined(), // Allow undefined
    ])
    .optional(), // Make GSTIN optional overall
  shipping_address: address_schema, // Use the address schema here
  billing_address: address_schema, // Optionally add billing address if needed
});
