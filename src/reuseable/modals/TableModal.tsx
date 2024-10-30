
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
}



export default function TableModal({isOpen, children, closeModal, closeOnOverlayClick,className,style, headerTitle,icon:Icon,description}: Props) {
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
       style={{ ...style }}
      >
        <div className="mt-3 ">
        <Dialog.DialogTitle>
          {headerTitle? <h1 className={`text-[28px] font-bold text-gray-900 ${cabinetGrotesk.className}`}>{headerTitle}</h1> : null}  
        </Dialog.DialogTitle>
         <Dialog.Close asChild>
            <button
              className="absolute top-6 right-5 text-gray-500 hover:text-gray-800 border-none"
              onClick={closeModal}
            >
             { 
              Icon && <Icon className="h-5 w-5 text-grey400" />
              
             } 
            </button>
          </Dialog.Close>
        </div>
        <Dialog.Description>
      <p className="">
       {description}
      </p>
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

