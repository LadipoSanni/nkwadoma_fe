import React, { ElementType,ReactNode } from 'react'

type Props = {
    name?:string,
    icon?: ElementType,
    className?:string ,
    isSearch?: boolean,
    message?: string | ReactNode
    iconSize?: string 
    iconContainerClass?: string 
    
}

function GeneralEmptyState({name,icon: Icon,className,isSearch,message,iconSize = "2.0rem",iconContainerClass}: Props) {
  
  return (
    <div className={`px-4  mt-20 ${className}`}>
       <div className='grid gap-1 justify-center text-center' >
       {/*<div>*/}
        <div className='flex justify-center text-center' >
         {Icon && 
          <div id='emptyStateIconId' data-testid="icon-container" className={`bg-lightBlue500 w-[70px] h-[70px] flex justify-center items-center rounded-full mb-5 ${iconContainerClass}`}>
         <Icon 
         style={{fontSize:iconSize,color:"#142854"}}
         />
         </div>
         }

         </div>
           {isSearch?
               <div className='flex gap-1 justify-center text-center' >
                   {name}
                   <p>not found</p>
               </div>
               :
                   <div>
                    {message}
                   </div>
                   }
               </div>
               {/*</div>*/}
               </div>
               )
           }

           export default GeneralEmptyState