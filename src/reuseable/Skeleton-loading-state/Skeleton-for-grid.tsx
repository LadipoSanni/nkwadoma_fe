import React from 'react'
import {Skeleton} from '@/components/ui/skeleton'


function SkeletonForGrid() {

    const skeletonList = [
        {value: <Skeleton className="h-[13.8125rem] md:max-w-lg bg-[#F9F9F9] "/>},
        {value: <Skeleton className="h-[13.8125rem] md:max-w-lg bg-[#F9F9F9]  "/>},
        {value: <Skeleton className="h-[13.8125rem] md:max-w-lg bg-[#F9F9F9]"/>},
        {value: <Skeleton className="h-[13.8125rem] md:max-w-lg bg-[#F9F9F9]"/>},
        {value: <Skeleton className="h-[13.8125rem] md:max-w-lg bg-[#F9F9F9]"/>},
        {value: <Skeleton className="h-[13.8125rem] md:max-w-lg bg-[#F9F9F9]"/>},
        {value: <Skeleton className="h-[13.8125rem] md:max-w-lg bg-[#F9F9F9]"/>},
        {value: <Skeleton className="h-[13.8125rem] md:max-w-lg bg-[#F9F9F9]"/>},
    ]
    return (
        <div className="grid grid-rows-1 md:grid-rows-2 lg:grid-rows-3 gap-4">
            {skeletonList.map((item, index) => (
                <div key={index}>
                    {item.value}
                </div>
            ))}
        </div>
    )
}

export default SkeletonForGrid