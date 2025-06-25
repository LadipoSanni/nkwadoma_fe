import React from 'react'
import {Skeleton} from '@/components/ui/skeleton'

function SkeletonforNotificationDetails() {
  return (
    <div>
    <Skeleton className="h-8 w-28 bg-[#F6F6F6]"/>
      <div className='mt-6 flex justify-start gap-4'>
        <Skeleton className="h-12 w-12 rounded-full bg-[#F6F6F6] "/>
        <Skeleton className="h-12 w-48 bg-[#F6F6F6]"/>
      </div>
      <div className='mt-6 grid grid-cols-1 gap-y-6'>
      <Skeleton className="h-12 w-36 bg-[#F6F6F6]"/>
       <Skeleton className="h-12 w-full bg-[#F6F6F6]"/>
      <Skeleton className="h-12 w-full bg-[#F6F6F6]"/>
        <Skeleton className="h-12 w-full bg-[#F6F6F6]"/>
      </div>
    </div>
  )
}

export default SkeletonforNotificationDetails
