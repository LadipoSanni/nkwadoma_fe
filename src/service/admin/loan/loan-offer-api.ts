import {createApi} from "@reduxjs/toolkit/query/react";
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery";


export const loanOfferApi = createApi({
    tagTypes: ['loanOffer'],
    baseQuery: customFetchBaseQuery,
    reducerPath: 'loanOfferApi',
    endpoints : (buider) => ({
        viewAllLoanOffer : buider.query({
            query: (data:  {
                pageNumber?: number;
                pageSize?: number;}) => ({
                url: `/loan/loanOffer/all`,
                method: 'GET',
                params: data
            })

        }) ,
    })
})
export const {useViewAllLoanOfferQuery} = loanOfferApi