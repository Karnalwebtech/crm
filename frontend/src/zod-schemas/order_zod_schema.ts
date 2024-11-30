import { z } from "zod";

export const order_type_form_schema = z.object({
  order_status: z.string().nonempty("Order status is required"),
  tax_status: z.string().nonempty("Tax status status is required").nullable(),
  customer: z.string().nonempty("Customer is required"),
  dispatch_mod: z.string().nonempty("Dispatch mode is required"),
  invoice_no: z.string().optional(),
  notes: z.string().optional(),
  shipping_address: z.object({
    address_line_1: z.string().nonempty("Address line 1 is required"),
    address_line_2: z.string().optional().nullable(),
    city: z.string().nonempty("City is required"),
    state: z.string().nonempty("State is required"),
    pin_code: z.string().nonempty("Pin code is required"), // Use z.string() for string type
    country: z.string().nonempty("Country is required"),
  }),
  payment_mode: z.string().nonempty("Payment mode is required"),
  status: z.string().optional(),
  name: z.string().nonempty("Name is required"),
  company: z.string().nonempty("Company is required").optional().nullable(),
  email: z.string().email("Invalid email format").optional().nullable(),
  phone: z.string().nonempty("Phone is required"),
  gstin: z.string().optional().nullable(),
});
