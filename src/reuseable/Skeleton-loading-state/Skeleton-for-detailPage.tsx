import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

function SkeletonForDetailPage() {
  return (
    <div className='mt-4 px-10'>
       <Skeleton className="h-7 w-44  bg-[#F9F9F9]" />  
        <Skeleton className="h-10 mt-4 w-48  bg-[#F9F9F9]" />
        <div className='md:grid grid-cols-2 gap-40'>
        <div >
        <Skeleton className="h-52 mt-4 w-full  bg-[#F9F9F9]" />
        <Skeleton className="h-10 mt-4 w-64  bg-[#F9F9F9]" />
        <Skeleton className="h-24 mt-4 w-64  bg-[#F9F9F9]" />
        </div>
        <div>
        <Skeleton className="h-10 mt-4 w-64  bg-[#F9F9F9]" /> 
        <Skeleton className="h-[25rem] mt-4 w-full  bg-[#F9F9F9]" />
        </div>
        </div>
    </div>
  )
}

export default SkeletonForDetailPage