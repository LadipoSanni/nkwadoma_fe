import React from 'react'
import { useToast } from '@/hooks/use-toast';

type Props = {
  title?: string;
  description: string;
  className?: string;
  action?: React.ReactElement;
  status?: "success" | "error";
}

function ToastPopUp({title,description,className,action,status = "success"}: Props) {
  const { toast } = useToast();

  const showToast = () => {
    toast({
      title,
      description,
      action,
      className,
      status
    });
  };
  return { showToast };
 
}

export default ToastPopUp