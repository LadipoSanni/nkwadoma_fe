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
        })
    })
})

export const  { useAddBankDetailsMutation } = walletApi