import React from 'react'
import { LoanMetrics } from './Index'
import { inter,cabinetGrotesk } from '@/app/fonts';
import BasicDetail from "@/reuseable/details/BasicDetail";
import { getLoanStatusDisplay } from '@/utils/GlobalMethods';

interface Props{
    loanMetricsObject: LoanMetrics
}

function LoaneeModalDetail({loanMetricsObject}:Props) {

const dataDetail = [
       {label: "Organization", value: loanMetricsObject?.instituteName},
       {label: "Loan status", value: <span className={` pt-1 pb-1 rounded-xl  text-center px-2 ${loanMetricsObject?.performance  === "PERFORMING" ? "text-[#063F1A] bg-[#D0D5DD] w-[116px]" : loanMetricsObject?.performance  === "IN_MORATORIUM" ?  "bg-[#FEF6E8] text-[#66440A] w-[144px]" : "text-[#C1231D] bg-[#FBE9E9] w-[129px]" } `}>
                             {getLoanStatusDisplay(loanMetricsObject?.performance)}
                                    </span>},
        {label:"Interest earned", value:loanMetricsObject?.interestEarned},
        {label:"Amount disbursed", value:loanMetricsObject?.amountDisbursed},
        {label:"Loan outstanding", value:loanMetricsObject?.loanOutstanding},
        {label:"Amount repaid", value:loanMetricsObject?.amountRepaid},
        {label:"Amount earned", value:loanMetricsObject?.amountEarned},
      ]

  return (
    <div className={`${inter.className} max-h-[61.3vh] overflow-y-auto`}
    style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',  
          }}
    >
  <div className='mt-16 flex items-center gap-4 px-2'>
  <p  className={` rounded-full h-12 w-12 flex items-center justify-center text-[20px] bg-[#FEF6F0] text-[#68442E] text-sm font-semibold uppercase ${cabinetGrotesk.className}`}>
    {
        loanMetricsObject?.loaneeName
            ?.split(" ")
            .filter((word: string) => word.trim() !== "") 
            .filter((_: string, i: number, arr: string[]) => i === 0 || i === arr.length - 1)
            .map((word: string) => word[0].toUpperCase())
            .join("")
        }
    </p> 
     <p className='text-[#212221] font-medium'>
        { loanMetricsObject?.loaneeName} 
     </p>
  </div>
   <div className='h-[1px] w-full bg-[#D7D7D7] mt-4' />
   <div className='mb-3'>
     <BasicDetail dataList={dataDetail} isLoading={false} className='text-[14px] font-normal'/>
   </div>
    </div>
  )
}

export default LoaneeModalDetail
