import { createApi  } from '@reduxjs/toolkit/query/react'
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery"

export const loanBookApi = createApi({
  reducerPath: "loanBookApi",
  baseQuery: customFetchBaseQuery,
  endpoints: (builder) => ({
    uploadLoaneeFile: builder.mutation({
      query: ({ cohortId, loanProductId, formData }) => {    
        return {
          url: `/loan/book/upload/${cohortId}/${loanProductId}/file/loanee/data`,
          method: "POST",
          body: formData
        };
      },
    }),
    uploadRepaymentFile: builder.mutation({
      query: ({ cohortId,formData }) => {    
        return {
          url: `/loan/book/upload/${cohortId}/file/loanee/repayment/record`,
          method: "POST",
          body: formData
        };
      },
    }),
  }),
});

export const { useUploadLoaneeFileMutation, useUploadRepaymentFileMutation } = loanBookApi;