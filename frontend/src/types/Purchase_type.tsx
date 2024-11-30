export interface purchase_type_form {
  vendor: string;
  purchase_date: string;
  due_date: string;
  supplier_invoice_date: string;
  supplier_invoice_serial_no: string;
  reference: string;
  payment_mode: string;
  tax_status: string;
  notes: string;
}

export interface order_type_list {
  vendor: string;
  purchase_date: string;
  due_date: string;
  supplier_invoice_date: string;
  supplier_invoice_serial_no: string;
  reference: string;
  payment_mode: string;
  tax_status: string;
  notes: string;
}

export interface other_sevice {
  shipping_charges?: string;
  discount?: string;
  other_charge?: string;
}

export interface order_product_type_form {
  product: string;
  quantity: string;
}

export interface Post_Response {
  order: any; // Make sure this matches your expected type
}

