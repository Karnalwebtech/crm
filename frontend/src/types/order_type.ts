export interface BaseAddress {
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  pin_code: string;
  country: string;
}

export interface order_type_form {
  order_status: string;
  tax_status: string;
  customer: string;
  notes: string;
  dispatch_mod: string;
  invoice_no: string;
  shipping_address: BaseAddress;
  payment_mode: string;
  status: string;
  name: string;
  company?: string;
  email?: string;
  phone: string;
  gstin: string;
}

export interface order_type_list {
  order_status: string;
  customer: string;
  dispatch_mod: string;
  invoice_no: string;
  shipping_address: BaseAddress;
  payment_mode: string;
  status: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  gstin: string;
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

