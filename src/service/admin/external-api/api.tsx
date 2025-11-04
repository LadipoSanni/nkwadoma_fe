import {useConfig} from "@/app/config-context";
import {useCallback} from "react";

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

export interface Country {
    id: string,
    name: string;
    code: string;
    dialCode: string;
    flag: string;
}

export const useCountryCode =  () => {
    const {countryCodeUrl} = useConfig()

    const countryUrl = countryCodeUrl || '';
    const get = useCallback(
        async () => {
        try {
            const response = await fetch(countryUrl + 'all?fields=name,flags,idd,cca2', {
                method: "GET",
            });
            const data = await response.json();
            const transformedData =  data?.map((country: RestCountry) => ({
                id: country.cca2,
                name: country.name.common,
                code: country.cca2,
                dialCode: `${country.idd.root}${country.idd.suffixes?.[0] || ''}`,
                flag: country.flags.png,
            }));
            return transformedData;
        }catch (error) {
            console.error("Failed to fetch countries:", error);

        }

    },[countryUrl]

    )
    return {get}

}