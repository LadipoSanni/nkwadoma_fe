import {createApi} from "@reduxjs/toolkit/query/react";
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery";


const loanOfferApi = createApi({
    tagTypes: ['loanOffer'],
    baseQuery: customFetchBaseQuery,
    reducerPath: 'loanOfferApi',
    // endpoints
})