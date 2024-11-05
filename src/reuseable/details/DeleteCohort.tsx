import React from "react";
import DeleteIcon from '../../../public/Icon - Delete.png'
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {inter, cabinetGrotesk} from "@/app/fonts";
import ToastPopUp from '@/reuseable/notification/ToastPopUp';

interface deleteCohortProps {
    cohortId?: string,
    setIsOpen?: (e: boolean | undefined) => void,
    headerTitle: string,
    title: string,

}


export const DeleteCohort: React.FC<deleteCohortProps> = ({setIsOpen, headerTitle, title}) => {

    const toastPopUp = ToastPopUp({
    description: "Cohort successfully deleted.",
  });
  


    const handleCanCelCohort = () => {
        if (setIsOpen) {
            setIsOpen(false)
        }
    }

    const handleDeleteCohort = () => {
         toastPopUp.showToast();
        if (setIsOpen) {
            setIsOpen(false)
        }
    }
    return (
        <div>

            <Image src={DeleteIcon} alt={"deleteIcon"} className={`md:w-[5rem] w-[4rem] md:h-[5rem] h-[4rem]`}
                   width={200}
                   height={200}
            />
            <div className={`pt-3`}>
                <h1 className={`${cabinetGrotesk.className} text-2xl font-medium leading-7 text-meedlBlack`}>{headerTitle}
                    <br/></h1>

                <p className={`pt-3 text-sm font-normal leading-6 text-grey450`}>Are you sure you want to delete this {title}? This action can&#39;t be undone </p>
            </div>

            <div className={`flex flex-row justify-end gap-3 py-5`}>
                <Button size={'lg'} variant={'outline'}
                        className={`${inter.className} h-12 text-sm font-semibold leading-6 text-meedlBlack`}
                        onClick={handleCanCelCohort}>Cancel</Button>
                <Button size={'lg'} variant={'secondary'}
                        className={`${inter.className} h-12 bg-error450 text-sm font-semibold leading-6 text-meedlWhite`}
                        onClick={handleDeleteCohort}>Delete</Button>
            </div>
        </div>
    )
}