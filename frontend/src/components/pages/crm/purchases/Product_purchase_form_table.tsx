// "use client";
// import React, { useState } from "react";
// import { DeleteIcon } from "@/components/common/svg-icons/DeleteIcon";
// import Next_form_table from "@/components/common/table/Next_form_table";
// import { Button, Tooltip, User } from "@nextui-org/react";
// import Input_normal from "@/components/common/fields/Input_normal";
// import {
//   calculate_GST_amount,
//   calculate_total_amount_after_discont,
//   calculate_without_GST_amount,
//   calculateNetAmount,
//   calculateTotal_amount,
//   calculateTotalIncludingGST,
// } from "@/lib/service/calculations";
// import {
//   additional_props,
//   Product_purchase_form_table_props,
//   purchase_product_list_props,
// } from "@/types/Purchase_type";
// import { formatCurrency } from "@/lib/service/currencyUtils";
// import Select_normal from "@/components/common/fields/Select_normal";
// import { convertTaxToNumber } from "@/lib/service/convertTaxToNumber";

// const columns = [
//   { key: "product_name", label: "Product Name" },
//   { key: "quantity", label: "Quantity" },
//   { key: "unit_price", label: "Unit Price" },
//   { key: "price_width_text", label: "Price With Text" },
//   { key: "discount", label: "Discount" },
//   { key: "net_amount", label: "Net Amount" },
//   { key: "total", label: "Total" },
//   { key: "actions", label: "Action" },
// ];

// const customHeaderContent = <div></div>;

// const Product_purchase_form_table: React.FC<
//   Product_purchase_form_table_props
// > = ({ product_list, set_product_list, additional_number_data, set_additional_data }) => {

//   const renderCell = (row: any, columnKey: string) => {

//     const handleInputChange = (
//       value: any,
//       row: purchase_product_list_props,
//       field: string
//     ) => {

//       const numericValue = Number(value);
//       if (numericValue < 0) {
//         console.log("number error");
//       }
//       const updatedProductList = product_list.map(
//         (product: purchase_product_list_props) =>
//           product.key === row.key ? { ...product, [field]: value } : product
//       );

//       const updatedProductListWithNetAmount = updatedProductList.map(
//         (product: purchase_product_list_props) => {
//           const quantity = product.quantity || 0;
//           const unitPrice = product.unit_price || 0;
//           const discount = product.discount || 0;
//           const netAmount = calculateNetAmount(quantity, unitPrice, discount);
//           return {
//             ...product,
//             price_width_text: calculateTotalIncludingGST(unitPrice),
//             net_amount: netAmount,
//             total: calculateTotal_amount(quantity, unitPrice, discount),
//           };
//         }
//       );

//       set_product_list(updatedProductListWithNetAmount);
//     };
//     const cellValue = row[columnKey as keyof typeof row];
//     const discount: number = row?.discount;
//     const quantity: number = row?.quantity;
//     switch (columnKey) {
//       case "product_name":
//         return (
//           <div className="min-h-[52px]">
//             {row?.product?.name}
//           </div>
//         );
//       case "quantity":
//         return (
//           <div className="min-h-[52px] w-[70px]">
//             <Input_normal
//               type="number"
//               label=""
//               value={cellValue}
//               get_value={(value) => handleInputChange(value, row, "quantity")}
//             />
//           </div>
//         );
//       case "unit_price":

//         return (
//           <div className="min-h-[52px]">
//             {row?.product?.purchase_price}
//             {Number(discount) > 0 ? (
//               <div className="text-xxs flex gap-[2px]">
//                 <span>after disc.</span>
//                 <span>

//                   {formatCurrency(
//                     calculate_total_amount_after_discont(
//                       row?.product?.purchase_price,
//                       quantity,
//                       discount
//                     )
//                   )}
//                 </span>
//               </div>
//             ) : null}
//           </div>
//         );
//       case "price_width_text":
//         return (
//           <div className="min-h-[52px]">
//             {calculateTotalIncludingGST(row?.product?.purchase_price, row?.product?.tax)}
//             {Number(discount) > 0 ? (
//               <div className="text-xxs flex gap-[2px]">
//                 <span>after disc.</span>
//                 <span>
//                   {formatCurrency(
//                     calculate_total_amount_after_discont(
//                       cellValue,
//                       quantity,
//                       discount
//                     )
//                   )}
//                 </span>
//               </div>
//             ) : null}
//           </div>
//         );
//       case "discount":
//         return (
//           <div className="min-h-[52px] w-[70px]">
//             <Input_normal
//               type="number"
//               label=""
//               value={cellValue}
//               get_value={(value) => handleInputChange(value, row, "discount")}
//             />
//           </div>
//         );
//       case "net_amount":
//         return (
//           <div className="min-h-[52px]">
//             {formatCurrency(calculateNetAmount(quantity, row?.product?.purchase_price, discount))}
//             <div className="text-xxs flex gap-[2px]">
//               <span>{formatCurrency(calculateNetAmount(quantity, row?.product?.purchase_price, discount))}</span>
//               <span>({row?.product?.tax}%)</span>
//             </div>
//           </div>
//         );
//       case "total":
//         return <div className="min-h-[52px]">{calculateTotal_amount(quantity, row?.product?.purchase_price, discount, row?.product?.tax)}</div>;
//       case "actions":
//         return (
//           <div className="min-h-[52px]">
//             <Tooltip color="danger" content="Delete user">
//               <span className="text-lg text-danger cursor-pointer active:opacity-50">
//                 <DeleteIcon />
//               </span>
//             </Tooltip>
//           </div>
//         );
//       default:
//         return cellValue as React.ReactNode;
//     }
//   };
//   const footercontent = () => {
//     const handleDiscountChange = () => { };

