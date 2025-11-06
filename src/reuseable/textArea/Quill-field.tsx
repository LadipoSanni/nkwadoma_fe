// import React, { useRef, useState,useEffect } from 'react';
// import { useField, useFormikContext } from 'formik';
// import ReactQuill from 'react-quill-new';
// import 'react-quill/dist/quill.snow.css';
// import { UseQuillPaste } from './use-quill-paste';


// interface type {
//     [key: string]: string | number | null | boolean | React.ReactNode | undefined;
// }


// interface FieldName {
//     name: string;
//     errorMessage: string;
//     errors: type; 
//     touched: type;
//     onExternalChange?: (value: string) => void;
    
// }

// const QuillFieldEditor = ({ name, errorMessage, errors, touched,onExternalChange }: FieldName) => {
//     const { setFieldValue, setFieldTouched, setFieldError } = useFormikContext();
//     const [field, meta] = useField(name);
//     const [customError, setCustomError] = useState('');
    
//     const quillRef = useRef<ReactQuill | null>(null);
//     const maxChars = 2500;

//     useEffect(() => {
//         if (typeof errors[name] === 'string' && touched[name]) {
//             setCustomError(errors[name] as string);
//         } else {
//             setCustomError('');
//         }
//     }, [errors, touched, name]);

//     const validateLength = (value: string) => {
//         if (value.trim() === "") {
//             setCustomError(`${name} is required`);
//             setFieldTouched(name, true);
//             setFieldError(name, `${name} is required`);
//             return false;
//         } else if (value.length > maxChars) {
//             setCustomError(errorMessage);
//             setFieldTouched(name, true);
//             setFieldError(name, errorMessage);
//             return false;
//         }
//         setCustomError('');
//         return true;
//     };

//     const handlePaste = (e: ClipboardEvent) => {
//         const paste = e.clipboardData?.getData('text') || '';
//         const pastedValue = (field.value || '') + paste;

//         if (!validateLength(pastedValue)) {
//             e.preventDefault();
//         }
//     };

//     UseQuillPaste(quillRef, handlePaste); 

//     const toolbarOptions = [
//         ['bold', 'italic', 'underline'],
//         // ['blockquote', 'code-block'],
//         ['link'],
//         // [{ 'header': 1 }, { 'header': 2 }],
//         // [{ 'list': 'check' }],
//         [{ 'list': 'ordered' }]
//         // [{ 'script': 'sub' }, { 'script': 'super' }],
//         // [{ 'indent': '-1' }, { 'indent': '+1' }],
//         // [{ 'direction': 'rtl' }],
//         // [{ 'size': ['small', false, 'large', 'huge'] }],
//         // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//         // [{ 'color': [] }, { 'background': [] }],
//         // [{ 'font': [] }],
//         // [{ 'align': [] }],
//         // ['clean']
//     ];
    
//     const quillModules = {
//          toolbar: toolbarOptions,
//     }

//     const handleChange = (value: string) => {
//         if (validateLength(value)) {
//             setFieldValue(name, value);
//             // Call the external onChange if provided
//             if (onExternalChange) {
//                 onExternalChange(value);
//             }
//         }
//     };

//     return (
//         <div>
//              <style>
//                 {`
//                     .ql-toolbar .ql-picker-label {
//                         min-width: 0 !important; 
//                     }
//                     .ql-tooltip {
//                         left: 13% !important; 
//                         right: auto !important;
//                         transform: translateX(-20%) !important; 
//                     }
//                           .ql-editor.ql-blank::before {
//       font-style: normal !important;
//     //   color: #9CA3AF !important; 
//     }
//     .ql-toolbar .ql-picker-label {
//       min-width: 0 !important; 
//     }
//     .ql-tooltip {
//       left: 13% !important; 
//       right: auto !important;
//       transform: translateX(-20%) !important; 
//     }
//                 `}
//             </style>
//             <ReactQuill
//                ref={quillRef}
//                modules={quillModules}
//                 theme="snow"
//                 value={field.value}
//                 onChange={handleChange}
//                 placeholder="Enter terms and condition"
//                 className="font-inter text-sm font-normal leading-[22px] pt-2 rounded-md"
//             />
//             {meta.touched && meta.error ? (
//                 <div className="text-red-500 text-sm">{meta.error}</div>
//             ) : null}
//             {customError && (
//                 <div className="text-red-500 text-sm">{customError}</div>
//             )}
//         </div>
//     );
// };


