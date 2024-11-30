import { convertTaxToNumber } from "@/lib/service/convertTaxToNumber";
import { formatCurrency } from "@/lib/service/currencyUtils";
import React, { useState } from "react";
interface TotalCalProps {
  product_list: any[];
  additional_number_data: any[];
}
const Total_cal: React.FC<TotalCalProps> = ({
  product_list,
  additional_number_data,
}) => {
  // conat [aditional_charge] = useState([])
  const { taxableAmount,
    totalTax,
    totalAmount, } = product_list?.reduce(
      (acc: any, item: any) => {
        console.log(item)
        const purchasePrice = item.product.purchase_price;
        const quantity = item.quantity;
        const taxRate = parseFloat(item.product.tax);

        // Taxable Amount
        const taxableAmount = purchasePrice * quantity;
        // Total Tax
        const totalTax = (taxableAmount * taxRate) / 100;
        // Total Amount
        const totalAmount = taxableAmount + totalTax;

        // Summing up values
        acc.taxableAmount += taxableAmount;
        acc.totalTax += totalTax;
        acc.totalAmount += totalAmount;

        return acc;
      },
      {
        taxableAmount: 0,
        totalTax: 0,
        totalAmount: 0,
      }
    );


  return (
    <>
      {additional_number_data.map((item: any) => {
        const withoutTax = item.withoutTax;
        const withTax = item.withTax;
        return withoutTax > 0 ? (
          <div className="flex justify-end">
            <div className="w-52">
              <p className="py-2">
                {item.label}{" "}
                <span>{withTax < withoutTax ? null : item.tax}</span>
              </p>
            </div>
            <div className="w-36">
              <p className="py-2">
                {withTax > withoutTax ? withTax : withoutTax}
              </p>
            </div>
          </div>
        ) : null;
      })}
      <div className="flex justify-end">
        <div className="w-52">
          <p className="py-2">Taxable Amount</p>
          <p className="py-2">Total Tax</p>
          <p className="py-2">Total Amount</p>
          <p className="py-2">Total Discount</p>
        </div>
        <div className="w-36">
          <p className="py-2">{formatCurrency(taxableAmount)}</p>
          <p className="py-2">{formatCurrency(totalTax)}</p>
          <p className="py-2">
            {formatCurrency(
              totalAmount
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default Total_cal;