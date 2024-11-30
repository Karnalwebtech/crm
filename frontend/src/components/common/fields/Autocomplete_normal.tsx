import { Autocomplete, AutocompleteItem, Avatar } from "@nextui-org/react";
import { SearchIcon } from "../svg-icons/Search_icon";
import React from "react";

interface Autocomplete_props {
  label_name: string; // Label for the select field
  options: { value: string; label: string; description?: string }[];
  setproductname: (value: string) => void;
}

const Autocomplete_normal: React.FC<Autocomplete_props> = ({
  label_name,
  setproductname,
  options,
}) => {
  return (
    <Autocomplete
      defaultItems={options}
      inputProps={{
        classNames: {
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
          content: "p-1 border-small border-default-100 text-red dark:bg-black",
        },
      }}
      onInputChange={(value: string) => setproductname(value)} // Pass the event handler
      startContent={
        <SearchIcon
          className="text-default-400 dark:text-dark_color"
          strokeWidth={2.5}
          size={20}
        />
      }
      variant="bordered"
    >
      {options.map((item) => (
        <AutocompleteItem key={item.value} textValue={item.value}>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <Avatar
                alt={item.value}
                className="flex-shrink-0"
                size="sm"
                src={item.value}
              />
              <div className="flex flex-col">
                <span className="text-small dark:text-dark_color">
                  {item.label}
                </span>
                <span className="text-tiny text-default-400 dark:text-dark_color">
                  {item.description}
                </span>
              </div>
            </div>
          </div>
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
};

export default Autocomplete_normal;
