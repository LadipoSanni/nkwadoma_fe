import {combineReducers} from "redux";
import adminLayoutReducer from "@/redux/slice/layout/adminLayout";
import selectedLoanReducer from "@/redux/slice/loan/selected-loan";
import authSliceReducer from "@/redux/slice/auth/slice";
import {authApi} from "@/service/auths/api"
import { programApi } from "@/service/admin/program_query";
import { cohortApi } from "@/service/admin/cohort_query";
import { userApi } from "@/service/users/api";
import {organizationApi} from "@/service/admin/organization";
import {loaneeSlice} from "@/redux/slice/loanee/Loanee_slice";
// import {loaneeApi} from "@/service/users/Loanee_query";

const appReducer = combineReducers({

    adminLayout: adminLayoutReducer,
    selectedLoan: selectedLoanReducer,
    authSlice: authSliceReducer,
    loaneeReducer: loaneeSlice,
    [authApi.reducerPath]: authApi.reducer,
    [programApi.reducerPath]: programApi.reducer,
    // [loaneeApi.reducerPath]: loaneeApi.reducer,
    [cohortApi.reducerPath]: cohortApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [organizationApi.reducerPath] : organizationApi.reducer,
})

export default appReducer;