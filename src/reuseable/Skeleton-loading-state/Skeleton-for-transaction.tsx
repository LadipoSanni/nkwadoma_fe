import React from 'react'
import {Skeleton} from '@/components/ui/skeleton'

interface Props {
    showMore?: boolean
}

function SkeletonForTransaction({showMore}:Props) {
  return (
    <div className='grid grid-cols-1 gap-y-5'>
     <div className='grid grid-cols-1 gap-y-2'>
     <Skeleton className="h-12 w-20 bg-[#F6F6F6]"/>
    <Skeleton className="h-40 w-full bg-[#F6F6F6]"/>
     </div>
     { showMore &&
     <div className='grid grid-cols-1 gap-y-5'>
      <div className='grid grid-cols-1 gap-y-2'>
        <Skeleton className="h-12 w-20 bg-[#F6F6F6]"/>
       <Skeleton className="h-40 w-full bg-[#F6F6F6]"/>
        </div>

        <div className='grid grid-cols-1 gap-y-2'>
        <Skeleton className="h-12 w-20 bg-[#F6F6F6]"/>
       <Skeleton className="h-40 w-full bg-[#F6F6F6]"/>
        </div>
  
     </div>
        
     }
    </div>
  )
}

export default SkeletonForTransaction
