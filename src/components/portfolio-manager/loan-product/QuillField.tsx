import React, { useState } from 'react';
import { useField, useFormikContext } from 'formik';
import ReactQuill from 'react-quill-new';
import 'react-quill/dist/quill.snow.css';

interface FieldName {
    name: string;
    errorMessage: string;
}

export const QuillField = ({ name, errorMessage }: FieldName) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);
    const [customError, setCustomError] = useState('');

    const maxChars = 2500;

    const validateLength = (value: string) => {
        if (value.length > maxChars) {
            setCustomError(errorMessage);
            return false;
        }
        setCustomError('');
        return true;
    };

    return (
        <div>
            <ReactQuill
                theme="snow"
                value={field.value}
                onChange={(value) => {
                    if (validateLength(value)) {
                        setFieldValue(name, value);
                    }
                }}
                placeholder="Enter terms and condition"
                className="font-inter text-sm font-normal leading-[22px] pt-2 rounded-md"
            />
            {meta.touched && meta.error ? (
                <div className="text-red-500 text-sm">{meta.error}</div>
            ) : null}
            {customError && (
                <div className="text-red-500 text-sm">{customError}</div>
            )}
        </div>
    );
};
