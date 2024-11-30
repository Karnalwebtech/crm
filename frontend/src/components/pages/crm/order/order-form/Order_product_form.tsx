"use client";
import { CircularProgress } from "@nextui-org/progress";
import Secondary_Autocomplete_field from "@/components/common/fields/Secondary_Autocomplete_field";
import { order_product_type_form, other_sevice } from "@/types/order_type";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import debounce from "lodash.debounce";
import { useGetAllproductsQuery, useGetSingleMutation } from "@/state/productApi";
import Input_field from "@/components/common/fields/Input_field";
import toast from "react-hot-toast";
import { calculateTotalIncludingGST } from "@/lib/service/calculations";
import { CircleX } from "lucide-react";
import { formatCurrency } from "@/lib/service/currencyUtils";
import { show_per_Page } from "@/components/pages/common/Data";
interface popover {
  isOpen: boolean;
  onClose: () => void;
  list?: any;
  set_Poduct_list?: any;
  set_services?: any
}
interface Order_product_form_props {
  product_list: any; set_Poduct_list: any; set_services?: any; services: any;
}
const Order_product_form: React.FC<Order_product_form_props> = ({ services, set_services, product_list, set_Poduct_list }) => {
  const productFormDisclosure = useDisclosure();
  const serviceFormDisclosure = useDisclosure();
  const amount_with_gst = useMemo(() => {
    return product_list.reduce((accumulator: number, item: any) => {
      let sellingPrice = 0;
      let tax = 0;
      let quantity = 1; // Default to 1 if no quantity is found

      // Check if the item has a product field (structure with quantity)
      if (item.product) {
        sellingPrice = Number(item.product?.selling_price) || 0; // Extract from product field
        tax = Number(item.product?.tax) || 0; // Extract from product field
        quantity = item.quantity; // Use the quantity from the item
      } else {
        // Structure without product field
        sellingPrice = Number(item.selling_price) || 0; // Extract directly from item
        tax = Number(item.tax) || 0; // Extract directly from item
        quantity = item.quantity; // Use the quantity from the item
      }

      // Calculate total price with GST
      const totalPrice = calculateTotalIncludingGST(sellingPrice, tax) * quantity;

      // Add the total price to the accumulator
      return accumulator + totalPrice;
    }, 0);
  }, [product_list]);


  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex w-full">
            <p className="w-[60%]">Item</p>
            <p className="w-[10%] text-center">Cost</p>
            <p className="w-[10%] text-center">GST</p>
            <p className="w-[10%] text-center">Qnty</p>
            <p className="w-[10%] text-center">Total</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          {product_list?.map((item: any, i: number) => {
            return (
              <div key={i} className="flex w-full mt-3">
                <p className="w-[60%] my-2">{item.product ? item.product.name : item.name}</p>

                <p className="w-[10%] text-center">{formatCurrency(item.product ? item.product.selling_price : item?.selling_price)}</p>
                <p className="w-[10%] text-center">{item.product ? item.product.tax : item?.tax}%</p>
                <p className="w-[10%] text-center">{item.quantity}</p>
                <p className="w-[10%] text-center">
                  {formatCurrency(calculateTotalIncludingGST(Number(item.product ? item.product.selling_price : item?.selling_price), Number(item.product ? item.product.tax : item?.tax)) * item.quantity)}
                </p>
              </div>
            );
          })}
        </CardBody>
        <Divider />
        <CardFooter>
          <div className="flex gap-2 justify-end w-full">
            <Button size="sm" onClick={productFormDisclosure.onOpen}>
              Add product(s)
            </Button>
            <Button size="sm" onClick={serviceFormDisclosure.onOpen}>
              Add service
            </Button>
          </div>
          <div className="w-full">
            {[
              { label: 'Items Subtotal:', value: amount_with_gst },
              { label: 'Voucher(s):', value: services?.discount || 0 },
              { label: 'Shipping:', value: services?.shipping_charges || 0 },
              { label: 'Other charges:', value: services?.other_charge || 0 },
            ].map(({ label, value }, index) => (
              <div key={index} className="flex justify-end">
                <p className="w-[100px]">{label}</p>
                <p className="w-[100px]">{formatCurrency(value)}</p>
              </div>
            ))}
            <div className="flex justify-end">
              <p className="w-[100px]">Order Total:</p>
              <p className="w-[100px]">
                {formatCurrency(
                  (services?.shipping_charges || 0) +
                  (services?.other_charge || 0) -
                  (services?.discount || 0) +
                  amount_with_gst
                )}
              </p>
            </div>
          </div>
        </CardFooter>
      </Card>

      <Product_service
        isOpen={serviceFormDisclosure.isOpen}
        onClose={serviceFormDisclosure.onClose}
        set_services={set_services}
      />
      <ProductForm
        isOpen={productFormDisclosure.isOpen}
        onClose={productFormDisclosure.onClose}
        list={product_list}
        set_Poduct_list={set_Poduct_list}
      />
    </div>
  );
};



