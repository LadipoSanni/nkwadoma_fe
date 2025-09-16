import React,{ ElementType } from 'react'
import { cabinetGrotesk,inter } from '@/app/fonts'


type Props = {
  icon?: ElementType,
  fundTitle?: string,
  description?: string,
}

function  InfoCard({icon: Icon,fundTitle,description}: Props) {
  return (
    <div 
    // className='mb-9 md:mb-0 w-full'
    className='mb-9 md:mb-0 w-full flex flex-col  items-start'
    >
       <div className=' mt-2' >
         {Icon && 
          <div id='emptyStateIconId' data-testid="icon-container" className='bg-lightBlue500 h-[7.5rem] w-[7.5rem] flex justify-center items-center rounded-full mb-6 font-extrabold'>
         <Icon className={`h-[50px] w-[50px] text-meedlBlue`}/>
         </div>
         }
         </div>
         <div className={`relative bottom-[6px] w-full`}>
         <p className={`w-full md:w-auto capitalize ${cabinetGrotesk.className}`}
         id='fundTitleId'
        style={{ height: "auto", maxHeight: "280px", overflowY: "auto", minWidth: "250px", maxWidth: "95%", wordWrap: "break-word", overflowWrap: "break-word", flex: "1 1 auto",fontSize:"24px" }}
         >
          {fundTitle}
         </p>
         <p 
         className={`mt-3 w-full md:w-auto font-normal text-[#4D4E4D] ${inter.className}`}
          style={{ height: "auto",  maxHeight: "260px",  overflowY: "auto", minWidth: "320px", maxWidth: "70%",  fontSize:"14px" }}
          dangerouslySetInnerHTML={{__html: String(description)}}
         />
          {/* {description}
         </p> */}
         </div>
    </div>
  )
}

export default InfoCard