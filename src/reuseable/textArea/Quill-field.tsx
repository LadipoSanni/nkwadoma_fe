import React, { useRef, useState,useEffect } from 'react';
import { useField, useFormikContext } from 'formik';
import ReactQuill from 'react-quill-new';
import 'react-quill/dist/quill.snow.css';
import { UseQuillPaste } from './use-quill-paste';


interface type {
    [key: string]: string | number | null | boolean | React.ReactNode | undefined;
}


interface FieldName {
    name: string;
    errorMessage: string;
    errors: type; 
    touched: type;
    
}

const QuillFieldEditor = ({ name, errorMessage, errors, touched }: FieldName) => {
    const { setFieldValue, setFieldTouched, setFieldError } = useFormikContext();
    const [field, meta] = useField(name);
    const [customError, setCustomError] = useState('');
    
    const quillRef = useRef<ReactQuill | null>(null);
    const maxChars = 2500;

    useEffect(() => {
        if (typeof errors[name] === 'string' && touched[name]) {
            setCustomError(errors[name] as string);
        } else {
            setCustomError('');
        }
    }, [errors, touched, name]);

    const validateLength = (value: string) => {
        if (value.trim() === "") {
            setCustomError(`${name} is required`);
            setFieldTouched(name, true);
            setFieldError(name, `${name} is required`);
            return false;
        } else if (value.length > maxChars) {
            setCustomError(errorMessage);
            setFieldTouched(name, true);
            setFieldError(name, errorMessage);
            return false;
        }
        setCustomError('');
        return true;
    };

    const handlePaste = (e: ClipboardEvent) => {
        const paste = e.clipboardData?.getData('text') || '';
        const pastedValue = (field.value || '') + paste;

        if (!validateLength(pastedValue)) {
            e.preventDefault();
        }
    };

    UseQuillPaste(quillRef, handlePaste); 

    const toolbarOptions = [
        ['bold', 'italic', 'underline'],
        // ['blockquote', 'code-block'],
        ['link'],
        // [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'check' }],
        // [{ 'script': 'sub' }, { 'script': 'super' }],
        // [{ 'indent': '-1' }, { 'indent': '+1' }],
        // [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        // [{ 'color': [] }, { 'background': [] }],
        // [{ 'font': [] }],
        // [{ 'align': [] }],
        // ['clean']
    ];
    
    const quillModules = {
         toolbar: toolbarOptions,
    }

    return (
        <div>
             <style>
                {`
                    .ql-toolbar .ql-picker-label {
                        min-width: 0 !important; 
                    }
                    .ql-tooltip {
                        left: 13% !important; 
                        right: auto !important;
                        transform: translateX(-20%) !important; 
                    }
                `}
            </style>
            <ReactQuill
               ref={quillRef}
               modules={quillModules}
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


export default QuillFieldEditor;
