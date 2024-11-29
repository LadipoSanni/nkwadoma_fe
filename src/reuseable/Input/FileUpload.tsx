import React, { useRef, useState, useEffect } from 'react';
import { FiUploadCloud } from "react-icons/fi";
import { Label } from "@/components/ui/label";
import { MdOutlineDelete, MdOutlineEdit, MdCheck } from "react-icons/md";
import { uploadImageToCloudinary } from '@/utils/UploadToCloudinary';

interface FileUploadProps {
    handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
    handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
    setUploadedImageUrl: (url: string | null) => void;
    labelName?: string
}

const truncateFileName = (name: string, length: number) => {
    return name.length > length ? name.substring(0, length) + "..." : name;
};

const FileUpload: React.FC<FileUploadProps> = ({ handleDrop, handleDragOver,setUploadedImageUrl,labelName}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [fileName, setFileName] = useState("");
    // const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

    useEffect(() => {
        if (file) {
            setFileName(truncateFileName(file.name, 13));

            const handleResize = () => {
                setFileName(truncateFileName(file.name, window.innerWidth >= 768 ? 40 : 13));
            };

            window.addEventListener("resize", handleResize);
            handleResize();
            return () => window.removeEventListener("resize", handleResize);
        }
    }, [file]);

    const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        const supportedTypes = ["image/svg+xml", "image/png", "image/jpg", "image/jpeg", "image/gif"];

        if (selectedFile) {
            if (!supportedTypes.includes(selectedFile.type)) {
                setError("File not supported");
                setFile(null);
                return;
            }
            setLoading(true);
            setFile(selectedFile);
            setError(null); // Clear any previous error
           
            try { 
                const uploadedFileUrl = await uploadImageToCloudinary(selectedFile); 
                setUploadedImageUrl(uploadedFileUrl); 
            } catch (uploadError) 
            { setError("Failed to upload image"); 
            console.error(uploadError); 
        }
        await new Promise(resolve => setTimeout(resolve, 2000));
            setLoading(false);
        }
    };

    const onDrop = async (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files?.[0];
        const supportedTypes = ["image/svg+xml", "image/png", "image/jpg", "image/jpeg", "image/gif"];

        if (droppedFile) {
            if (!supportedTypes.includes(droppedFile.type)) {
                setError("File not supported");
                setFile(null);
                return;
            }
            setLoading(true);
            setFile(droppedFile);
            setError(null); // Clear any previous error
            handleDrop(event);
            try { 
                const uploadedFileUrl = await uploadImageToCloudinary(droppedFile); 
                setUploadedImageUrl(uploadedFileUrl);  
            } 
            catch (uploadError) { 
                setError("Failed to upload image"); 
                console.error(uploadError); 
            }
            await new Promise(resolve => setTimeout(resolve, 2000));
            setLoading(false);
        }
    };

    const onClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const onDelete = () => {
        setFile(null);
    };

    return (
        <div id="dragAndDropContainer" className={'grid gap-2 w-full'}>
            <Label htmlFor="fileInput" className="block text-sm font-medium text-black500">{labelName}</Label>
            <div
                id="dragAndDrop"
                className={`${file ? 'p-3 bg-meedlWhite h-[4.25rem] border-[0.5px] border-solid border-neutral650 flex items-center justify-between' : 'grid gap-4 place-items-center border-dashed border border-neutral650 py-5 rounded-md bg-neutral100 cursor-pointer h-[147px]'}`}
                onDrop={file ? undefined : onDrop}
                onDragOver={file ? undefined : handleDragOver}
                onClick={file ? undefined : onClick}
            >
                <input
                    id="fileInput"
                    type="file"
                    accept=".svg,.png,.jpg,.jpeg,.gif"
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                    onChange={onFileChange}
                    className={'h-full w-full'}
                />

                {file ? (
                    <>
                        <div className={'flex gap-3 items-center'}>
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-l-[2px] border-l-meedlBlue border-lightBlue550 rounded-full animate-spin"></div>
                            ) : (
                                <div className={'flex justify-center items-center h-5 w-5 rounded-full bg-green500'}>
                                    <MdCheck className="text-meedlWhite w-3 h-3" />
                                </div>
                            )}
                            <div className={'flex flex-col items-start'}>
                                <p className="text-black500 font-normal text-sm truncate md:whitespace-normal">
                                    {fileName}
                                </p>
                                {loading ? (
                                    <p className={'text-black300 font-normal text-[12px] leading-[150%]'}>Uploading...</p>
                                ) : error ? (
                                    <p className={'text-red-500 font-normal text-[12px] leading-[150%]'}>{error}</p>
                                ) : (
                                    <p className={'text-green-500 font-normal text-[12px] leading-[150%]'}>Uploaded successfully</p>
                                )}
                            </div>
                        </div>
                        <div className={'flex gap-2'}>
                            <div
                                className={'h-[1.875rem] w-[1.875rem] bg-grey350 rounded-[50%] flex justify-center items-center'}
                                onClick={onDelete}
                            >
                                <MdOutlineDelete className={'h-5 w-5 text-primary200'} />
                            </div>
                            <div
                                className={'h-[1.875rem] w-[1.875rem] bg-grey350 rounded-[50%] flex justify-center items-center'}
                                onClick={onClick}
                            >
                                <MdOutlineEdit className={'h-5 w-5 text-primary200'} />
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div id="uploadIconContainer" className={'h-11 w-11 bg-meedlWhite flex justify-center items-center rounded-md'}>
                            <FiUploadCloud className={'w-6 h-[22px]'} />
                        </div>
                        <div id="uploadTextContainer" className={'grid gap-1 place-items-center'}>
                            <p className={'font-normal text-black300 text-[14px] leading-[150%]'}><span className={'underline text-meedlBlue'}>Click to upload</span> or drag and drop</p>
                            <p className={'text-black300 leading-[150%] text-[14px] font-normal'}>SVG, PNG, JPG OR GIF (max. 800x400px) </p>
                        </div>
                    </>
                )}
                {error && (
                    <p className="text-red-500 font-normal text-[12px] leading-[150%]">
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
};

export default FileUpload;