import Details from '@/components/loanee-my-profile/Details';
import React from 'react';
import styles from '@/components/loanee-my-profile/index.module.css'
import {inter500} from '@/app/fonts';


const DetailsComponent = () => {

    const cohort: {name: string, value: string, valueType: 'percentage'| 'digit'| 'currency' | 'tenor' | 'years', id:string}[] = [
        {name: 'Total amount disbursed', value: '3444040', valueType: 'currency', id: 'totalAmount'},
        {name: 'Total amount repaid', value: '3444040', valueType: 'currency', id: 'totalRepaid'},
        {name: 'Total amount outstanding', value: '3444040', valueType: 'currency', id: 'totalOutstanding'},
        {name: 'Average starting salary', value: '3444040', valueType: 'currency', id: 'averageStartingSalary'},
        {name: 'Tuition amount', value: '3444040', valueType: 'currency', id: 'tuitionAmount'},
        {name: 'Device', value: '3444040', valueType: 'currency', id: 'device'},
        {name: 'Accommodation', value: '3444040', valueType: 'currency', id: 'accommodation'},
        {name: 'Feeding', value: '3444040', valueType: 'currency', id: 'feeding'},
    ]
    const cohort2: {name: string, value: string, valueType: 'percentage'| 'digit'| 'currency' | 'tenor' | 'years', id:string}[] = [
        {name: 'Total loanees', value: '3444040', valueType: 'currency', id: 'totalLoanees'},
        {name: 'Total dropouts', value: '3444040', valueType: 'currency', id: 'totalDropouts'},
        {name: 'Total employed', value: '3444040', valueType: 'currency', id: 'totalEmployed'},
        {name: 'Employment rate', value: '2', valueType: 'percentage', id: 'employmentRate'},
        {name: 'Repayment rate', value: '9', valueType: 'percentage', id: 'repaymentRate'},
    ]

    const cohortS = [
        {title: 'Description', id: 'programDiscription', value: <span className={` text-[#212221] text-[14px] ${inter500.className} `}>Luminary is a dynamic cohort of visionary thinkers and creators, pursuing excellence in product design. Together, we’re pushing boundaries, sparking innovation, and shaping the future of design with creativity and purpose.</span>},
        {title: 'Program', id:'programname', value: <span className={` text-meedlBlue bg-[#F3F8FF] rounded-full max-w-[100%] px-2 py-2  `}>Product design thinking for children older than thirteen years and four  five </span>},
        {title: 'Status', id: 'status', value: <span className={`rounded-full bg-[#FEF6E8] h-fit w-fit px-2 py-2  text-[#66440A] text-[14px] `}>Incoming</span>},
        {title: 'Start date',id:'startDate', value: <span className={` ${inter500.className} text-[#212221] text-[14px] `}>23 October 2023</span>},
        {title: 'Start date',id:'startDate', value: <span className={` ${inter500.className} text-[#212221] text-[14px] `}>23 October 2023</span>},

    ]

    return (
        <div
            className={`w-full md:flex lg:flex h-full `}
        >
            <div
                className={` md:w-[60%] grid gap-4 ${styles.container} mt-4 md:max-h-[60vh] pr-2 overflow-y-scroll `}
            >
                {cohort?.map((item, i) => (
                    <Details
                        key={'index'+i}
                        id={item.id} name={item.name} valueType={item.valueType}
                        value={item.value}
                    />
                ))}
                <div className={` md:grid md:grid-cols-2 md:gap-4  `}>
                    {cohort2?.map((item, i) => (
                        <Details
                            key={'index'+i}
                            id={item.id} name={item.name} valueType={item.valueType}
                            value={item.value}
                        />
                    ))}
                </div>
            </div>
            <div
                className={` ${styles.container} md:max-w-[35%] grid  md:w-[35%] pt-3 pl-3  md:border-l md:border-l-[#ECECEC] md:h-[60vh] `}
            >
                {cohortS?.map((item, i) => (
                    <div
                        key={'index'+i}
                        className={` grid gap-3 h-fit  mb-2   `}
                        id={item.id}
                    >
                        <p className={` text-[#6A6B6A] text-[14px]  `}>{item.title}</p>
                        {item.value}
                    </div>
                ))}

            </div>
            
        </div>
    );
};

export default DetailsComponent;