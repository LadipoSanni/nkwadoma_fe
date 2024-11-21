import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

function SkeletonForForm() {
  return (
    <div   className='grid grid-cols-1 gap-y-4 w-full'>
      <div>
      <Skeleton className="h-7 w-36  bg-[#F9F9F9]" />
        <Skeleton className="h-12 w-full mt-2 bg-[#F9F9F9]" />
      </div>
      <div>
      <Skeleton className="h-7 w-36  bg-[#F9F9F9]" />
        <Skeleton className="h-12 w-full mt-2 bg-[#F9F9F9]" />
      </div>
      <div className='grid md:grid-cols-2 gap-4 w-full'>
        <div>
        <Skeleton className="h-7 w-36 bg-[#F9F9F9]" />
        <Skeleton className="h-12 w-full mt-2 bg-[#F9F9F9]" />
        </div>
        <div>
        <Skeleton className="h-7 w-36 bg-[#F9F9F9]" />
        <Skeleton className="h-12 w-full mt-2 bg-[#F9F9F9]" />
        </div>
      </div>
      <div>
      <Skeleton className="h-7 w-36 bg-[#F9F9F9]" />
        <Skeleton className="h-28 w- mt-2 bg-[#F9F9F9]" />
      </div>
      <div className='md:flex gap-4 justify-end mt-2 mb-4 md:mb-0'>
      <Skeleton className="h-16 w-full md:w-36  mb-4 bg-[#F9F9F9]" />
      <Skeleton className="h-16 w-full  md:w-36  mb-4 bg-[#F9F9F9]" />
      </div>
    </div>
  )
}

export default SkeletonForForm