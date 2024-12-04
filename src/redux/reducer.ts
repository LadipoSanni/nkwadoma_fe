import {combineReducers} from "redux";
import adminLayoutReducer from "@/redux/slice/layout/adminLayout";
import selectedLoanReducer from "@/redux/slice/loan/selected-loan";
import authSliceReducer from "@/redux/slice/auth/slice";
import {authApi} from "@/service/auths/api"
import { programApi } from "@/service/admin/program_query";
import { cohortApi } from "@/service/admin/cohort_query";
import { userApi } from "@/service/users/api";
import {organizationApi} from "@/service/admin/organization";


const appReducer = combineReducers({

    adminLayout: adminLayoutReducer,
    selectedLoan: selectedLoanReducer,
    authSlice: authSliceReducer,
    [authApi.reducerPath]: authApi.reducer,
    [programApi.reducerPath]: programApi.reducer,
    [cohortApi.reducerPath]: cohortApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [organizationApi.reducerPath] : organizationApi.reducer,
})

export default appReducer;