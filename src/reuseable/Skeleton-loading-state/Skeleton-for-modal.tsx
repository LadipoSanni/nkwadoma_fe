import React from 'react'
import {Skeleton} from '@/components/ui/skeleton'


function SkeletonForModal() {
  return (
    <div>
       <Skeleton className="h-6 w-full rounded-full bg-[#F6F6F6] mt-2"/>
        <Skeleton className="h-6 w-full rounded-full bg-[#F6F6F6] mt-2"/>
        <div className='mt-5'>
        <Skeleton className="h-6 w-full rounded-full bg-[#F6F6F6] mt-2"/>
        </div>
        <div className='md:flex justify-between mt-5 mb-4'>
        <Skeleton className="h-10 w-full md:w-20 rounded-full bg-[#F6F6F6] mt-2"/>
        <Skeleton className="h-10 w-full  md:w-20 rounded-full bg-[#F6F6F6] mt-2"/>  
        </div>
    </div>
  )
}

export default SkeletonForModal
