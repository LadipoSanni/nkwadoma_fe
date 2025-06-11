import React from 'react'
import { MdOutlineInfo } from 'react-icons/md';
import {inter} from "@/app/fonts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppSelector } from '@/redux/store';
import { store } from "@/redux/store";
import { setCurrentCsvStatus } from '@/redux/slice/csv/csv';
import UploadForm from './Upload-form';


interface Props{
setIsOpen : (e: boolean) => void;
loaneeRefetch?: (() => void) | null;
}

const tabData = [
    { name: "Loanee data", value: "loaneeData" },
    { name: "Repayment", value: "repayment" },
   
];

function UploadCSV({setIsOpen,loaneeRefetch}:Props) {
    const tabType = useAppSelector(state => state?.csv?.uploadCsvTab)

    const tabContent = [
        {
            value: "loaneeData",
            formData: <div>
             <UploadForm
              uploadType='loaneeData'
              setIsOpen={setIsOpen}
              loaneeRefetch={loaneeRefetch}
             />
            </div>
        },
        {
            value: "repayment", 
            formData: <div>
              <UploadForm
              uploadType='repaymentData'
              setIsOpen={setIsOpen}
              loaneeRefetch={loaneeRefetch}
             />
            </div>  
        }
    ]
  return (
    <div className={`${inter.className} py-4`}>
      <div className={`bg-[#FEF6E8] flex gap-2 px-4 items-center py-3 rounded-md`}>
        <MdOutlineInfo color='#66440A' className='w-8 h-5'/>
        <p className='text-[14px] text-[#66440A]'>Download the template before uploading csv</p>
      </div>
      <div className='mt-5'>
       <Tabs
       value={tabType} 
       onValueChange={(value) => {
        store.dispatch(setCurrentCsvStatus(value))
       }}
       >
       <TabsList >
         {tabData.map((tab, index) => (
                               <TabsTrigger 
                                   id={`${tab.name}-${index}`} 
                                   data-testid={`tabDataName${tab.value}`} 
                                   value={tab.value} 
                                   key={index}
                               >
                                   {tab.name}
                               </TabsTrigger>
                           ))}
       </TabsList>
       {
        tabContent.map((tab, index) => (
            <TabsContent key={index} value={tab.value} className='mt-5'>
               {tab.formData}
            </TabsContent>
        ))
       }
       </Tabs>
      </div>
    </div>
  )
}

export default UploadCSV
