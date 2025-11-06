// import React from 'react';
// import {FieldProps} from 'formik';


// const formatNumberWithCommas = (value: string | number) => {
//     const stringValue = typeof value === "number" ? value.toString() : value;
//     return stringValue?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// };




// const CustomInputField: React.FC<FieldProps> = ({field, form}) => {


//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         let rawValue = e.target.value.replace(/,/g, '');
//         rawValue = rawValue.replace(/[^0-9]/g, '').replace(/^0+/, '');
//         const formattedValue = formatNumberWithCommas(rawValue);
//         if (rawValue.length > 16) {
//             return;
//         }
//         form.setFieldValue(field.name, rawValue);
//         e.target.value = formattedValue;
//     };


//     return (
//         <input
//             {...field}
//             className="w-full p-3  border rounded focus:outline-none mb-2"
//             onChange={handleChange}
//             value={formatNumberWithCommas(field.value)}
//             placeholder="0"
//         />);
// };
// export default CustomInputField;

import React from 'react';
import { FieldProps } from 'formik';

const formatNumberWithCommas = (value: string | number) => {
    const stringValue = typeof value === "number" ? value.toString() : value;
    const [integerPart, decimalPart] = stringValue.split('.');
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return decimalPart !== undefined ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};

const CustomInputField: React.FC<FieldProps> = ({ field, form }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let rawValue = e.target.value.replace(/,/g, '');

        rawValue = rawValue.replace(/[^0-9.]/g, '');

        const parts = rawValue.split('.');
        if (parts.length > 2) return;

        if (/^0(\.?\d*)?$/.test(rawValue)) return;

        if (/^0[0-9]+/.test(parts[0])) return;

        if (parts[1]?.length > 2) {
            parts[1] = parts[1].slice(0, 2);
        }

        rawValue = parts.join('.');

        if (rawValue.replace('.', '').length > 16) return;

        const formattedValue = formatNumberWithCommas(rawValue);

        form.setFieldValue(field.name, rawValue);
        e.target.value = formattedValue;
    };

    return (
        <input
            {...field}
            className="w-full p-3 border rounded focus:outline-none mb-2"
            onChange={handleChange}
            value={formatNumberWithCommas(field.value)}
            placeholder="0"
        />
    );
};

export default CustomInputField;


    
 