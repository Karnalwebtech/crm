import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
interface SelectFieldProps {
  label: string; // Label for the select field
  options: { value: string; label: string }[]; // Options for the select field
  get_value: (value: string | number) => void;
  placeholder?: string;
  selected?: string;
}

const Select_normal: React.FC<SelectFieldProps> = ({ label, options, get_value, placeholder, selected }) => {
  const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    get_value(selectedValue); // Pass the selected value to the parent component
  };
  return (
    <Select label={label} variant="bordered" className="w-full"
      aria-label={`input ${label}`}
      defaultSelectedKeys={selected}
      placeholder={placeholder}
      onChange={(e) => handleSelectionChange(e)}// 
    >
      {options.map((animal, i) => (
        <SelectItem key={animal.value} value={animal.value}>{animal.label}</SelectItem>
      ))}
    </Select>
  );
};

export default Select_normal;
