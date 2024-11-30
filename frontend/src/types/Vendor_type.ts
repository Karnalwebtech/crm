export interface BaseAddress {
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  pin_code: number;
  country: string;
}
export interface vendr_form {
  name: string;
  phone: string;
  email: string;
  company: string;
  gstin: string;
  shipping_address: BaseAddress; // Use the base address for shipping
  billing_address: BaseAddress;
  status: string;
  debit: string;
  credit: string;
}

export interface vendr_list {
  _no: number;
  _id: string;
  name: string;
  audit_log: any;
  phone: string;
  email: string;
  company_name: string;
  shipping_address: BaseAddress; // Use the base address for shipping
  billing_address: BaseAddress;   // Use the base address for billing
  gstin: string;
  status: string;
  is_active: string;
  is_delete: string;
  resultPerpage: number;
  data_counter: number;
}

export interface Vendor_Data {
  token: string;
}

export interface Get_VendorResponse {
  vendor: vendr_list[]; // Make sure this matches your expected type
  resultPerpage: number; // Add any other properties you expect
  data_counter: number; // Add any other properties you expect
}

export interface Post_VendorResponse {
  vendor: vendr_list; // Make sure this matches your expected type
}
export interface vendor_Column {
  name: string;
  uid: string;
}
