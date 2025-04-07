import React from 'react'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {inter} from '@/app/fonts'
import Operation from './status-subcomponent/Operation'
import CouponDistribution from './status-subcomponent/Coupon-distribution'
import Closure from './status-subcomponent/Closure'
import {useAppSelector} from "@/redux/store";

const tabData = [
    {
        name: "Operation",
        value: "operation"
    },
    {
        name: "Coupon",
        value: "coupon"
    },
    {
        name: "Closure",
        value: "closure"
    },
]



function Status() {
    const vehicleType = useAppSelector(state => (state?.vehicle?.vehicleType))
    const tabContent = [
        {
            value: "operation",
            form: <div>
               <Operation/>
                </div>
        },

        {
            value: "coupon",
            form: <div>
                  <CouponDistribution/>
                  </div>
        },
        {
            value: "closure",
            form: <div>
                   <Closure/>
                  </div>
        },
    ]
  return (
    <div className={`${inter.className} xl:px-36 grid grid-cols-1 gap-y-8 relative md:right-6 lg:right-0`}>
      <div className='grid grid-cols-1 gap-y-1'>
        <h1 className='text-[18px] font-normal'>Status</h1>
    <p className='text-[14px] font-normal'>Select the status of your {vehicleType} fund</p>
       </div>
       <div>
        <Tabs defaultValue='operation'>
            <div className='relative right-2'>
            <TabsList id='clickswitch' className={`z-50  bg-white`}>
              {tabData.map((tab, index) => (
                <TabsTrigger className='bg-[#F6F6F6] mx-1  py-2 rounded-3xl data-[state=active]:bg-[#E8EAEE] data-[state=active]:text-[#142854] data-[state=active]:border-[#142854] data-[state=active]:border' id={`${tab.value}-${index}`} data-testid={`tabDataName${tab.value}`} value={tab.value} key={index} onClick={(e)=> e.preventDefault}>
                    {tab.name}
                </TabsTrigger>
            ))}
            </TabsList>
            </div>
           
            {
                tabContent.map((tab, index)=> (
                 <TabsContent key={index} value={tab.value}>
                    <div className='mt-10 '>{tab.form}</div>
                 </TabsContent>
                ))
            }
        </Tabs>
       </div>
    </div>
  )
}

export default Status
