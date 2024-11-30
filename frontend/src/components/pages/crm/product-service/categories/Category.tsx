"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Popover_component from "@/components/Popover_component/Popover_component";
import Categotie_form from "./Categotie_form";
import {
  useAddNewCategorieMutation,
  useGetSingleMutation,
  useUpdateMutation,
} from "@/state/categoriesApi";
import {
  categorie_form,
  categorie_list,
  Post_CategorieResponse,
} from "@/types/categorie_type";
import toast from "react-hot-toast";
import { generate32BitUUID } from "@/lib/service/generate32BitUUID";
import Categorie_list from "./Categorie_list";
import { CircularProgress } from "@nextui-org/react";

const Category = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const [operationSuccess, setOperationSuccess] = useState<boolean>(false); // New state for operation success
  const [addNewCategorie, { error, isLoading, isSuccess }] =
    useAddNewCategorieMutation();
  const [getSingle, { data, isLoading: single_data_loading }] = useGetSingleMutation();

  const [
    update,
    {
      error: update_error,
      isSuccess: update_success,
      isLoading: update_loading,
    },
  ] = useUpdateMutation();

  const response: Post_CategorieResponse | undefined = data as
    | Post_CategorieResponse
    | undefined;

  const categorie: categorie_list | never[] = useMemo(() => {
    const customer: categorie_list | never[] = response?.categorie || [];
    return customer;
  }, [response]);

  const onSubmit = useCallback(
    async (data: categorie_form) => {
      if (edit) {
        if (Array.isArray(categorie) || !categorie?._id) {
          console.error("Customer data is invalid or empty");
          return;
        }
        const image_url = categorie.images_id.map((item: any) => item._id);

        const images = files.length > 0 ? files : image_url;
        const updated_data = { ...data, id: categorie?._id, images };
        try {
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
        await addNewCategorie(updated_data);
        setOperationSuccess(true); // Set success state for creation
      }
    },
    [addNewCategorie, update, edit, categorie, files]
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
      toast.success("Customer added successfully");
      setOperationSuccess(false); // Reset success state after handling success
    } else if (update_success && operationSuccess) {
      setIsOpen(false);
      setEdit(false);
      toast.success("Customer updated successfully");
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
              <Categotie_form
                files={files}
                setFiles={setFiles}
                isLoading={isLoading || update_loading}
                edit={edit}
                set_open={setIsOpen}
                data={categorie}
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
      <Categorie_list set_open={setIsOpen} edit_handler={edit_handler} />
    </div>
  );
};

export default Category;
