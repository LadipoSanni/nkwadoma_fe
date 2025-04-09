import React from 'react'
import {Skeleton} from '@/components/ui/skeleton'


function MarketPlaceInvestmentGrid() {

    const skeletonList = [
        {value: <Skeleton className="md:h-80 h-72 md:max-w-lg bg-[#F9F9F9]"/>},
        {value: <Skeleton className="md:h-80 h-72 md:max-w-lg bg-[#F9F9F9]"/>},
        {value: <Skeleton className="md:h-80 h-72 md:max-w-lg bg-[#F9F9F9]"/>},
        {value: <Skeleton className="md:h-80 h-72 md:max-w-lg bg-[#F9F9F9]"/>},
        {value: <Skeleton className="md:h-80 h-72 md:max-w-lg bg-[#F9F9F9]"/>},
        {value: <Skeleton className="md:h-80 h-72 md:max-w-lg bg-[#F9F9F9]"/>},
        {value: <Skeleton className="md:h-80 h-72 md:max-w-lg bg-[#F9F9F9]"/>},
        {value: <Skeleton className="md:h-80 h-72 md:max-w-lg bg-[#F9F9F9]"/>},
    ]
    return (
        <div className="grid grid-cols-1 px-3 md:grid-cols-3 w-full sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-5">
            {skeletonList.map((item, index) => (
                <div key={index}>
                    {item.value}
                </div>
            ))}
        </div>
    )
}

export default MarketPlaceInvestmentGrid
