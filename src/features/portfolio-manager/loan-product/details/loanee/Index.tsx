"use client"
import React from 'react';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import 'react-quill-new/dist/quill.snow.css';

const DescriptionEditor: React.FC = () => {

    return (
        <div className="pt-4">
            {/*<Label htmlFor="loanProductTermsAndConditionId">Loan product terms and*/}
            {/*    condition</Label>*/}
            {/*<ReactQuill*/}
            {/*    theme="snow"*/}
            {/*    value={values.loanProductTermsAndCondition}*/}
            {/*    onChange={(content) => {*/}
            {/*        if (content.length <= maxChars) {*/}
            {/*            setFieldValue("loanProductTermsAndCondition", content);*/}
            {/*            setError(''); // Clear error when within limit.*/}
            {/*        } else {*/}
            {/*            setError('Product condition must be 2500 characters or less');*/}
            {/*        }*/}
            {/*    }}*/}
            {/*    // onPaste={(e: React.ClipboardEvent<HTMLDivElement>) => {*/}
            {/*    //     const paste = e.clipboardData.getData('text');*/}
            {/*    //     if (paste.length + values.loanProductTermsAndCondition.length > maxChars) {*/}
            {/*    //         e.preventDefault();*/}
            {/*    //         setError('Product condition must be 2500 characters or less');*/}
            {/*    //     }*/}
            {/*    // }}*/}
            {/*    modules={{*/}
            {/*        toolbar: [*/}
            {/*            ['bold', 'italic', 'underline', 'strike'],        // Text formatting options*/}
            {/*            [{list: 'ordered'}, {list: 'bullet'}],       // Lists*/}
            {/*            ['link'],                                         // Links*/}
            {/*            ['clean'],                                        // Remove formatting*/}
            {/*        ],*/}
            {/*    }}*/}
            {/*    formats={[*/}
            {/*        'bold', 'italic', 'underline', 'strike',*/}
            {/*        'list', 'bullet',*/}
            {/*        'link',*/}
            {/*    ]}*/}
            {/*    className="w-full p-3 border rounded focus:outline-none mt-2 text-sm"*/}
            {/*    placeholder="Enter terms and condition"*/}
            {/*/>*/}
            {/*{*/}
            {/*    errors.loanProductTermsAndCondition && touched.loanProductTermsAndCondition && (*/}
            {/*        <ErrorMessage*/}
            {/*            name="loanProductTermsAndCondition"*/}
            {/*            component="div"*/}
            {/*            id="loanProductTermsAndConditionError"*/}
            {/*            className="text-red-500 text-sm"*/}
            {/*        />*/}
            {/*    )*/}
            {/*}*/}
            {/*{error && <div className="text-red-500 text-sm">{error}</div>}*/}


            {/*<div className={`pt-4`}>*/}
            {/*    <Label htmlFor="loanProductTermsAndCondition">Loan product terms and*/}
            {/*        condition</Label>*/}
            {/*    <Field*/}
            {/*        as="textarea"*/}
            {/*        id="loanProductTermsAndConditionId"*/}
            {/*        name="loanProductTermsAndCondition"*/}
            {/*        className="w-full p-3 border rounded focus:outline-none mt-2 resize-none text-sm"*/}
            {/*        placeholder="Enter terms and condition"*/}
            {/*        rows={4}*/}
            {/*        maxLength={maxChars}*/}
            {/*        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {*/}
            {/*            const value = e.target.value;*/}
            {/*            if (value.length <= maxChars) {*/}
            {/*                setFieldValue("loanProductTermsAndCondition", value);*/}
            {/*            }*/}
            {/*        }}*/}
            {/*        onPaste={(e: React.ClipboardEvent<HTMLTextAreaElement>) => {*/}
            {/*            const paste = e.clipboardData.getData('text');*/}
            {/*            if (paste.length + values.loanProductTermsAndCondition.length > maxChars) {*/}
            {/*                e.preventDefault();*/}
            {/*                // setFieldValue("loanProductTermsAndCondition", paste);*/}
            {/*                setError('Product condition must be 2500 characters or less');*/}
            {/*            }*/}
            {/*        }}*/}
            {/*    />*/}
            {/*    {*/}
            {/*        errors.loanProductTermsAndCondition && touched.loanProductTermsAndCondition && (*/}
            {/*            <ErrorMessage*/}
            {/*                name="loanProductTermsAndCondition"*/}
            {/*                component="div"*/}
            {/*                id='loanProductTermsAndConditionError'*/}
            {/*                className="text-red-500 text-sm"*/}
            {/*            />*/}
            {/*        )*/}
            {/*    }*/}
            {/*</div>*/}
        </div>

    );
};

export default DescriptionEditor;


