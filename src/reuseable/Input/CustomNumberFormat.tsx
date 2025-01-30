import React from 'react';
import {FieldProps} from 'formik';


const formatNumberWithCommas = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};


const CustomInputField: React.FC<FieldProps> = ({field, form}) => {


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let rawValue = e.target.value.replace(/,/g, '');
        rawValue = rawValue.replace(/[^0-9]/g, '').replace(/^0+/, '');
        const formattedValue = formatNumberWithCommas(rawValue);
        if (rawValue.length > 16) {
            return;
        }
        form.setFieldValue(field.name, rawValue);
        e.target.value = formattedValue;
    };


    return (
        <input
            {...field}
            className="w-full p-3  border rounded focus:outline-none mb-2"
            onChange={handleChange}
            value={formatNumberWithCommas(field.value)}
            placeholder="0"
        />);
};
export default CustomInputField;
    
 