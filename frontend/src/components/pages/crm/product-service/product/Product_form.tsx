"use client";
import Autocomplete_field from "@/components/common/fields/Autocomplete_field";
import Input_field from "@/components/common/fields/Input_field";
import Secondary_Autocomplete_field from "@/components/common/fields/Secondary_Autocomplete_field";
import Secondary_select_Field from "@/components/common/fields/Secondary_select_Field";
import Select_field from "@/components/common/fields/Select_field";
import Drag_input_field from "@/components/image_compress/Drag_input_field";
import Image_card from "@/components/image_compress/Image_card";
import Server_image_card from "@/components/image_compress/Server_image_card";
import {
  gst_arr,
  Primary_units_arr,
  status_arr,
} from "@/components/pages/common/Data";
import { useGetAllcategorieQuery } from "@/state/categoriesApi";
import {
  image_details,
  product_type_form,
  product_type_list,
} from "@/types/Product_types";
import { productTypeFormSchema } from "@/zod-schemas/product_zod_schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, ModalFooter, ModalHeader } from "@nextui-org/react";
import debounce from "lodash.debounce";
import { SquarePen } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface product_form_props {
  set_open: (value: boolean) => void;
  onsubmit: (data: any) => void;
  files: File[];
  isLoading: boolean;
  setFiles: (files: File[]) => void;
  edit: boolean;
  data: product_type_list | never[];
}

