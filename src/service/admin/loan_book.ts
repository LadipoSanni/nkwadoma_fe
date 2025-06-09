import { createApi  } from '@reduxjs/toolkit/query/react'
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery"

export const loanBookApi = createApi({
  reducerPath: "loanBookApi",
  baseQuery: customFetchBaseQuery,
  tagTypes: ['cohort','loanee'],
  endpoints: (builder) => ({
    uploadLoaneeFile: builder.mutation({
      query: ({ cohortId, formData }) => {    
        return {
          url: `/loan/book/upload/${cohortId}/file/loanee/data`,
          method: "POST",
          body: formData
        };
      },
      invalidatesTags: ['cohort','loanee'],
    }),
    uploadRepaymentFile: builder.mutation({
      query: ({ cohortId,formData }) => {    
        return {
          url: `/loan/book/upload/${cohortId}/file/loanee/repayment/record`,
          method: "POST",
          body: formData
        };
      },
      invalidatesTags: ['loanee'],
    }),
  }),
});

export const { useUploadLoaneeFileMutation, useUploadRepaymentFileMutation } = loanBookApi;