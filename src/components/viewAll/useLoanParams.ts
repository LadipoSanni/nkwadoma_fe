import { useState } from "react";
import { useAppSelector } from "@/redux/store";
import { useDebounce } from '@/hooks/useDebounce';

interface Objdata {
    name: string;
    pageSize: number; 
    pageNumber: number;
    organizationId?: string | number;
    programId?: string;
}

export const useLoanParams = () => {
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSearchNumber, setPageSearchNumber] = useState(0);
    const clickedOrganization = useAppSelector(state => state.selectedLoan.clickedOrganization);
    const searchTerm = useAppSelector(state => state?.selectedLoan?.searchLoan);
    const programId = useAppSelector(state => state?.selectedLoan?.programId)
    const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);

    const getParams = (isSearch: boolean = false): Objdata => {
        const base: Omit<Objdata, 'name'> = {
            pageSize: 10,
            pageNumber: isSearch ? pageSearchNumber : pageNumber,
            ...(clickedOrganization?.id && { organizationId: clickedOrganization.id }),
            ...(programId && {programId: programId })
        };
        
        return {
            ...base,
            name: isSearch ? debouncedSearchTerm || "" : ""
        } as Objdata;
    };

    return {
        params: getParams(),
        searchParams: getParams(true),
        setPageNumber,
        setPageSearchNumber,
        hasSearchTerm: !!debouncedSearchTerm
    };
};