import React from "react";
import DeleteIcon from '../../../public/Icon - Delete.png'
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {inter, cabinetGrotesk} from "@/app/fonts";
import Isloading from "../display/Isloading";

interface deleteCohortProps {
    id?: string ;
    setIsOpen?: (e: boolean | string | undefined) => void,
    headerTitle: string,
    title: string,
    handleDelete?: (id: string) => void | Promise<void>;
    handleMultipleDelete?: (id: string[]) => void;
    isLoading?: boolean
    errorDeleting?: string;
    ids?: string[];
    image?: string;
   
}


 const DeleteCohort: React.FC<deleteCohortProps> = ({setIsOpen, headerTitle, title,handleDelete,id,isLoading,ids,handleMultipleDelete,image, errorDeleting}) => {
 

    const handleCanCelCohort = () => {
        if (setIsOpen) {
            setIsOpen(false)
        }
    }

    const handleDeleteCohort = async () => {
        if(handleDelete){
            handleDelete(id ?? "");
            // if (setIsOpen) setIsOpen(false); 
        }else {
             if(handleMultipleDelete){
                handleMultipleDelete(ids ?? [])
            //  if (setIsOpen) setIsOpen(false); 
             }
        }
     
    }

    return (
        <div>
           <div className="mt-2">
           <Image src={!image? DeleteIcon : image} alt={"deleteIcon"} className={` w-[4rem]  h-[4rem]`}
                   width={200}
                   height={200}
            />
           </div>
           
            <div className={`pt-3`}>
                <h1 className={`${cabinetGrotesk.className} text-2xl font-medium leading-7 text-meedlBlack`}>Delete {headerTitle}
                    </h1>

                <p className={`pt-3  text-sm font-normal leading-6 text-grey450 md:w-[22rem]`}>Are you sure you want to delete this {title}? This action can&#39;t be undone </p>
            </div>

            <div className={`flex flex-row justify-end gap-3 py-5`}>
                <button
                        id="cancelDeleteButtton"
                        className={`${inter.className} h-12 text-sm font-semibold leading-6 text-[#142854] bg-white border-solid border-[#142854] border-[1px] w-28 rounded-md hover:bg-[#E8EAEE]  `}
                        onClick={handleCanCelCohort}>Cancel</button>
                <Button size={'lg'} variant={'secondary'}
                        className={`${inter.className} h-12 bg-error450 hover:bg-error450 focus:bg-error450 text-sm font-semibold leading-6 text-meedlWhite`}
                        id="deleteButton"
                        onClick={handleDeleteCohort}>
                            {
                                isLoading? <Isloading /> : 'Delete'
                            }
                            </Button>
            </div>
             <div className="text-red-500 text-sm text-center relative bottom-2">
                {errorDeleting}
             </div>
        </div>
    )
}

export default DeleteCohort