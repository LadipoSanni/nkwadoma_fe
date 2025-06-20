import {getUserDetailsFromStorage} from "@/components/topBar/action";
import {redirect} from "next/navigation";
import {useToast} from "@/hooks/use-toast";
import {isTokenExpired} from "@/utils/GlobalMethods";
import {clearData} from "@/utils/storage";
import {persistor} from "@/redux/store";
import {useLogoutMutation} from "@/service/users/api";

const RefreshUserToken = () => {
    const refreshToken = getUserDetailsFromStorage('refresh_token' )
    const [refreshUserToken ] = useRefreshTokenMutation()

    console.log('token',token)
    console.log('refresh_token',refreshToken)
    const {toast} = useToast()
    const response = isTokenExpired(token ? token : '')
    const response2 = isTokenExpired(refreshToken ? refreshToken : '')
    console.log('response',response)
    console.log('response2',response2)
    useEffect(() => {
        checkUserToken(response)
    }, [response, response2,token,refreshToken]);

    const checkUserToken = (isTokenExpired: boolean) => {
        if (isTokenExpired ) {
            logout({})
            toast({
                description: "Session expired. Please login again",
                status: "error",
            });
            clearData()
            persistor.purge();
            redirect("/auth/login")
        }
    }
    return null
};

export default RefreshUserToken;