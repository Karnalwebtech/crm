"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Popover_component from "@/components/Popover_component/Popover_component";

import toast from "react-hot-toast";
import { generate32BitUUID } from "@/lib/service/generate32BitUUID";
import Expenses_form from "./Expenses_form";
import { Expences_List_Props, expenses_form, Post_Response } from "@/types/expense_type";
import Expenses_list from "./Expenses_list";
import { useAddNewMutation, useGetSingleMutation, useUpdateMutation } from "@/state/expenseApi";
import { CircularProgress } from "@nextui-org/react";

const Expenses = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);
    const [files, setFiles] = useState<File[]>([]);
    const [operationSuccess, setOperationSuccess] = useState<boolean>(false); // New state for operation success
    const [addNew, { error, isLoading, isSuccess }] =
        useAddNewMutation();
    const [getSingle, { data, isLoading: single_data_loading }] = useGetSingleMutation();

    const [
        update,
        {
            error: update_error,
            isSuccess: update_success,
            isLoading: update_loading,
        },
    ] = useUpdateMutation();

    const response: Post_Response | undefined = data as
        | Post_Response
        | undefined;

    const result: Expences_List_Props | never[] = useMemo(() => {
        const result: Expences_List_Props | never[] = response?.result || [];
        return result;
    }, [response]);

    const onSubmit = useCallback(
        async (data: expenses_form) => {
            if (edit) {
                if (Array.isArray(result) || !result?._id) {
                    console.error("data is invalid or empty");
                    return;
                }
                const image_url = result.images_id.map((item: any) => item._id);

                const images = files.length > 0 ? files : image_url;
                const updated_data = { ...data, id: result?._id, images };
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
                // console.log(updated_data)
                await addNew(updated_data);
                setOperationSuccess(true); // Set success state for creation
            }
        },
        [addNew, files, update, edit, result, files]
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
            toast.success("Expence added successfully");
            setOperationSuccess(false); // Reset success state after handling success
        } else if (update_success && operationSuccess) {
            setIsOpen(false);
            setEdit(false);
            toast.success("Expence updated successfully");
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
                            <Expenses_form
                                files={files}
                                setFiles={setFiles}
                                isLoading={isLoading || update_loading}
                                edit={edit}
                                set_open={setIsOpen}
                                data={result}
                                onSubmit={onSubmit}
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

            <Expenses_list set_open={setIsOpen} edit_handler={edit_handler} />
        </div>
    );
};

export default Expenses;
