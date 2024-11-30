"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Popover_component from "@/components/Popover_component/Popover_component";
import { Button, CircularProgress } from "@nextui-org/react";
import Product_form from "./Product_form";
import {
  useAddNewProductMutation,
  useGetSingleMutation,
  useUpdateMutation,
} from "@/state/productApi";
import {
  Post_Response,
  product_type_form,
  product_type_list,
} from "@/types/Product_types";
import { generate32BitUUID } from "@/lib/service/generate32BitUUID";
import toast from "react-hot-toast";
import Product_list from "./Product_list";

const Product = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const [operationSuccess, setOperationSuccess] = useState<boolean>(false);
  //------------------------- use hooks

  const [addNewProduct, { error, isLoading, isSuccess }] =
    useAddNewProductMutation();

  const [getSingle, { data, isLoading: single_data_loading }] = useGetSingleMutation();

  const [
    update,
    {
      error: update_error,
      isSuccess: update_success,
      isLoading: update_loading,
    },
  ] = useUpdateMutation();

  const response: Post_Response | undefined = data as Post_Response | undefined;

  const product: product_type_list | never[] = useMemo(() => {
    const product: product_type_list | never[] = response?.product || [];
    return product;
  }, [response]);

  const onSubmit = useCallback(
    async (data: product_type_form) => {
      if (edit) {
        if (Array.isArray(product) || !product?._id) {
          console.error("Customer data is invalid or empty");
          return;
        }
        const image_url = product.images_id.map((item: any) => item._id);
        const images = files.length > 0 ? files : image_url;

        const updated_data = { ...data, id: product?._id, images };
        try {
          console.log(updated_data);
          await update(updated_data);
          setOperationSuccess(true); // Set success state for update
        } catch (error) {
          console.error("Error updating vendor:", error);
        }
      } else {
        const updated_data = {
          ...data,
          uuid: generate32BitUUID(),
          images: files,
        };
        // console.log(data)
        await addNewProduct(updated_data);
        setOperationSuccess(true); // Set success state for creation
      }
      setFiles([])
    },
    [addNewProduct, update, edit, product, files, setFiles]
  );

  const edit_handler = useCallback(
    async (value: string) => {
      setIsOpen(true);
      await getSingle(value);
      setEdit(true);
    },
    [setEdit, getSingle]
  );

  useEffect(() => {
    // Handle error messages
    if (error || update_error) {
      let errorMessage = "An unexpected error occurred."; // Default message

      // Check if 'error' is defined and has the expected structure
      if (error && "data" in error) {
        errorMessage =
          (error as { data?: { message?: string } }).data?.message ||
          errorMessage;
      }

      // Check if 'update_error' is defined and has the expected structure
      if (update_error && "data" in update_error) {
        errorMessage =
          (update_error as { data?: { message?: string } }).data?.message ||
          errorMessage;
      }

      toast.error(errorMessage);
      setOperationSuccess(false); // Reset success state on error
      return; // Exit early if there's an error
    }

    // Handle success messages
    if (isSuccess && operationSuccess) {
      setIsOpen(false);
      setEdit(false);
      toast.success("Product added successfully");
      setOperationSuccess(false); // Reset success state after handling success
    } else if (update_success && operationSuccess) {
      setIsOpen(false);
      setEdit(false);
      toast.success("Product updated successfully");
      setOperationSuccess(false); // Reset success state after handling success
    }

    // Reset edit state if the popover is closed
    if (!isOpen) {
      setEdit(false);
    }
  }, [
    error,
    isSuccess,
    isOpen,
    setEdit,
    operationSuccess,
    update_error,
    update_success,
  ]);

  return (
    <div>
      {isOpen && (
        <Popover_component
          open={isOpen}
          set_open={setIsOpen}
          components={
            <>
              <Product_form
                files={files}
                setFiles={setFiles}
                isLoading={isLoading || update_loading}
                edit={edit}
                set_open={setIsOpen}
                data={product}
                onsubmit={onSubmit}
              />
              {single_data_loading && (
                <div className="absolute z-10 inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                  <CircularProgress />
                </div>
              )}

            </>
          }
        />
      )}
      <Product_list set_open={setIsOpen} edit_handler={edit_handler} />
    </div>
  );
};

export default Product;
