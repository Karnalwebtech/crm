import React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { Select, SelectItem } from "@nextui-org/react";
interface SelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  errors: FieldErrors<T>;
  name: Path<T>; // Ensure name is a valid path in T
  label: string; // Label for the select field
  options: { value: string; label: string }[]; // Options for the select field
}

const Select_field = <T extends FieldValues>({
  control,
  errors,
  name,
  label,
  options,
}: SelectFieldProps<T>) => {
  const errorMessage = errors[name]
    ? (errors[name] as { message?: string }).message
    : "";
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
          <Select
            {...field}
            label={label}
            variant="bordered"
            aria-label={`input ${label}`}
            placeholder={`${label}`}
            selectedKeys={new Set([field.value])} // Wrap field.value in a Set for single selection
            onSelectionChange={(keys) => {
              const selectedValue = Array.from(keys).join(""); // Convert Set to string
              field.onChange(selectedValue); // Update React Hook Form value
            }}
            isInvalid={!!errorMessage} // Dynamically show invalid state based on errorMessage
            color={errorMessage ? "danger" : "default"} // Change color based on error
            errorMessage={errorMessage || ""} // Show error message if available
            fullWidth
          >
            {options.map((animal) => (
              <SelectItem key={animal.value} value={animal.label}>{animal.label}</SelectItem>
            ))}
          </Select>
      )}
    />
  );
};

export default Select_field;
