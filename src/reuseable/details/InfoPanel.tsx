import React from 'react'
import {inter} from "@/app/fonts"



interface infoDetail {
    name: string;
    value: string | React.ReactNode;
}

type Props = {
   infoList: infoDetail[]
}

function InfoPanel({infoList}: Props) {
  return (
    <div className={`border border-solid flex items-center justify-center w-full px-4 py-4 rounded-md text-[14px]`}>
        <div className='bg-[#F9F9F9] w-full rounded-md pt-4 pb-4 overflow-auto lg:max-h-[60vh]'>
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