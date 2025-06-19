import React from 'react'
import { ChevronLeft } from 'lucide-react'
import { ChevronRight } from 'lucide-react'


interface buttonInterface{
    handleLeftChange: () => void;
    handleRightChange: () => void;
    totalItem: number;
    trackCountFirst?: number;
    trackCountLast?: number;
    style?: string;
    hasNextPage?: boolean;
    pageNumber?: number
    testIdPrevious?: string;
    testIdNext?:string
}

function NotificationButton({handleLeftChange,handleRightChange,totalItem,trackCountFirst,trackCountLast,style,pageNumber,hasNextPage,testIdNext, testIdPrevious}:buttonInterface) {
  return (
    <div className={`flex items-center gap-4 ${style}`}>
      <div data-testid="count" className='text-[14px]'>
        {trackCountFirst} <span>-{trackCountLast} of {totalItem}</span>
      </div>
       <div className='flex gap-2'>
        <div 
        id='previous'
        data-testid={testIdPrevious}
        className={`rounded-full bg-[#f9f9f9] flex items-center h-7 w-7 justify-center ${pageNumber === 0? "cursor-none" : "cursor-pointer"}`}
        onClick={pageNumber !== 0? handleLeftChange : undefined}
        >
            <ChevronLeft 
            color={pageNumber === 0 ? "#B6BCCA" : "#435376"}
            className='h-4 bg-[#f9f9f9] '/>
        </div>
        <div 
         id='next'
         data-testid={testIdNext}
        onClick={hasNextPage? handleRightChange : undefined}  
        className={`rounded-full bg-[#f9f9f9] flex items-center h-7 w-7 justify-center ${!hasNextPage? "cursor-none" : "cursor-pointer"}`}
        
        >
            <ChevronRight 
            color={!hasNextPage?"#B6BCCA": "#435376"}
            className='h-4'
            
            />
        </div>
       </div>
    </div>
  )
}

export default NotificationButton
