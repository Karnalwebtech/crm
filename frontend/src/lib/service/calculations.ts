export const calculateNetAmount = (
  quantity: number,
  unitPrice: number,
  discount?: number
): number => {
  if (discount !== undefined && discount > 0) {
    return quantity * unitPrice - discount;
  }
  return quantity * unitPrice;
};

export const calculateTotalIncludingGST = (
  unitPrice: number,
  gst: number = 12
): number => {
  const price: number = Number(unitPrice);

  const gstAmount = (price * gst) / 100;
  const totalunitPrice = price + gstAmount;

  return parseFloat(totalunitPrice.toFixed(2));
};
export const calculateTotal_amount = (
  qnty: number,
  unitPrice: number,
  discount: number = 0, // Set a default value of 0 for discount
  gst: number = 0 // Set a default value of 0 for gst
): number => {
  const qnty_: number = Number(qnty);
  const dis = Number(discount);
  const price = Number(unitPrice);
  const mult_amount = price * qnty_;
  let total = mult_amount;
  if (dis > 0) {
    total = mult_amount - dis;
  }
  const gstAmount = (total * gst) / 100; // Use gst instead of hardcoded 12
  const total_amount: number = total + gstAmount;

  return parseFloat(total_amount.toFixed(2));
};

export const calculate_GST_amount = (
  total_amount: number,
  gst: number
): number => {
  const price: number = Number(total_amount);
  const gstAmount = (price * gst) / 100;
  return parseFloat(gstAmount.toFixed(2));
};

export const calculate_total_amount_after_discont = (
  amount: number,
  qnty: number,
  discount_amount: number = 0
): number => {
  const price: number = Number(amount);
  const discount: number = Number(discount_amount);
  const qnty_: number = Number(qnty);
  const totalPrice = price * qnty_;
  const disc_amount = totalPrice - discount;
  const finalPriceAfterDiscount = disc_amount / qnty_;
  return parseFloat(finalPriceAfterDiscount.toFixed(2));
};

export const calculate_without_GST_amount = (
  total_amount: number | string,
  gst: number = 12
): number => {
  // console.log(total_amount,gst)
  const price: number = Number(total_amount);
  const gstAmount = (price * gst) / 100;
  const total = price - gstAmount;
  return parseFloat(total.toFixed(2));
};
