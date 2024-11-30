export const columns: any[] = [
  { name: "_id", uid: "_no" },
  { name: "Name", uid: "name" },
  { name: "Amount", uid: "amount" },
  { name: "Notes", uid: "notes" },
  { name: "Description", uid: "description" },
  { name: "Categorie:", uid: "categorie" },
  { name: "Payment type:", uid: "payment_type" },
  { name: "Pay mode", uid: "payment_mode" },
  { name: "Last Update", uid: "updatedAt" },
  { name: "Employ", uid: "audit_log" },
  { name: "Actions", uid: "actions" }, // Added actions column
];
export const INITIAL_VISIBLE_COLUMNS = [
  "_no",
  "name",
  "description",
  "amount",
  "notes",
  "categorie",
  "payment_type",
  "payment_mode",
  "image",
  "Status",
  "updatedAt",
  "audit_log",
  "actions",
];
export interface image_details {
  path: string;
  originalname: string;
}
export interface expenses_form {
    name: string;
    description: string;
    categorie: string;
    payment_mode: string;
    payment_type: string;
    notes: string;
    amount: number;
    images?: any;
    uuid?: any;
    id?: string;
  }
  export interface Expences_List_Props {
    _no: number;
    _id: string;
    name: string;
    description: string;
    categorie: string;
    payment_mode: string;
    payment_type: string;
    notes: string;
    amount: number;
    images?: any;
    audit_log: any;
    status: string;
    is_active: string;
    is_delete: string;
    resultPerpage: number;
    images_id: image_details[];
    data_counter: number;
  }
  
  export interface Get_Response {
    result: Expences_List_Props[]; // Make sure this matches your expected type
    resultPerpage: number; // Add any other properties you expect
    data_counter: number; // Add any other properties you expect
  }
  
  export interface Post_Response {
    result: Expences_List_Props; // Make sure this matches your expected type
  }
  