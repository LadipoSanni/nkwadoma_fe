import React,{ ElementType } from 'react'
import { cabinetGrotesk,inter } from '@/app/fonts'


type Props = {
  icon?: ElementType,
  fundTitle?: string,
  description?: string,
}

function          InfoCard({icon: Icon,fundTitle,description}: Props) {
  return (
    <div 
    // className='mb-9 md:mb-0 w-full'
    className='mb-9 md:mb-0 w-full flex flex-col  items-start'
    >
       <div className='mb-2 mt-2' >
         {Icon && 
          <div id='emptyStateIconId' data-testid="icon-container" className='bg-lightBlue500 w-32 h-32 flex justify-center items-center rounded-full mb-6 font-extrabold'>
         <Icon style={{fontSize:"3.2rem",color:"#142854"}}/>
         </div>
         }
         </div>
         <div className={` w-full`}>
         <p className={`w-full md:w-auto capitalize ${cabinetGrotesk.className}`}
         id='fundTitleId'
        style={{ height: "auto", maxHeight: "280px", overflowY: "auto", minWidth: "250px", maxWidth: "60%", wordWrap: "break-word", overflowWrap: "break-word", flex: "1 1 auto",fontSize:"24px" }}
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