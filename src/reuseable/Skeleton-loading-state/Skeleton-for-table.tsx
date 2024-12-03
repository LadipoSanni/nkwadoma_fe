import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

function SkeletonForTable() {
    
  return (
    <div className='h-52 w-full border-solid border-black'>
       <Skeleton className="h-16 w-full bg-[#F6F6F6]" /> 
       <Skeleton className="h-16 w-full  bg-[#F6F6F6] mt-2" />
       <Skeleton className="h-16 w-full bg-[#F6F6F6] mt-2" /> 
       <Skeleton className="h-16 w-full bg-[#F6F6F6] mt-2" /> 
       <Skeleton className="h-16 w-full bg-[#F6F6F6] mt-2" /> 
       <Skeleton className="h-16 w-full bg-[#F6F6F6] mt-2" /> 
       <Skeleton className="h-16 w-full bg-[#F6F6F6] mt-2" />
       <div className='flex justify-between  items-center'>
          <Skeleton className="h-16 w-32 bg-[#F6F6F6] mt-2 " />
          <div className='md:flex items-center justify-center gap-3 hidden '>
          <Skeleton className="h-10 w-10 rounded-full bg-[#F6F6F6] mt-2" />
          <Skeleton className="h-10 w-10 rounded-full bg-[#F6F6F6] mt-2" />
          <Skeleton className="h-10 w-10 rounded-full bg-[#F6F6F6] mt-2" />
          <Skeleton className="h-10 w-10 rounded-full bg-[#F6F6F6] mt-2" />
          <Skeleton className="h-10 w-10 rounded-full bg-[#F6F6F6] mt-2" />
          </div>
          <Skeleton className="h-16 w-32 bg-[#F6F6F6] mt-2" /> 
       </div>
    </div>
  )
}

export default SkeletonForTable