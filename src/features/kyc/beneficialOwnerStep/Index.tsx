'use client';
import React, {useState, useEffect} from "react";
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs";
import {inter, cabinetGroteskMediumBold} from '@/app/fonts';
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {MdAdd, MdDeleteOutline} from "react-icons/md";
import Entity from "@/features/kyc/beneficialOwnerStep/Entity";
import Individual from "@/features/kyc/beneficialOwnerStep/Individual";
import {format} from "date-fns";
import { store, useAppSelector } from "@/redux/store";
import {BeneficialType, updateBeneficialOwner} from "@/redux/slice/kyc/kycFormSlice";
import { useRef } from "react";

export interface Owner {
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
    isFormField: boolean,
    type: string,
}


const BeneficialOwnerStep = () => {
    const [disabledContinueButton, setDisableContinueButton] = useState(true);
    const [error, setError] = useState<string| undefined >(undefined);
    const filledForm = useAppSelector(state => state.kycForm.beneficialOwner);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const revertToFormObject = (obj: BeneficialType) => {
        const reverse : Owner = {
            firstName: obj?.beneficialOwnerFirstName,
            lastName: obj?.beneficialOwnerLastName,
            dateOfBirth: obj?.beneficialOwnerDateOfBirth,
            relationShip: obj?.beneficialOwnerRelationship?.toLowerCase(),
            errorMessage: '',
            entityError: '',
            proofType: obj?.votersCard ? 'voters_card' : 'national_id',
            proofFile: null,
            proofFileUrl: obj?.votersCard ? obj.votersCard : obj?.nationalIdCard,
            id: obj?.id,
            name: obj?.entityName,
            country: obj?.countryOfIncorporation === 'UNITED_STATES' ? 'US' : 'NG',
            rcNumber: obj?.beneficialRcNumber.slice(2),
            ownership: obj?.percentageOwnershipOrShare ?  obj?.percentageOwnershipOrShare.toString() : '',
            isFormField: !(!obj?.entityName && !obj?.beneficialOwnerLastName),
            type: obj?.beneficialOwnerType === 'COOPERATE' ? 'entity' : 'individual',
        }
        return reverse;
    }

    const covertOwnerToStoreType = (en: Owner) => {
        console.log('oen: ', en)
        const object : BeneficialType = {
            id: en.id ? en.id : 0,
            beneficialOwnerType: en?.type === 'entity' ? 'COOPERATE' : 'INDIVIDUAL',
            entityName: en?.name,
            beneficialRcNumber: en?.rcNumber ? en?.rcNumber.toString() : '',
            countryOfIncorporation: en?.country === 'US' ? 'UNITED_STATES' : 'NIGERIA',
            beneficialOwnerFirstName: en?.firstName,
            beneficialOwnerLastName: en?.lastName,
            beneficialOwnerRelationship: en?.relationShip ? en?.relationShip.toString()?.toUpperCase() : '',
            beneficialOwnerDateOfBirth: en?.dateOfBirth ? en?.dateOfBirth.toString() : '',
            percentageOwnershipOrShare: en?.ownership ? Number(en?.ownership) : 0,
            votersCard: en?.proofType === 'voters_card' ?  en?.proofFileUrl : '',
            nationalIdCard: en?.proofType === 'national_id' ? en?.proofFileUrl : '',
            driverLicense: '',
            type: en?.type
        }
        const objectWithoutRelationShip : BeneficialType = {
            id: en.id ? en.id : 0,
            beneficialOwnerType: en?.type === 'entity' ? 'COOPERATE' : 'INDIVIDUAL',
            entityName: en?.name,
            beneficialRcNumber: en?.rcNumber ? 'RC'+en?.rcNumber.toString() : '',
            countryOfIncorporation: en?.country === 'US' ? 'UNITED_STATES' : 'NIGERIA',
            beneficialOwnerFirstName: en?.firstName,
            beneficialOwnerLastName: en?.lastName,
            // beneficialOwnerRelationship: en?.relationShip ? en?.relationShip.toString()?.toUpperCase() : '',
            beneficialOwnerDateOfBirth: en?.dateOfBirth ? en?.dateOfBirth.toString() : '',
            votersCard: en?.proofType === 'voters_card' ?  en?.proofFileUrl : '',
            percentageOwnershipOrShare: en?.ownership ? Number(en?.ownership) : 0,
            nationalIdCard: en?.proofType === 'national_id' ? en?.proofFileUrl : '',
            driverLicense: '',
            type: en?.type
        }
        return en?.relationShip ? object : objectWithoutRelationShip;
    }


    const router = useRouter();
    const convertToFormObject = (obj: BeneficialType[]) =>  {
        const converted = []
        for (const section of obj) {
            converted.push(revertToFormObject(section))
        }
        return converted;
    }

    const initial = convertToFormObject(filledForm)

    const [owners, setOwner] = useState<Owner[]>(initial)

    const validateTotalOwnership = (sections: Owner[]) => {
        const array: number[] = [] ;
        sections?.filter(section=> array?.push(Number(section?.ownership)) )
        const initial = 0
        const totalEntityOwnershipss = array.reduce((sum, currentValue) => sum + currentValue, initial)
        if (totalEntityOwnershipss < 100 || totalEntityOwnershipss > 100) {
            return 'Total beneficial ownership must be exactly 100%'
        }
        return undefined;
    };

    useEffect(() => {
        const response = validateTotalOwnership(owners)
        owners?.forEach((owner) => {
                if (owner?.isFormField === true) {
                    if (typeof response === 'string'){
                        setError(response)
                        setDisableContinueButton(true)
                    }else{
                        setError('')
                        setDisableContinueButton(false)
                  }
                }else{
                    setError('')
                    setDisableContinueButton(true)
                }
        })

    }, [owners, disabledContinueButton]);


    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [owners]);


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
                    proofType: 'national_id',
                    proofFile: null,
                    proofFileUrl: '',
                    id: Date.now(),
                    name: '',
                    country: '',
                    rcNumber: '',
                    ownership: '',
                    isFormField: false,
                    type: 'entity'
                }
            ]
        ))

    }



    const updateOwner = (field: string, value: string  | File| boolean, id?: number) => {
        setOwner(prevOwners =>
            prevOwners?.map(owner =>
                owner.id === id
                    ? { ...owner, [field]: value }
                    : owner
            )
        );
        console.log('owners: ', owners);
    };

    const handleDeleteSection = (id?: number) => {
        setOwner((prev) => prev.filter((section) => section.id !== id));
    };



    const handleSaveAndContinue = () => {
        const converted = []
        for (const section of owners) {
            converted.push(covertOwnerToStoreType(section))
        }
        store.dispatch(updateBeneficialOwner(converted))
        router.push('/kyc/political-exposure');
    };





    return (
        <main id="beneficialOwnerStepMain" className={`${inter.className} w-full xl:px-48 grid-cols-1 gap-y-5 grid`}>
            <div id="beneficialOwnerHeader"
                 className={`${cabinetGroteskMediumBold.className} max-w-[30rem] md:mx-auto w-full`}>
                <h1 id="beneficialOwnerTitle"
                    className="text-meedlBlack text-[24px] leading-[120%] font-medium">Beneficial owner</h1>
            </div>
            <div
                ref={containerRef}

                id="beneficialOwnerSection"
                     className={'md:max-w-[30rem] w-full md:mx-auto max-h-[calc(100vh-250px)] h-[calc(100vh-250px)]  pt-1 overflow-y-auto pr-3'}>
                <main id="entityFormMain" className="grid gap-6">
                    {owners?.map((section) => (
                        <div key={section.id} className={'relative grid mt-6'}>
                            <Tabs
                                id={`beneficialOwnerTabs-${section.id}`}
                                defaultValue={section?.type ? section.type : 'entity'}
                                className={'grid gap-7'}
                            >
                                <TabsList id={`beneficialOwnerTabsList-${section.id}`}
                                          className="flex gap-3 bg-transparent p-0 justify-start">
                                    <TabsTrigger
                                        onClick={()=> {updateOwner('type', 'entity', section.id)}}
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
                                        <Entity currentObj={section} id={section.id} updateOwner={updateOwner}/>
                                    </TabsContent>
                                    <TabsContent id={`individualTabContent-${section.id}`} value="individual">
                                        <Individual currentObj={section} id={section.id} updateOwner={updateOwner}/>
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

                    <div className="grid r gap-1 mb-4">
                        <span className="text-red-500 text-sm">{error}</span>
                        <Button
                            onClick={handleAddSection}
                            className="flex items-center w-fit  bg-purple-100 gap-2 bg-transparent text-meedlBlue shadow-none px-0 py-2 rounded-md"
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
            </div>
        </main>
    )};


export default BeneficialOwnerStep;
