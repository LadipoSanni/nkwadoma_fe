import React from 'react'
import {inter} from "@/app/fonts"



interface infoDetail {
    name: string;
    value: string | React.ReactNode;
}

type Props = {
   infoList: infoDetail[]
   className?: string
}

function InfoPanel({infoList,className}: Props) {
  return (
    <div className={`border border-solid flex items-center justify-center w-full px-4  rounded-md text-[14px] mb-4 md:mb-0 mt-5 md:mt-0 ${className}`}>
        <div className='bg-[#F9F9F9] w-full rounded-md pt-4 pb-4 overflow-auto md:max-h-[64vh]'>
           {
            infoList && infoList.map((data,index) => (
                <div key={index} className={`flex flex-col md:flex-row  md:items-center md:justify-between w-full p-3   ${inter.className}`}>
                  <p className='  text-[#6A6B6A] mb-3 md:mb-0'>{data.name}</p>
                  <div className=' text-[#212221]'>{data.value}</div>
                </div>
            ))
           }
        </div>
    </div>
  )
}

export default InfoPanel