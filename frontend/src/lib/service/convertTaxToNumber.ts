export const convertTaxToNumber = (tax: string,remove:string): number => {
  return parseFloat(tax.replace(remove, ""));
};
