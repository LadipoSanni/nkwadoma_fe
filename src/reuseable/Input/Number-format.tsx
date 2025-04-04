import React from 'react';
import { FieldProps } from 'formik';

const formatNumberWithCommas = (value: string | number | undefined | null) => {
  const stringValue = typeof value === 'number' ? value.toString() : (value || '');
  // Debugging log to see what value is being passed
  console.log('formatNumberWithCommas called with:', value, 'stringValue:', stringValue);
  if (typeof stringValue !== 'string') {
    console.error('stringValue is not a string:', stringValue);
    return ''; // Fallback to empty string if something bizarre happens
  }
  return stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

interface CustomInputFieldProps extends FieldProps {
  saveToRedux?: (values: string| number | boolean | undefined) => void;
  values?: string;
}

const NumberFormat: React.FC<CustomInputFieldProps> = ({ field, form, saveToRedux, values }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value.replace(/,/g, '');
    rawValue = rawValue.replace(/[^0-9]/g, '').replace(/^0+/, '');
    const formattedValue = formatNumberWithCommas(rawValue);
    if (rawValue.length > 16) {
      return;
    }
    form.setFieldValue(field.name, rawValue); // Update Formik state
    e.target.value = formattedValue; // Update displayed value
    if (saveToRedux && values) {
      const updatedValues = { ...values, [field.name]: rawValue };
      saveToRedux(updatedValues);
    }
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

export default NumberFormat;