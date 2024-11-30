import React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { Input } from "@nextui-org/react";

// Updated SelectFieldProps with generics
interface SelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  errors: FieldErrors<T>;
  name: Path<T>; // Ensure name is a valid path in T
  label: string; // Label for the select field
  type?: string; // Label for the select field
}

const Input_field = <T extends FieldValues>({
  control,
  errors,
  name,
  label,
  type = "text",
}: SelectFieldProps<T>) => {
  let errorMessage: string | undefined;

  // Check if name contains a dot for nested errors
  if (name.includes(".")) {
    const nameParts = name.split(".");
    const parentKey = nameParts[0]; // e.g., 'shipping_address'
    const childKey = nameParts[1]; // e.g., 'city'

    // Check if the parent key exists in errors
    const parentErrors = errors[parentKey] as FieldErrors<T>;
    if (parentErrors && parentErrors[childKey]) {
      errorMessage = (parentErrors[childKey] as { message?: string }).message;
    }
  } else {
    // Accessing direct errors
    errorMessage = (errors[name] as { message?: string })?.message;
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Input
          {...field}
          type={type}
          aria-label={`input ${label}`}
          label={label}
          variant="bordered"
          isInvalid={!!errorMessage} // Dynamically show invalid state based on errorMessage
          color={errorMessage ? "danger" : "default"} // Change color based on error
          errorMessage={errorMessage || ""} // Show error message if available
          fullWidth
          onChange={(e) =>
            field.onChange(type === "number" ? +e.target.value : e.target.value)
          } // Convert to number if input type is number
        />
      )}
    />
  );
};

export default Input_field;
