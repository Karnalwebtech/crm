import React from "react";
import {
    Control,
    Controller,
    FieldErrors,
    FieldValues,
    Path,
} from "react-hook-form";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

// Updated SelectFieldProps with generics
interface SelectFieldProps<T extends FieldValues> {
    control: Control<T>;
    errors: FieldErrors<T>;
    name: Path<T>; // Ensure name is a valid path in T
    label: string; // Label for the select field
}

const PhoneNumberField = <T extends FieldValues>({
    control,
    errors,
    name,
    label,
}: SelectFieldProps<T>) => {
    // Extract error message for this specific field
    const errorMessage = errors[name]?.message as string | undefined;

    return (
        <div>
            <label>{label}</label> {/* You can add a label here */}
            <Controller
                name={name}  // Use the name passed in props
                control={control}
                rules={{ required: 'Phone number is required' }}
                render={({ field }) => (
                    <>
                        <PhoneInput
                            {...field}
                            country={'in'} // Default country
                            placeholder="Enter phone number"
                            value={field.value} // Ensure the value is passed correctly
                            onChange={field.onChange} // Update the field value
                            inputStyle={{ borderColor: errorMessage ? 'red' : 'default',width:'100%' }} // Style on error
                        />
                        {/* Show the error message if exists */}
                        {errorMessage && (
                            <span style={{ color: 'red' }}>{errorMessage}</span>
                        )}
                    </>
                )}
            />
        </div>
    );
};

export default PhoneNumberField;
