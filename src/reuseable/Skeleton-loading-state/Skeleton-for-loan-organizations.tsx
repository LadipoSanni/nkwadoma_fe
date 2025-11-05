import React from 'react'
import {Skeleton} from '@/components/ui/skeleton'

interface Props {
    className?: string
}

function SkeletonForLoanOrg({className}:Props) {

    const skeletonList = [
        {value: <Skeleton className={`h-11 w-full bg-[#F9F9F9] ${className} `}/>},
        {value: <Skeleton className={`h-11 w-full bg-[#F9F9F9] ${className} `}/>},
        {value: <Skeleton className={`h-11 w-full bg-[#F9F9F9] ${className} `}/>},
        {value: <Skeleton className={`h-11 w-full bg-[#F9F9F9] ${className} `}/>},
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