import React from 'react';
import {FinancierInInvestmentVehicle} from "@/types/Component.type";
import styles from '@/components/selected-loan/SelectedLoan.module.css'
import { capitalizeFirstLetters } from '@/utils/GlobalMethods';

interface Props {
    list: FinancierInInvestmentVehicle[]
}

const DisplayFinancierInvehicle = ({list}:Props ) => {


    return (
        <div className={` w-full md:w-full `}>
            {list?.map((fina, index) => (
                <div key={index}
                     className={` w-full  md:w-full md:grid md:grid-cols-2  grid gap-2 md:gap-4`}
                >

                   <div>
                       <p className={` md:hidden flex`}>Financier</p>
                       <div id={'name'+fina?.userIdentity?.firstName} className={`  ${styles.tab} flex  border border-[#e4e4e7] px-2 text-xs h-fit py-4  rounded-md `}>
                           {capitalizeFirstLetters(fina?.userIdentity?.firstName)}
                           {capitalizeFirstLetters(fina?.userIdentity?.lastName) }
                       </div>
                   </div>
                    <div>
                        <p className={` md:hidden flex`}>Role</p>
                        <div
                            className={` ${styles.tab} border flex gap-3  border-[#e4e4e7] text-xs px-2 h-fit py-2  rounded-md `}
                        >
                            {fina?.investmentVehicleRole?.map((role, index) => (
                                <div id={role} className={`  bg-[#f6f6f6] shadow-md w-fit h-fit px-2 py-2 rounded-md  `} key={index}>{role?.toLowerCase()}</div>
                            ))}

                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DisplayFinancierInvehicle;