const Product_form: React.FC<product_form_props> = ({
  set_open,
  onsubmit,
  files,
  isLoading,
  setFiles,
  edit,
  data,
}) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<product_type_form>({
    resolver: zodResolver(productTypeFormSchema),
    defaultValues: {
      status: "active",
    },
  });

  const [filterValue, setFilterValue] = useState<string>("");
  const [visable, setVisable] = useState<boolean>(false);
  const [debouncedFilterValue, setDebouncedFilterValue] =
    useState<string>(filterValue);
  const [itemData, setItemData] = useState<{ img: string; name: string }[]>([]);

  //----------- all use stats

  const { data: cat_data } = useGetAllcategorieQuery({
    is_active: "yes",
    is_delete: "no",
    keyword: debouncedFilterValue,
    status: "active",
    rowsPerPage: 10,
    page: 1,
  });

  //------------- all events
  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 5) {
      toast.error("Image allowed only 5");
      return;
    }
    const imageData = acceptedFiles.map((file) => ({
      img: URL.createObjectURL(file),
      name: file.name,
    }));
    setFiles(acceptedFiles);
    setItemData(imageData);
  };

  const handleDebouncedFilter = useMemo(
    () => debounce((value) => setDebouncedFilterValue(value), 300),
    []
  );
  useEffect(() => {
    handleDebouncedFilter(filterValue);
    return () => handleDebouncedFilter.cancel();
  }, [filterValue, handleDebouncedFilter]);

  const handleDelete = (index: number) => {
    const newImages = files.filter((_, i) => i !== index);
    const imageData = newImages.map((file) => ({
      img: URL.createObjectURL(file),
      name: file.name,
    }));
    setFiles(newImages);
    setItemData(imageData);
  };
  const filter_cat = useMemo(() => {
    return (
      cat_data?.categorie?.map((item: any) => ({
        label: item.name,
        value: item._id,
      })) || []
    );
  }, [cat_data]);

  const memoizedVendorData = useMemo(() => {
    if (data && typeof data === "object" && !Array.isArray(data)) {
      return {
        name: data.name,
        status: data.status,
        selling_price: data.selling_price,
        tax: data.tax,
        primary_unit: data.primary_unit,
        sku: data.sku,
        hsn: data.hsn,
        purchase_price: data.purchase_price,
        categorie: data?.categorie?._id,
        total_quantity: data.total_quantity,
        barcode: data.barcode,
        weight: data.weight,
        depth: data.depth,
        width: data.width,
        height: data.height,
        images: {
          path: data.images_id || "",
        },
      };
    }
    return {} as Partial<product_form_props>; // Use Partial<vendr_form> to allow for missing keys
  }, [data]);

  useEffect(() => {
    if (edit && Object.keys(memoizedVendorData).length > 0) {
      // Validate if memoizedVendorData has the correct structure
      const isValidVendorData = (data: any): data is product_type_form => {
        return data && typeof data === "object" && "name" in data; // Adjust according to your requirements
      };

      if (isValidVendorData(memoizedVendorData)) {
        // Iterate over each key in memoizedVendorData
        (
          Object.keys(memoizedVendorData) as (keyof product_type_form)[]
        ).forEach((key) => {
          const value = memoizedVendorData[key];
          if (value !== undefined) {
            // Ensure value is not undefined
            if (typeof value === "object" && value !== null) {
              // If value is an object (i.e., an address), iterate through its keys
              (Object.keys(value) as (keyof image_details)[]).forEach(
                (addressKey) => {
                  const fullKey =
                    `${key}.${addressKey}` as keyof product_type_form; // Assert fullKey as keyof vendr_form

                }
              );
              setVisable(true);
            } else {
              // Set value for top-level keys
              console.log(value)
              setValue(key, value as string); // You might need to adjust this based on your requirements
            }
          }
        });
      }
    } else {
      // Clear form if not in edit mode
      (Object.keys(memoizedVendorData) as (keyof product_type_form)[]).forEach(
        (key) => setValue(key, "")
      );
    }
  }, [memoizedVendorData, setValue, setVisable, edit]);

  return (
    <div>
      <div>
        <ModalHeader className="flex flex-col gap-1">
          {/* {edit ? "Update Vender From" : "Vender From"} */}
        </ModalHeader>
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="flex  items-center justify-between p-[1px] lg:p-2">
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
                  label="Item Name"
                />
              </div>
              <div className="w-[48%] lg:w-[32%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="selling_price"
                  label="Selling Price"
                  type="number"
                />
              </div>
              <div className="w-[48%] lg:w-[32%]">
                <Select_field
                  control={control}
                  errors={errors}
                  name="tax"
                  label="tax"
                  options={gst_arr}
                />
              </div>
              <div className="w-[48%] lg:w-[32%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="sku"
                  label="sku"
                />
              </div>
              <div className="w-[48%]">
                <Secondary_Autocomplete_field
                  control={control}
                  errors={errors}
                  name="primary_unit"
                  label_name="Primary Unit"
                  options={Primary_units_arr}
                />
              </div>
              <div className="w-[48%] lg:w-[24%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="purchase_price"
                  label="Purchase Price"
                  type="number"
                />
              </div>
              <div className="w-[48%] lg:w-[24%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="total_quantity"
                  label="Total Quantity"
                  type="number"
                />
              </div>
            </div>
          </div>
          <div className="w-full">
            <p className="text-lg py-2">Additional Information OPTIONAL</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="w-[30%] lg:w-[49%]">
              <Input_field
                control={control}
                errors={errors}
                name="hsn"
                label="HSN/ SAC"
              />
            </div>
            <div className="w-[55%] lg:w-[49%] flex gap-2 items-center">
              <div className="w-[65%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="barcode"
                  label="barcode"
                />
              </div>
              <div className="w-[35%]">
                <Button size="sm" className="bg-black text-white">
                  Auto Generate
                </Button>
              </div>
            </div>
            <div className="w-[48%] lg:w-[49%]">
              <Secondary_Autocomplete_field
                control={control}
                errors={errors}
                name="categorie"
                label_name="categorie"
                options={filter_cat}
                setFilterValue={setFilterValue}
              />
            </div>
            <p className="w-full text-lg py-2">Product Dimantion</p>
            <div className="w-full flex gap-2">
              <div className="w-[48] lg:w-[32%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="weight"
                  label="weight"
                  type="number"
                />
              </div>
              <div className="w-[48] lg:w-[32%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="depth"
                  label="depth"
                  type="number"
                />
              </div>
              <div className="w-[48] lg:w-[32%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="width"
                  label="width"
                  type="number"
                />
              </div>
              <div className="w-[48] lg:w-[32%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="height"
                  label="height"
                  type="number"
                />
              </div>
            </div>
            <div className="w-full">
              <p className="text-lg py-2">Product Image</p>
              <div className="relative">
                <div className="absolute right-0 top-0">
                  <SquarePen
                    size={20}
                    className="cursor-pointer"
                    onClick={() => setVisable(!visable)}
                  />
                </div>
                {visable ? (
                  <div className="flex w-full flex-wrap  gap-2">
                    {(data as product_type_list)?.images_id?.map(
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
                          className='w-[48.5%] sm:w-[48.5%] md:w-[32%] lg:w-[32%]'
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

export default Product_form;
