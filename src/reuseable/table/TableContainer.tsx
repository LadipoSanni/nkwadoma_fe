import React from 'react'
import { cn } from "@/lib/utils"

type Props = {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}& React.HTMLProps<HTMLDivElement>

const TableContainer: React.FC<Props>  = ({ children, className,style,...rest }) => {
  return (
    <div 
    className={cn('overflow-auto border  rounded-md ',className)}
    {...rest}
    style={{
      ...style,
      scrollbarWidth: 'none',
        msOverflowStyle: 'none', 
        
    }}
    >
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none; 
        }
      `}</style>
    {children}
    </div>
  )
}

export default TableContainer