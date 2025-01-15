// import React from 'react'; 
// import { useField, useFormikContext } from 'formik'; 
// import { NumericFormat,NumberFormatValues } from 'react-number-format'; 

// interface CustomNumberFormatProps { 
//     name: string;
//      [x: string]: string | number;
//      } 
     
     
// const CustomNumberFormat: React.FC<CustomNumberFormatProps> = ({ name, ...props }) => { 
//     const { setFieldValue, setFieldTouched } = useFormikContext(); 
//     const [field] = useField(name);
    
//     const handleValueChange = (values: NumberFormatValues) => { 
//         const { value } = values; 
//         setFieldValue(name, value); 
//         setFieldTouched(name, true);
//     };
    
//     return ( 
   
//     <NumericFormat 
//     {...props} 
//     value={String(field.value || '')} 
    
//     onValueChange={handleValueChange}
//     thousandSeparator="," 
//     decimalScale={2} 
//     fixedDecimalScale={true} 
//     allowNegative={false} 
//     />
// );

//  }; 
//  export default CustomNumberFormat;
import React from 'react'; 
import { FieldProps } from 'formik'; 

const formatNumberWithCommas = (value: string) => { 
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ','); 
   
}; 



const CustomInputField: React.FC<FieldProps> = ({ field, form }) => {
    
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
        const rawValue = e.target.value.replace(/,/g, ''); 
        const formattedValue = formatNumberWithCommas(rawValue); 
        form.setFieldValue(field.name, rawValue); 
         e.target.value = formattedValue;
         }; 

         
         return ( 
         <input 
         {...field} 
         className="w-full p-3  border rounded focus:outline-none mb-2" 
         onChange={handleChange} 
        value={formatNumberWithCommas(field.value)} 
         placeholder="0.00"
         /> ); 
        };
         export default CustomInputField;
    
 