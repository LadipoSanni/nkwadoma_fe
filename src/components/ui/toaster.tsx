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
import ImageIcon from "../../../public/checkIcon.png"
import Image from "next/image"
import { Separator } from "./separator"

export function Toaster() {
  const { toasts } = useToast()


  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className="border border-l-[8px] border-l-green500">
            <div className="grid gap-1 ">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
               <ToastDescription><div className="flex gap-2 items-center"><Image src={ImageIcon} width={100} height={100} alt="icon" className="w-6 h-6"/> {description}</div></ToastDescription>
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
