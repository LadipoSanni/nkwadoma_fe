import React from 'react'
import {Skeleton} from '@/components/ui/skeleton'


function SkeletonForGrid() {

    const skeletonList = [
        {value: <Skeleton className="h-72 w-full bg-[#F9F9F9] "/>},
        {value: <Skeleton className="h-72 w-full bg-[#F9F9F9]  "/>},
        {value: <Skeleton className="h-72 w-full bg-[#F9F9F9]"/>},
        {value: <Skeleton className="h-72 w-full bg-[#F9F9F9]"/>},
        {value: <Skeleton className="h-72 w-full bg-[#F9F9F9]"/>},
        {value: <Skeleton className="h-72 w-full bg-[#F9F9F9]"/>},
        {value: <Skeleton className="h-72 w-full bg-[#F9F9F9]"/>},
        {value: <Skeleton className="h-72 w-full bg-[#F9F9F9]"/>},
    ]
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skeletonList.map((item, index) => (
                <div key={index}>
                    {item.value}
                </div>
            ))}
        </div>
    )
}

export default SkeletonForGrid