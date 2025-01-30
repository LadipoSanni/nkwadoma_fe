// src/redux/reducer.ts
import { combineReducers } from 'redux';
import adminLayoutReducer from '@/redux/slice/layout/adminLayout';
import selectedLoanReducer from '@/redux/slice/loan/selected-loan';
import authSliceReducer from '@/redux/slice/auth/slice';
import { authApi } from '@/service/auths/api';
import { programApi } from '@/service/admin/program_query';
import { cohortApi } from '@/service/admin/cohort_query';
import { userApi } from '@/service/users/api';
import { organizationApi } from '@/service/admin/organization';
import { loaneeApi } from '@/service/users/Loanee_query';
import { loanProductApi } from '@/service/admin/loan_product';
import cohortBreakDownReducer from '@/redux/slice/cohort/unpersist-slice';
import { loanRequestApi } from '@/service/admin/loan/loan-request-api';
import { fundApi } from '@/service/admin/fund_query';
import { loanOfferApi } from '@/service/admin/loan/loan-offer-api';
import { loanDisbursalApi } from '@/service/admin/loan/Loan-disbursal-api';
import loanReferralReducer from '@/service/users/loanRerralSlice';
import cohortReducer from './slice/create/cohortSlice'
import cameraReducer from  './slice/camera/camera-slice'

const appReducer = combineReducers({
    adminLayout: adminLayoutReducer,
    selectedLoan: selectedLoanReducer,
    authSlice: authSliceReducer,
    cohortBreakDownSlice: cohortBreakDownReducer,
    loanReferral: loanReferralReducer,
    cohort: cohortReducer,
    camera: cameraReducer,
    [authApi.reducerPath]: authApi.reducer,
    [programApi.reducerPath]: programApi.reducer,
    [cohortApi.reducerPath]: cohortApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [organizationApi.reducerPath]: organizationApi.reducer,
    [loaneeApi.reducerPath]: loaneeApi.reducer,
    [loanProductApi.reducerPath]: loanProductApi.reducer,
    [loanRequestApi.reducerPath]: loanRequestApi.reducer,
    [fundApi.reducerPath]: fundApi.reducer,
    [loanOfferApi.reducerPath]: loanOfferApi.reducer,
    [loanDisbursalApi.reducerPath]: loanDisbursalApi.reducer,
});

export default appReducer;