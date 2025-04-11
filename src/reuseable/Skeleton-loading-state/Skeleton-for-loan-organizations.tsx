import React from 'react'
import {Skeleton} from '@/components/ui/skeleton'


function SkeletonForLoanOrg() {

    const skeletonList = [
        {value: <Skeleton className="h-11 w-full bg-[#F9F9F9] "/>},
        {value: <Skeleton className="h-11 w-full bg-[#F9F9F9] "/>},
        {value: <Skeleton className="h-11 w-full bg-[#F9F9F9]"/>},
        {value: <Skeleton className="h-11 w-full bg-[#F9F9F9]"/>},
    ]
    return (
        <div className="grid grid-cols-1 gap-4 ">
            {skeletonList.map((item, index) => (
                <div key={index}>
                    {item.value}
                </div>
            ))}
        </div>
    )
}

export default SkeletonForLoanOrg