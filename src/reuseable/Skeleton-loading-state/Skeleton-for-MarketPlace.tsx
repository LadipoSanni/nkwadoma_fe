import React from 'react'
import {Skeleton} from '@/components/ui/skeleton'


function MarketPlaceInvestmentGrid() {

    const skeletonList = [
        {value: <Skeleton className="h-[13.8125rem] md:max-w-2xl bg-[#F9F9F9] "/>},
        {value: <Skeleton className="h-[13.8125rem] md:max-w-2xl bg-[#F9F9F9]  "/>},
        {value: <Skeleton className="h-[13.8125rem] md:max-w-2xl bg-[#F9F9F9]"/>},
        {value: <Skeleton className="h-[13.8125rem] md:max-w-2xl bg-[#F9F9F9]"/>},
        {value: <Skeleton className="h-[13.8125rem] md:max-w-2xl bg-[#F9F9F9]"/>},
        {value: <Skeleton className="h-[13.8125rem] md:max-w-2xl bg-[#F9F9F9]"/>},
        {value: <Skeleton className="h-[13.8125rem] md:max-w-2xl bg-[#F9F9F9]"/>},
        {value: <Skeleton className="h-[13.8125rem] md:max-w-2xl bg-[#F9F9F9]"/>},
        {value: <Skeleton className="h-[13.8125rem] md:max-w-2xl bg-[#F9F9F9]"/>},
        {value: <Skeleton className="h-[13.8125rem] md:max-w-2xl bg-[#F9F9F9]"/>},
        {value: <Skeleton className="h-[13.8125rem] md:max-w-2xl bg-[#F9F9F9]"/>},
        {value: <Skeleton className="h-[13.8125rem] md:max-w-2xl bg-[#F9F9F9]"/>},
        {value: <Skeleton className="h-[13.8125rem] md:max-w-2xl bg-[#F9F9F9]"/>},
        {value: <Skeleton className="h-[13.8125rem] md:max-w-2xl bg-[#F9F9F9]"/>},
    ]
    return (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skeletonList.map((item, index) => (
                <div key={index}>
                    {item.value}
                </div>
            ))}
        </div>
    )
}

export default MarketPlaceInvestmentGrid
