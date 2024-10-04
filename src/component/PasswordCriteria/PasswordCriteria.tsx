import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface PasswordCriteriaProps {
    criteriaStatus: boolean[];
    id: string
}

const PasswordCriteria: React.FC<PasswordCriteriaProps> = ({criteriaStatus, id}: PasswordCriteriaProps) => {
    const criteria = [
        "At least 8 characters",
        "At least one special character",
        "At least one uppercase character",
        "At least one lowercase character"
    ];

    return (
        <div id={`${id}-container`} className={'flex items-center gap-5 py-0 px-1'}>
            <main id="password-criteria-main-1" className={'grid gap-3'}>
                {criteria.slice(0, 2).map((text, index) => (
                    <div key={index} id={`password-criteria-item-${index}`} className={'flex gap-2 items-center'}>
                        <CheckCircleIcon id={`password-criteria-icon-${index}`} style={{
                            color: criteriaStatus[index] ? '#00A343' : '#E0E3E8',
                            width: '16px',
                            height: '16px'
                        }}/>
                        <p id={`password-criteria-text-${index}`} className={`text-[14px] font-normal leading-[22px] ${criteriaStatus[index] ? 'text-[#000000]' : 'text-[#72757A]'}`}>{text}</p>
                    </div>
                ))}
            </main>
            <main id="password-criteria-main-2" className={'grid gap-3'}>
                {criteria.slice(2).map((text, index) => (
                    <div key={index} id={`password-criteria-item-${index + 2}`} className={'flex gap-2 items-center'}>
                        <CheckCircleIcon id={`password-criteria-icon-${index + 2}`} style={{
                            color: criteriaStatus[index + 2] ? '#00A343' : '#E0E3E8',
                            width: '16px',
                            height: '16px'
                        }}/>
                        <p id={`password-criteria-text-${index + 2}`} className={`text-[14px] font-normal leading-[22px] ${criteriaStatus[index + 2] ? 'text-[#000000]' : 'text-[#72757A]'}`}>{text}</p>
                    </div>
                ))}
            </main>
        </div>
    );
};

export default PasswordCriteria;