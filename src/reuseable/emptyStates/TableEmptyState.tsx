import React, { ElementType } from 'react'

type Props = {
    name?:string,
    icon?: ElementType,
    className?:string ,
    optionalFilterName?:string
}

function TableEmptyState({name,icon: Icon,className, optionalFilterName}: Props) {
  // const lowercaseName = name?.charAt(0).toLowerCase() 
  // const remainingPart = name?.slice(1);
  // const title = `${lowercaseName}${remainingPart}`;

  return (
    <div className={`px-4 md:mt-36 mt-28 ${className}`}>
       <div className='flex justify-center text-center' >
       <div>
        <div className='flex justify-center text-center' >
         {Icon && 
          <div id='emptyStateIconId' data-testid="icon-container" className='bg-lightBlue500 w-20 h-20 flex justify-center items-center rounded-full mb-6'>
         <Icon style={{fontSize:"2.0rem",color:"#142854"}}/>
         </div>
         }
         </div>
         <h1 id='titleId' className='font-semibold mb-2 capitalize'>{name}s will show here</h1> 
        
         <p id='bodyMessageId' className='text-foundationBlue800 md:w-96 w-72 lowercase'>There are no {optionalFilterName} {name}s available yet. To create a  <span className='lowercase'>{name}</span>, click on the  <span className='font-semibold lowercase'>create {name}</span> button</p> 
          </div>
       </div>
    </div>
  )
}

export default TableEmptyState