import React from 'react'; 
import { useField, useFormikContext } from 'formik'; 
import { NumericFormat,NumberFormatValues } from 'react-number-format'; 

interface CustomNumberFormatProps { 
    name: string;
     [x: string]: string | number;
     } 
     
     
const CustomNumberFormat: React.FC<CustomNumberFormatProps> = ({ name, ...props }) => { 
    const { setFieldValue, setFieldTouched } = useFormikContext(); 
    const [field] = useField(name);
    
    const handleValueChange = (values: NumberFormatValues) => { 
        const { value } = values; 
        setFieldValue(name, value); 
        setFieldTouched(name, true);
    };
    
    return ( 
   
    <NumericFormat 
    {...props} 
    value={String(field.value || '')} 
    
    onValueChange={handleValueChange}
    thousandSeparator="," 
    decimalScale={2} 
    fixedDecimalScale={true} 
    allowNegative={false} 
    />
);

 }; 
 export default CustomNumberFormat;