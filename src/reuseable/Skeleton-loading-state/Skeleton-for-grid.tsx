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
        <div className="grid grid-cols-1 px-3 md:grid-cols-2 w-full sm:grid-cols-1 lg:grid-cols-3 gap-y-10 gap-x-4">
            {skeletonList.map((item, index) => (
                <div key={index}>
                    {item.value}
                </div>
            ))}
        </div>
    )
}

export default SkeletonForGrid