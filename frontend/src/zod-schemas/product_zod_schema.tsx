import { z } from "zod";

export const productTypeFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required and cannot be empty" }),
  status: z
    .string()
    .min(1, { message: "Status is required and cannot be empty" }),
  selling_price: z
    .number({ invalid_type_error: "Selling price must be a number" })
    .refine((val) => val > 0, {
      message: "Selling price must be greater than zero",
    }),
  primary_unit: z
    .string()
    .min(1, { message: "Primary unit is required and cannot be empty" }),
  tax: z.string().min(1, { message: "Tax is required and cannot be empty" }),
  sku: z.string().optional(),
  hsn: z.string().optional(),
  purchase_price: z
    .number({ invalid_type_error: "Purchase price must be a number" })
    .refine((val) => val > 0, {
      message: "Purchase price must be greater than zero",
    }),
  categorie: z
    .string()
    .min(1, { message: "Category is required and cannot be empty" })
    .optional(),
  total_quantity: z
    .number({ invalid_type_error: "Total quantity must be a number" })
    .refine((val) => val > 0 && Number.isInteger(val), {
      message: "Total quantity must be a positive integer",
    })
    .optional(),
  barcode: z.string().optional(),
  weight: z
    .number({ invalid_type_error: "Weight must be a number" })
    // .refine((val) => val > 0, {
    //   message: "Weight must be greater than zero",
    // })
    .optional(),
  depth: z
    .number({ invalid_type_error: "Depth must be a number" })
    // .refine((val) => val > 0, {
    //   message: "Depth must be greater than zero",
    // })
    .optional(),
  width: z
    .number({ invalid_type_error: "Width must be a number" })
    // .refine((val) => val > 0, {
    //   message: "Width must be greater than zero",
    // })
    .optional(),
  height: z
    .number({ invalid_type_error: "Height must be a number" })
    // .refine((val) => val > 0, {
    //   message: "Height must be greater than zero",
    // })
    .optional(),
});
