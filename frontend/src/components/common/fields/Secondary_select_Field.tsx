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
  options: { value: number; label_1: number; label_2: string }[];
}

const Secondary_select_Field = <T extends FieldValues>({
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
          {options.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              <div className="flex gap-2 items-center">
                <div className="flex flex-col">
                  <span className="text-small">{item.label_1}</span>
                  <span className="text-tiny text-default-400">
                    {item.label_2}
                  </span>
                </div>
              </div>
            </SelectItem>
          ))}
        </Select>
      )}
    />
  );
};

export default Secondary_select_Field;
