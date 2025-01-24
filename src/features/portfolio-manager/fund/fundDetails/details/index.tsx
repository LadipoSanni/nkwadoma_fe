"use client";
import React, {useEffect, useState} from 'react';
import InfoCard from '@/reuseable/details/InfoCard';
import {MdOutlinePayments} from 'react-icons/md';
import InfoPanel from '@/reuseable/details/InfoPanel';
import {formatAmount} from '@/utils/Format';
import {useGetInvestmentVehicleDetailQuery} from '@/service/admin/fund_query';
import {getItemSessionStorage} from '@/utils/storage';
import SkeletonForDetailPage from "@/reuseable/Skeleton-loading-state/Skeleton-for-detailPage";

const Details = () => {
    const [investmentId, setInvestmentId] = useState("");

    const {data, isLoading} = useGetInvestmentVehicleDetailQuery({id: investmentId}, {skip: !investmentId});

    useEffect(() => {
        const id = getItemSessionStorage('investmentVehicleId');
        if (id) {
            setInvestmentId(id);
            console.log('InvestmentId set:', id);
        }
    }, []);


    const detailInfo = [
        {name: 'Vehicle type', value: data?.data?.investmentVehicleType || 'N/A'},
        {name: 'Vehicle size', value: formatAmount(data?.data?.size?.toString() || '0')},
        {
            name: 'Vehicle status',
            value: <p
                className='w-14 h-6 bg-success50 flex justify-center items-center rounded-lg'>{data?.data?.status || 'close'}</p>
        },
        {name: 'Interest rate', value: `${data?.data?.rate || 0}%`},
        {
            name: 'Total amount in vehicle',
            value: formatAmount(data?.data?.totalAmountInInvestmentVehicle?.toString() || '0')
        },
        {name: 'Amount raised', value: formatAmount(data?.data?.amountRaised?.toString() || '0')},
        {name: 'Amount disbursed', value: formatAmount(data?.data?.amountDisbursed?.toString() || '0')},
        {name: 'Amount available', value: formatAmount(data?.data?.amountAvailable?.toString() || '0')},
        {name: 'Total income generated', value: formatAmount(data?.data?.totalIncomeGenerated?.toString() || '0')},
        {name: 'Net asset value', value: formatAmount(data?.data?.netAssetValue?.toString() || '0')},
    ];

    return (
        <>
            {isLoading ? (<SkeletonForDetailPage/>) : (
                <div
                    className='flex flex-col md:flex-row md:justify-between'
                >
                    <div className='w-full'>
                        <InfoCard
                            icon={MdOutlinePayments}
                            fundTitle={data?.data?.name}
                            description={data?.data?.mandate}
                        />
                    </div>
                    <div className='w-full'>
                        <InfoPanel infoList={detailInfo}/>
                    </div>
                </div>
            )}
        </>
    );
};

export default Details;


