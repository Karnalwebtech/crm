import { z } from "zod";

export const Purchase_zod_schema = z.object({
  vendor: z.string().nonempty("Vendor is required."),
  purchase_date: z.string().nonempty("Purchase date is required."),
  due_date: z.string().optional(),
  supplier_invoice_date: z.string().optional(),
  supplier_invoice_serial_no: z.string().optional(),
  reference: z.string().nonempty("Reference is required."),
  payment_mode: z.string().nonempty("Payment mode is required."),
  tax_status: z.string().nonempty("Tax status is required."),
  notes: z.string().optional(),
});
