import React from 'react'
import SkeletonForSidebar from '@/reuseable/Skeleton-loading-state/Skeleton-for-sidebar';
import { inter } from '@/app/fonts';
import { ensureHttpsUrl } from "@/utils/GlobalMethods";

interface listObject {
    label: string,
    value: string
}

interface Props {
   dataList: listObject[],
   isLoading: boolean,
   websiteAddress?: string,
}

function BasicDetail({dataList,isLoading,websiteAddress}:Props) {
  return (
    <div>
    { isLoading? <div><SkeletonForSidebar/></div> 
       : <div className={`grid grid-cols-1 gap-y-5 mt-4  ${inter.className}`}>
       {dataList?.map((item, index) => (
  <div 
    id={`data-item-${index}`} 
    data-testid={`data-item-${index}`}
    key={index}
    className="font-medium text-sm grid grid-cols-1 gap-y-2"
  >
    <div className="text-black300">
      <span className={`text-[14px] font-normal ${inter.className}`}>{item.label}</span>
    </div>
    <div className="text-meedlBlack">
      {item.label === "Website" && websiteAddress !== "" ? (
        <a
          href={ensureHttpsUrl(websiteAddress)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-meedlBlue text-[14px] font-medium leading-[150%] underline"
        >
          {websiteAddress}
        </a>
      ) : (
        <span className={`text-[14px] font-semibold ${inter.className}`}>
          {item.value || "Not provided"}
        </span>
      )}
    </div>
  </div>
))}
    </div> }
    </div>
  )
}

export default BasicDetail
