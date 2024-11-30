import { v4 as uuidv4 } from "uuid";

export function generate32BitUUID(): string {
  // Return type is string
  const uuid128: string = uuidv4(); // Type explicitly set as string
  return uuid128.replace(/-/g, "").slice(0, 8); // Remove dashes and take the first 8 characters
}
