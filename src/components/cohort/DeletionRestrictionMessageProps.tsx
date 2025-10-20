import React from 'react'
import Image from 'next/image'
import { inter } from '@/app/fonts'

interface Props {
   totalNumberOfLoanee?: number;
   message?: string;
   imageStyle?: string;
   className?: string
}

function DeletionRestrictionMessageProps({totalNumberOfLoanee,message,imageStyle,className}:Props) {
  return (
    <div className={`${inter.className} ${className}`}>
    <div>
        <Image
            src={ `/Inner circle (1).png`}
            alt='image'
            width={30}
            height={30}
            className={`w-11  ${imageStyle}`}
        />
        <p className='mt-4 mb-5 text-[14px] text-[#475467]'>
        { message? message : `This cohort cannot be deleted as it contains ${ totalNumberOfLoanee && totalNumberOfLoanee > 1? "loanees" : "loanee"} `}
        </p>
        </div>
        </div>
  )
}

export default DeletionRestrictionMessageProps
