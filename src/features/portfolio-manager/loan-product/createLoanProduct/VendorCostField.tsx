// interface VendorCostFieldProps {
//     value: string;
//     onChange: (value: string) => void;
//   }
  
//   const VendorCostField: React.FC<VendorCostFieldProps> = ({ value, onChange }) => {
//     const formatNumberWithCommas = (value: string | number) => {
//       const stringValue = typeof value === "number" ? value.toString() : value;
//       return stringValue?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//     };
  
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       let rawValue = e.target.value.replace(/,/g, '');
//       rawValue = rawValue.replace(/[^0-9]/g, '').replace(/^0+/, '');
      
//       if (rawValue.length > 16) return;
    
//       onChange(rawValue);
      
//       e.target.value = formatNumberWithCommas(rawValue);
//     };
  
//     return (
//       <input
//         value={formatNumberWithCommas(value)}
//         onChange={handleChange}
//         className="w-full p-3 h-[3.2rem] border rounded focus:outline-none mb-2"
//         placeholder="0"
//       />
//     );
//   };

//   export default VendorCostField

import React from 'react';

interface VendorCostFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const formatNumberWithCommas = (value: string | number) => {
  const stringValue = typeof value === "number" ? value.toString() : value;
  const [integerPart, decimalPart] = stringValue.split('.');
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decimalPart !== undefined ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};

const VendorCostField: React.FC<VendorCostFieldProps> = ({ value, onChange }) => {
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

    onChange(rawValue);
    e.target.value = formatNumberWithCommas(rawValue);
  };

  return (
    <input
      value={formatNumberWithCommas(value)}
      onChange={handleChange}
      className="w-full p-3 h-[3.2rem] border rounded focus:outline-none mb-2"
      placeholder="0"
    />
  );
};

export default VendorCostField;
