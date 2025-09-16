import React from 'react'
import {Skeleton} from '@/components/ui/skeleton'

function SkeletonForSidebar() {
  return (
    <div className='grid grid-cols-1 gap-y-3'>
         <Skeleton className="h-11  w-60 rounded-full bg-[#F6F6F6] mt-2 mb-2"/>
         <Skeleton className="h-11 w-60 rounded-full bg-[#F6F6F6] mt-2"/>
        <Skeleton className="h-11 w-60 rounded-full bg-[#F6F6F6] mt-2"/>
        <Skeleton className="h-11 w-60 rounded-full bg-[#F6F6F6] mt-2"/>
        <Skeleton className="h-11 w-60 rounded-full bg-[#F6F6F6] mt-2"/>
        <Skeleton className="h-11 w-60 rounded-full bg-[#F6F6F6] mt-2"/>
        <Skeleton className="h-11 w-60 rounded-full bg-[#F6F6F6] mt-2"/>
    </div>
  )
}

export default SkeletonForSidebar