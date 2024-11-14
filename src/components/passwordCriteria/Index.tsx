import React from 'react';
import { MdCheckCircle } from "react-icons/md";
import {inter} from "@/app/fonts";

interface PasswordCriteriaProps {
    criteriaStatus: boolean[];
    id: string
}

const PasswordCriteria: React.FC<PasswordCriteriaProps> = ({criteriaStatus, id}: PasswordCriteriaProps) => {
    const criteria = [
        "At least 8 characters",
        "At least one special character",
        "At least one uppercase character",
        "At least one lowercase character",
        "At least one digit"
    ];

    return (
        <div id={`${id}Container`} className={`${inter.className} grid  md:flex items-center gap-3 md:gap-5 py-0 px-1`}>
            <main id="passwordCriteriaMain-1" className={'grid gap-3'}>
                {criteria.slice(0, 2).map((text, index) => (
                    <div key={index} id={`passwordCriteriaItem${index}`} className={'flex gap-2 items-center'}>
                        <MdCheckCircle id={`passwordCriteriaIcon${index}`}  style={{
                            color: criteriaStatus[index] ? '#142854' : '#D0D0D0',
                            width: '16px',
                            height: '16px'
                        }}/>
                        <p id={`password-criteriaText${index}`} className={`text-[14px] font-normal leading-[22px] ${criteriaStatus[index] ? 'text-grey800' : 'text-neutral900'}`}>{text}</p>
                    </div>
                ))}
            </main>
            <main id="passwordCriteriaMain2" className={'grid gap-3'}>
                {criteria.slice(2).map((text, index) => (
                    <div key={index} id={`passwordCriteriaItem${index + 2}`} className={'flex gap-2 items-center'}>
                        <MdCheckCircle id={`passwordCriteriaIcon${index + 2}`} style={{
                            color: criteriaStatus[index + 2] ? '#142854' : '#D0D0D0',
                            width: '16px',
                            height: '16px'
                        }}/>
                        <p id={`passwordCriteriaText${index + 2}`} className={`text-[14px] font-normal leading-[22px] ${criteriaStatus[index + 2] ? 'text-grey800' : 'text-neutral900'}`}>{text}</p>
                    </div>
                ))}
            </main>
        </div>
    );
};

export default PasswordCriteria;