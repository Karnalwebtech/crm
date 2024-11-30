export interface product_type_form {
  name?: string;
  status?: string;
  selling_price?: number;
  tax?: string;
  primary_unit?: string;
  sku?: string;
  hsn?: string;
  purchase_price?: number;
  categorie?: string;
  total_quantity?: number;
  barcode?: string;
  weight?: number;
  depth?: number;
  width?: number;
  height?: number;
}

export interface image_details {
  path: string;
  originalname: string;
}



export interface product_type_list {
  _no: number;
  _id: string;
  name?: string;
  status: string;
  selling_price?: number;
  tax?: string;
  primary_unit?: string;
  sku?: string;
  hsn?: string;
  purchase_price?: number;
  categorie?: any;
  total_quantity?: number;
  barcode?: string;
  weight?: number;
  depth?: number;
  width?: number;
  height?: number;
  images_id: image_details[];
  is_active: string;
  is_delete: string;
  resultPerpage: number;
  data_counter: number;
  audit_log: any;
}

export interface Get_Response {
  product: product_type_list[]; // Make sure this matches your expected type
  resultPerpage: number; // Add any other properties you expect
  data_counter: number; // Add any other properties you expect
}

export interface Post_Response {
  product: product_type_list; // Make sure this matches your expected type
}

export interface product_type_props {
  title?: string;
  // status?: string
  collection?: string;
  category?: string;
  brand?: string;
  sku?: string;
  // product_type?: string
  barcode?: string;
  weight?: number;
  quantity?: number;
  volume?: number;
  depth?: number;
  width?: number;
  height?: number;
}

// export interface product_Options_type_props {
//     _id: number;
//     title: string;
// }
