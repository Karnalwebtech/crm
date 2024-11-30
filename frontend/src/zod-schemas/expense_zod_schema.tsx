import { z } from "zod";

export const expensesFormSchema = z.object({
    name: z.string().min(1, "Name is required"), // Required string, must not be empty
    description: z.string().min(1, "Description is required"), // Required string, must not be empty
    categorie: z.string().min(1, "Category is required"), // Required string, must not be empty
    payment_mode: z.string().min(1, "Payment mode is required"), // Required string, must not be empty
    payment_type: z.string().min(1, "Payment type is required"), // Required string, must not be empty
    notes: z.string().optional(), // Optional string for notes
    amount: z.number().min(0, "Amount must be a positive number"), // Required number, must be non-negative
  });
  