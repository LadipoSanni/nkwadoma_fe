'use client'
import React, {useEffect, useState} from 'react';
import {inter, inter500} from "@/app/fonts";
import { useAppSelector} from "@/redux/store";
import { useRouter } from 'next/navigation';
import Multiselect from '@/reuseable/mult-select/multi-select';




const SourceOfFundsStep = () => {
    const router = useRouter()
    const completedStep = useAppSelector(state => (state?.kycMultistep.completedSteps))

    useEffect(()=> {
        if(!completedStep.includes("identification")){
            router.push('/kyc/identification');
        }
    },[completedStep, router])

    const [selectedSources, setSelectedSources] = useState<string[]>([]);

    const sourceOptions = [
        { value: 'savings', label: 'Personal or joint savings' },
        { value: 'income', label: 'Employment income' },
        { value: 'assets', label: 'Sales of assets' },
        { value: 'inheritance', label: 'Inheritance or gift' },
    ];


    return (
        <main className={`${inter.className} w-[27.5rem] grid gap-10`}>
            <div className={`${inter500.className} grid gap-1`}>
                <h1 className={`text-meedlBlack text-[18px] leading-[150%] font-medium`}>Source
                    of funds</h1>
                <p className={`text-black400 text-[14px] leading-[150%] font-normal`}>Add source
                </p>
                </div>

            <div>
                <Multiselect
                    multiselectList={sourceOptions}
                    onValueChange={(values) => setFieldValue("investmentVehicleDesignation", values)}
                    placeholder='Select designation'
                    restrictedItems={["LEAD","SPONSOR"]}
                />
            </div>
        </main>
    );
};

export default SourceOfFundsStep;