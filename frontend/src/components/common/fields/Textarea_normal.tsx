import { Textarea_normal_props } from '@/types/Healper_type';
import { Textarea } from '@nextui-org/react';
import { memo } from 'react';

const Textarea_normal: React.FC<Textarea_normal_props> = ({ value, label, get_value }) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        get_value(event.target.value);
    };

    return (
        <Textarea
            label={`Write your ${label}`}
            onChange={handleChange}  // Correct handler type is passed here
            placeholder={`Enter your ${label}`}
            value={value}  // Controlled value
            aria-label={`input ${label}`}
        />
    );
}
export default memo(Textarea_normal)