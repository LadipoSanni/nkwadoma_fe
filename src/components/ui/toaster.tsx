"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { Separator } from "./separator"
import { MdOutlineCheck,MdOutlineWarning } from "react-icons/md"
import { Cross2Icon } from "@radix-ui/react-icons"

export function Toaster() {
  const { toasts } = useToast()


  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, status = "success",...props }) {

          const IconComponent = 
          status === "success" ? MdOutlineCheck : 
          status === "error" ? Cross2Icon : 
          status === "warning" ? MdOutlineWarning : 
          MdOutlineCheck;
        return (
          <Toast key={id} {...props} className={`border border-l-[8px]  ${status === "success"? "border-l-green500" : status === "error"? "border-l-error500" : "border-[#F3A218]"}`} style={{zIndex: 700}}>
            <div className="grid gap-1 " style={{zIndex: 700}}>
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
               <ToastDescription><div className="flex gap-2 items-center">
                <div className={` h-7 w-7 rounded-md flex items-center justify-center border border-opacity-30 ${status === "success"? "border-green500 bg-green50" : "border-error500 bg-error50"}`}><span className={`rounded-full  h-4 w-4 items-center justify-center flex ${status === "success"? "bg-green500" : status === "error"? "bg-error500" : "bg-[#F3A218]"}`}><IconComponent className={`text-white w-3 h-3 `}/></span></div>
               {description}</div></ToastDescription>
              )}
            </div>
            {action}
            <Separator orientation="vertical" className="h-6 relative left-2 md:left-6"/>
            <ToastClose />
          </Toast>
        )
      })}
       <ToastViewport />
    </ToastProvider>
  )
}
