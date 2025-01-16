import {useField, useFormikContext} from "formik";
import ReactQuill from "react-quill-new";

interface fieldName {
    name:string

}
export const QuillField = ( {name}: fieldName ) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);

    return (
        <div>
            <ReactQuill
                theme="snow"
                value={field.value}
                onChange={(value) => {
                    console.log("loanProductTermsAndCondition value:", value);
                    setFieldValue(name, value);
                }}
                placeholder="Enter terms and condition"
                className="font-inter text-sm font-normal leading-[22px] pt-2 rounded-md"
            />
            {meta.touched && meta.error ? (
                <div className="text-red-500 text-sm">{meta.error}</div>
            ) : null}
        </div>
    );
};
