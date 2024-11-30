// "use client";
// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import {
//   Product_purchase_form_tableprops,
//   purchase_product_list_props,
//   purchase_type_props,
// } from "@/types/Purchase_type";
// import Autocomplete_field from "@/components/common/fields/Autocomplete_field";
// import DatePicker_field from "@/components/common/fields/DatePicker_field";
// import { purchase_schema } from "@/zod-schemas/Purchase_zod_schema";
// import Input_field from "@/components/common/fields/Input_field";
// import { Button } from "@nextui-org/react";
// import { Plus } from "lucide-react";
// import Autocomplete_normal from "@/components/common/fields/Autocomplete_normal";
// import Select_normal from "@/components/common/fields/Select_normal";
// import Input_normal from "@/components/common/fields/Input_normal";
// import Product_purchase_form_table from "./Product_purchase_form_table";
// import { useGetAllVendorsQuery } from "@/state/vendorApi";
// import { show_per_Page } from "../../common/Data";
// import debounce from "lodash.debounce";
// import Secondary_Autocomplete_field from "@/components/common/fields/Secondary_Autocomplete_field";
// import { useGetAllcategorieQuery } from "@/state/categoriesApi";
// import { useGetAllproductsQuery, useGetSingleMutation } from "@/state/productApi";
// import toast from "react-hot-toast";

// const Purchase_form: React.FC<Product_purchase_form_tableprops> = ({ onSubmit, additional_number_data, set_additional_data, product_list, set_product_list }) => {
//   //_________________________-usestates
//   const [filter_vendor, setFilter_vendor] = useState<string>("");
//   const [filter_categorie, setFilter_categorie] = useState<string>("");
//   const [filter_product, setFilter_product] = useState<string>("");
//   const [product_id, set_product_id] = useState<number | string>("");
//   const [debouncedFilterValue, setDebouncedFilterValue] =
//     useState<[string, string, string]>(["", "", ""]);

//   const [publishStatus, setPublishStatus] = useState<string>("");
//   const [getSingle, { isLoading: product_loading }] = useGetSingleMutation();
//   const [qnty, set_qnty] = useState<number | string>(1);
//   const {
//     control,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<purchase_type_props>({
//     resolver: zodResolver(purchase_schema),
//     defaultValues: {},
//   });

//   // Memoize the debounced function for stable reference
//   const debouncedSetFilter = useMemo(
//     () =>
//       debounce((vendor: string, categorie: string, product: string) => {
//         setDebouncedFilterValue([vendor, categorie, product]);
//       }, 300),
//     []
//   );

//   // Fetching vendor data, category data, and product data
//   const { data: vendor_data, error, isLoading } = useGetAllVendorsQuery({
//     is_active: "yes",
//     is_delete: "no",
//     keyword: debouncedFilterValue[0],
//     status: "active",
//     rowsPerPage: show_per_Page,
//     page: 1,
//   });

//   const { data: cate_data } = useGetAllcategorieQuery({
//     is_active: "yes",
//     is_delete: "no",
//     keyword: debouncedFilterValue[1],
//     status: "active",
//     rowsPerPage: show_per_Page,
//     page: 1,
//   });

//   const { data: product_data } = useGetAllproductsQuery({
//     is_active: "yes",
//     is_delete: "no",
//     keyword: debouncedFilterValue[2],
//     status: "active",
//     rowsPerPage: show_per_Page,
//     page: 1,
//   });

//   // Update debounced filter value when any filter changes
//   useEffect(() => {
//     debouncedSetFilter(filter_vendor, filter_categorie, filter_product);
//     return () => debouncedSetFilter.cancel(); // Clean up on unmount
//   }, [filter_vendor, filter_categorie, filter_product, debouncedSetFilter]);

//   // Memoized vendor data for efficient re-rendering
//   const filter_data = useMemo(() => {
//     return (
//       vendor_data?.vendor?.map((item: any) => ({
//         label: item.name,
//         value: item._id,
//       })) || []
//     );
//   }, [vendor_data]);

//   // Memoized category data
//   const filter_cat_data = useMemo(() => {
//     return (
//       cate_data?.categorie?.map((item: any) => ({
//         label: item.name,
//         value: item._id,
//       })) || []
//     );
//   }, [cate_data]);

