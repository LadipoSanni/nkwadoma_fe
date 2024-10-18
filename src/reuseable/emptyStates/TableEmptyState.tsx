import React, { ElementType } from 'react'

type Props = {
    name:string,
    icon: ElementType,
    className:string,
}

function TableEmptyState({name,icon: Icon,className}: Props) {
  return (
    <div className='px-4'>
       <div>
        < Icon />
       </div>
    </div>
  )
}

export default TableEmptyState