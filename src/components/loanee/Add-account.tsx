import React from 'react'
import { LinkIcon } from '@/reuseable/svg-icons/Icons';
import { inter } from '@/app/fonts';

function AddAccount() {
  return (
    <div className={`${inter.className} w-full`}>
      <LinkIcon className="w-[60px] h-[60px] text-[#142854]  transform scale-y-[1]" />
      <div>
        <p className='text-[#212221] text-[20px] font-medium'>Add new account</p>
        <p className='text-[#4D4E4D] text-[14px] mt-1'>Select one or more accounts to add</p>
      </div>
      <div className='w-full'>
        
      </div>
    </div>
  )
}

export default AddAccount