//   // Memoized product data
//   const filter_product_data = useMemo(() => {
//     return (
//       product_data?.product?.map((item: any) => ({
//         label: item.name,
//         value: item._id,
//       })) || []
//     );
//   }, [product_data]);

//   //-----------------------------------------------



//   const make_list = useCallback(async () => {
//     try {
//       const result = await getSingle(typeof product_id === "number" ? product_id.toString() : product_id);

//       if (result?.data) {
//         const data: any = result.data;
//         const product: any = data?.product;
        
//         let newProduct: purchase_product_list_props | undefined; // Declare newProduct
        
//         if (product_list.length > 0) {
//           const existingProductIndex = product_list.findIndex(
//             (p: any) => p.product?._id === product?._id
//           );
        
//           if (existingProductIndex !== -1) { // Check if the product exists
//             // Update the quantity of the existing product
//             const updatedProductList = [...product_list]; // Create a new array for immutability
//             updatedProductList[existingProductIndex].quantity = 
//               typeof qnty === "string" ? parseInt(qnty, 10) : qnty; // Update quantity
//             set_product_list(updatedProductList); // Update the state
//             return; // Exit the function early
//           }
//         }
        
//         // If the product doesn't exist, create a new product entry
//         newProduct = {
//           key: Date.now().toString(),
//           product: product,
//           quantity: typeof qnty === "string" ? parseInt(qnty, 10) : qnty,
//         };
        
//         // Update the product list with the new product
//         set_product_list([...product_list, newProduct]);

        
//       } else {
//         const data: any = result.error;
//         const error: any = data.data.message;
//         toast.error(error)
//       }


//     } catch (error: any) {
//       toast.error('Error fetching data:', error)
//     }
//   }, [getSingle, set_product_list, qnty, product_list])



// console.log(product_list)
//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="grid grid-cols-4 gap-4">
//           <div className="col-span-4 md:col-span-3">
//             <Secondary_Autocomplete_field
//               control={control}
//               errors={errors}
//               name="vendor"
//               options={filter_data}
//               label_name="Select Vendor"
//               setFilterValue={setFilter_vendor}
//             />
//           </div>
//         </div>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-2 py-4">
//           <div>
//             <DatePicker_field
//               control={control}
//               errors={errors}
//               name="purchase_date"
//               label="Purchase Date"
//             />
//           </div>
//           <div>
//             <DatePicker_field
//               control={control}
//               errors={errors}
//               name="due_date"
//               label="Due Date"
//             />
//           </div>
//           <div>
//             <DatePicker_field
//               control={control}
//               errors={errors}
//               name="supplier_invoice_date"
//               label="Supplier invoice Date"
//             />
//           </div>
//           <div>
//             <Input_field
//               control={control}
//               errors={errors}
//               name="supplier_invoice_serial_no"
//               label="Supplier invoice serial no"
//             />
//           </div>
//           <div>
//             <Input_field
//               control={control}
//               errors={errors}
//               name="reference"
//               label="Reference"
//             />
//           </div>
//         </div>
//         <div>
//           <div className="flex flex-col items-center md:flex-row gap-2">
//             <div className="w-full md:w-6/12">
//               <Autocomplete_normal
//                 label_name="Select Products"
//                 options={filter_product_data}
//                 setproductname={set_product_id}
//               />

//             </div>
//             <div className="w-full flex items-center gap-2 md:w-3/12">
//               <div>
//                 <Input_normal
//                   type="number"
//                   label="Quantity"
//                   get_value={set_qnty}
//                 />
//               </div>
//               <div>
//                 <Button
//                   color="primary"
//                   variant="ghost"
//                   startContent={<Plus />}
//                   onClick={() => make_list()}
//                 >
//                   Add to Bill
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       <div>
//         <Product_purchase_form_table product_list={product_list} set_product_list={set_product_list}
//           additional_number_data={additional_number_data} set_additional_data={set_additional_data}
//         />
//       </div>

//       <div className="flex gap-2">
//         <Button type="button" onClick={() => setPublishStatus("Draft")}>
//           Save as Draft
//         </Button>
//         <Button onClick={() => setPublishStatus("Publish")} type="submit">
//           Publish
//         </Button>
//       </div>

//     </form>

//   );
// };

// export default Purchase_form;
