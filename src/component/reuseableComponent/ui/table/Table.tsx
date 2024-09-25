import React from 'react'

interface Props {
   sx?: string; 
}

function Table({sx}: Props) {
  return (
    <div className={`${sx}`}>Table</div>
  )
}

export default Table