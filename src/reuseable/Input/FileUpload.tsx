import React, { useRef } from 'react';
import { FiUploadCloud } from "react-icons/fi";
import { Label } from "@/components/ui/label";

interface FileUploadProps {
    handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
    handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
    handleClick: () => void;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ handleDrop, handleDragOver, handleClick, handleFileChange }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div id="dragAndDropContainer" className={'grid gap-2 w-full'}>
            <Label htmlFor="dragAndDrop" className="block text-sm font-medium text-black500">Cohort image (Optional)</Label>
            <div
                id="dragAndDrop"
                className="grid gap-4 place-items-center border-dashed border border-neutral650 py-5 rounded-md bg-neutral100 cursor-pointer h-[147px]"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={handleClick}
            >
                <input
                    type="file"
                    accept=".svg,.png,.jpg,.jpeg,.gif"
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className={'h-full w-full'}
                />
                <div id="uploadIconContainer" className={'h-11 w-11 bg-meedlWhite flex justify-center items-center rounded-md'}>
                    <FiUploadCloud className={'w-6 h-[22px]'}/>
                </div>
                <div id="uploadTextContainer" className={'grid gap-1 place-items-center'}>
                    <p className={'font-normal text-black300 text-[14px] leading-[150%]'}><span className={'underline text-meedlBlue'}>Click to upload</span> or drag and drop</p>
                    <p className={'text-black300  leading-[150%] text-[14px] font-normal'}>SVG, PNG, JPG OR GIF (max. 800x400px) </p>
                </div>
            </div>
        </div>
    );
};

export default FileUpload;