"use client";
import Input_field from "@/components/common/fields/Input_field";
import Select_field from "@/components/common/fields/Select_field";
import Text_area_field from "@/components/common/fields/Text_area_field";
import Drag_input_field from "@/components/image_compress/Drag_input_field";
import Image_card from "@/components/image_compress/Image_card";
import { expance_categorie, Payment_mode_arr, Payment_type_arr, status_arr } from "@/components/pages/common/Data";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, ModalFooter, ModalHeader } from "@nextui-org/react";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Server_image_card from "@/components/image_compress/Server_image_card";
import { SquarePen } from "lucide-react";
import { Expences_List_Props, expenses_form, image_details } from "@/types/expense_type";
import { expensesFormSchema } from "@/zod-schemas/expense_zod_schema";
interface vender_form_props {
    set_open: (value: boolean) => void;
    onSubmit: (data: any) => void;
    files: File[];
    isLoading: boolean;
    setFiles: (files: File[]) => void;
    edit: boolean;
    data: Expences_List_Props | never[];
}

const Expenses_form: React.FC<vender_form_props> = ({
    set_open,
    isLoading,
    onSubmit,
    files,
    setFiles,
    edit,
    data,
}) => {
    const [itemData, setItemData] = useState<{ img: string; name: string }[]>([]);
    const [visable, setVisable] = useState<boolean>(false);

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<expenses_form>({
        resolver: zodResolver(expensesFormSchema),

    });

    const handleDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 1) {
            toast.error("Image allowed only 1");
            return;
        }
        const imageData = acceptedFiles.map((file) => ({
            img: URL.createObjectURL(file),
            name: file.name,
        }));
        setFiles(acceptedFiles);
        setItemData(imageData);
    };

    const handleDelete = (index: number) => {
        const newImages = files.filter((_: any, i: number) => i !== index);
        const imageData = newImages.map((file: any) => ({
            img: URL.createObjectURL(file),
            name: file.name,
        }));
        setFiles(newImages);
        setItemData(imageData);
    };

    const memoizedVendorData = useMemo(() => {
        if (data && typeof data === "object" && !Array.isArray(data)) {
            return {
                name: data.name,
                description: data.description,
                categorie: data.categorie,
                payment_mode: data.payment_mode,
                payment_type: data.payment_type,
                notes: data.notes,
                amount: data.amount,
                images: {
                    path: data.images_id?.[0]?.path || "",
                },
            };
        }
        return {} as Partial<expenses_form>; // Use Partial<vendr_form> to allow for missing keys
    }, [data]);
    useEffect(() => {
        if (Object.keys(memoizedVendorData).length > 0) {
            // Validate if memoizedVendorData has the correct structure
            const isValidVendorData = (data: any): data is expenses_form => {
                return data && typeof data === "object" && "name" in data; // Adjust according to your requirements
            };

            if (isValidVendorData(memoizedVendorData)) {
                // Recursive function to handle nested objects
                const setNestedValues = (data: any, parentKey: string = "") => {
                    Object.keys(data).forEach((key) => {
                        const value = data[key];
                        const fullKey = parentKey ? `${parentKey}.${key}` : key; // Build the full key

                        if (value !== undefined) {
                            if (typeof value === "object" && value !== null) {
                                // If value is an object, recursively call the function
                                setNestedValues(value, fullKey);
                            } else {
                                // Set value for top-level keys and nested keys
                                // console.log(`Setting value for ${fullKey}:`, value);
                                setValue(fullKey as keyof expenses_form, value); // Remove explicit cast to string for type safety
                            }
                        }
                    });
                };
                setVisable(true)
                // Start setting values from the root object
                setNestedValues(memoizedVendorData);
            }
        } else if (Object.keys(memoizedVendorData).length === 0) {
            // Clear form if not in edit mode
            (Object.keys(memoizedVendorData) as (keyof expenses_form)[]).forEach(
                (key) => setValue(key, "")
            );
        }
    }, [memoizedVendorData, setValue, setVisable, edit]);

    return (
        <div>
            <div>
                <ModalHeader className="flex flex-col gap-1">
                    {edit ? "Update Expenses From" : "Expenses From"}
                </ModalHeader>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="bg-white">
                        <div className="flex flex-wrap gap-2">
                            <div className="w-[100%] lg:w-[49%]">
                                <Input_field
                                    control={control}
                                    errors={errors}
                                    name="name"
                                    label="Title"
                                />
                            </div>
                            <div className="w-[70%] lg:w-[49%]">
                                <Input_field
                                    control={control}
                                    errors={errors}
                                    name="description"
                                    label="Description"
                                />
                            </div>
                            <div className="w-[27%] lg:w-[32%]">
                                <Input_field
                                    control={control}
                                    errors={errors}
                                    name="amount"
                                    type="number"
                                    label="Amount"
                                />
                            </div>
                            <div className="w-[48%] lg:w-[32%]">
                                <Select_field
                                    control={control}
                                    errors={errors}
                                    name="categorie"
                                    label="Categorie"
                                    options={expance_categorie}
                                />
                            </div>
                            <div className="w-[48%] lg:w-[32%]">
                                <Select_field
                                    control={control}
                                    errors={errors}
                                    name="payment_mode"
                                    label="Payment mode"
                                    options={Payment_mode_arr}
                                />
                            </div>
                            <div className="w-[48%] lg:w-[32%]">
                                <Select_field
                                    control={control}
                                    errors={errors}
                                    name="payment_type"
                                    label="Payment type"
                                    options={Payment_type_arr}
                                />
                            </div>

                            <div className="w-[100%] lg:w-[66%]">
                                <Text_area_field
                                    control={control}
                                    errors={errors}
                                    name="notes"
                                    label="Notes"
                                />
                            </div>

                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2 w-full">
                        <div className="w-full">
                            <p className="text-lg py-2">Receipt image</p>
                            <div className="relative">
                                <div className="absolute right-0 top-0">
                                    <SquarePen size={20} className="cursor-pointer" onClick={() => setVisable(!visable)} />
                                </div>
                                {visable ? (
                                    <div className="flex w-full flex-wrap  gap-2">
                                        {(data as Expences_List_Props)?.images_id?.map(
                                            (item: image_details, i: number) => (
                                                <div className='w-[50%] sm:w-"50%" md:w-[40%] lg:w-[40%]'>
                                                    <Server_image_card
                                                        src={item.path}
                                                        alt={item.originalname}
                                                        width={200}
                                                        height={200}
                                                    />
                                                </div>
                                            )
                                        ) || null}
                                    </div>
                                ) : (
                                    <>
                                        <div className="w-full p-4">
                                            <div>
                                                <Drag_input_field onDrop={handleDrop} />
                                            </div>
                                        </div>
                                        <div className="flex w-full flex-wrap  gap-2">
                                            {itemData.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className='w-[50%] sm:w-"50%" md:w-[40%] lg:w-[40%]'
                                                >
                                                    <Image_card
                                                        item={item}
                                                        index={index}
                                                        onDelete={handleDelete}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div>
                        <ModalFooter>
                            <Button
                                color="danger"
                                variant="light"
                                onPress={() => set_open(false)}
                            >
                                Close
                            </Button>

                            <Button
                                isLoading={isLoading}
                                className="bg-black text-white"
                                type="submit"
                            >
                                Save
                            </Button>
                        </ModalFooter>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Expenses_form;
