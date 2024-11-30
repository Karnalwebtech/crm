import { DatePicker, Input } from "@nextui-org/react";
import {
    Control,
    Controller,
    FieldErrors,
    FieldValues,
    Path,
} from "react-hook-form";

interface DatePickerProps<T extends FieldValues> {
    control: Control<T>;
    errors: FieldErrors<T>;
    name: Path<T>; // Ensure name is a valid path in T
    label: string;
}

const DatePickerField = <T extends FieldValues>({
    control,
    errors,
    name,
    label,
}: DatePickerProps<T>) => {
    const errorMessage = errors[name]?.message as string | undefined;

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                    <Input
                        {...field}
                        type="date"
                        aria-label={`input ${label}`}
                        label={label}
                        variant="bordered"
                        isInvalid={!!errorMessage}  // Dynamically show invalid state based on errorMessage
                        color={errorMessage ? "danger" : "default"}  // Change color based on error
                        errorMessage={errorMessage || ""}  // Show error message if available
                        fullWidth
                    />
            )}
        />
    );
};

export default DatePickerField;
