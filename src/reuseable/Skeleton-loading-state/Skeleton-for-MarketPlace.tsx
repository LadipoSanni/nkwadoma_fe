import React from 'react'
import {Skeleton} from '@/components/ui/skeleton'


function MarketPlaceInvestmentGrid() {

    const skeletonList = [
        {value: <Skeleton className="h-[328px] w-36  bg-[#F9F9F9] "/>},
        {value: <Skeleton className="h-[328px] w-36  bg-[#F9F9F9] "/>},
        {value: <Skeleton className="h-[328px] w-36  bg-[#F9F9F9] "/>},
        {value: <Skeleton className="h-[328px] w-36  bg-[#F9F9F9] "/>},
        {value: <Skeleton className="h-[328px] w-36  bg-[#F9F9F9] "/>},
        {value: <Skeleton className="h-[328px] w-36  bg-[#F9F9F9] "/>},
        {value: <Skeleton className="h-[328px] w-36  bg-[#F9F9F9] "/>},
        {value: <Skeleton className="h-[328px] w-36 bg-[#F9F9F9] "/>},
        {value: <Skeleton className="h-[328px] w-36  bg-[#F9F9F9] "/>},
        {value: <Skeleton className="h-[328px] w-36  bg-[#F9F9F9] "/>},
        {value: <Skeleton className="h-[328px] w-36  bg-[#F9F9F9] "/>},
        {value: <Skeleton className="h-[328px] w-36  bg-[#F9F9F9] "/>},
        {value: <Skeleton className="h-[328px] w-36  bg-[#F9F9F9] "/>},
        // {value: <Skeleton className=" w-40 bg-[#F9F9F9]  "/>},
        // {value: <Skeleton className=" w-40 bg-[#F9F9F9]"/>},
        // {value: <Skeleton className=" w-40  bg-[#F9F9F9]"/>},
        // {value: <Skeleton className="bg-[#F9F9F9]"/>},
        // {value: <Skeleton className="bg-[#F9F9F9]"/>},
        // {value: <Skeleton className="bg-[#F9F9F9]"/>},
        // {value: <Skeleton className=" bg-[#F9F9F9]"/>},
        // {value: <Skeleton className=" bg-[#F9F9F9]"/>},
        // {value: <Skeleton className=" bg-[#F9F9F9]"/>},
        // {value: <Skeleton className=" bg-[#F9F9F9]"/>},
        // {value: <Skeleton className=" bg-[#F9F9F9]"/>},
        // {value: <Skeleton className=" bg-[#F9F9F9]"/>},
        // {value: <Skeleton className=" bg-[#F9F9F9]"/>},
    ]
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {skeletonList.map((item, index) => (
                <div key={index}>
                    {item.value}
                </div>
            ))}
        </div>
    )
}

export default MarketPlaceInvestmentGrid
