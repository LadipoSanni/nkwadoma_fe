import React, {useEffect, useRef, useState} from 'react';
import {uploadImageToCloudinary} from "@/utils/UploadToCloudinary";
import { Button } from '@/components/ui/button';
import {FaCircleUser} from "react-icons/fa6";
import {inter, inter500, inter600} from "@/app/fonts";
import {Avatar, AvatarImage} from '@/components/ui/avatar';
import { useAddUserImageMutation,useGetUserDetailsQuery } from '@/service/users/api';
import {useToast} from "@/hooks/use-toast";
import {setItemToLocalStorage} from "@/utils/storage";
import {useSearchParams} from "next/navigation";



const UploadButton = () => {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [fileName, setFileName] = useState("");
    const {data: userDatas} = useGetUserDetailsQuery({})
    const uploadedImage = userDatas?.data?.image;
    const [imageUrl, setUploadedImageUrl] = useState<string>('');
    const [updateUserData, {isLoading}] = useAddUserImageMutation()
    const supportedFileTypes = ["image/svg+xml", "image/png", "image/jpg", "image/jpeg", "image/webp"];
    const ee = error + fileName

    const truncateFileName = (name: string, length: number) => {
        return name.length > length ? name.substring(0, length) + "..." : name;
    };

    useEffect(() => {
        if (file) {
            setFileName(truncateFileName(file.name, 13));

            const handleResize = () => {
                setFileName(truncateFileName(file.name, window.innerWidth >= 768 ? 40 : 13));
            };

            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, [file]);

    const validateFile = (file: File): boolean => {
        if (!supportedFileTypes.includes(file.type)) {
            setError(`Image not supported. Please choose another image`);
            return false;
        }
        setError(null);
        return true;
    };

    const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) return;

        setLoading(true);
        if (!validateFile(selectedFile)) {
            setLoading(false);
            return;
        }

        setFile(selectedFile);
        try {
            const uploadedFileUrl = await uploadImageToCloudinary(selectedFile, "user_image");
            setUploadedImageUrl(uploadedFileUrl);
        } catch (uploadError) {
            setError("Failed to upload image");
            console.error(uploadError);
        } finally {
            setLoading(false);
        }
    };
    const {toast} = useToast()


    const onClick = () => {
        if (!loading && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const  handleSaveUser = async  () => {
        const props = {imageUrl: imageUrl ? imageUrl : ''};
        const response = await updateUserData(props);
        if (response?.data){
            toast({
                description: response?.data?.message,
                status: "success",
            })
            setItemToLocalStorage('ee', ee)
            setUploadedImageUrl('')
        }
        if (response?.error){
            toast({
                description: 'error occurred',
                status: "error",
            })
            setItemToLocalStorage('ee', ee)
            setUploadedImageUrl('')
        }


    }
    const clearSelectedImage = () => {
        setUploadedImageUrl('');

    }

    return (
        <div className={` grid gap-2 `}>
            <div className={` flex  gap-4 h-fit `}>
                { uploadedImage ?
                    <Avatar className={` w-20 h-20 `}>
                        <AvatarImage className={`w-20 h-20  `} src={imageUrl ? imageUrl :uploadedImage} alt="userImage" />
                    </Avatar>
                    :
                    <FaCircleUser className={` w-20 h-20 text-[#ececec] ${isLoading ? 'animate-pulse' : ''} `} />

                }
                <div className={` grid gap-3 h-fit mt-auto mb-auto `}>
                    <div>
                        <p className={` text-[14px] ${inter500.className} text-black `}>Upload image</p>
                        <p className={`text-[14px] ${inter.className} text-[#6A6B6A]`}>PNG or JPG (max. 800x400px) </p>
                    </div>
                </div>
            </div>
            {!imageUrl ?
                <Button
                    className={` w-fit h-fit py-2 px-4 border border-meedlBlue text-meedlBlue `}
                    onClick={!file ? onClick : undefined}
                >
                    <p> {!loading ? `Upload` : 'Uploading...'}</p>

                    <input
                        id="fileInput"
                        type="file"
                        accept={supportedFileTypes.join(',')}
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                        onChange={onFileChange}
                        disabled={loading}
                    />

                </Button>
                :
                <div className={`w-fit  flex gap-2 mr-auto ml-auto   `}>
                    <Button
                        onClick={clearSelectedImage}
                        className={` py-2 px-4 w-fit h-fit text-[16px] ${inter600.className}  border border-meedlBlue text-meedlBlue `}
                    >Discard</Button>
                    <Button
                        onClick={handleSaveUser}
                        className={`text-[16px] ${inter600.className}  py-2 px-4 w-fit h-fit border bg-meedlBlue text-white `}
                    >

                        <p>{isLoading ? 'Saving...' :'Save'}</p>
                    </Button>
                </div>

            }
        </div>

    );
};

export default UploadButton;