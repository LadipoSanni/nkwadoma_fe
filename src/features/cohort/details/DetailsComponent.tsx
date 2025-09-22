import Details from '@/components/loanee-my-profile/Details';
import React from 'react';

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
        {name: 'Repayment rate', value: '', valueType: 'percentage', id: 'repaymentRate'},
    ]

    return (
        <div
            className={`w-full h-full `}
        >
            <div
                className={` md:w-[60%] grid gap-4  mt-4 md:max-h-[60vh] pr-2 overflow-y-scroll `}
            >
                {cohort?.map((item, i) => (
                    <Details
                        key={'index'+i}
                        id={item.id} name={item.name} valueType={item.valueType}
                    />
                ))}
                <div className={` md:grid md:grid-cols-2 md:gap-2  `}>
                    {cohort2?.map((item, i) => (
                        <Details
                            key={'index'+i}
                            id={item.id} name={item.name} valueType={item.valueType}
                        />
                    ))}
                </div>


            </div>
            
        </div>
    );
};

export default DetailsComponent;