//     const handleInputChange = (value: string | number, index: number, field: keyof additional_props) => {
//       set_additional_data(prevData => {
//         // Create a copy of the existing data
//         const newData: additional_props[] = [...prevData];
//         // Update the specific item with the new value
//         newData[index] = {
//           ...newData[index],
//           [field]: value
//         };
//         // Calculate updated values
//         const updated_new_data: additional_props[] = newData.map((item, i) => {
//           const taxNumber = item.tax ? convertTaxToNumber(item.tax, '%') : 0;
//           let withTax = item.withTax ?? 0;
//           let withoutTax = item.withoutTax;
//           if (withTax > 0 && taxNumber > 0) {
//             withTax = calculate_without_GST_amount(withTax, taxNumber);
//             withoutTax = withTax
//           }
//           const labels = ["Shipping Charges", "Packaging Charges"];
//           const label = labels[i] || `Charge ${i + 1}`;
//           return {
//             ...item,
//             label: label,
//             withoutTax: withoutTax ?? 0,
//             withTax: item.withTax ?? 0,
//           };
//         });

//         return updated_new_data; // Update state with the new array
//       });
//     };

//     const aditional_data = ['Delivery/ Shipping Charges (+)', 'Packaging Charges (+)']
//     const category_gst = [
//       {
//         label: "0",
//         value: "0",
//         description: "The second most popular pet in the world",
//       },
//       {
//         label: "5%",
//         value: "5%",
//         description: "The most popular pet in the world",
//       },
//       { label: "12%", value: "12%", description: "The largest land animal" },
//       { label: "18%", value: "18%", description: "The largest land animal" },
//       { label: "24%", value: "24%", description: "The largest land animal" },
//     ];
   
//     return (
//       <div style={{ padding: "10px 0", borderTop: "1px solid #ddd" }}>
//         <div className="items-center flex justify-between">
//           {/* Apply discount section */}
//           <div style={{ marginBottom: "10px" }}>
//             <p>Apply discount (%) to all items?</p>
//             <Input_normal
//               type="number"
//               label=""
//               value={""} // You can set this with state or props if needed
//               get_value={(value) => handleDiscountChange()}
//             />
//           </div>

//           {/* Items and additional charges section */}
//           <div>
//             <div>
//               <p>Items / Qty: 2 / 2.000</p>{" "}
//               {/* Dynamically adjust this as needed */}
//             </div>
//             <Button onClick={() => console.log("Additional Charges clicked")}>
//               Additional Charges
//             </Button>
//           </div>
//         </div>
//         <div className="max-w-md m-0 ml-auto">
//           {/* header */}
//           <div className="items-center flex">
//             <div className="w-52"></div>
//             <div className="w-20">Tax</div>
//             <div className="w-20">withoutTax in (₹)</div>
//             <div className="w-20">withTax in (₹)</div>
//           </div>
//           {/* body */}
//           <div>
//             {aditional_data.map((item, i) => {

//               return (
//                 <div key={i} className="items-center flex">
//                   <div className="w-52">{item}</div>
//                   <div className="w-20">
//                     <div className="min-h-[52px]">
//                       <Select_normal label={""} options={category_gst}
//                         get_value={(value) => handleInputChange(value, i, 'tax')}

//                       />
//                     </div>
//                   </div>
//                   <div className="w-20">
//                     <div className="min-h-[52px]">
//                       <Input_normal
//                         type="number"
//                         label=""
//                         value={additional_number_data[i]?.withoutTax ?? 0}
//                         get_value={(value) => handleInputChange(value, i, 'withoutTax')}
//                       />
//                     </div>
//                   </div>
//                   <div className="w-20">
//                     <div className="min-h-[52px]">
//                       <Input_normal
//                         type="number"
//                         label=""
//                         value={additional_number_data[i]?.withTax ?? 0}
//                         get_value={(value) => handleInputChange(value, i, 'withTax')}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               )
//             })}

//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (

//     <Next_form_table
//       columns={columns}
//       rows={product_list}
//       renderCell={renderCell}
//       footercontent={footercontent()}
//       topContent={customHeaderContent}
//     />
//   );
// };

// export default Product_purchase_form_table;
