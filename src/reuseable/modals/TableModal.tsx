
import styles from "./styles.module.css";
import * as Dialog from "@radix-ui/react-dialog";
import { cabinetGrotesk } from '@/app/fonts'
import { ElementType} from "react";

interface Props {
    isOpen: boolean;
    closeModal?: () => void;
    className?: string;
    children: React.ReactNode;
    style?: React.CSSProperties;
    closeOnOverlayClick?: boolean;
    headerTitle?: string;
    icon?: ElementType;
    description?: string;
    width?: string;
}   



export default function TableModal({isOpen, children, closeModal, closeOnOverlayClick,className,style, headerTitle,icon:Icon,description,width}: Props) {

  
  return (
    <Dialog.Root
    open={isOpen}
    onOpenChange={(open) => !open && closeModal?.()}
    >
    <Dialog.Portal>
      <Dialog.Overlay 
      className={`${styles.overlay}`}
      onClick={!closeOnOverlayClick ? closeModal : undefined}
      >
      <Dialog.DialogContent
       className={`${styles.body} ${className || ""} px-5`}
       style={{ ...style, "--modal-width": width} as React.CSSProperties}
      >
        <div className="mt-3 ">
        <Dialog.DialogTitle>
          {headerTitle? <span role="button" className={`text-[28px] font-bold text-gray-900 ${cabinetGrotesk.className}`}>{headerTitle}</span> : null}  
        </Dialog.DialogTitle>
         <Dialog.Close asChild>
            <div
              className="absolute top-6 right-5 text-gray-500 hover:text-gray-800 border-none cursor-pointer"
              onClick={closeModal}
            >
             { 
              Icon && <Icon className="h-5 w-5 text-grey400" />
              
             } 
            </div>
          </Dialog.Close>
        </div>
      <Dialog.Description>
       {description}
    </Dialog.Description>
         <div className="mt-2 w-full">
         {children}
         </div>
      </Dialog.DialogContent>

      </Dialog.Overlay>
      
    </Dialog.Portal>

    </Dialog.Root>
  )
}

