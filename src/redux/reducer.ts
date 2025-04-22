// src/redux/reducer.ts
import { combineReducers } from 'redux';
import adminLayoutReducer from '@/redux/slice/layout/adminLayout';
import selectedLoanReducer from '@/redux/slice/loan/selected-loan';
import authSliceReducer from '@/redux/slice/auth/slice';
import { authApi } from '@/service/auths/api';
import { programApi } from '@/service/admin/program_query';
import { cohortApi } from '@/service/admin/cohort_query';
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
import vehicleReducer from './slice/vehicle/vehicle'
import programSliceReducer from './slice/program/programSlice'
import {userApi} from '@/service/users/api';
import { notificationApi } from '@/service/notification/notification_query';
import notificationReducer  from './slice/notification/notification';
import vehicleMultistepReducer from './slice/multiselect/vehicle-multiselect'
import { financierApi } from '@/service/admin/financier';
import financierReducer  from '@/redux/slice/financier/financier';
import MarketPlaceReducer from "./slice/investors/MarketPlaceSlice";
import kycMultistepReducer from './slice/multiselect/kyc-multiselect'

import {financierOnboardingAndDashboardApi} from "@/service/financier/api";
import {marketplaceApi} from "@/service/financier/marketplace";

const appReducer = combineReducers({
    adminLayout: adminLayoutReducer,
    selectedLoan: selectedLoanReducer,
    authSlice: authSliceReducer,
    cohortBreakDownSlice: cohortBreakDownReducer,
    loanReferral: loanReferralReducer,
    cohort: cohortReducer,
    camera: cameraReducer,
    vehicle: vehicleReducer,
    program: programSliceReducer,
    notification: notificationReducer ,
    vehicleMultistep:vehicleMultistepReducer,
    marketPlace: MarketPlaceReducer,
    financier:financierReducer,
    kycMultistep:kycMultistepReducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [programApi.reducerPath]: programApi.reducer,
    [cohortApi.reducerPath]: cohortApi.reducer,
    [organizationApi.reducerPath]: organizationApi.reducer,
    [loaneeApi.reducerPath]: loaneeApi.reducer,
    [loanProductApi.reducerPath]: loanProductApi.reducer,
    [loanRequestApi.reducerPath]: loanRequestApi.reducer,
    [fundApi.reducerPath]: fundApi.reducer,
    [loanOfferApi.reducerPath]: loanOfferApi.reducer,
    [loanDisbursalApi.reducerPath]: loanDisbursalApi.reducer,
    [notificationApi.reducerPath]:  notificationApi.reducer,
    [financierApi.reducerPath]: financierApi.reducer,
    [financierOnboardingAndDashboardApi.reducerPath]: financierOnboardingAndDashboardApi.reducer,
    [marketplaceApi.reducerPath]: marketplaceApi.reducer,
});

export default appReducer;