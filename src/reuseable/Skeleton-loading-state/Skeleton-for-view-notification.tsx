import React from 'react'
import {Skeleton} from '@/components/ui/skeleton'

function SkeletonForViewNotification() {
  return (
    <div className='px-2 '>
    <div className='md:pr-6'> <Skeleton className="h-12 w-full bg-[#F6F6F6]"/></div>
     <div className='mt-4 flex justify-between '>
     <Skeleton className="h-12 w-32 bg-[#F6F6F6]"/>
     <Skeleton className="h-12 w-12 bg-[#F6F6F6]"/>  
     </div>
     <div className='mt-6 grid grid-cols-1 gap-y-2'>
     <Skeleton className="h-12 w-full bg-[#F6F6F6]"/>
     <Skeleton className="h-12 w-full bg-[#F6F6F6]"/>
     <Skeleton className="h-12 w-full bg-[#F6F6F6]"/>
     <Skeleton className="h-12 w-full bg-[#F6F6F6]"/>
     <Skeleton className="h-12 w-full bg-[#F6F6F6]"/>
     <Skeleton className="h-12 w-full bg-[#F6F6F6]"/> 
     <Skeleton className="h-12 w-full bg-[#F6F6F6]"/>
     <div className='flex justify-end'>
        <Skeleton className="h-8 w-24 bg-[#F6F6F6]"/></div>
     </div>
    </div>
  )
}

export default SkeletonForViewNotification
