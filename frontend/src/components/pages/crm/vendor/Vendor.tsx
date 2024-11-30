"use client"
import React, { useState, useEffect, useMemo, useCallback } from "react";
import Vendor_list from "./Vendor_list";
import Vendor_from from "./Vendor_from";
import Popover_component from "@/components/Popover_component/Popover_component";
import {
  Post_VendorResponse,
  vendr_form,
  vendr_list,
} from "@/types/Vendor_type";
import {
  useAddNew_vendorMutation,
  useGetSingeVendorMutation,
  useUpdate_vendorMutation,
} from "@/state/vendorApi";
import { generate32BitUUID } from "@/lib/service/generate32BitUUID";
import toast from "react-hot-toast";
import { CircularProgress } from "@nextui-org/react";

const Vendor: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [operationSuccess, setOperationSuccess] = useState<boolean>(false); // New state for operation success

  const [addNew_vendor, { error, isSuccess, isLoading }] =
    useAddNew_vendorMutation();
  const [update_vendor, { error: update_error, isSuccess: update_success, isLoading: update_loading }] = useUpdate_vendorMutation();
  const [getSingeVendor, { data,isLoading:single_data_loading }] = useGetSingeVendorMutation();

  const response: Post_VendorResponse | undefined = data as
    | Post_VendorResponse
    | undefined;

  const vendor: vendr_list | never[] = useMemo(() => {
    const vendor: vendr_list | never[] = response?.vendor || [];
    return vendor;
  }, [response]);

  const onSubmit = useCallback(
    async (data: vendr_form) => {
      if (edit) {
        if (Array.isArray(vendor) || !vendor?._id) {
          console.error("Vendor data is invalid or empty");
          return;
        }
        console.log('Updating vendor:', vendor?._id);
        const updated_data = { ...data, id: vendor?._id };

        try {
          await update_vendor(updated_data);
          setOperationSuccess(true); // Set success state for update
        } catch (error) {
          console.error("Error updating vendor:", error);
        }
      } else {
        const updated_data = { ...data, uuid: generate32BitUUID() };
        await addNew_vendor(updated_data);
        setOperationSuccess(true); // Set success state for creation
      }
    },
    [addNew_vendor, update_vendor, edit, vendor]
  );

  const edit_handler = useCallback(
    async (value: string) => {
      setIsOpen(true);
      await getSingeVendor(value);
      setEdit(true);
    },
    [setEdit, getSingeVendor]
  );
  // Handle success and error messages
  useEffect(() => {
    // Handle error messages
    if (error || update_error) {
      let errorMessage = "An unexpected error occurred."; // Default message
  
      // Check if 'error' is defined and has the expected structure
      if (error && 'data' in error) {
        errorMessage = (error as { data?: { message?: string } }).data?.message || errorMessage;
      }
  
      // Check if 'update_error' is defined and has the expected structure
      if (update_error && 'data' in update_error) {
        errorMessage = (update_error as { data?: { message?: string } }).data?.message || errorMessage;
      }
  
      toast.error(errorMessage);
      setOperationSuccess(false); // Reset success state on error
      return; // Exit early if there's an error
    }

    // Handle success messages
    if (isSuccess && operationSuccess) {
      setIsOpen(false);
      setEdit(false);
      toast.success("Vendor added successfully");
      setOperationSuccess(false); // Reset success state after handling success
    } else if (update_success && operationSuccess) {
      setIsOpen(false);
      setEdit(false);
      toast.success("Vendor updated successfully");
      setOperationSuccess(false); // Reset success state after handling success
    }

    // Reset edit state if the popover is closed
    if (!isOpen) {
      setEdit(false);
    }
  }, [error, isSuccess, isOpen, setEdit, operationSuccess, update_error, update_success]);


  return (
    <div>
      {isOpen && (
        <Popover_component
          open={isOpen}
          set_open={setIsOpen}
          components={
            <>
            <Vendor_from
              isLoading={isLoading || update_loading}
              edit={edit}
              open={isOpen}
              set_open={setIsOpen}
              vendor_data={vendor}
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

      <Vendor_list set_open={setIsOpen} edit_handler={edit_handler} />
    </div>
  );
};

export default Vendor;
