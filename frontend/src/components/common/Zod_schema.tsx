import { z } from 'zod';

export const createSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    // status: z.string().min(1, { message: "Status is required" }),
    brand: z.string().min(1, { message: "Brand is required" }),
    collection: z.string().min(1, { message: "Collection is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    sku: z.string().min(1, { message: "Sku is required" }),
    barcode: z.string().min(1, { message: "Barcode is required" }),
    // product_type: z.string().min(1, { message: "Product type is required" }),
    width: z.string()
        .min(1, { message: "Width is required" }) // Ensure the string is not empty
        .regex(/^\d+$/, { message: "Width must be a number" }) // Ensure the string represents a number
        .transform(Number) // Convert the string to a number
        .refine(val => !isNaN(val) && val > 0, { // Further validation to ensure it's a positive number
            message: "Width must be a positive number"
        }),
    quantity: z.string()
        .min(1, { message: "Width is required" }) // Ensure the string is not empty
        .regex(/^\d+$/, { message: "Width must be a number" }) // Ensure the string represents a number
        .transform(Number) // Convert the string to a number
        .refine(val => !isNaN(val) && val > 0, { // Further validation to ensure it's a positive number
            message: "Width must be a positive number"
        }),
    volume: z.string()
        .min(1, { message: "Volume is required" }) // Ensure the string is not empty
        .regex(/^\d+$/, { message: "Volume must be a number" }) // Ensure the string represents a number
        .transform(Number) // Convert the string to a number
        .refine(val => !isNaN(val) && val > 0, { // Further validation to ensure it's a positive number
            message: "Volume must be a positive number"
        }),

    depth: z.string()
        .min(1, { message: "Depth is required" }) // Ensure the string is not empty
        .regex(/^\d+$/, { message: "Depth must be a number" }) // Ensure the string represents a number
        .transform(Number) // Convert the string to a number
        .refine(val => !isNaN(val) && val > 0, { // Further validation to ensure it's a positive number
            message: "Depth must be a positive number"
        }),
    weight: z.string()
        .min(1, { message: "Weight is required" }) // Ensure the string is not empty
        .regex(/^\d+$/, { message: "Weight must be a number" }) // Ensure the string represents a number
        .transform(Number) // Convert the string to a number
        .refine(val => !isNaN(val) && val > 0, { // Further validation to ensure it's a positive number
            message: "Weight must be a positive number"
        }),
    height: z.string()
        .min(1, { message: "Height is required" }) // Ensure the string is not empty
        .regex(/^\d+$/, { message: "Height must be a number" }) // Ensure the string represents a number
        .transform(Number) // Convert the string to a number
        .refine(val => !isNaN(val) && val > 0, { // Further validation to ensure it's a positive number
            message: "Height must be a positive number"
        }),


});

