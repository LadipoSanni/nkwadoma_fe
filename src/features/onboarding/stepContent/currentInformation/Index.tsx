import React from 'react';
import { useDispatch } from 'react-redux';
// import { MdClose, MdPersonOutline } from "react-icons/md";
// import { cabinetGrotesk, inter } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import {setLoaneeCurrentInfo, setIsFormSubmited} from "@/service/users/loanRerralSlice";
// import {LoaneeCurentInformation} from "@/types/loanee";
import LoaneeCurrentInformation from '@/components/loanee/Loanee-current-information';
import { store,useAppSelector } from "@/redux/store";

interface CurrentInformationProps {
    setCurrentStep?: (step: number) => void;
}



const CurrentInformation: React.FC<CurrentInformationProps> = ({ setCurrentStep }) => {
    const currentLoaneeInfo = useAppSelector(state => (state?.loanReferral?.loaneeCurrentInfo))
    const isFormSubmitted = useAppSelector(state => (state?.loanReferral?.isFormSubmitting))
    const dispatch = useDispatch();

    const initialFormValue = {
        firstName: currentLoaneeInfo.firstName,
        lastName: currentLoaneeInfo.lastName,
        email: currentLoaneeInfo.email,
        phoneNumber: currentLoaneeInfo.phoneNumber,
        nextOfKinRelationship: currentLoaneeInfo.nextOfKinRelationship,
        contactAddress: currentLoaneeInfo.contactAddress,
        alternateEmail: currentLoaneeInfo.alternateEmail,
        alternatePhoneNumber: currentLoaneeInfo.alternatePhoneNumber,
        alternateContactAddress: currentLoaneeInfo.alternateContactAddress,
      }


    const saveToReduxSlice = (values: typeof initialFormValue) => {
        const additionalLoaneeInfo = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        nextOfKinRelationship: values.nextOfKinRelationship,
        contactAddress: values.contactAddress,
        alternateEmail: values.alternateEmail,
        alternatePhoneNumber: values.alternatePhoneNumber,
        alternateContactAddress: values.alternateContactAddress,
        }
        store.dispatch(setLoaneeCurrentInfo(additionalLoaneeInfo)) 
    }

    const handleSubmits = (values: typeof initialFormValue) => {
          saveToReduxSlice(values)
         store.dispatch(setIsFormSubmited(true));
      }

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     const dataToSubmit = {
    //         ...values,
    //         selectedProgram,
    //     };
    //     try {
    //       const result =  await saveNextOfKinDetails(dataToSubmit).unwrap();
    //        if(result){
    //         setIsModalOpen(false);
    //         dispatch(setLoaneeCurrentInfo(values))
    //         setIsFormSubmitted(true);
    //        }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const handleContinueClick = () => {
        if (isFormSubmitted) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            dispatch(setCurrentStep(3));
        }
    }

    function handleEditClick() {
        store.dispatch(setIsFormSubmited(false));
    }

    return (
        <>
            <main className={'grid gap-[22px]'}>
                {!isFormSubmitted ? (
                    // <div
                    //     className={` ${inter.className} bg-grey105 w-full h-[22rem] gap-8 flex flex-col items-center justify-center`}>
                    //     <div
                    //         className={'md:h-20 md:w-20 h-[60px] w-[60px] bg-blue500 rounded-full grid place-content-center'}>
                    //         <MdPersonOutline className={'h-8 w-8 text-meedlBlue'} />
                    //     </div>
                    //     <div className={'grid place-content-center place-items-center text-center gap-2'}>
                    //         <h1 className={`${cabinetGrotesk.className} md:w-[20.875rem] w-[13.75rem] md:text-[20px] text-[18px] leading-[120%] font-medium text-meedlBlack`}>Current
                    //             information will appear here</h1>
                    //         <p className={'text-[14px] font-normal leading-[150%] text-#57595D w-[13.75rem] md:w-[317px]'}>To
                    //             add your current information, click on the <span className={'font-semibold '}>add current information</span> button
                    //         </p>
                    //         <Button
                    //             className={'h-[2.8125rem] w-[13.75rem] mt-5 px-4 py-2 bg-meedlBlue hover:bg-meedlBlue text-white rounded-md'}
                    //             onClick={() => setIsModalOpen(true)}>Add current information</Button>
                    //     </div>
                    // </div>
                    <div>
                        <LoaneeCurrentInformation initialFormValue={initialFormValue} handleSubmit={handleSubmits}/>

                    </div>
                ) : (
                    <div>
                    <div className={'bg-grey105 p-5  grid gap-9 rounded-md'}>
                        <div className={'md:flex md:justify-between md:items-center md:gap-0 grid gap-3 '}>
                            <p className={'text-black300 text-[14px] leading-[150%] font-normal'}>Current email
                                address</p>
                            <p className={'text-black500 text-[14px] leading-[150%] font-normal'}>{currentLoaneeInfo.alternateEmail}</p>
                        </div>
                        <div className={'md:flex md:justify-between md:items-center md:gap-0 grid gap-3'}>
                            <p className={'text-black300 text-[14px] leading-[150%] font-normal'}>Current phone
                                number</p>
                            <p className={'text-black500 text-[14px] leading-[150%] font-normal'}>{currentLoaneeInfo.alternatePhoneNumber}</p>
                        </div>
                        <div className={'md:flex md:justify-between md:items-center md:gap-0 grid gap-3'}>
                            <p className={'text-black300 text-[14px] leading-[150%] font-normal'}>Current residential
                                address</p>
                            <p className={'text-black500 text-[14px] leading-[150%] font-normal'}>{currentLoaneeInfo.alternateContactAddress}</p>
                        </div>
                        <div className={'md:flex md:justify-between md:items-center md:gap-0 grid gap-3'}>
                            <p className={'text-black300 text-[14px] leading-[150%] font-normal'}>Current Next of
                                Kin&#39;s
                                first
                                name</p>
                            <p className={'text-black500 text-[14px] leading-[150%] font-normal'}>{currentLoaneeInfo.firstName}</p>
                        </div>
                        <div className={'md:flex md:justify-between md:items-center md:gap-0 grid gap-3'}>
                            <p className={'text-black300 text-[14px] leading-[150%] font-normal'}>Current Next of
                                Kin&#39;s
                                last
                                name</p>
                            <p className={'text-black500 text-[14px] leading-[150%] font-normal'}>{currentLoaneeInfo.lastName}</p>
                        </div>
                        <div className={'md:flex md:justify-between md:items-center md:gap-0 grid gap-3'}>
                            <p className={'text-black300 text-[14px] leading-[150%] font-normal'}>Current Next of
                                Kin&#39;s
                                email
                                address</p>
                            <p className={'text-black500 text-[14px] leading-[150%] font-normal'}>{currentLoaneeInfo.email}</p>
                        </div>
                        <div className={'md:flex md:justify-between md:items-center md:gap-0 grid gap-3'}>
                            <p className={'text-black300 text-[14px] leading-[150%] font-normal'}>Current Next of
                                Kin&#39;s
                                phone
                                number</p>
                            <p className={'text-black500 text-[14px] leading-[150%] font-normal'}>{currentLoaneeInfo.phoneNumber}</p>
                        </div>
                         <div className={'md:flex md:justify-between md:items-center md:gap-0 grid gap-3'}>
                            <p className={'text-black300 text-[14px] leading-[150%] font-normal'}>Current Next of
                                Kin&#39;s
                                residential address</p>
                            <p className={'text-black500 text-[14px] leading-[150%] font-normal'}>{currentLoaneeInfo.contactAddress}</p>
                        </div>
                        <div className={'md:flex md:justify-between md:items-center md:gap-0 grid gap-3'}>
                            <p className={'text-black300 text-[14px] leading-[150%] font-normal'}>Current Next of
                                Kin&#39;s
                                relationship</p>
                            <p className={'text-black500 text-[14px] leading-[150%] font-normal'}>{currentLoaneeInfo.nextOfKinRelationship}</p>
                        </div>

                    </div>

                    <div className='flex gap-4 items-center mt-6 justify-end'>
                    <Button
                    id="continueButton"
                    className={"h-[2.8125rem] w-20"}
                    onClick={handleEditClick}
                    variant={'outline'}
                >
                    Edit
                </Button>
                    <Button
                    id="continueButton"
                    className={`text-meedlWhite text-[14px] font-semibold leading-[150%] rounded-md self-end py-3 px-5 justify-self-end h-[2.8125rem] ${isFormSubmitted ? 'bg-meedlBlue hover:bg-meedlBlue focus:bg-meedlBlue' : 'bg-neutral650'}`}
                    disabled={!isFormSubmitted}
                    onClick={handleContinueClick}
                    type='submit'
                    variant={"default"}
                >
                    Continue
                </Button>
                    </div>
                 
                </div>
                )}
                
            </main>

        </>
    );
};

export default CurrentInformation;