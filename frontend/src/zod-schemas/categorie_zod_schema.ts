import { z } from "zod";

export const category_schema = z.object({
    name:z.string({ required_error: "Name is required" }).min(1,{message:"Categorie name cannot be empty"}),
    status:z.string({ required_error: "Status is required" }).min(1,{message:"Status cannot be empty"}),
    description:z.string({ required_error: "Description is required" }).min(1,{message:"Description name cannot be empty"}),
})