// export default QuillFieldEditor;


import React, { useRef, useState, useEffect } from 'react';
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
    onExternalChange?: (value: string) => void;
}

const QuillFieldEditor = ({ name, errorMessage, errors, touched, onExternalChange }: FieldName) => {
    const { setFieldValue, setFieldTouched, setFieldError } = useFormikContext();
    const [field, meta] = useField(name);
    const [customError, setCustomError] = useState('');
    const [charCount, setCharCount] = useState(0);
    const [plainText, setPlainText] = useState('');
    
    const quillRef = useRef<ReactQuill | null>(null);
    const maxChars = 2500;

    const extractPlainText = (html: string): string => {
        if (!html) return '';

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        
        const text = tempDiv.textContent || tempDiv.innerText || '';
        

        return text.replace(/\s+/g, ' ').trim();
    };

    useEffect(() => {
        const text = extractPlainText(field.value || '');
        setPlainText(text);
        setCharCount(text.length);

        if (typeof errors[name] === 'string' && touched[name]) {
            setCustomError(errors[name] as string);
        } else {
            setCustomError('');
        }
    }, [errors, touched, name, field.value]);

    const handleChange = (value: string) => {
        
        const textContent = extractPlainText(value);
        setPlainText(textContent);
        setCharCount(textContent.length);
        
        if (textContent.length <= maxChars) {
           
            setFieldValue(name, value);
            if (onExternalChange) {
                onExternalChange(value);
            }
            setCustomError('');
        } else {
            setCustomError(errorMessage);
            setFieldTouched(name, true);
            setFieldError(name, errorMessage);
            
           
            const quill = quillRef.current?.getEditor();
            if (quill) {

                const currentHtml = quill.root.innerHTML;
                const currentText = extractPlainText(currentHtml);
                if (currentText.length > maxChars) {

                    quill.history.undo();
                }
            }
        }
    };

    const handlePaste = (e: ClipboardEvent) => {
        const paste = e.clipboardData?.getData('text') || '';
        if (plainText.length + paste.length > maxChars) {
            e.preventDefault();
            setCustomError(errorMessage);
        }
    };

    UseQuillPaste(quillRef, handlePaste);

    const handleKeyDown = (e: React.KeyboardEvent) => {
       
        if (e.key === 'Backspace' || e.key === 'Delete') {
            return;
        }
        
        if (charCount >= maxChars) {
            e.preventDefault();
            setCustomError(errorMessage);
        }
    };

    const toolbarOptions = [
        ['bold', 'italic', 'underline'],
        ['link'],
        [{ 'list': 'ordered' }]
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
                    .ql-editor.ql-blank::before {
                        font-style: normal !important;
                    }
                `}
            </style>
            
            <ReactQuill
                ref={quillRef}
                modules={quillModules}
                theme="snow"
                value={field.value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Enter program description"
                className="font-inter text-sm font-normal leading-[22px] pt-2 rounded-md"
            />
            

            <div className={`text-right text-sm mt-1 ${
                charCount >= maxChars ? 'text-red-500' : 'text-gray-500'
            }`}>
                {charCount}/{maxChars} characters 
                {charCount >= maxChars && ' - Limit reached'}
            </div>
            
            {/* <div className="text-xs text-gray-400 mt-1">
                Plain text length: {charCount} | Formatting not counted
            </div> */}
            
            
            {meta.touched && meta.error ? (
                <div className="text-red-500 text-sm mt-1">{meta.error}</div>
            ) : null}
            {customError && (
                <div className="text-red-500 text-sm mt-1">{customError}</div>
            )}
        </div>
    );
};

export default QuillFieldEditor;