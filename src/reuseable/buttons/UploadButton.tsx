import React, {useEffect, useRef, useState} from 'react';
import {useUploadImageToCloudinary} from "@/utils/UploadToCloudinary";
import { Button } from '@/components/ui/button';
import {FaCircleUser} from "react-icons/fa6";
import {inter, inter500, inter600} from "@/app/fonts";
import {Avatar, AvatarImage} from '@/components/ui/avatar';
import {useAddOrganizationImageLogoMutation, useAddUserImageMutation,useGetUserDetailsQuery } from '@/service/users/api';
import {useToast} from "@/hooks/use-toast";
import {setItemToLocalStorage} from "@/utils/storage";
import { store } from '@/redux/store';
import {setUser2faState} from "@/redux/slice/id/slice-ids";
import Modal from "@/reuseable/modals/TableModal";
import {Cross2Icon} from "@radix-ui/react-icons";
import Image from "next/image";

interface Props {
    whose: 'company' | 'user',
    url?: string,
}

const UploadButton = ({whose, url} : Props) => {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [fileName, setFileName] = useState("");
    const {data: userDatas} = useGetUserDetailsQuery({})
    const uploadedImage = userDatas?.data?.image;
    const [imageUrl, setUploadedImageUrl] = useState<string>('');
    const [uploadedOrgUrl, setUploadedOrgUrl] = useState<string>('');
    const [updateUserData, {isLoading}] = useAddUserImageMutation()
    const [ updateOrg, {isLoading:isLoadingOrg} ] = useAddOrganizationImageLogoMutation()
    const supportedFileTypes = ["image/svg+xml", "image/png", "image/jpg", "image/jpeg", "image/webp"];
    const ee = error + fileName
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const {upload} = useUploadImageToCloudinary();

    const truncateFileName = (name: string, length: number) => {
        return name.length > length ? name.substring(0, length) + "..." : name;
    };

    useEffect(() => {
        if (file) {
            setFileName(truncateFileName(file.name, 13));

            if (typeof window !== undefined){
                const handleResize = () => {
                    setFileName(truncateFileName(file.name, window.innerWidth >= 768 ? 40 : 13));
                };

                window.addEventListener("resize", handleResize);
                return () => window.removeEventListener("resize", handleResize);
            }
        }
        if (userDatas){
            store.dispatch(setUser2faState(userDatas?.data?.mfaType))
        }

    }, [file, userDatas]);

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
        const fileSizeInMB = selectedFile.size / (1024 * 1024);

        if (fileSizeInMB > 2) {
            setModalIsOpen(true)
            setLoading(false);
            setError(`File size exceeds 2 MB limit`);
            event.target.value = '';
            return ;
        }
        setLoading(true);
        if (!validateFile(selectedFile)) {
            setLoading(false);
            return;
        }

        setFile(selectedFile);
        try {
            const uploadedFileUrl = await upload(selectedFile, "user_image");
            setUploadedImageUrl(uploadedFileUrl);
            setUploadedOrgUrl(uploadedOrgUrl);
        } catch (uploadError) {
            setError("Failed to upload image");
            console.error(uploadError);
        } finally {
            event.target.value = '';
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
        const response = whose === 'company' ? await  updateOrg(props) : await updateUserData(props);
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
    const user = imageUrl ? imageUrl :uploadedImage;
    const companyUrl = imageUrl ? uploadedOrgUrl : url
    const image = whose === 'company' ? companyUrl : user

    return (
        <div className={` grid gap-2 `}>
            <div className={` flex  gap-4 h-fit `}>
                { image  ?
                    <Avatar className={` w-20 h-20 `}>
                        <AvatarImage className={`w-20 h-20  `} src={image} alt="userImage" />
                    </Avatar>
                    :
                    <FaCircleUser className={` w-20 h-20 text-[#ececec] ${isLoading || isLoadingOrg ? 'animate-pulse' : ''} `} />

                }


                <div className={`grid gap-2 `}>
                    <div className={` grid gap-3 h-fit mt-auto mb-auto `}>
                        <div>
                            <p className={` text-[14px] ${inter500.className} text-black `}>Upload image</p>
                            <p className={`text-[14px] ${inter.className} text-[#6A6B6A]`}>PNG or JPG (max. 800x400px) </p>
                        </div>
                    </div>
                    {!imageUrl ?
                        <Button
                            id={'choseImage'}
                            data-testid={'choseImage'}
                            className={` w-fit h-[2.2rem]  px-4 border border-meedlBlue text-meedlBlue `}
                            onClick={ onClick }
                        >
                            <p className={` text-[14px] ${inter600.className} `}> {!loading || !isLoadingOrg ? `Upload` : 'Uploading...'}</p>

                            <input
                                id="fileInput"
                                type="file"
                                accept={supportedFileTypes.join(',')}
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                                onChange={onFileChange}
                                disabled={loading || isLoadingOrg}
                            />

                        </Button>
                        :
                        <div className={`w-fit  flex gap-2    `}>
                            <Button
                                onClick={clearSelectedImage}
                                className={`  px-4 w-fit h-[2.2rem] text-[14px] ${inter600.className}  border border-meedlBlue text-meedlBlue `}
                            >Discard</Button>
                            <Button
                                onClick={handleSaveUser}
                                className={`text-[14px] ${inter600.className}   px-4 w-fit h-[2.2rem] border bg-meedlBlue text-white `}
                            >

                                <p>{isLoading || isLoadingOrg ? 'Saving...' :'Save'}</p>
                            </Button>
                        </div>

                    }
                </div>
            </div>
            <div>
                <Modal
                    isOpen={modalIsOpen}
                    closeOnOverlayClick={true}
                    icon={Cross2Icon}
                    headerTitle=''
                    closeModal={() => {
                        setModalIsOpen(false)
                    }}
                    styeleType="styleBodyTwo"
                >
                    <div className={`${inter.className}`}>
                        <div>
                            <Image
                                // src={modalType === "update"? "/Icon - Warning.svg" : "/Inner circle (1).png"}
                                src={`/Icon - Warning.svg`}
                                alt='image'
                                width={30}
                                height={30}
                                className={`w-14`}
                                // className={` ${modalType === "update"? "w-14" : "w-11"} `}
                            />
                        </div>
                        <p className='mt-4 mb-5 text-[14px] text-[#475467]'>
                            {error}
                        </p>
                    </div>
                </Modal>
            </div>


        </div>

    );
};

export default UploadButton;