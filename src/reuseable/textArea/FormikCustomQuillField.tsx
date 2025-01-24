// import React, { useState, useEffect, useRef } from 'react';
// import { FieldProps } from 'formik';
// import  { CustomQuillFieldProps } from './Custom-quill-field'; 
// import ReactQuill from 'react-quill-new';
// import 'react-quill/dist/quill.snow.css';

// const CustomQuillFields: React.FC<CustomQuillFieldProps> = ({
//     description,
//     setDescription,
//     maximumDescription = 150,
//     onDescriptionChange,
//     label,
//     placeholder,
//     setError,
//     name
// }) => {
//     const [value, setValue] = useState("");
//     const internalMaxDescription = maximumDescription + 7; 
//     const quillRef = useRef<ReactQuill | null>(null);

//     useEffect(() => {
//         setValue(description);
//     }, [description]);

//     useEffect(() => {
//         if (quillRef.current) {
//             const editor = quillRef.current.getEditor();
//             const root = editor?.root;
//             root?.addEventListener('paste', handlePaste);
//             return () => {
//                 root?.removeEventListener('paste', handlePaste);
//             };
//         }
//     }, [value]);

  

//     const sanitizeContent = (content: string) => {
//         const tempDiv = document.createElement('div');
//         tempDiv.innerHTML = content;
//         // Remove potential leading and trailing whitespace and HTML tags
//         const textContent = tempDiv.textContent?.trim() || '';
//         return textContent === '' ? '' : textContent;
//     };
    


//     const handleChange = (value: string) => {
//         const sanitizedValue = sanitizeContent(value);
//         if (sanitizedValue.length > internalMaxDescription) {
//             setError(`${name} Must be ${maximumDescription} characters or less.`);
//             return;
//         }
//         setValue(value);
//         setDescription(value);
//         if (sanitizedValue.length === 0) {
//             setError(`${name} is required.`);
//         } else {
//             setError(null);
//         }
//         if (onDescriptionChange) onDescriptionChange(value);
//     };
    

//     const handlePaste = (e: ClipboardEvent) => {
//         const pasteContent = e.clipboardData?.getData('text') || '';
//         const sanitizedPaste = sanitizeContent(pasteContent);
//         const combinedContent = sanitizeContent(value) + sanitizedPaste;

//         if (combinedContent.length > internalMaxDescription) {
//             e.preventDefault();
//             setError(`${name} Must be ${maximumDescription} characters or less.`);
//         }
//     };

//     const toolbarOptions = [
//         ['bold', 'italic', 'underline'],
//         ['link', 'formula'],
//         [{ 'list': 'check' }],
//         [{ 'size': ['small', false, 'large', 'huge'] }],
//         [{ 'font': [] }],
        
//     ];

//     const quillModules = {
//         toolbar: toolbarOptions,
//     };

//     return (
//         <div id="descriptionContainer">
//             <label htmlFor="customQuill" className="block text-sm font-medium text-labelBlue">{label}</label>
//             <ReactQuill
//                 ref={quillRef}
//                 id="customQuill"
//                 theme="snow"
//                 value={value}
//                 onChange={handleChange}
//                 modules={quillModules}
//                 placeholder={placeholder}
//                 className="font-inter text-sm font-normal leading-[22px] pt-2 rounded-md"
//             />
//         </div>
//     );
// };


// const FormikCustomQuillField: React.FC<FieldProps & CustomQuillFieldProps> = ({
//   field, 
//   form: { setFieldValue, setFieldError },
//   description,
//   setDescription,
//   setError,
//   ...props
// }) => {
//   const handleChange = (value: string) => {
//     setFieldValue(field.name, value);
//     if (setDescription) {
//       setDescription(value);
//     }
//   };

//   const handleSetError = (error: string | null) => {
//     setFieldError(field.name, error || undefined); 
//   };

//   return (
//     <CustomQuillFields
//       description={field.value}
//       setDescription={handleChange}
//       setError={handleSetError}
//       {...props} 
//     />
//   );
// };

// export default FormikCustomQuillField;


// import React, { useState, useEffect, useRef } from 'react';
// import { FieldProps } from 'formik';
// import { CustomQuillFieldProps } from './Custom-quill-field';
// import ReactQuill from 'react-quill-new';
// import 'react-quill/dist/quill.snow.css';

// const CustomQuillFields: React.FC<CustomQuillFieldProps> = ({
//     description,
//     setDescription,
//     maximumDescription = 150,
//     onDescriptionChange,
//     label,
//     placeholder,
//     setError,
//     name
// }) => {
//     const [value, setValue] = useState("");
//     const internalMaxDescription = maximumDescription + 7;
//     const quillRef = useRef<ReactQuill | null>(null);

//     useEffect(() => {
//         setValue(description);
//     }, [description]);

//     useEffect(() => {
//         if (quillRef.current) {
//             const editor = quillRef.current.getEditor();
//             const root = editor?.root;
//             root?.addEventListener('paste', handlePaste);
//             return () => {
//                 root?.removeEventListener('paste', handlePaste);
//             };
//         }
//     }, [value]);