const ProductForm: React.FC<popover> = ({ isOpen, onClose, list, set_Poduct_list }) => {
  const [filterValue, setFilterValue] = useState<string>("");
  const [debouncedFilterValue, setDebouncedFilterValue] = useState<string>(filterValue);

  const { control, handleSubmit, formState: { errors } } = useForm<order_product_type_form>();
  const { data: product_data } = useGetAllproductsQuery({
    is_active: "yes",
    is_delete: "no",
    keyword: debouncedFilterValue,
    status: "active",
    rowsPerPage: show_per_Page,
    page: 1,
  });
  const [getSingle, { isLoading }] = useGetSingleMutation();

  // Debounce filter input
  const debouncedHandleFilter = useMemo(() => debounce(setDebouncedFilterValue, 300), []);

  useEffect(() => {
    debouncedHandleFilter(filterValue);
  }, [filterValue, debouncedHandleFilter]);

  // Map product data for dropdown
  const filter_product_data = useMemo(
    () => product_data?.product?.map((item: any) => ({
      label: item.name,
      value: item._id,
    })) || [],
    [product_data]
  );


  const onSubmit: SubmitHandler<any> = useCallback(
    async (formData: any) => {
      try {
        const { product, quantity } = formData;  // Extract 'product' (or any other field) from form data
        const result = await getSingle(product);  // Pass the product or id to the mutation
        console.log(quantity)
        if (result?.data) {
          const data: any = result.data;
          const porduct: any = data?.product;
          set_Poduct_list((prev: any) => {
            const existingProductIndex = prev.findIndex(
              (p: any) => p.product?._id === porduct?._id
            );


            if (existingProductIndex >= 0) {
              // If the product exists, update its quantity
              const updatedList = [...prev];
              updatedList[existingProductIndex].quantity  = quantity;  // Add new quantity to the existing quantity
              return updatedList;
            } else {
              // If the product doesn't exist, add it to the list
              return [
                ...prev,
                { product: porduct, quantity: quantity }  // Add new product with quantity
              ];
            }

          });
        } else {
          const data: any = result.error;
          const error: any = data.data.message;
          toast.error(error)
        }
      } catch (error: any) {
        toast.error('Error fetching data:', error)
      }
    },
    [getSingle, set_Poduct_list]  // Dependency array for useCallback
  );

  const removeProduct = useCallback(
    (index: number) => {
      set_Poduct_list((prev: any) => prev.filter((_: any, i: number) => i !== index));
    },
    [set_Poduct_list]
  );

  return (
    <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Add products</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-2">
              <div className="w-[69%]">
                <Secondary_Autocomplete_field
                  control={control}
                  errors={errors}
                  name="product"
                  label_name="Search product"
                  options={filter_product_data}
                />
              </div>
              <div className="w-[29%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="quantity"
                  label="Quantity"
                  type="number"
                />
              </div>
            </div>

            <div className="mt-10">
              <div className="flex w-full">
                <p className="w-[60%] my-2">Item</p>
                <p className="w-[10%] my-2 text-center">Cost</p>
                <p className="w-[10%] my-2 text-center">Qnty</p>
                <p className="w-[10%] my-2 text-center">Total</p>
                <p className="w-[10%] my-2 text-center">Remove</p>
              </div>

              {list.map((item: any, i: number) => (
                <div key={i} className="flex w-full mt-3">
                  <p className="w-[60%] my-2">{item.product ? item.product.name : item.name}</p>
                  <p className="w-[10%] my-2 text-center">{formatCurrency(item.product ? item.product.selling_price : item.selling_price)}</p>
                  <p className="w-[10%] my-2 text-center">{item?.quantity}</p>
                  <p className="w-[10%] my-2 text-center">
                    {formatCurrency(calculateTotalIncludingGST(Number(item.product ? item.product.selling_price : item.selling_price), Number(item.product ? item.product.tax : item.tax)) * item.quantity)}
                  </p>
                  <div className="w-[10%] my-2 justify-center flex">
                    <CircleX onClick={() => removeProduct(i)} className="cursor-pointer text-red" size={20} />
                  </div>
                </div>
              ))}
            </div>

            <ModalFooter className="mt-2">
              <Button color="danger" variant="light" onClick={onClose}>Close</Button>
              <Button className="bg-black text-white" type="submit">Add</Button>
            </ModalFooter>
          </form>

          {isLoading && (
            <div className="absolute z-10 inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
              <CircularProgress />
            </div>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const Product_service: React.FC<popover> = ({ isOpen, set_services, onClose }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<other_sevice>();

  const onSubmit = useCallback(
    (formData: any) => {
      set_services(formData);
      onClose();
    },
    [set_services, onClose]
  );

  return (
    <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Add service</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-2 my-2">
              <div className="w-[32%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="shipping_charges"
                  label="Shipping charge"
                  type="number"
                />
              </div>

              <div className="w-[32%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="discount"
                  label="Discount amount"
                  type="number"
                />
              </div>

              <div className="w-[32%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="other_charge"
                  label="Other Charges"
                  type="number"
                />
              </div>
            </div>

            <ModalFooter className="mt-2">
              <Button color="danger" variant="light" onClick={onClose}>Close</Button>
              <Button className="bg-black text-white" type="submit">Add</Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Order_product_form;