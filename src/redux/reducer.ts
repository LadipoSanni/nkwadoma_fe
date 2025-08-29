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
import kycMultistepReducer from './slice/multiselect/kyc-multiselect';
import { UnknownAction } from '@reduxjs/toolkit'; 
import {financierOnboardingAndDashboardApi} from "@/service/financier/api";
import {marketplaceApi} from "@/service/financier/marketplace";
import {portfolioOverviewApi} from '@/service/admin/overview'
import kycFormReducer from "@/redux/slice/kyc/kycFormSlice";
import {unauthorizedApis} from "@/service/unauthorized/action";
import OrganizationReducer from "./slice/organization/organization"
import { loanBookApi } from '@/service/admin/loan_book';
import CsvReducer from "@/redux/slice/csv/csv"
import { countryApi } from '@/service/admin/external-api/countryCalling_code_query';
import LoanOfferReducer from './slice/loan/loan-offer';
import StaffReducer from "./slice/staff-and-request/staff";
import loaneesReducer from "./slice/loan/loanees";
import requestReducer from "./slice/staff-and-request/request"
import { walletApi } from '@/service/users/wallet';
import idsReducer from './slice/id/slice-ids';
import loanProductReducer from "./slice/loan-product/Loan-product"

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
    kycForm: kycFormReducer,
    organization: OrganizationReducer,
    csv: CsvReducer,
    loanOffer: LoanOfferReducer,
    staff: StaffReducer,
    loanees: loaneesReducer,
    ids: idsReducer,
    request: requestReducer,
    loanProduct: loanProductReducer,
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
    [portfolioOverviewApi.reducerPath]: portfolioOverviewApi.reducer,
    [unauthorizedApis.reducerPath]: unauthorizedApis.reducer,
    [loanBookApi.reducerPath]: loanBookApi.reducer,
    [countryApi.reducerPath]: countryApi.reducer,
    [walletApi.reducerPath]: walletApi.reducer,
});

// export default appReducer;


const rootReducer = (
    state: ReturnType<typeof appReducer> | undefined,
    action: UnknownAction
) => {
    if (action.type === 'RESET_STATE') {
        return appReducer(undefined, action);
    }
    return appReducer(state, action);
};

export default rootReducer;

export const resetAllState = () => ({
    type: 'RESET_STATE' as const
});

