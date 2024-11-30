export const columns: any[] = [
  { name: "_id", uid: "_no" },
  { name: "User id", uid: "user_id" },
  { name: "Name", uid: "name" },
  { name: "Email", uid: "email" },
  { name: "Number", uid: "number" },
  { name: "Role:", uid: "role" },
  { name: "Join at", uid: "updatedAt" },
  { name: "Status", uid: "isActive" },
];
export const INITIAL_VISIBLE_COLUMNS = [
  "_no",
  "name",
  "email",
  "number",
  "role",
  "updatedAt",
  "isActive",
];
export interface Login {
  email: string;
  password: string;
}
export interface Sign_up {
  email: string;
  name: string;
  uuid?: string;
  password: string;
}
export interface forgot_password {
  email: string;
}
export interface User_Data {
  token: string;
  email?: string;
  name?: string;
  user_id?: string;
  number?: string;
  role?: string;
  isActive?: string;
}

export interface User_list_props {
  _id?: string;
  email?: string;
  name?: string;
  user_id?: string;
  number?: string;
  role?: string;
  isActive?: string;
  is_delete?: string;
  is_active?: string;
}
