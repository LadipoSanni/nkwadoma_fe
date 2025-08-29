import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {inter} from "@/app/fonts";

interface tabProps{
    value: string;
    name: string;
    component: React.ReactNode;
}

interface Props{
    tabData: tabProps[]
    defaultTabValue:string
}

function BasicDetailTab({tabData,defaultTabValue}:Props) {

  return (
    <div>
     <Tabs defaultValue={defaultTabValue || tabData[0]?.value}>
        <TabsList defaultValue={defaultTabValue || tabData[0]?.value} className={`z-50 text-[14px] ${inter.className}  w-full bg-white justify-start border-b-[#ECECEC] border-solid border-b-[1px] rounded-none`}>
         {tabData.map((tab, index) => (
                   <TabsTrigger 
                   id={`${tab.name}-${index}`} 
                   data-testid={`tabDataName${tab.value}`} 
                   value={tab.value} key={index}
                   className=' rounded-none py-[6px] px-3 data-[state=active]:border-b-[#142854] border-solid data-[state=active]:border-b-[2px] data-[state=active]:text-[#142854] text-[14px]'
                   >
                     {tab.name}
                   </TabsTrigger>
                 ))}
        </TabsList>
        {tabData.map((tab) => (
                    <TabsContent key={tab.value} value={tab.value} className='mt-4'>
                        {tab.component}
                    </TabsContent>
         ))}
     </Tabs> 
    </div>
  )
}

export default  BasicDetailTab