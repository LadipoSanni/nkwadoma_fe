
import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill/dist/quill.snow.css';

export interface CustomQuillFieldProps {
    description: string;
    setDescription: (description: string) => void;
    maximumDescription?: number;
    onDescriptionChange?: (desc: string) => void;
    label: string;
    placeholder: string;
    setError: (error: string | null) => void;
    name: string
}

const CustomQuillField: React.FC<CustomQuillFieldProps> = ({ description, setDescription, maximumDescription = 150, onDescriptionChange, label, placeholder, setError,name }) => {
    const [value, setValue] = useState("");
    const internalMaxDescription = maximumDescription + 7; 
    const quillRef = useRef<ReactQuill | null>(null);

    useEffect(() => {
        setValue(description);
    }, [description]);

    useEffect(() => {
        if (quillRef.current) {
            const editor = quillRef.current.getEditor();
            const root = editor?.root;
            root?.addEventListener('paste', handlePaste);
            return () => {
                root?.removeEventListener('paste', handlePaste);
            };
        }
    }, [value]);

    const sanitizeContent = (content: string) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        return tempDiv.textContent || tempDiv.innerText || '';
    };

    const handleChange = (value: string) => {
        const sanitizedValue = sanitizeContent(value);
        if (sanitizedValue.length > internalMaxDescription) {
            setError(`${name} Must be ${maximumDescription} characters or less.`);
            return;
        }
        setValue(value);
        setDescription(value);
        setError(null);
        if (onDescriptionChange) onDescriptionChange(value);
    };

    const handlePaste = (e: ClipboardEvent) => {
        const pasteContent = e.clipboardData?.getData('text') || '';
        const sanitizedPaste = sanitizeContent(pasteContent);
        const combinedContent = sanitizeContent(value) + sanitizedPaste;

        if (combinedContent.length > internalMaxDescription) {
            e.preventDefault();
            setError(`${name} Must be ${maximumDescription} characters or less.`);
        }
    };

    const toolbarOptions = [
        ['bold', 'italic', 'underline'],
        ['link', 'formula'],
        [{ 'list': 'check' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'font': [] }],
        
    ];

    const quillModules = {
        toolbar: toolbarOptions,
    };

    return (
        <div id="descriptionContainer">
             {/* <style>
                {`
                    .ql-picker.ql-expanded .ql-picker-options {
                        left: 0 !important;
                        right: auto !important;
                    }
                `}
            </style> */}
            <label htmlFor="customQuill" className="block text-sm font-medium text-labelBlue">{label}</label>
            <ReactQuill
                ref={quillRef}
                id="customQuill"
                theme="snow"
                value={value}
                onChange={handleChange}
                modules={quillModules}
                placeholder={placeholder}
                className="font-inter text-sm font-normal leading-[22px] pt-2 rounded-md"
            />
            {/* {maximumDescription && (
                <div className="text-gray-500 text-sm">
                    {sanitizeContent(value).length}/{maximumDescription} characters
                </div>
            )} */}
        </div>
    );
};

export default CustomQuillField;











