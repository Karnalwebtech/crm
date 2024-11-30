"use client";
import { Autocomplete, AutocompleteItem, Avatar } from "@nextui-org/react";
import { SearchIcon } from "../svg-icons/Search_icon";
import React, { useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";

interface Autocomplete_field<T extends FieldValues> {
  control: Control<T>;
  errors: FieldErrors<T>;
  name: Path<T>; // Ensure name is a valid path in T
  label_name: string; // Label for the select field
  options: any;
  setFilterValue?: ((value: string) => void) | undefined;
}

const Secondary_Autocomplete_field = <T extends FieldValues>({
  control,
  errors,
  name,
  label_name,
  options,
  setFilterValue,
}: Autocomplete_field<T>) => {
  const hasError = !!errors[name]; // Check if there's an error for the field

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <>
          <Autocomplete
            selectedKey={field.value} // Use selectedKey for the default selected item
            onSelectionChange={field.onChange}
            defaultItems={options}
            onInputChange={(value: string) => setFilterValue?.(value)}
            inputProps={{
              classNames: {
                input: `ml-1 dark:text-dark_color ${
                  hasError ? "border-red-500" : ""
                }`, // Add red border if error
                inputWrapper: "h-[48px]",
              },
            }}
            listboxProps={{
              hideSelectedIcon: true,
            }}
            aria-label={label_name}
            placeholder={label_name}
            popoverProps={{
              offset: 10,
              classNames: {
                base: "rounded-large",
                content:
                  "p-1 border-small border-default-100 text-red dark:bg-black",
              },
            }}
            startContent={
              <SearchIcon
                className="text-default-400 dark:text-dark_color"
                strokeWidth={2.5}
                size={20}
              />
            }
            variant="bordered"
          >
            {options.map((item: any) => (
              <AutocompleteItem key={item.value} textValue={item.label}>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <div className="flex flex-col">
                      <span className="text-small dark:text-dark_color">
                        {item.label}
                      </span>
                    </div>
                  </div>
                </div>
              </AutocompleteItem>
            ))}
          </Autocomplete>

          {hasError && (
            <span className="text-red-500 text-sm mt-1">
              {errors[name]?.message?.toString()}
            </span>
          )}
        </>
      )}
    />
  );
};

export default Secondary_Autocomplete_field;
