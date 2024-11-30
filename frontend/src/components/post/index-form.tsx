import { Controller } from "react-hook-form";
import { z } from "zod";
import { Jodit_text_editor } from "../common/fields/Jodit_text_editor";
import Input_field from "../common/fields-shadcn/input-field";
import { Label } from "@/components/ui/label"
import Custom_Text_Editor_field from "../common/fields-shadcn/custom-text-editor";



// Type the form hook using zod schema
interface PostFormProps {
    control: any;
    setValue: any;
    errors: any;
}
export function PostForm({ control, setValue, errors }: PostFormProps) {
    return (
        <>
            <div className="my-4">
                <Label htmlFor={"Title"} className="text-gray-200 text-lg">Title</Label>
                <Input_field control={control}
                    errors={errors}
                    name={"title"}
                    label={"Enter post title"}
                    inputStyle={"text-gray-300 placeholder-gray-200 bg-transparent border-zinc-300"}
                />
            </div>
            <div className="my-4">
                <Label htmlFor={"Description"} className="text-gray-200 text-lg">Description</Label>
                <Input_field control={control}
                    errors={errors}
                    name={"description"}
                    label={"Enter post description"}
                    inputStyle={"text-gray-300 placeholder-gray-200 bg-transparent border-zinc-300"}
                />
            </div>
            <div className="my-4">
                <Label htmlFor={"Content"} className="text-gray-200 text-lg">Content</Label>
                <Custom_Text_Editor_field control={control}
                    errors={errors}
                    name={"content"}
                    setValue={setValue}
                />
            </div>

        </>
    );
}
