import {combineReducers} from "redux";
import adminLayoutReducer from "@/redux/slice/layout/adminLayout";
import selectedLoanReducer from "@/redux/slice/loan/selected-loan";
import authSliceReducer from "@/redux/slice/auth/slice";
import {authApi} from "@/service/auths/api"


const appReducer = combineReducers({

    adminLayout: adminLayoutReducer,
    selectedLoan: selectedLoanReducer,
    authSlice: authSliceReducer,
    [authApi.reducerPath]: authApi.reducer,
})

export default appReducer;