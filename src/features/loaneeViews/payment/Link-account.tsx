import React from 'react'
import { Separator } from "@/components/ui/separator"
import { LinkIcon } from '@/reuseable/svg-icons/Icons';
import Image from 'next/image';
import BackButton from "@/components/back-button";
import { getInitial } from '@/utils/GlobalMethods';

interface Obj {
   bankName: string,
   logo: string,
   accountNumber: string
}

interface Props {
    numberOfAccounts: number,
    bankAccount: Obj,
    handleRouteClick: () => void
}


function LinkAccount({numberOfAccounts,bankAccount,handleRouteClick}: Props ) {
    
  const initials = getInitial(bankAccount?.bankName)

  return (
    <div className='md:flex  justify-between items-center bg-[#E8EAEE] rounded-2xl md:px-5 px-4 pb-4 md:pb-0'>
    <section id='sectionOne' className=' py-4 md:flex items-center gap-x-8'>
      <section className='flex items-center gap-3 relative md:right-0 right-2'>
      <LinkIcon className="w-14 h-14 text-[#142854]  transform scale-y-[1]" />
       <div>
        <p className='text-[#142854] font-medium'>Linked accounts</p>
        <p className='text-[#4D4E4D] font-normal text-[12px]'>Enjoy secure, automatic payments</p>
       </div>
       <div className='relative ml-11 hidden md:block'>
        <Separator orientation="vertical" className='bg-[#142854] h-10' />
      </div>
      </section>

      <section className='md:mt-0 mt-6'>
        <div>
        <p className='text-[#4D4E4D] font-normal text-[12px]'>Added accounts</p>
        <div className='mt-1 flex gap-3 items-center'>
       { bankAccount.logo? <Image
          src={bankAccount.logo}
          alt={"bank-image"}
          height={20}
          width={20}
          className="w-[27px] h-[27px] rounded-full"
        /> : <div className="w-[27px] h-[27px] text-[12px] flex items-center justify-center rounded-full bg-[#F3F8FF]">
           {initials}
          </div>}
         <div className='lg:flex gap-3 items-center'>
          <div className='flex gap-x-2 items-center'>
          <p className='text-[#212221] text-[14px]'>{bankAccount?.bankName}</p>
          <div className='lg:hidden block'>
          { numberOfAccounts > 1 && <p className='border-solid border-[1px] border-[#A8A8A8] w-8 h-8 rounded-full flex items-center justify-center '>
            <span className='text-[12px] text-[#4D4E4D] font-medium'>+{numberOfAccounts}</span>
          </p>}
          </div>
          </div>
          <span className='hidden lg:block'>●</span>
          <p className='text-[14px] text-[#4D4E4D]'>{bankAccount?.accountNumber}</p>
          <div className='hidden lg:block'>
         { numberOfAccounts > 1 && <p className='border-solid border-[1px] border-[#A8A8A8] w-8 h-8 rounded-full flex items-center justify-center '>
            <span className='text-[12px] text-[#4D4E4D] font-medium'>+{numberOfAccounts}</span>
          </p>}
          </div>
         </div>
        </div>
        </div>
      </section>
    </section>

     <section id='sectionTwo' className='flex md:flex-none justify-end '>
     <BackButton 
    id='routeButton'
    textColor={'meedlBlue'}
    text={'View'} 
    iconBeforeLetters={false}
    handleClick={handleRouteClick}
    className='font-medium text-[16px] mr-2'
    sx='text-[20px]'
   />
     </section>

    </div>
  )
}

export default LinkAccount
