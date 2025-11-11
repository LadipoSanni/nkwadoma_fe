import Image from "next/image";
import { inter } from "@/app/fonts";
import { useToast } from "@/hooks/use-toast";
import { FaCircleUser } from "react-icons/fa6";
import { Edit2, Loader2 } from "lucide-react";
import Modal from "@/reuseable/modals/TableModal";
import { Cross2Icon } from "@radix-ui/react-icons";
import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useUploadImageToCloudinary } from "@/utils/UploadToCloudinary";
import { useAddOrganizationImageLogoMutation, useAddUserImageMutation, useGetUserDetailsQuery } from "@/service/users/api";

interface Props {
  whose: "company" | "user";
  url?: string;
  onUploadSuccess?: () => void;
}

const LoaneeUploadButton = ({ whose, url, onUploadSuccess }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { data: userDatas } = useGetUserDetailsQuery({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const uploadedImage = userDatas?.data?.image;
  const [updateUserData, { isLoading: isSavingUser }] = useAddUserImageMutation();
  const [updateOrg, { isLoading: isSavingOrg }] = useAddOrganizationImageLogoMutation();
  const supportedFileTypes = [ "image/svg+xml", "image/png", "image/jpg", "image/jpeg", "image/webp" ];
  const { upload } = useUploadImageToCloudinary();
  const { toast } = useToast();
  useEffect(() => {
    setIsBusy(isSavingUser || isSavingOrg);
  }, [isSavingUser, isSavingOrg]);

  const validateFile = (file: File): boolean => {
    if (!supportedFileTypes.includes(file.type)) {
      setError(`Image not supported. Please choose another image`);
      setModalIsOpen(true);
      return false;
    }
    if (file.size / (1024 * 1024) > 2) {
      setError(`File size exceeds 2 MB limit`);
      setModalIsOpen(true);
      return false;
    }
    setError(null);
    return true;
  };

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setIsBusy(true);
    if (!validateFile(selectedFile)) {
      setIsBusy(false);
      event.target.value = "";
      return;
    }

    try {
      const uploadedFileUrl = await upload(selectedFile, "user_image");

      const props = { imageUrl: uploadedFileUrl };
      const response =
        whose === "company"
          ? await updateOrg(props)
          : await updateUserData(props);

      if (response.data) {
        toast({ description: response.data.message, status: "success" });
        if (onUploadSuccess) {
          onUploadSuccess();
        }
      } else if (response.error) {
        setError("Error saving image. Please try again.");
        setModalIsOpen(true);
      }
    } catch (uploadError) {
      setError("Failed to upload image. Please try again.");
      setModalIsOpen(true);
      console.error(uploadError);
    } finally {
      event.target.value = "";
      setIsBusy(false);
    }
  };

  const onClick = () => {
    if (!isBusy && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const image = whose === "company" ? url : uploadedImage;

  return (
    <div className={` grid gap-2 `}>
      <div
        onClick={onClick}
        className={`relative ${
          !isBusy ? "cursor-pointer" : "cursor-wait"
        } rounded-full group md:w-[68px] w-[42px] md:h-[68px] h-[42px`}
        role='button'
        tabIndex={!isBusy ? 0 : -1}
        aria-label='Upload profile image'
        onKeyDown={(e) =>
          (e.key === "Enter" || e.key === " ") && !isBusy && onClick()
        }
      >
        {image ? (
          <Avatar className='md:w-[68px] w-[42px] md:h-[68px] h-[42px]'>
            <AvatarImage
              className={`md:w-[68px] w-[42px] md:h-[68px] h-[42px ${isBusy ? "opacity-50" : ""}`}
              src={image}
              alt='userImage'
            />
          </Avatar>
        ) : (
          <FaCircleUser
            className={`md:w-[68px] w-[42px] md:h-[68px] h-[42px text-[#ececec] ${isBusy ? "opacity-50" : ""}`}
          />
        )}
        {!isBusy ? (
          <div className='absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md border group-hover:bg-gray-100'>
            <Edit2 size={10} className='text-gray-600' />
          </div>
        ) : (
          <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full'>
            <Loader2 size={20} className='text-white animate-spin' />
          </div>
        )}
      </div>

      <input
        id='fileInput'
        type='file'
        accept={supportedFileTypes.join(",")}
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={onFileChange}
        disabled={isBusy}
      />

      {error && (
        <Modal
          isOpen={modalIsOpen}
          closeOnOverlayClick={true}
          icon={Cross2Icon}
          headerTitle=''
          closeModal={() => {
            setModalIsOpen(false);
            setError(null);
          }}
          styeleType='styleBodyTwo'
        >
          <div className={`${inter.className}`}>
            <div>
              <Image
                src={`/Icon - Warning.svg`}
                alt='image'
                width={30}
                height={30}
                className={`w-14`}
              />
            </div>
            <p className='mt-4 mb-5 text-[14px] text-[#475467]'>{error}</p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default LoaneeUploadButton;