//     const sanitizeContent = (content: string) => {
//         const tempDiv = document.createElement('div');
//         tempDiv.innerHTML = content;
//         const textContent = tempDiv.textContent?.trim() || '';
//         return (textContent === '' || textContent === '<br>') ? '' : textContent;
//     };

//     const handleChange = (value: string) => {
//         const sanitizedValue = sanitizeContent(value);
//         if (sanitizedValue.length > internalMaxDescription) {
//             setError(`${name} Must be ${maximumDescription} characters or less.`);
//             return;
//         }
//         setValue(value);
//         setDescription(value);
//         if (sanitizedValue.length === 0) {
//             setError(`${name} is required.`);
//         } else {
//             setError(null);
//         }
//         if (onDescriptionChange) onDescriptionChange(value);
//     };

//     const handlePaste = (e: ClipboardEvent) => {
//         const pasteContent = e.clipboardData?.getData('text') || '';
//         const sanitizedPaste = sanitizeContent(pasteContent);
//         const combinedContent = sanitizeContent(value) + sanitizedPaste;

//         if (combinedContent.length > internalMaxDescription) {
//             e.preventDefault();
//             setError(`${name} Must be ${maximumDescription} characters or less.`);
//         }
//     };

//     const toolbarOptions = [
//         ['bold', 'italic', 'underline'],
//         ['link', 'formula'],
//         [{ 'list': 'check' }],
//         [{ 'size': ['small', false, 'large', 'huge'] }],
//         [{ 'font': [] }],
//     ];

//     const quillModules = {
//         toolbar: toolbarOptions,
//     };

//     return (
//         <div id="descriptionContainer">
//             <label htmlFor="customQuill" className="block text-sm font-medium text-labelBlue">{label}</label>
//             <ReactQuill
//                 ref={quillRef}
//                 id="customQuill"
//                 theme="snow"
//                 value={value}
//                 onChange={handleChange}
//                 modules={quillModules}
//                 placeholder={placeholder}
//                 className="font-inter text-sm font-normal leading-[22px] pt-2 rounded-md"
//             />
//         </div>
//     );
// };

// const FormikCustomQuillField: React.FC<FieldProps & CustomQuillFieldProps> = ({
//     field,
//     form: { setFieldValue, setFieldError },
//     description,
//     setDescription,
//     setError,
//     ...props
// }) => {
//     const handleChange = (value: string) => {
//         setFieldValue(field.name, sanitizeContent(value));
//         if (setDescription) {
//             setDescription(value);
//         }
//     };

//     const handleSetError = (error: string | null) => {
//         setFieldError(field.name, error || undefined);
//     };

//     return (
//         <CustomQuillFields
//             description={field.value}
//             setDescription={handleChange}
//             setError={handleSetError}
//             {...props}
//         />
//     );
// };

// export default FormikCustomQuillField;

// const sanitizeContent = (content: string) => {
//     const tempDiv = document.createElement('div');
//     tempDiv.innerHTML = content;
//     const textContent = tempDiv.textContent?.trim() || '';
//     return (textContent === '' || textContent === '<br>') ? '' : textContent;
// };

import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill/dist/quill.snow.css';
import { FieldProps } from 'formik';
import { CustomQuillFieldProps } from './Custom-quill-field';

export const CustomQuillField: React.FC<CustomQuillFieldProps> = ({
    description,
    setDescription,
    maximumDescription = 150,
    onDescriptionChange,
    label,
    placeholder,
    setError,
    name
}) => {
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

    const handleChange = (value: string) => {
        setValue(value);
        setDescription(value);

        const sanitizedValue = value.replace(/<\/?[^>]+(>|$)/g, "").trim();
        if (sanitizedValue.length === 0) {
            setError(`${name} is required.`);
        } else if (sanitizedValue.length > internalMaxDescription) {
            setError(`${name} Must be ${maximumDescription} characters or less.`);
        } else {
            setError(null);
        }
        if (onDescriptionChange) onDescriptionChange(value);
    };

    const handlePaste = (e: ClipboardEvent) => {
        const pasteContent = e.clipboardData?.getData('text') || '';
        const sanitizedPaste = pasteContent.replace(/<\/?[^>]+(>|$)/g, "").trim();
        const combinedContent = value + sanitizedPaste;

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
        </div>
    );
};

const FormikCustomQuillField: React.FC<FieldProps & CustomQuillFieldProps> = ({
    field,
    form: { setFieldValue, setFieldError },
    maximumDescription,
    onDescriptionChange,
    label,
    placeholder,
    name,
    setError,
}) => {
    const handleChange = (value: string) => {
        setFieldValue(field.name, value); // Set the raw HTML value in Formik state
    };

    const handleSetError = (error: string | null) => {
        setFieldError(field.name, error || undefined);
    };

    return (
        <CustomQuillField
            description={field.value}
            setDescription={handleChange}
            setError={handleSetError}
            maximumDescription={maximumDescription}
            onDescriptionChange={onDescriptionChange}
            label={label}
            placeholder={placeholder}
            name={name}
        />
    );
};

export default FormikCustomQuillField;


