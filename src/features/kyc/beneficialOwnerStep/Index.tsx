'use client';
import React, {useState, useEffect} from "react";
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs";
import {inter, cabinetGroteskMediumBold} from '@/app/fonts';
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {MdAdd, MdDeleteOutline} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import Entity from "@/features/kyc/beneficialOwnerStep/Entity";
import Individual from "@/features/kyc/beneficialOwnerStep/Individual";
import {format} from "date-fns";

interface Owner {
    firstName?: string,
    lastName?: string,
    dateOfBirth?: string,
    relationShip?: string,
    ownership?: string,
    errorMessage?: string,
    entityError?: string,
    proofType?: string;
    proofFile?: File | null;
    proofFileUrl?: string;
    id?: number;
    name?: string;
    country?: string,
    rcNumber?: string,
    isFormField: boolean
}


const BeneficialOwnerStep = () => {
    const dispatch = useDispatch();
    const [disabledContinueButton, setDisableContinueButton] = useState(true);
    // const [error, setError] = useState("");
    // startDate ? format(startDate, "yyyy-MM-dd") : ""
    const initialData = {
        firstName: '',
        lastName: '',
        dateOfBirth: format(new Date(), "yyyy-MM-dd"),
        relationShip: '',
        errorMessage: '',
        entityError: '',
        proofType: '',
        proofFile: null,
        proofFileUrl: '',
        id: Date.now(),
        name: '',
        country: '',
        rcNumber: '',
        ownership: '',
        isFormField: false
    }
    const router = useRouter();

    const [owners, setOwner] = useState<Owner[]>([initialData])
    console.log('owner: ', owners)


    useEffect(() => {
        // const dd: boolean[] = []
        owners?.forEach((owner) => {
            // dd.push(owner?.isFormField)
            if (owner?.isFormField === true){
                console.log('dont disable')
                setDisableContinueButton(false)
            }else{
                console.log('disabel')
                setDisableContinueButton(true)
            }
        })
        // console.log('dd: ', dd)
        console.log('disan', disabledContinueButton)
        // if(dd.map((value) => !value)){
        //     setDisableContinueButton(true)
        // }else {
        //     setDisableContinueButton(false)
        // }
        // if(dd.){
        //
        // }

    }, [owners, disabledContinueButton]);


    // const validateTotalOwnership = (sections: Section[]) => {
    //     const array: number[] = [] ;
    //     sections?.filter(section=> array?.push(Number(section?.entityOwnership)) )
    //     const initial = 0
    //     const totalEntityOwnershipss = array.reduce((sum, currentValue) => sum + currentValue, initial)
    //     if (totalEntityOwnershipss > 100) {
    //         return 'Total entity ownership must be exactly 100%'
    //     }
    //     return undefined;
    // };


    const handleBackClick = () => {
        router.back();
    };

    const handleAddSection = () => {
        setOwner((prev) => ([
                ...prev,

                {
                    firstName: '',
                    lastName: '',
                    dateOfBirth: format(new Date(), "yyyy-MM-dd"),
                    relationShip: '',
                    errorMessage: '',
                    entityError: '',
                    proofType: '',
                    proofFile: null,
                    proofFileUrl: '',
                    id: Date.now(),
                    name: '',
                    country: '',
                    rcNumber: '',
                    ownership: '',
                    isFormField: false
                }
            ]
        ))
    }

    // const getBeneficialOwnerType = (beneficalOwner: Owner) => {
    //     if (beneficalOwner.)
    // }

    const updateOwner = (field: string, value: string  | File| boolean, id?: number) => {
        // setOwner(
        //     owners?.map(owner =>
        //         owner.id === id ? {...owner, [field]: value} : owner
        //     )
        // )
        setOwner(prevOwners =>
            prevOwners?.map(owner =>
                owner.id === id
                    ? { ...owner, [field]: value }
                    : owner
            )
        );

        console.log('after updating owner: ', owners)

    };

    const handleDeleteSection = (id?: number) => {
        setOwner((prev) => prev.filter((section) => section.id !== id));
    };


    const handleSaveAndContinue = () => {
        router.push('/kyc/political-exposure');
    };


    return (
        <main id="beneficialOwnerStepMain" className={`${inter.className} w-full xl:px-48 grid-cols-1 gap-y-5 grid`}>
            <div id="beneficialOwnerHeader"
                 className={`${cabinetGroteskMediumBold.className} max-w-[30rem] md:mx-auto w-full`}>
                <h1 id="beneficialOwnerTitle"
                    className="text-meedlBlack text-[24px] leading-[120%] font-medium">Beneficial owner</h1>
            </div>
            <div id="beneficialOwnerSection"
                     className={'md:max-w-[30rem] w-full md:mx-auto h-[calc(100vh-250px)] pt-1 overflow-y-auto pr-3'}>
                <main id="entityFormMain" className="grid gap-6">
                    {owners?.map((section) => (
                        <div key={section.id} className={'relative grid mt-6'}>
                            <Tabs
                                id={`beneficialOwnerTabs-${section.id}`}
                                defaultValue={'entity'}
                                className={'grid gap-7'}
                            >
                                <TabsList id={`beneficialOwnerTabsList-${section.id}`}
                                          className="flex gap-3 bg-transparent p-0 justify-start">
                                    <TabsTrigger
                                        onClick={()=> {updateOwner('type', 'individual', section.id)}}
                                        id={`entityTabTrigger-${section.id}`}
                                        value="entity"
                                        className="rounded-[20px] px-3 py-2 bg-blue50 hover:bg-blue50 data-[state=active]:border data-[state=active]:border-meedlBlue data-[state=active]:bg-blue50 data-[state=active]:text-meedlBlue data-[state=inactive]:text-grey250"
                                    >
                                        Entity
                                    </TabsTrigger>
                                    <TabsTrigger
                                        onClick={()=> {updateOwner('type', 'individual', section.id)}}
                                        id={`individualTabTrigger-${section.id}`}
                                        value="individual"
                                        className="rounded-[20px] px-3 py-2 bg-blue50 hover:bg-blue50 data-[state=active]:border data-[state=active]:border-meedlBlue data-[state=active]:bg-blue50 data-[state=active]:text-meedlBlue data-[state=inactive]:text-grey250"
                                    >
                                        Individual
                                    </TabsTrigger>
                                </TabsList>
                                <section
                                    className="grid p-5 gap-5 border rounded-md border-lightBlue250 relative">
                                    <TabsContent id={`entityTabContent-${section.id}`} value="entity">
                                        <Entity id={section.id} updateOwner={updateOwner}/>
                                    </TabsContent>
                                    <TabsContent id={`individualTabContent-${section.id}`} value="individual">
                                        <Individual id={section.id} updateOwner={updateOwner}/>
                                    </TabsContent>
                                    {owners.length > 1 && (
                                        <div className={'flex justify-end'}>
                                            <button
                                                onClick={() => handleDeleteSection(section.id)}
                                                className="bg-greyBase200 py-1 px-2 hover:bg-greyBase200 flex rounded-md gap-1 h-[1.8125rem] w-[5.25rem]"
                                            >
                                                <MdDeleteOutline className="text-error450 h-5 w-5"/>
                                                <span
                                                    className={'text-error450 text-[14px] leading-[150%] font-medium'}>Delete</span>
                                            </button>
                                        </div>
                                    )}
                                </section>
                            </Tabs>
                        </div>
                    ))}
                </main>
                <main className={'sticky bottom-0  bg-white py-4 pr-4'}>

                    <div className="flex items-center gap-1 mb-4">
                        <Button
                            onClick={handleAddSection}
                            className="flex items-center gap-2 bg-transparent text-meedlBlue shadow-none px-0 py-2 rounded-md"
                        >
                            <MdAdd className="text-meedlBlue h-5 w-5"/>
                            <span className={'font-semibold text-[14px] leading-[150%]'}>Add</span>
                        </Button>
                    </div>
                    <div id="entityFormButtons" className={'md:flex grid gap-4 md:justify-between'}>
                        <Button
                            id="entityFormBackButton"
                            onClick={handleBackClick}
                            type={'button'}
                            className={'h-[2.813rem] w-full md:w-[4.625rem] px-4 py-2 bg-gray-500 hover:bg-gray-600 text-meedlBlue border border-meedlBlue rounded-md  order-2 md:order-1'}
                        >
                            Back
                        </Button>
                        <Button
                            id="entityFormSaveContinueButton"
                            type={'button'}
                            onClick={handleSaveAndContinue}
                            disabled={disabledContinueButton}
                            className={`h-[2.8125rem] w-full md:w-[9.3125rem] px-4 py-2 ${disabledContinueButton ? `bg-[#e8eaee] md:bg-[#e8eaee] md:hover:bg-[#e8eaee] hover:bg-[#e8eaee]` : ` bg-meedlBlue hover:bg-meedlBlue text-white`} rounded-md  order-1 md:order-2`}
                        >
                            Save & continue
                        </Button>
                    </div>
                </main>

                {/*</Tabs>*/}
            </div>
        </main>
    )};


export default BeneficialOwnerStep;
