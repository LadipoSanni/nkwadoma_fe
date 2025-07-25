import React from 'react'
import SkeletonForTable from './Skeleton-for-table'
import {Skeleton} from '@/components/ui/skeleton'

function SkeletonForDetail() {
  return (
    <div >
        <div >
             <Skeleton className="h-12 w-[100px] bg-[#F6F6F6]"/>
             <div className='mt-3 flex items-center justify-between'>
             <Skeleton className="h-12 w-[350px]  bg-[#F6F6F6] "/>
             <Skeleton className="h-12 w-[100px] bg-[#F6F6F6] "/>
             </div>
        </div>
        <div className='mt-2'>
        <SkeletonForTable/>
        </div>
     
    </div>
  )
}

export default  SkeletonForDetail
