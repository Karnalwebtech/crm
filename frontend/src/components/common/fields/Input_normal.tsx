  import React from "react";
  import { Input } from "@nextui-org/react";
  interface Input_Props {
    label: string; // Label for the select field
    type: string;
    get_value: (value: string | number) => void;
    value?: string | number,
  }

  const Input_normal: React.FC<Input_Props> = ({ label, type, get_value, value }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = type === 'number' ? parseFloat(event.target.value) : event.target.value;
      get_value(inputValue);
    };

    return <Input type={type} label={label}    aria-label={`input ${label}`} value={value ? String(value) : undefined} onChange={handleChange} variant="bordered" fullWidth />;
  };

  export default Input_normal;
