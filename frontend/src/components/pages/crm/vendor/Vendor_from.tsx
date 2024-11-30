"use client";
import Input_field from "@/components/common/fields/Input_field";
import Phone_number_field from "@/components/common/fields/Phone_number_field";
import Select_field from "@/components/common/fields/Select_field";
import { BaseAddress, vendr_form, vendr_list } from "@/types/Vendor_type";
import { vendor_schema } from "@/zod-schemas/vendor_zod_schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, ModalFooter, ModalHeader } from "@nextui-org/react";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
interface vender_form_props {
  open: boolean;
  set_open: (value: boolean) => void;
  onSubmit: (data: vendr_form) => void;
  isLoading: boolean;
  vendor_data: vendr_list | never[];
  edit: boolean;
}
const status = [{ label: 'Active', value: 'active', }, { label: 'Inactive', value: 'inactive', }]
const Vendor_from: React.FC<vender_form_props> = ({
  open,
  set_open,
  onSubmit,
  isLoading,
  vendor_data,
  edit,
}) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<vendr_form>({
    resolver: zodResolver(vendor_schema),
    defaultValues: {
      shipping_address:{ country: "India"}, // Set default country value
      billing_address:{ country: "India"}, // Set default country value
      status: "active", // Set default country value
    },
  });
  const memoizedVendorData = useMemo(() => {
    if (vendor_data && typeof vendor_data === 'object' && !Array.isArray(vendor_data)) {
      return {
        name: vendor_data.name,
        phone: vendor_data.phone,
        email: vendor_data.email,
        company: vendor_data.company_name,
        gstin: vendor_data.gstin,
        status: vendor_data.status,
        shipping_address: {
          address_line_1: vendor_data.shipping_address?.address_line_1 || '',
          address_line_2: vendor_data.shipping_address?.address_line_2 || '',
          city: vendor_data.shipping_address?.city || '',
          state: vendor_data.shipping_address?.state || '',
          pin_code: vendor_data.shipping_address?.pin_code || '',
          country: vendor_data.shipping_address?.country || '',
        },
        billing_address: {
          address_line_1: vendor_data.billing_address?.address_line_1 || '',
          address_line_2: vendor_data.billing_address?.address_line_2 || '',
          city: vendor_data.billing_address?.city || '',
          state: vendor_data.billing_address?.state || '',
          pin_code: vendor_data.billing_address?.pin_code || '',
          country: vendor_data.billing_address?.country || '',
        },
      };
    }
    return {} as Partial<vendr_form>; // Use Partial<vendr_form> to allow for missing keys
  }, [vendor_data]);
  
  useEffect(() => {
    if (edit && Object.keys(memoizedVendorData).length > 0) {
      // Validate if memoizedVendorData has the correct structure
      const isValidVendorData = (data: any): data is vendr_form => {
        return data && typeof data === 'object' && 'name' in data; // Adjust according to your requirements
      };
  
      if (isValidVendorData(memoizedVendorData)) {
        // Iterate over each key in memoizedVendorData
        (Object.keys(memoizedVendorData) as (keyof vendr_form)[]).forEach((key) => {
          const value = memoizedVendorData[key];
          if (value !== undefined) { // Ensure value is not undefined
            if (typeof value === 'object' && value !== null) {
              // If value is an object (i.e., an address), iterate through its keys
              (Object.keys(value) as (keyof BaseAddress)[]).forEach((addressKey) => {
                const fullKey = `${key}.${addressKey}` as keyof vendr_form; // Assert fullKey as keyof vendr_form
                
                // Use a type assertion here to ensure we pass the correct type to setValue
                if (typeof value[addressKey] === 'number') {
                  // If the value is a number, convert it to string
                  setValue(fullKey, value[addressKey].toString());
                } else {
                  setValue(fullKey, value[addressKey] as string); // Cast as string for other cases
                }
              });
            } else {
              // Set value for top-level keys
              setValue(key, value as string); // You might need to adjust this based on your requirements
            }
          }
        });
      }
    } else {
      // Clear form if not in edit mode
      (Object.keys(memoizedVendorData) as (keyof vendr_form)[]).forEach((key) =>
        setValue(key, '')
      );
    }
  }, [memoizedVendorData, setValue, edit]);
  
  
  
  
  
  

  return (
    <div>
      <div>
        <ModalHeader className="flex flex-col gap-1">
          {edit ? "Update Vender From" : "Vender From"}
        </ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex  items-center justify-between p-2">
            <p className="text-lg">Basic Details</p>
            <div className="w-52">
              <Select_field
              control={control}
              errors={errors}
              name="status"
              label="select status"
              options={status}
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
                  label="Name"
                />
              </div>
              <div className="w-[48.5%] lg:w-[49%]">
                <Phone_number_field
                  control={control}
                  errors={errors}
                  name="phone"
                  label="Phone"
                />
              </div>

              <div className="w-[48.5%] lg:w-[49%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="email"
                  label="Email"
                />
              </div>
            </div>
          </div>
          <div className="w-full">
            <p className="text-lg py-2">Company Details</p>
          </div>
          <div className="bg-white">
            <div className="flex flex-wrap gap-2">
              <div className="w-[48.5%] lg:w-[49%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="company"
                  label="Company"
                />
              </div>
              <div className="w-[48.5%] lg:w-[49%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="gstin"
                  label="GSTIN"
                />
              </div>

              <div className="w-full">
                <p className="text-lg">Shipping Address</p>
              </div>
              <div className="w-[48.5%] lg:w-[49%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="shipping_address.address_line_1"
                  label="Address Line 1"
                />
              </div>
              <div className="w-[48.5%] lg:w-[49%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="shipping_address.address_line_2"
                  label="Address Line 2"
                />
              </div>
              <div className="w-[48.5%] lg:w-[49%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="shipping_address.pin_code"
                  label="Pin Code"
                />
              </div>
              <div className="w-[48.5%] lg:w-[49%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="shipping_address.state"
                  label="State"
                />
              </div>
              <div className="w-[48.5%] lg:w-[49%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="shipping_address.city"
                  label="City"
                />
              </div>
              <div className="w-[48.5%] lg:w-[49%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="shipping_address.country"
                  label="Country"
                />
              </div>
              <div className="w-full">
                <p className="text-lg">Billing Address - Opptional</p>
              </div>
              <div className="w-[48.5%] lg:w-[49%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="billing_address.address_line_1"
                  label="Address Line 1"
                />
              </div>
              <div className="w-[48.5%] lg:w-[49%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="billing_address.address_line_2"
                  label="Address Line 2"
                />
              </div>
              <div className="w-[48.5%] lg:w-[49%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="billing_address.pin_code"
                  label="Pin Code"
                />
              </div>
              <div className="w-[48.5%] lg:w-[49%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="billing_address.state"
                  label="State"
                />
              </div>
              <div className="w-[48.5%] lg:w-[49%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="billing_address.city"
                  label="City"
                />
              </div>
              <div className="w-[48.5%] lg:w-[49%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="billing_address.country"
                  label="Country"
                />
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

export default Vendor_from;
