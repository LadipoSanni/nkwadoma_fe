
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


interface RestCountry {
  name: {
    common: string;
  };
  cca2: string;
  idd: {
    root: string;
    suffixes?: string[];
  };
  flags: {
    png: string;
  };
}

interface Country {
    id: string,
  name: string;
  code: string;
  dialCode: string;
  flag: string;
}

const baseUrl = process.env.NEXT_PUBLIC_COUNTRY_CODE_URL;

export const countryApi = createApi({
  reducerPath: 'countryApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCountries: builder.query<Country[], void>({
      query: () => 'all?fields=name,flags,idd,cca2',
      transformResponse: (response: RestCountry[]) => {
        if (!Array.isArray(response)) {
            throw new Error('Unexpected API response format');
          }
        return response.map((country) => ({
          id: country.cca2, 
          name: country.name.common,
          code: country.cca2,
          dialCode: `${country.idd.root}${country.idd.suffixes?.[0] || ''}`,
          flag: country.flags.png,
        }));
      },
    }),
  }),
});

export const { useGetCountriesQuery } = countryApi;