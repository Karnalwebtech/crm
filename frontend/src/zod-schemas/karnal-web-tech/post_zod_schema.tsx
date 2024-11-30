import { z } from "zod";

export const postSchema = z.object({
    title: z.string().min(5, { message: "Title must be at least 5 characters long." }),
    description: z.string().min(5, { message: "Title must be at least 5 characters long." }),
    status: z.string(),
    content: z.string().min(20, { message: "Content must be at least 20 characters long." }),
    metaTitle: z.string().min(10, { message: "Meta title must be at least 10 characters long." }).max(60, { message: "Meta title must not exceed 60 characters." }).optional(),
    metaDescription: z.string().min(50, { message: "Meta description must be at least 50 characters long." }).max(160, { message: "Meta description must not exceed 160 characters." }).optional(),
    metaCanonicalUrl: z.string()
    .regex(/^[a-zA-Z0-9-_\/\.]*$/, {
            message: "The string contains invalid characters. Only letters, numbers, hyphens, underscores, and slashes are allowed.",
        })
});