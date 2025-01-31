import React, {useEffect} from 'react';
import {useToast} from "@/hooks/use-toast";
import { useSyncExternalStore, useDebugValue } from 'react';

interface props {
    children: React.ReactNode;
}

const NetworkConnectionDetector = ({children}: props) => {
    const isOnline = useOnlineStatus();

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
    }, [isOnline]);

     function useOnlineStatus() {
        const isOnline = useSyncExternalStore(subscribe, () => navigator.onLine, () => true);
        useDebugValue(isOnline ? 'Online' : 'Offline');
        return isOnline;
    }

    function subscribe(callback: () => void) {
        window.addEventListener('online', callback);
        window.addEventListener('offline', callback);
        return () => {
            window.removeEventListener('online', callback);
            window.removeEventListener('offline', callback);
        };
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default NetworkConnectionDetector;