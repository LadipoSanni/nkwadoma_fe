import React from 'react'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {inter} from '@/app/fonts'
import Operation from './status-subcomponent/Operation'
import CouponDistribution from './status-subcomponent/Coupon-distribution'
import Closure from './status-subcomponent/Closure'
import {useAppSelector} from "@/redux/store";



interface Props {
    disabledTabs?: string[];
}

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



const Status = ({disabledTabs}: Props)=> {
    const vehicleType = useAppSelector(state => (state?.vehicle?.vehicleType))
     const statusType = useAppSelector(state => (state?.vehicle?.setEditStatus))
     const defaultValue = useAppSelector(state => (state?.vehicle?.statusDefaultValue))
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
    <div className={`${inter.className}  grid grid-cols-1 gap-y-8 ${statusType === "changeStatus"? "xl:px-80 lg:px-60 md:px-40 px-10 lg:ml-12" : "xl:px-36 relative md:right-6 lg:right-0 "}`}>
      <div className='grid grid-cols-1 gap-y-1'>
        <h1 className='text-[18px] font-normal'>Status</h1>
    <p className='text-[14px] font-normal'>Select the status of your {vehicleType} fund</p>
       </div>
       <div>
        <Tabs defaultValue={defaultValue? defaultValue : "operation"}>
            <div className='relative right-2'>
            <TabsList id='clickswitch' className={`z-50  bg-white`}>
              {tabData.map((tab, index) => (
                <TabsTrigger 
                className='bg-[#F6F6F6] mx-1  py-2 rounded-3xl data-[state=active]:bg-[#E8EAEE] data-[state=active]:text-[#142854] data-[state=active]:border-[#142854] data-[state=active]:border' 
                id={`${tab.value}-${index}`} 
                data-testid={`tabDataName${tab.value}`} 
                value={tab.value} 
                key={index} onClick={(e)=> e.preventDefault}
                disabled={disabledTabs?.includes(tab.value)}
                >
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
