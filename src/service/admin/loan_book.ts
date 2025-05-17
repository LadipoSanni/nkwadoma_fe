import { createApi  } from '@reduxjs/toolkit/query/react'
import {customFetchBaseQuery} from "@/service/customFetchBaseQuery"

export const loanBookApi = createApi({
  reducerPath: "loanBookApi",
  baseQuery: customFetchBaseQuery,
  endpoints: (builder) => ({
    uploadLoaneeFile: builder.mutation({
      query: ({ cohortId, loanProductId, formData }) => { 
       
        
        return {
          url: `/loan/book/upload/${cohortId}/${loanProductId}/file`,
          method: "POST",
          body: formData
        };
      },
    }),
  }),
});

export const { useUploadLoaneeFileMutation } = loanBookApi;