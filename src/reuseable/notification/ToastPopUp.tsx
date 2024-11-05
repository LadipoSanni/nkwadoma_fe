import React from 'react'
import { useToast } from '@/hooks/use-toast';

type Props = {
  title?: string;
  description: string;
  className?: string;
  action?: React.ReactElement;
}

function ToastPopUp({title,description,className,action}: Props) {
  const { toast } = useToast();

  const showToast = () => {
    toast({
      title,
      description,
      action,
      className
    });
  };
  return { showToast };
 
}

export default ToastPopUp