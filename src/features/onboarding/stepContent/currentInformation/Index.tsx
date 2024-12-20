import React, {useState, useEffect} from 'react';
import {MdClose, MdPersonOutline} from "react-icons/md";
import {cabinetGrotesk, inter} from "@/app/fonts";
import {Button} from "@/components/ui/button";
import {Dialog, DialogOverlay, DialogContent, DialogHeader, DialogTitle, DialogClose} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useSaveNextOfKinDetailsMutation} from "@/service/users/Loanee_query";
import ProgramSelect from "@/reuseable/select/ProgramSelect";
import DescriptionTextarea from "@/reuseable/textArea/DescriptionTextarea";
import PhoneNumberSelect from "@/reuseable/select/phoneNumberSelect/Index";

interface CurrentInformationProps {
    setCurrentStep?: (step: number) => void;
}

const CurrentInformation: React.FC<CurrentInformationProps> = ({setCurrentStep}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [values, setValues] = useState({
        firstName: "",
        lastName: "To be fix",
        email: "",
        phoneNumber: "",
        nextOfKinRelationship: "",
        contactAddress: "To be fixed",
        alternateEmail: "",
        alternatePhoneNumber: "",
        alternateContactAddress: "",
    });

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [saveNextOfKinDetails] = useSaveNextOfKinDetailsMutation()
    const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
    const [isSelectOpen, setIsSelectOpen] = useState(false);


    useEffect(() => {
        const isFormValid = Object.values(values).every((value) => value.trim() !== "");
        setIsButtonDisabled(!isFormValid);
    }, [values]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setValues((prev) => ({ ...prev, [id]: value }));
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const dataToSubmit = {
            ...values,
            selectedProgram,
        };
        try {
            await saveNextOfKinDetails(dataToSubmit);
            setIsFormSubmitted(true);
            setIsModalOpen(false);
        } catch (error) {
            console.error(error);
        }
    };
    const handleContinueClick = () => {
        if (isFormSubmitted && setCurrentStep) {
            setCurrentStep(3);
        }
    };

    return (
        <>
            <main className={'grid gap-[22px]'}>
                {!isFormSubmitted ? (
                    <div
                        className={` ${inter.className} bg-grey105 w-full h-[22rem] gap-8 flex flex-col items-center justify-center`}>
                        <div
                            className={'md:h-20 md:w-20 h-[60px] w-[60px] bg-blue500 rounded-full grid place-content-center'}>
                            <MdPersonOutline className={'h-8 w-8 text-meedlBlue'}/>
                        </div>
                        <div className={'grid place-content-center place-items-center text-center gap-2'}>
                            <h1 className={`${cabinetGrotesk.className} md:w-[20.875rem] w-[13.75rem] md:text-[20px] text-[18px] leading-[120%] font-medium text-meedlBlack`}>Current
                                information will appear here</h1>
                            <p className={'text-[14px] font-normal leading-[150%] text-#57595D w-[13.75rem] md:w-[317px]'}>To
                                add your current information, click on the <span className={'font-semibold '}>add current information</span> button
                            </p>
                            <Button
                                className={'h-[2.8125rem] w-[13.75rem] mt-5 px-4 py-2 bg-meedlBlue hover:bg-meedlBlue text-white rounded-md'}
                                onClick={() => setIsModalOpen(true)}>Add current information</Button>
                        </div>
                    </div>
                ) : (
                    <div className={'bg-grey105 p-5  grid gap-9 rounded-md'}>
                        <div className={'md:flex md:justify-between md:items-center md:gap-0 grid gap-3 '}>
                            <p className={'text-black300 text-[14px] leading-[150%] font-normal'}>Current email
                                address</p>
                            <p className={'text-black500 text-[14px] leading-[150%] font-normal'}>{values.alternateEmail}</p>
                        </div>
                        <div className={'md:flex md:justify-between md:items-center md:gap-0 grid gap-3'}>
                            <p className={'text-black300 text-[14px] leading-[150%] font-normal'}>Current phone
                                number</p>
                            <p className={'text-black500 text-[14px] leading-[150%] font-normal'}>{values.alternatePhoneNumber}</p>
                        </div>
                        <div className={'md:flex md:justify-between md:items-center md:gap-0 grid gap-3'}>
                            <p className={'text-black300 text-[14px] leading-[150%] font-normal'}>Current residential
                                address</p>
                            <p className={'text-black500 text-[14px] leading-[150%] font-normal'}>{values.alternateContactAddress}</p>
                        </div>
                        <div className={'md:flex md:justify-between md:items-center md:gap-0 grid gap-3'}>
                            <p className={'text-black300 text-[14px] leading-[150%] font-normal'}>Current Next of
                                Kin&#39;s
                                first
                                name</p>
                            <p className={'text-black500 text-[14px] leading-[150%] font-normal'}>{values.firstName}</p>
                        </div>
                        <div className={'md:flex md:justify-between md:items-center md:gap-0 grid gap-3'}>
                            <p className={'text-black300 text-[14px] leading-[150%] font-normal'}>Current Next of
                                Kin&#39;s
                                email
                                address</p>
                            <p className={'text-black500 text-[14px] leading-[150%] font-normal'}>{values.email}</p>
                        </div>
                        <div className={'md:flex md:justify-between md:items-center md:gap-0 grid gap-3'}>
                            <p className={'text-black300 text-[14px] leading-[150%] font-normal'}>Current Next of
                                Kin&#39;s
                                phone
                                number</p>
                            <p className={'text-black500 text-[14px] leading-[150%] font-normal'}>{values.phoneNumber}</p>
                        </div>
                        <div className={'md:flex md:justify-between md:items-center md:gap-0 grid gap-3'}>
                            <p className={'text-black300 text-[14px] leading-[150%] font-normal'}>Current Next of
                                Kin&#39;s
                                relationship</p>
                            <p className={'text-black500 text-[14px] leading-[150%] font-normal'}>{values.nextOfKinRelationship}</p>
                        </div>

                    </div>
                )}
                <Button
                    id="continueButton"
                    className={`text-meedlWhite text-[14px] font-semibold leading-[150%] rounded-md self-end py-3 px-5 justify-self-end h-[2.8125rem] ${isFormSubmitted ? 'bg-meedlBlue hover:bg-meedlBlue focus:bg-meedlBlue' : 'bg-neutral650'}`}
                    disabled={!isFormSubmitted}
                    onClick={handleContinueClick}
                >
                    Continue
                </Button>
            </main>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogOverlay className="bg-[rgba(52,64,84,0.70)] backdrop-blur-[6px]"/>
                <DialogContent className={'max-w-[425px] md:max-w-[533px] [&>button]:hidden gap-6  py-5 pl-5 pr-2'}>
                    <DialogHeader className={'flex py-3'} id="createCohortDialogHeader">
                        <DialogTitle
                            className={`${cabinetGrotesk.className} text-[28px] font-medium text-labelBlue leading-[120%]`}>Current
                            information</DialogTitle>
                        <DialogClose asChild>
                            <button id="createCohortDialogCloseButton" className="absolute right-5">
                                <MdClose id={'createCohortCloseIcon'} className="h-6 w-6 text-neutral950"/>
                            </button>
                        </DialogClose>
                    </DialogHeader>
                    <form
                        className={`${inter.className}  pr-2 overflow-y-auto overflow-x-hidden max-h-[calc(100vh-10rem)]`}
                        onSubmit={handleSubmit}>
                        <main className={'grid gap-5'}>
                            <div className={'grid gap-2'}>
                                <Label htmlFor="alternateEmail" className="block text-sm font-medium text-labelBlue">Current
                                    email address</Label>
                                <Input type="email" id="alternateEmail" placeholder="Enter email address"
                                       className={'p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'}
                                       value={values.alternateEmail} onChange={handleChange}/>
                            </div>
                            <PhoneNumberSelect
                                selectedCountryCode={values.phoneNumber}
                                setSelectedCountryCode={(code) => setValues((prev) => ({
                                    ...prev,
                                    selectedCountryCode: code
                                }))}
                                phoneNumber={values.phoneNumber}
                                setPhoneNumber={(number) => setValues((prev) => ({...prev, phoneNumber: number}))}
                                isSelectOpen={isSelectOpen}
                                setIsSelectOpen={setIsSelectOpen}
                                countryCodeOptions={[{id: "1", name: "+234"}]}
                                label="Current phone number"
                                placeholder="+234" id={'phoneNumber'}                            />
                            <div className={'grid gap-2'}>
                                <DescriptionTextarea
                                    description={values.alternateContactAddress}
                                    setDescription={(description) => setValues((prev) => ({
                                        ...prev,
                                        alternateContactAddress: description
                                    }))} maximumDescription={500} label={'Current residential address'}
                                    placeholder={'Enter residential address'}/>
                            </div>
                            <div className={'grid gap-2'}>
                                <Label htmlFor="nextOfKinFirstName"
                                       className="block text-sm font-medium text-labelBlue">Current next of
                                    Kin&#39;s
                                    first name</Label>
                                <Input type="text" id="firstName" placeholder="Enter first name"
                                       className={'p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'}
                                       value={values.firstName}
                                       onChange={handleChange}/>
                            </div>
                            <div className={'grid gap-2'}>
                                <Label htmlFor="nextOfKinEmail"
                                       className="block text-sm font-medium text-labelBlue">Current
                                    next of Kin&#39;s email address</Label>
                                <Input type="email" id="email" placeholder="Enter email address"
                                       className={'p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'}
                                       value={values.email} onChange={handleChange}/>
                            </div>
                            <div className={'grid gap-2'}>
                                <PhoneNumberSelect
                                    id={'alternatePhoneNumber'}
                                    selectedCountryCode={values.alternatePhoneNumber}
                                    setSelectedCountryCode={(code) => setValues((prev) => ({
                                        ...prev,
                                        selectedCountryCode: code
                                    }))}
                                    phoneNumber={values.alternatePhoneNumber}
                                    setPhoneNumber={(number) => setValues((prev) => ({...prev, alternatePhoneNumber: number}))}
                                    isSelectOpen={isSelectOpen}
                                    setIsSelectOpen={setIsSelectOpen}
                                    countryCodeOptions={[{id: "1", name: "+234"}]}
                                    label="Current next of Kin's phone number"
                                    placeholder="+234"
                                />
                            </div>
                            <div className={'grid gap-2'}>
                                <ProgramSelect
                                    selectedProgram={values.nextOfKinRelationship}
                                    setSelectedProgram={(program) => setValues((prev) => ({
                                        ...prev,
                                        nextOfKinRelationship: program
                                    }))}
                                    isSelectOpen={isSelectOpen}
                                    setIsSelectOpen={setIsSelectOpen}
                                    selectOptions={[
                                        {id: "1", name: "Father"},
                                        {id: "2", name: "Mother"},
                                        {id: "3", name: "Brother"},
                                        {id: "4", name: "Sister"},
                                        {id: "5", name: "Friend"},
                                    ]}
                                    setId={(id: string) => setSelectedProgram(id)}
                                    label={'Current next of Kin\'s relationship'}
                                    placeholder={'Select relationship'}/>
                            </div>
                            <div className="flex justify-end gap-5 mt-3">
                                <DialogClose asChild>
                                    <Button type="button"
                                            className="h-[3.5625rem] w-[8.75rem] border border-meedlBlue text-meedlBlue px-4 py-2 bg-gray-300 rounded-md">Cancel</Button>
                                </DialogClose>
                                <Button type="submit"
                                        className={`h-[3.5625rem] w-[8.75rem] px-4 py-2 ${isButtonDisabled ? 'bg-neutral650' : 'bg-meedlBlue'} hover:bg-meedlBlue text-white rounded-md`}
                                        disabled={isButtonDisabled}>Continue</Button>
                            </div>
                        </main>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CurrentInformation;