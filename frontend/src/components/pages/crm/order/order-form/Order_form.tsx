"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Input_field from "@/components/common/fields/Input_field";
import { Button, Card, CardBody } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import Secondary_Autocomplete_field from "@/components/common/fields/Secondary_Autocomplete_field";
import {
  dispatch_mod_arr,
  order_status_arr,
  Payment_mode_arr,
  tax_status,
} from "../../../common/Data";
import Select_field from "@/components/common/fields/Select_field";
import { order_type_form } from "@/types/order_type";
import Order_product_form from "./Order_product_form";
import { useGetAllcustomerQuery } from "@/state/customerApi";
import debounce from "lodash.debounce";
import { zodResolver } from "@hookform/resolvers/zod";
import { order_type_form_schema } from "@/zod-schemas/order_zod_schema";
import { Form_sidebar } from "./Form_sidebar";
import { useAddNewOrderMutation, useUpdateMutation } from "@/state/orderApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { generate32BitUUID } from "@/lib/service/generate32BitUUID";
import Text_area_field from "@/components/common/fields/Text_area_field";

interface order_form_props {
  edit?: boolean;
  data?: any;
}
export const Order_form: React.FC<order_form_props> = ({
  data,
  edit = false
}) => {
  const router = useRouter();
  const [operationSuccess, setOperationSuccess] = useState<boolean>(false); // New state for operation success
  const [invoice_files, set_invoice_Files] = useState<File[]>([]);
  const [doket_files, set_doket_Files] = useState<File[]>([]);
  const [Image_files, set_Image_Files] = useState<File[]>([]);
  const [filterValue, setFilterValue] = useState<string>("");
  const [product_list, set_Poduct_list] = useState<any>([]);
  const [services, set_services] = useState<any>();

  const [debouncedFilterValue, setDebouncedFilterValue] =
    useState<string>(filterValue);
  const [addNewOrder, { isLoading, isSuccess, error }] =
    useAddNewOrderMutation();

  const [
    update,
    {
      error: update_error,
      isSuccess: update_success,
      isLoading: update_loading,
    },
  ] = useUpdateMutation();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<order_type_form>({
    resolver: zodResolver(order_type_form_schema),
    defaultValues: {
      phone: "+91", // Set default country value
    },
  });
  const customerValue = watch("customer");

  //-------------use states for apis
  const { data: customer_data } = useGetAllcustomerQuery({
    is_active: "yes",
    is_delete: "no",
    keyword: debouncedFilterValue,
    status: "active",
    rowsPerPage: 1000,
    page: 1,
  });
  const handleDebouncedFilter = useMemo(
    () => debounce((value) => setDebouncedFilterValue(value), 300),
    []
  );

  useEffect(() => {
    handleDebouncedFilter(filterValue);
  }, [filterValue, handleDebouncedFilter]);

  const filter_customer_data = useMemo(() => {
    return (
      customer_data?.customer?.map((item: any) => ({
        label: item.name,
        value: item._id,
      })) || []
    );
  }, [customer_data]);


  const onSubmit = useCallback(
    async (form_data: any) => {
      if (edit) {
        if (Array.isArray(data) || !data?._id) {
          console.error("Order data is invalid or empty");
          return;
        }
        const image_url = data?.image_id.map((item: any) => item._id);
        const doket_url = data?.doket_id.map((item: any) => item._id);
        const invoice_url = data?.invoice_id.map((item: any) => item._id);
        const images = Image_files.length > 0 ? Image_files : image_url;
        const doket = doket_files.length > 0 ? doket_files : doket_url;
        const invoice = invoice_files.length > 0 ? invoice_files : invoice_url;
        const updated_data = {
          ...form_data,
          id: data?._id,
          product: product_list,
          services: services,
          invoice: invoice,
          doket: doket,
          image: images,
        };
        try {
          await update(updated_data);
          setOperationSuccess(true);
        } catch (error) {
          console.error("Error updating vendor:", error);
        }
      } else {
        const updated_data = {
          ...form_data,
          product: product_list,
          services: services,
          invoice: invoice_files,
          doket: doket_files,
          uuid: generate32BitUUID(),
          image: Image_files,
        };
        await addNewOrder(updated_data);
        setOperationSuccess(true);
      }
    },
    [addNewOrder, update, data, invoice_files,product_list,services, edit, doket_files, Image_files]
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
      toast.success("Order added successfully");
      setOperationSuccess(false);
      router.push('/crm/orders')
    } else if (update_success && operationSuccess) {
      toast.success("Order updated successfully");
      setOperationSuccess(false);
      router.push('/crm/orders')
    }
  }, [error, isSuccess, update_error, update_success, router, operationSuccess, setOperationSuccess]);

  const memoizedVendorData = useMemo(() => {
    if (data && typeof data === "object" && !Array.isArray(data)) {
      return {
        name: data.name,
        customer: data.customer._id,
        dispatch_mod: data.dispatch_mod,
        invoice_no: data.invoice_no,
        payment_mode: data.payment_mode,
        status: data.status,
        order_date: data.order_date,
        order_status: data.order_status,
        company: data.company,
        email: data.email,
        phone: data.phone,
        notes: data.notes,
        gstin: data.gstin,
        tax_status: data.tax_status,
        shipping_address: {
          address_line_1: data.shipping_address?.address_line_1 || "",
          address_line_2: data.shipping_address?.address_line_2 || "",
          city: data.shipping_address?.city || "",
          state: data.shipping_address?.state || "",
          pin_code: data.shipping_address?.pin_code || "",
          country: data.shipping_address?.country || "",
        },
        images: {
          path: data.images_id?.[0]?.path || "",
        },
        doket: {
          path: data.doket_id?.[0]?.path || "",
        },
        invoice: {
          path: data.invoice_id?.[0]?.path || "",
        },
      };
    }
    return {} as Partial<order_type_form>; // Use Partial<vendr_form> to allow for missing keys
  }, [data]);

  useEffect(() => {
    if (Object.keys(memoizedVendorData).length > 0) {
      // Validate if memoizedVendorData has the correct structure
      const isValidVendorData = (data: any): data is order_type_form => {
        return data && typeof data === "object" && "name" in data; // Adjust according to your requirements
      };

      // Set product list from order details
      set_Poduct_list(data.order_details?.product_details || []); // Use default empty array if not defined
      set_services({
        shipping_charges: data?.shipping_charges ?? 0,
        discount: data?.discount ?? 0,
        other_charge: data?.other_charge ?? 0,
      });
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
                setValue(fullKey as keyof order_type_form, value); // Remove explicit cast to string for type safety
              }
            }
          });
        };

        // Start setting values from the root object
        setNestedValues(memoizedVendorData);
      }
    } else if (Object.keys(memoizedVendorData).length === 0) {
      // Clear form if not in edit mode
      (Object.keys(memoizedVendorData) as (keyof order_type_form)[]).forEach(
        (key) => setValue(key, "")
      );
    }
  }, [memoizedVendorData, setValue, data, set_Poduct_list, customerValue, customer_data, setValue]);



  useEffect(() => {
    if (!edit) {
      if (!customerValue || !customer_data?.customer) return;
      const selectedCustomer = customer_data.customer.find(
        (customer: { _id: string }) => customer._id === customerValue
      );


      if (selectedCustomer) {
        setValue("name", selectedCustomer.name || "");
        setValue("company", selectedCustomer.company_name || "");
        setValue("email", selectedCustomer.email || "");
        setValue("phone", `+91${selectedCustomer.phone}` || "");
        setValue("gstin", selectedCustomer.gstin || "");
        setValue("shipping_address", {
          ...selectedCustomer.shipping_address,
        });

      }
    }
  }, [customerValue, customer_data, setValue, edit]);



  return (

    <div className="flex gap-2">
      <div className="w-[70%]">
        <div className="mt-2">
          <Order_product_form
            product_list={product_list}
            set_services={set_services}
            services={services}
            set_Poduct_list={set_Poduct_list}
          />
        </div>
        <div>
          <Card>
            <CardBody>
              <form onSubmit={handleSubmit(onSubmit)}>

                <div className="bg-white">
                  <div className="flex flex-wrap gap-2">
                    <div className="w-[48.5%]">
                      <div className="w-full my-[6px]">
                        <Select_field
                          control={control}
                          errors={errors}
                          name="order_status"
                          label="Order status"
                          options={order_status_arr}
                        />
                      </div>
                      <div className="w-full my-[6px]">
                        <Secondary_Autocomplete_field
                          control={control}
                          errors={errors}
                          name="customer"
                          label_name="Customer"
                          options={filter_customer_data}
                          setFilterValue={setFilterValue}
                        />
                      </div>
                      <div className="w-full my-[6px]">
                        <Secondary_Autocomplete_field
                          control={control}
                          errors={errors}
                          name="dispatch_mod"
                          label_name="Dispatch mod"
                          options={dispatch_mod_arr}
                        />
                      </div>
                      <div className="w-full my-[6px]">
                        <Select_field
                          control={control}
                          errors={errors}
                          name="payment_mode"
                          label="payment_mode"
                          options={Payment_mode_arr}
                        />
                      </div>
                      <div>
                        <Input_field
                          control={control}
                          errors={errors}
                          name="invoice_no"
                          label="Invoice no"
                        />
                      </div>
                      <div className="w-full my-[6px]">
                        <Select_field
                          control={control}
                          errors={errors}
                          name="tax_status"
                          label="Tax status"
                          options={tax_status}
                        />
                      </div>
                      <div>
                        <Text_area_field
                          control={control}
                          errors={errors}
                          name="notes"
                          label="Notes"
                        />
                      </div>
                    </div>
                    <div className="w-[48.5%]">
                      <p>Billing</p>
                      <p>Address:</p>
                      <div>
                        <div>
                          <Input_field
                            control={control}
                            errors={errors}
                            name="name"
                            label="Full name"
                          />
                        </div>
                        <div>
                          <Input_field
                            control={control}
                            errors={errors}
                            name="company"
                            label="Company"
                          />
                        </div>
                        <div>
                          <Input_field
                            control={control}
                            errors={errors}
                            name="shipping_address.address_line_1"
                            label="Address line 1"
                          />
                        </div>
                        <div>
                          <Input_field
                            control={control}
                            errors={errors}
                            name="shipping_address.address_line_2"
                            label="Address line 2"
                          />
                        </div>
                        <div>
                          <Input_field
                            control={control}
                            errors={errors}
                            name="shipping_address.city"
                            label="City"
                          />
                        </div>
                        <div>
                          <Input_field
                            control={control}
                            errors={errors}
                            name="shipping_address.pin_code"
                            label="Postcode / ZIP"
                          />
                        </div>
                        <div>
                          <Input_field
                            control={control}
                            errors={errors}
                            name="shipping_address.state"
                            label="State / County"
                          />
                          <div>
                            <Input_field
                              control={control}
                              errors={errors}
                              name="shipping_address.country"
                              label="Country / Region"
                            />
                          </div>
                        </div>
                        <div>
                          <Input_field
                            control={control}
                            errors={errors}
                            name="gstin"
                            label="GSTIN"
                          />
                        </div>
                        <div>
                          <Input_field
                            control={control}
                            errors={errors}
                            name="email"
                            label="Email address"
                          />
                        </div>
                        <div className="w-[48.5%] lg:w-[100%]">
                          <Input_field
                            control={control}
                            errors={errors}
                            name="phone"
                            label="Phone"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  {/* <ModalFooter> */}
                  <Button color="danger" variant="light">
                    Close
                  </Button>

                  <Button
                    isLoading={isLoading || update_loading}
                    className="bg-black text-white"
                    type="submit"
                  >
                    {edit ? "update" : "Save"}
                  </Button>
                  {/* </ModalFooter> */}
                </div>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
      <div className="w-[30%]">
        <Form_sidebar
          invoice_files={invoice_files}
          set_invoice_Files={set_invoice_Files}
          doket_files={doket_files}
          set_doket_Files={set_doket_Files}
          Image_files={Image_files}
          set_Image_Files={set_Image_Files}
          data={data}
        />
      </div>
    </div>

  );
};
