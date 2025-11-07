"use client"
import React,{useState,useEffect} from 'react';
import SearchInput from "@/reuseable/Input/SearchInput";
import OrganizationNameAndChangeButton from "@/components/selected-loan/OrganizationNameAndChangeButton";
import ProductFilter from '../loan/selected-loan/loan-request/Product-filter';
import { setSearchLoan,setProgramId,setProgramName,resetProgramName,resetProgramId} from '@/redux/slice/loan/selected-loan';
import { store,useAppSelector } from '@/redux/store';
import {useGetAllProgramsQuery} from '@/service/admin/program_query'

export const initialFormValue = {
    selectedProgram:""
  }

  interface viewAllProgramProps  {
    id?: string;
    name: string;

}

const OrganizationAndFilter = () => {
    const [selectProgram, setSelectProgram] = useState('')
    const searchTerm = useAppSelector(state => state?.selectedLoan?.searchLoan)
    const programSelected = useAppSelector(state => state?.selectedLoan?.programName)
    const clickedOrganization = useAppSelector(state => state.selectedLoan.clickedOrganization);
    const [pageNumber, setPageNumber] = useState(0);
    const [listOfPrograms, setListOfPrograms] = useState<viewAllProgramProps[]>([])
     const [hasNextPage, setNextPage] = useState(true);
    const {data,isLoading,isFetching} = useGetAllProgramsQuery({organizationId:clickedOrganization?.id?.toString(), pageSize:10, pageNumber: pageNumber},{skip: !clickedOrganization?.id})
    const [pendingProgramId, setPendingProgramId] = useState('');


    const resetFilter = () => {
        setSelectProgram('');
        setPendingProgramId('');
        setPageNumber(0);
        setListOfPrograms([]);
        store.dispatch(resetProgramId());
        store.dispatch(resetProgramName())
    };

    const handleSubmit = async () => {
       store.dispatch(setProgramId(pendingProgramId))
      }

      useEffect(() => {
        if(data && data?.data){
           const sortedPrograms = [...data?.data?.body].sort((a, b) =>
            a?.name?.localeCompare(b?.name)
        );

        setListOfPrograms((prev) => {
            if (pageNumber === 0) {
                return sortedPrograms;
            }
            const newPrograms = sortedPrograms.filter(
                (newProgram: viewAllProgramProps) => !prev.some((prev) => prev?.id === newProgram?.id)
            );
            return [...prev, ...newPrograms]?.sort((a, b) => a?.name?.localeCompare(b?.name));
        });

        setNextPage(data?.data?.hasNextPage);
         
        }
      },[data,pageNumber])

      const loadMore = () => {
        if (!isFetching && hasNextPage) {
            setPageNumber((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        if (!clickedOrganization?.id) {
            resetFilter();
        }
    }, [clickedOrganization?.id]);


    const handleSelectProgram = (programType: string) => {
        setSelectProgram(programType)
        const selectedProgram = listOfPrograms.find(program => program.name === programType);
        if (selectedProgram) {
            setPendingProgramId(selectedProgram.id || '');
            store.dispatch(setProgramName(selectedProgram.name || selectProgram))
        }
    }
 

    return (
        <div className='md:px-3 pr-3 md:pr-0'>
        <div
            id="organzationAndFilterComponent"
            className={`grid gap-3 md:place-content-between md:grid md:mr-auto md:ml-auto  w-full h-fit  md:h-fit`}>
            <OrganizationNameAndChangeButton/>
            <div
                id="filterAndSearchComponent"
                data-testid="filterAndSearchComponent"
                className={` gap-1  mb-3 md:mb-0 md:pr-0 h-fit md:w-fit md:h-fit md:flex md:gap-3`}
            >
                <div className='relative mb-3'>
                    <SearchInput
                        id='searchLoan'
                        placeholder='Search'
                        style='h-[2.4rem]'
                       value={searchTerm}
                       onChange={(e)=> store.dispatch(setSearchLoan(e.target.value))}
                    />
                </div> 
                <div>
                    <ProductFilter
                    disabled={!clickedOrganization?.id? true : false}
                    filterName='Program'
                    dropDownFilterName='Program'
                    initialFormValue={initialFormValue}
                    placeHolder='Select Program'
                    handleFilterSubmit={handleSubmit}
                    valueName='selectedProgram'
                    valueListData={listOfPrograms}
                    selectedValue={programSelected}
                    handleSelectedValue={handleSelectProgram}
                    isProgramLoading={isLoading}
                    infinityScroll={{
                        hasMore: hasNextPage,
                        loadMore:loadMore,
                        loader: isFetching
                    }}
                    />
                </div>
            </div>
        </div>
        </div>
    );
};

export default OrganizationAndFilter;