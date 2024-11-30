"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import Popover_component from "@/components/Popover_component/Popover_component";
import { generate32BitUUID } from "@/lib/service/generate32BitUUID";
import toast from "react-hot-toast";
import Customer_list from "./Customer_list";
import Customer_from from "./Customer_from";
import {
  useAddNewCustomerMutation,
  useGetSingleCustomerMutation,
  useUpdate_customerMutation,
} from "@/state/customerApi";
import {
  customer_form,
  customer_list,
  Post_CustomerResponse,
} from "@/types/Customer_type";
import { CircularProgress } from "@nextui-org/react";

const Vendor: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [operationSuccess, setOperationSuccess] = useState<boolean>(false); // New state for operation success

  const [addNewCustomer, { error, isSuccess, isLoading }] =
    useAddNewCustomerMutation();
  const [
    update_customer,
    {
      error: update_error,
      isSuccess: update_success,
      isLoading: update_loading,
    },
  ] = useUpdate_customerMutation();
  const [getSingleCustomer, { data, isLoading: single_data_loading }] = useGetSingleCustomerMutation();

  const response: Post_CustomerResponse | undefined = data as
    | Post_CustomerResponse
    | undefined;

  const customer: customer_list | never[] = useMemo(() => {
    const customer: customer_list | never[] = response?.customer || [];
    return customer;
  }, [response]);

  const onSubmit = useCallback(
    async (data: customer_form) => {
      if (edit) {
        if (Array.isArray(customer) || !customer?._id) {
          console.error("Customer data is invalid or empty");
          return;
        }
        const updated_data = { ...data, id: customer?._id };

        try {
          await update_customer(updated_data);
          setOperationSuccess(true); // Set success state for update
        } catch (error) {
          console.error("Error updating vendor:", error);
        }
      } else {
        const updated_data = { ...data, uuid: generate32BitUUID() };
        await addNewCustomer(updated_data);
        setOperationSuccess(true); // Set success state for creation
      }
    },
    [addNewCustomer, update_customer, edit, customer]
  );

  const edit_handler = useCallback(
    async (value: string) => {
      setIsOpen(true);
      await getSingleCustomer(value);
      setEdit(true);
    },
    [setEdit, getSingleCustomer]
  );
  // Handle success and error messages
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
              <Customer_from
                isLoading={isLoading || update_loading}
                edit={edit}
                open={isOpen}
                set_open={setIsOpen}
                data={customer}
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

      <Customer_list set_open={setIsOpen} edit_handler={edit_handler} />
    </div>
  );
};

export default Vendor;
