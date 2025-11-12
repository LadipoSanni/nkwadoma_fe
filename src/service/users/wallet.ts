import {createApi} from '@reduxjs/toolkit/query/react'
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery";

export const walletApi = createApi({
    reducerPath: 'wallet',
    baseQuery: customFetchBaseQuery,
    tagTypes: [''],
    endpoints: (builder) =>({
        addBankDetails : builder.mutation({
            query : (data: {bankName : string , bankNumber: string}) => ({
                url : `/wallet/add/bankDetail`,
                method: 'POST',
                body: data
            })
        }),
        viewWalletDetail : builder.query({
            query : () => ({
                url : `/wallet/view`,
                method: 'GET',
            })
        }),
       linkBankAccount :  builder.mutation({
        query : (data: {
            id: string,
            bankName : string ,
            bankNumber: string,
            activationStatus: string
            }) => ({
            url : `/wallet/link/bank/detail`,
            method: 'POST',
            body: data
        })
    }),
       
    })
})

export const  { useAddBankDetailsMutation,useViewWalletDetailQuery,useLinkBankAccountMutation } = walletApi