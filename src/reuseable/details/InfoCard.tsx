import React,{ ElementType } from 'react'
import { cabinetGrotesk } from '@/app/fonts'


type Props = {
  icon?: ElementType,
  fundTitle?: string,
  description?: string,
}

function InfoCard({icon: Icon,fundTitle,description}: Props) {
  return (
    <div className='mb-9 md:mb-0'>
       <div className='mb-9' >
         {Icon && 
          <div id='emptyStateIconId' data-testid="icon-container" className='bg-lightBlue500 w-32 h-32 flex justify-center items-center rounded-full mb-6'>
         <Icon style={{fontSize:"3.2rem",color:"#142854"}}/>
         </div>
         }
         </div>
         <div className={`${cabinetGrotesk.className}`}>
         <h1 className='w-full md:w-auto'
         style={{ fontSize: "28px", minWidth: "150px", maxWidth: "70%", overflowY: "auto", height: "auto",  maxHeight: "200px", }}
         >
          {fundTitle}
         </h1>
         <p 
         className=' mt-3 w-full md:w-auto'
          style={{ height: "auto",  maxHeight: "280px",  overflowY: "auto", minWidth: "280px", maxWidth: "50%" }}
         >
          {description}
         </p>
         </div>
    </div>
  )
}

export default InfoCard