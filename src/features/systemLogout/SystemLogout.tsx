import {redirect, usePathname} from 'next/navigation';
import { useIdleTimer } from 'react-idle-timer';
// import authService from "@/services/auth.service";
import {useLogoutMutation} from "@/service/users/api";
import {clearData} from "@/utils/storage";
import {persistor} from "@/redux/store";
import {useToast} from "@/hooks/use-toast";

export default function SystemLogout() {
    const pathname = usePathname();
    const [logout] = useLogoutMutation()
    const {toast} = useToast()


    const logouts = async() => {
        if (!pathname?.includes('/auth') ) {
            logout({})
            toast({
                description: "Session expired. Please login again",
                status: "error",
            });
            await persistor.purge();
            clearData()
            redirect("/auth/login")
        }

        }

    const onIdle =  () => {
        // pathname && !pathname.startsWith('/auth') && logouts()
            logouts()
    };

    useIdleTimer({
        onIdle,
        timeout: 600_000,
        // timeout: 180_000,
        // timeout: 60_000,
    });

    return null;
}