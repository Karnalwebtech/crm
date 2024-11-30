"use client";
import Input_field from "@/components/common/fields/Input_field";
import Select_field from "@/components/common/fields/Select_field";
import Text_area_field from "@/components/common/fields/Text_area_field";
import Drag_input_field from "@/components/image_compress/Drag_input_field";
import Image_card from "@/components/image_compress/Image_card";
import { status_arr } from "@/components/pages/common/Data";
import {
  categorie_form,
  categorie_list,
  image_details,
} from "@/types/categorie_type";
import { category_schema } from "@/zod-schemas/categorie_zod_schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, ModalFooter, ModalHeader } from "@nextui-org/react";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Server_image_card from "@/components/image_compress/Server_image_card";
import { SquarePen } from "lucide-react";
interface vender_form_props {
  set_open: (value: boolean) => void;
  onsubmit: (data: any) => void;
  files: File[];
  isLoading: boolean;
  setFiles: (files: File[]) => void;
  edit: boolean;
  data: categorie_list | never[];
}

const Categotie_form: React.FC<vender_form_props> = ({
  set_open,
  isLoading,
  onsubmit,
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
  } = useForm<categorie_form>({
    resolver: zodResolver(category_schema),
    defaultValues: {
      status: "active",
    },
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
        status: data.status,
        images: {
          path: data.images_id?.[0]?.path || "",
        },
      };
    }
    return {} as Partial<categorie_form>; // Use Partial<vendr_form> to allow for missing keys
  }, [data]);

  useEffect(() => {
    if (edit && Object.keys(memoizedVendorData).length > 0) {
      // Validate if memoizedVendorData has the correct structure
      const isValidVendorData = (data: any): data is categorie_form => {
        return data && typeof data === "object" && "name" in data; // Adjust according to your requirements
      };

      if (isValidVendorData(memoizedVendorData)) {
        // Iterate over each key in memoizedVendorData
        (Object.keys(memoizedVendorData) as (keyof categorie_form)[]).forEach(
          (key) => {
            const value = memoizedVendorData[key];
            if (value !== undefined) {
              // Ensure value is not undefined
              if (typeof value === "object" && value !== null) {
                // If value is an object (i.e., an address), iterate through its keys
                (Object.keys(value) as (keyof image_details)[]).forEach(
                  (addressKey) => {
                    const fullKey =
                      `${key}.${addressKey}` as keyof categorie_form; // Assert fullKey as keyof vendr_form

                    // Use a type assertion here to ensure we pass the correct type to setValue
                    if (typeof value[addressKey] === "number") {
                      // If the value is a number, convert it to string
                      setValue(fullKey, value[addressKey].toString());
                    } else {
                      setValue(fullKey, value[addressKey] as string); // Cast as string for other cases
                    }
                  }
                );
                setVisable(true);
              } else {
                // Set value for top-level keys
                setValue(key, value as string); // You might need to adjust this based on your requirements
              }
            }
          }
        );
      }
    } else {
      // Clear form if not in edit mode
      (Object.keys(memoizedVendorData) as (keyof categorie_form)[]).forEach(
        (key) => setValue(key, "")
      );
    }
  }, [memoizedVendorData, setValue, setVisable, edit]);

  return (
    <div>
      <div>
        <ModalHeader className="flex flex-col gap-1">
          {edit ? "Update Categorie From" : "Categorie From"}
        </ModalHeader>
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="flex  items-center justify-between p-2">
            <p className="text-lg">Basic Details</p>
            <div className="w-52">
              <Select_field
                control={control}
                errors={errors}
                name="status"
                label="select status"
                options={status_arr}
              />
            </div>
          </div>
          <div className="bg-white">
            <div className="flex flex-wrap gap-2">
              <div className="w-full">
                <Input_field
                  control={control}
                  errors={errors}
                  name="name"
                  label="Categorie Name"
                />
              </div>
              <div className="w-full">
                <Text_area_field
                  control={control}
                  errors={errors}
                  name="description"
                  label="Description"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 w-full">
            <div className="w-full">
              <p className="text-lg py-2">Categorie Image</p>
              <div className="relative">
                <div className="absolute right-0 top-0">
                  <SquarePen size={20} className="cursor-pointer" onClick={() => setVisable(!visable)} />
                </div>
                {visable ? (
                  <div className="flex w-full flex-wrap  gap-2">
                    {(data as categorie_list)?.images_id?.map(
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

export default Categotie_form;
