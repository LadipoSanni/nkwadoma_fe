import React from 'react'

interface Props {
    children: React.ReactNode;
    className?: string;
}

function Border({children,className}:Props) {
  return (
    <div className={`border-[1px] border-none md:border-solid border-[#A8A8A8] rounded-xl md:py-10 md:px-12 ${className}`}>
      {children}
    </div>
  )
}

export default Border
