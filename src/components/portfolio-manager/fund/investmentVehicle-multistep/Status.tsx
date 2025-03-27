import React from 'react'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {inter} from '@/app/fonts'
import Operation from './status-subcomponent/Operation'
import CouponDistribution from './status-subcomponent/Coupon-distribution'
import Closure from './status-subcomponent/Closure'

const tabData = [
    {
        name: "Operation",
        value: "operation"
    },
    {
        name: "Coupon distribution",
        value: "coupon"
    },
    {
        name: "Closure",
        value: "closure"
    },
]



function Status() {

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
        <p className='text-[14px] font-thin'>Select the status of your commercial fund</p>
       </div>
       <div>
        <Tabs defaultValue='operation'>
            <div className='relative right-2'>
            <TabsList className={`z-50  bg-white`}>
              {tabData.map((tab, index) => (
                <TabsTrigger className='bg-[#F6F6F6] lg:mx-1 mx-[1px] py-2 rounded-3xl data-[state=active]:bg-[#E8EAEE] data-[state=active]:text-[#142854] data-[state=active]:border-[#142854] data-[state=active]:border' id={`${tab.name}-${index}`} data-testid={`tabDataName${tab.value}`} value={tab.value} key={index}>
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
