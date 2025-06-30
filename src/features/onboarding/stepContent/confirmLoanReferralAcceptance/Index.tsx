import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import SuccessDialog from '@/reuseable/modals/SuccessDialog/Index';
import { useRouter } from 'next/navigation';
import {store,useAppSelector} from "@/redux/store";
import {setCurrentNavbarItem, setCurrentNavBottomItem} from "@/redux/slice/layout/adminLayout";
import {setLoaneeIdentityVerifiedStatus} from "@/service/users/loanRerralSlice";
import { setCurrentStep } from '@/service/users/loanRerralSlice';
import { useSaveNextOfKinDetailsMutation } from "@/service/users/Loanee_query";
import {useToast} from "@/hooks/use-toast";
import Isloading from '@/reuseable/display/Isloading';
import {cleartLoaneeCurrentFieldInfo} from "@/service/users/loanRerralSlice";

interface ApiError {
    status: number;
    data: {
        message: string;
    };
  }
  


const ConfirmLoanReferralAcceptance = () => {
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const router = useRouter();
    const [saveNextOfKinDetails,{isLoading}] = useSaveNextOfKinDetailsMutation()
  const currentLoaneeAdditionalInfo = useAppSelector(state => (state?.loanReferral?.loaneeCurrentInfo))
  const {toast} = useToast();

    const handleBack =() => {
        store.dispatch(setCurrentStep(2))
    }

    

    const handleSubmitAdditionalDetails = async (e: React.FormEvent) => {
        e.preventDefault();
        const dataToSubmit = {
           ...currentLoaneeAdditionalInfo
        }
        try {
            const result =  await saveNextOfKinDetails(dataToSubmit).unwrap();
            if(result){
                setIsDialogOpen(true) 
                store.dispatch(cleartLoaneeCurrentFieldInfo())
            }
        } catch (err) {
            const error = err as ApiError;
            toast({
                description: error?.data?.message,
                status: "error"
            }) 
        }
    }

    return (
        <div className="flex flex-col gap-[22px]">
            <div className="flex items-start gap-4 bg-grey105 p-5">
                <Checkbox
                    id="confirmCheckbox"
                    className="data-[state=checked]:bg-[#142854]"
                    checked={isCheckboxChecked}
                    onCheckedChange={(checked) => setIsCheckboxChecked(checked === true)}
                />
                <label
                    htmlFor="confirmCheckbox"
                    className="w-full text-black500 text-[14px] font-normal leading-[150%]"
                >
                    By ticking the box and clicking <span className={'font-semibold'}>confirm</span>, you acknowledge
                    that all the information entered is accurate to the best of your knowledge. This includes personal
                    details,
                    financial information, and any supporting documentation submitted.
                </label>
            </div>
            <div className='flex justify-end gap-4 relative'>
            <div>
            <Button
              variant={'outline'}
             id='backButton'
             className={` text-[14px] font-semibold leading-[150%] rounded-md self-end py-3 px-5 justify-self-end h-[2.8125rem]`}
             onClick={handleBack}
             type='button'
            >
             Back
            </Button>
            </div>

            <div>
                 
            <Button
                id="continueButton"
                className={`text-meedlWhite w-24 text-[14px] font-semibold leading-[150%] rounded-md self-end py-3 px-5 justify-self-end h-[2.8125rem] ${!isCheckboxChecked ? 'bg-[#D7D7D7] hover:bg-[#D7D7D7] ' : 'bg-meedlBlue  '}`}
                disabled={!isCheckboxChecked}
                onClick={handleSubmitAdditionalDetails}
                variant={'secondary'}
                type='submit'
            >
                {
                    isLoading? <Isloading/> : "Submit"
                }
            </Button>
            </div>
          
            </div>
            
            <SuccessDialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onContinue={() => {
                    setIsDialogOpen(false);
                    store.dispatch(setCurrentNavBottomItem('Overview'))
                    store.dispatch(setCurrentNavbarItem('Overview'))
                    store.dispatch(setLoaneeIdentityVerifiedStatus(true))
                    router.push('/overview');
                }}
                showWarningIcon={true}
                title={'Acceptance process under review'}
                message={'Your application is under review'}
                // message={'Congratulations! You have successfully completed the loan referral acceptance process'}
                buttonText={'Go to dashboard'}
                routeToOverview={true}
            />
        </div>
    );
};

export default ConfirmLoanReferralAcceptance;