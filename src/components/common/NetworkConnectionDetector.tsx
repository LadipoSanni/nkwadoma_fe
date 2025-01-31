import React, {useEffect} from 'react';
import {useToast} from "@/hooks/use-toast";

interface props {
    children: React.ReactNode;
}

const NetworkConnectionDetector = ({children}: props) => {
    const isOnline = navigator.onLine
    const {toast} = useToast();
    useEffect(() => {
        if (isOnline) {
            toast({
                status: 'success',
                description: `welcome back online`,
            })
        }else {
            toast({
                status: 'error',
                description: `No internet connection`,
            })
        }
    })
    return (
        <div>
            {children}
        </div>
    );
};

export default NetworkConnectionDetector;