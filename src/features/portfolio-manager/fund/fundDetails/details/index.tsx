import React from 'react'
import InfoCard from '@/reuseable/details/InfoCard'
import { MdOutlinePayments } from 'react-icons/md'
import InfoPanel from '@/reuseable/details/InfoPanel'
import { formatAmount } from '@/utils/Format'



const Details = () => {
  
  interface infoDetail {
    name: string;
    value: string | React.ReactNode;
}

  const detailInfo = [
    {name: 'Vehicle type', value: 'Commercial'},
    {name: 'Vehicle size', value: formatAmount("110000000")},
    {name: 'Vehicle status ', value: <p className={`w-14 h-6 bg-success50 flex justify-center items-center rounded-lg`}>open</p>},
    {name: 'Interest rate', value: '70%'},
    {name: 'Total amount in vehicle', value: formatAmount("990000000")},
    {name: 'Amount raised', value: formatAmount("10000000")},
    {name: 'Amount disbured', value:  formatAmount("10000000")},
    {name: 'Amount available', value: formatAmount("10000000")},
    {name: 'Total income generated',  value: formatAmount("10000000")},
    {name: 'Net asset value', value: formatAmount("10000000") },
   
  ]
  return (
    <div className='flex flex-col md:flex-row md:justify-between'>
      <div className='w-full'>
      <InfoCard 
          icon={MdOutlinePayments}
          fundTitle="Product marketing fund"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non felis ac massa condimentum consectetur. Nullam in libero vel arcu malesuada posuere. "
        />
      </div>
        <div  className='w-full'>
        <InfoPanel
          infoList={detailInfo}
        />
        </div>
    </div>
  )
}

export default  Details