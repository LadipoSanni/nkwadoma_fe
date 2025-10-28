"use client"
import React,{useState,useEffect} from 'react'
import DisplayOptions from "@/reuseable/display/DisplayOptions";
import {cabinetGrotesk, inter} from '@/app/fonts';
import SearchInput from "@/reuseable/Input/SearchInput";
import { Button } from '@/components/ui/button';
import CreateProgram from "@/components/program/create-program";
import TableModal from "@/reuseable/modals/TableModal";
import {Cross2Icon} from "@radix-ui/react-icons";
import {setCurrentProgramId,setInitialProgramFormValue,resetInitialProgramFormValue,setTotalNumberOfLoanee,resetCurrentProgramDetailData,setProgramView} from "@/redux/slice/program/programSlice";
import { store,useAppSelector } from '@/redux/store';
import {MdGridView, MdOutlineViewList} from "react-icons/md";
import {useGetAllProgramsQuery,useDeleteProgramMutation,useSearchProgramQuery} from '@/service/admin/program_query';
import { useDebounce } from '@/hooks/useDebounce';
import {useToast} from "@/hooks/use-toast"
import { capitalizeFirstLetters } from '@/utils/GlobalMethods';
import {formatAmount} from '@/utils/Format'
import Table from '@/reuseable/table/Table';
import {Book} from 'lucide-react';
import { ViewAllProgramProps } from '@/components/program/Program-grid';
import {useRouter} from 'next/navigation'
import DeletionRestrictionMessageProps from '@/components/cohort/DeletionRestrictionMessageProps';
import DeleteModal from '@/reuseable/modals/Delete-modal';
import DeleteProgram from '@/reuseable/details/DeleteCohort'
import ProgramGrid from '@/components/program/Program-grid';

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}

interface rowData {
    [key: string]: string | number | null | React.ReactNode | object;
}

interface ApiError {
    status: number;
    data: {
        message: string;
    };
}

function ProgramView() {
    const programViewType = useAppSelector(state => state?.program?.programView)
    const programId = useAppSelector(state => state?.program?.currentProgramId)
    const numberOfLoanee = useAppSelector((state) => state?.program?.totalNumberOfLoanee)
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('create');
    
    const [gridPageNumber, setGridPageNumber] = useState(0);
    const [gridPageSearchNumber, setGridPageSearchNumber] = useState(0);
    const [gridHasNextPage, setGridHasNextPage] = useState(true);
    const [programView, setProgramViews] = useState<ViewAllProgramProps[]>([]);
    
    const [listPageNumber, setListPageNumber] = useState(0);
    const [listPageSearchNumber, setListPageSearchNumber] = useState(0);
    const [listHasNextPage, setListHasNextPage] = useState(false);
    const [listTotalPage, setListTotalPage] = useState(0);
    
    const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [deleteProgram, setDeleteProgram] = useState("");
    const {toast} = useToast()
    const router = useRouter()

    const getAllProgramsParams = {
        pageSize: 10,
        pageNumber: programViewType === 'grid' ? gridPageNumber : listPageNumber
    };

    const searchParams = {
        name: debouncedSearchTerm,
        pageSize: 10,
        pageNumber: programViewType === 'grid' ? gridPageSearchNumber : listPageSearchNumber
    };

    const { data, isLoading, isFetching } = useGetAllProgramsQuery(
        getAllProgramsParams,{ refetchOnMountOrArgChange: true } );
    
    const { data: searchResults, isFetching: isSearchFetching, isLoading:isSearchloading } = useSearchProgramQuery(searchParams, { skip: !debouncedSearchTerm}); 
    const [deleteItem,{isLoading: isDeleteLoading}] = useDeleteProgramMutation();


    useEffect(() => {
        if (programViewType === 'grid') {
            if (debouncedSearchTerm && searchResults && searchResults?.data) {
                const programs = searchResults.data.body as ViewAllProgramProps[];
                
                setProgramViews((prev) => {
                    if (gridPageSearchNumber === 0) {
                        return programs;
                    }
                    const newPrograms = programs.filter(
                        (newProgram) => !prev.some((prevItem) => prevItem.id === newProgram.id)
                    );
                    return [...prev, ...newPrograms];
                });
                
                setGridHasNextPage(searchResults.data.hasNextPage);
            } else if (!debouncedSearchTerm && data && data?.data) {
                const programs = data.data.body as ViewAllProgramProps[];
                
                setProgramViews((prev) => {
                    if (gridPageNumber === 0) {
                        return programs;
                    }
                    const newPrograms = programs.filter(
                        (newProgram) => !prev.some((prevItem) => prevItem.id === newProgram.id)
                    );
                    return [...prev, ...newPrograms];
                });
                
                setGridHasNextPage(data.data.hasNextPage);
            }
        } else {
           
            if(debouncedSearchTerm && searchResults && searchResults?.data){
                setListPageSearchNumber(searchResults?.data?.pageNumber)
                setListTotalPage(searchResults?.data?.totalPages)
                setListHasNextPage(searchResults?.data?.hasNextPage)
            } else if(!debouncedSearchTerm && data && data?.data){
                setListPageNumber(data?.data?.pageNumber)
                setListTotalPage(data?.data?.totalPages)
                setListHasNextPage(data?.data?.hasNextPage)
            }
        }
        store.dispatch(resetCurrentProgramDetailData())
    },[data, searchResults, debouncedSearchTerm, programViewType, gridPageNumber, gridPageSearchNumber])

    const loadMoreGrid = () => {
        if (debouncedSearchTerm && !isSearchFetching && gridHasNextPage) {
            setGridPageSearchNumber((prevPage) => prevPage + 1);
        } else if (!debouncedSearchTerm && !isFetching && gridHasNextPage) {
            setGridPageNumber((prevPage) => prevPage + 1);
        }
    };

    const getTableData = () => {
        if (!data?.data?.body) return [];
        if (debouncedSearchTerm) return searchResults?.data?.body || [];
        return data?.data?.body;
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setGridPageSearchNumber(0)
        setListPageSearchNumber(0)
        if(debouncedSearchTerm === ""){
            setGridPageNumber(0)
        }

    };

    const handleCreateModalOpen = () => {
        setModalType('create');
        setModalOpen(true);
    };

    const handleEditModalOpen = () => {
        setModalType('edit');
        setModalOpen(true);
    };

    const handleViewChange = (viewType: string) => {
        store.dispatch(setProgramView(viewType));
    };

    const handleRowOrCardClick = (row: ViewAllProgramProps | TableRowData) => {
        if (programViewType === 'grid') {
            const gridRow = row as ViewAllProgramProps;
            store.dispatch(setCurrentProgramId(gridRow?.id))
            router.push('/program/program-details')
        } else {
            const tableRow = row as TableRowData;
            store.dispatch(setCurrentProgramId(String(tableRow?.id)))
            router.push('/program/program-details')
        }
    }

    const handleDropdownClick = async (id: string, row: ViewAllProgramProps | rowData) => {
        if (programViewType === 'grid') {
            const gridRow = row as ViewAllProgramProps;
            const numberOfLoanee = Number(gridRow?.numberOfLoanees)
            const detail = {
                id:  gridRow?.id as string,
                programName: gridRow?.name as string,
                deliveryType: gridRow?.deliveryType as string,
                programMode: gridRow?.mode as string,
                programDuration: String(gridRow?.duration) ,
                programDescription: gridRow?.programDescription as string
            }
            store.dispatch(setInitialProgramFormValue(detail))
            store.dispatch(setTotalNumberOfLoanee(numberOfLoanee))

            if (id === "1") {
                store.dispatch(setCurrentProgramId(gridRow?.id))
                router.push('/program/program-details')
            } else if(id === "2"){
                setTimeout(() => {
                    handleEditModalOpen()
                }, 700)
            } else {
                store.dispatch(setCurrentProgramId(gridRow?.id))
                setTimeout(() => {
                    setIsDeleteOpen(true);
                }, 700)
            }
        } else {
            const tableRow = row as rowData;
            const numberOfLoanee = Number(tableRow?.numberOfLoanees)
            const detail = {
                id:  tableRow?.id as string,
                programName: tableRow?.name as string,
                deliveryType: tableRow?.deliveryType as string,
                programMode: tableRow?.mode as string,
                programDuration: tableRow?.duration as string,
                programDescription: tableRow?.programDescription as string
            }
            store.dispatch(setInitialProgramFormValue(detail))
            store.dispatch(setTotalNumberOfLoanee(numberOfLoanee))

            if (id === "1") {
                store.dispatch(setCurrentProgramId(String(tableRow?.id)))
                router.push('/program/program-details')
            } else if(id === "2"){
                setTimeout(() => {
                    handleEditModalOpen()
                }, 700)
            } else {
                store.dispatch(setCurrentProgramId(String(tableRow?.id)))
                setTimeout(() => {
                    setIsDeleteOpen(true);
                }, 700)
            }
        }
    }

    const handleDeleteAProgram = async (id: string) => {
        try {
            const deletePro = await deleteItem({id}).unwrap();
            if (deletePro) {
                setDeleteProgram("")
                store.dispatch(resetInitialProgramFormValue())
                setIsDeleteOpen(false)
                toast({
                    description: deletePro?.message,
                    status: "success",
                    duration: 1000
                })
            }
        } catch (error) {
            const err = error as ApiError;
            setDeleteProgram(err?.data?.message || "Program with loanee cannot be deleted")
        }
    }

    const dropDownOption = [
        {name: 'View program', id: '1'},
        {name: 'Edit program', id: '2'},
        {name: 'Delete program', id: '3'}
    ];

    const options = [
        {
            id: 'grid',
            label: 'Grid',
            icon: <MdGridView className={`w-5 h-5 ${programViewType === 'grid' ? 'text-meedlBlue' : 'text-neutral950'}`}/>
        },
        {
            id: 'list',
            label: 'List',
            icon: <MdOutlineViewList className={`w-5 h-5 ${programViewType === 'list' ? 'text-meedlBlue' : 'text-neutral950'}`}/>
        }
    ];

    const ProgramHeader = [
        {title: 'Program', sortable: true, id: 'name', selector: (row: TableRowData) => row.name},
        {
            title: <div className='relative md:right-4 md:left-4 '>Status</div>,
            sortable: true,
            id: 'programStatus',
            selector: (row: TableRowData) => <span
                className={` pt-1 pb-1 pr-3 pl-3   rounded-xl ${row.programStatus === "ACTIVE" ? "text-success600 bg-success50" : "text-error600 bg-error50"} `}>
                {capitalizeFirstLetters(String(row.programStatus ?? "Declined"))}
            </span>
        },
        {
            title: 'No. of cohort',
            sortable: true,
            id: 'numberOfCohort',
            selector: (row: TableRowData) => row.numberOfCohort ?? "0"
        },
        {
            title: 'No. of loanee',
            sortable: true,
            id: 'numberOfLoanees',
            selector: (row: TableRowData) => row.numberOfLoanees ?? "0"
        },
        {
            title: 'Amount disbursed',
            sortable: true,
            id: 'totalAmountDisbursed',
            selector: (row: TableRowData) => formatAmount(row.totalAmountDisbursed)
        },
        {
            title: 'Amount repaid',
            sortable: true,
            id: 'totalAmountRepaid',
            selector: (row: TableRowData) => formatAmount(row.totalAmountRepaid)
        },
        {
            title: 'Amount outstanding',
            sortable: true,
            id: 'totalAmountOutstanding',
            selector: (row: TableRowData) => formatAmount(row.totalAmountOutstanding)
        },
    ]

    return (
        <main id="programMain"
        className={`${cabinetGrotesk.className} flex flex-col gap-8 pl-5 pr-2 pt-7 bg-meedlWhite overflow-hidden`}>
        <section id="programSection" className={'grid gap-7 '}>
            <div id="programControls" className={'md:flex pr-2 md:justify-between gap-5 grid'}>
                <SearchInput
                    id={'ProgramSearchInput'}
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <Button variant={"secondary"}
                        size={"lg"}
                        className={`${inter.className} bg-meedlBlue text-meedlWhite  h-12 flex justify-center items-center`}
                        id='createProgramModal'
                        onClick={handleCreateModalOpen}
                        >
                    Create program
                </Button>
            </div>
        </section>
        <section id="programContent"
        className={`grid gap-4 relative bottom-3 overflow-hidden`}>
            <DisplayOptions setView={handleViewChange} activeView={programViewType} options={options} />
            <div>
            {programViewType === 'grid'? 
            <div>
                <ProgramGrid
                    viewAllProgram={programView}
                    handleRowClick={handleRowOrCardClick}
                    kirkBabDropdownOption={dropDownOption}
                    handleDropDownClick={handleDropdownClick}
                    isLoading={isLoading || isSearchloading }
                    searchTerm={debouncedSearchTerm}
                    isSearchFetching={isSearchFetching}
                    infinityScroll={{
                        hasMore: gridHasNextPage,
                        loadMore: loadMoreGrid,
                        loader: isFetching || isSearchFetching
                    }}
                />
            </div> : 
            <div>
                <Table
                    tableData={getTableData()}
                    tableHeader={ProgramHeader}
                    handleRowClick={handleRowOrCardClick}
                    staticHeader={"program"}
                    staticColunm={"name"}
                    tableHeight={52}
                    sx="cursor-pointer"
                    showKirkBabel={true}
                    icon={Book}
                    sideBarTabName="program"
                    searchEmptyState={debouncedSearchTerm? searchResults?.data?.body?.length < 1 : undefined}
                    isLoading={isLoading || isFetching || isSearchFetching || isSearchloading }
                    totalPages={listTotalPage}
                    pageNumber={debouncedSearchTerm? listPageSearchNumber : listPageNumber}
                    setPageNumber={debouncedSearchTerm? setListPageSearchNumber : setListPageNumber}
                    hasNextPage={listHasNextPage}
                    tableCellStyle="h-12"
                    kirkBabDropdownOption={dropDownOption}
                    handleDropDownClick={handleDropdownClick}
                />
            </div> 
            }
            </div>
        </section>
        <div>
            {numberOfLoanee === 0? 
                <TableModal
                    isOpen={isModalOpen}
                    closeModal={() => {
                        setModalOpen(false)
                        if (modalType === "edit") {
                            store.dispatch(resetInitialProgramFormValue());
                        }
                        store.dispatch(setTotalNumberOfLoanee(0))
                    }}
                    closeOnOverlayClick={true} 
                    icon={Cross2Icon}
                    headerTitle={modalType === "create" ? "Create program" : "Edit program"}
                    reset={()=> { 
                        if (modalType === "edit") {
                            store.dispatch(resetInitialProgramFormValue());
                        }
                        store.dispatch(setTotalNumberOfLoanee(0))
                    }}
                >
                    <CreateProgram 
                        setIsOpen={setModalOpen}  
                        isEdit={modalType === "edit"}
                        onSuccess={() => {
                            if (programViewType === 'grid') {
                                setGridPageNumber(0);
                                setGridPageSearchNumber(0);
                                setGridHasNextPage(true);
                               setProgramViews([]);
                           
                            } else {
                                setListPageNumber(0);
                                setListPageSearchNumber(0);
                                setListHasNextPage(false);
                            }
                        }}
                    />
                </TableModal> :
                <TableModal
                    isOpen={isModalOpen}
                    closeModal={() => {
                        setModalOpen(false)
                        store.dispatch(resetInitialProgramFormValue())
                        store.dispatch(setTotalNumberOfLoanee(0))
                    }} 
                    closeOnOverlayClick={true} 
                    icon={Cross2Icon}
                    reset={() => {
                        store.dispatch(resetInitialProgramFormValue())
                        store.dispatch(setTotalNumberOfLoanee(0))}
                    }
                    styeleType={ "styleBodyTwo"}
                >
                    <DeletionRestrictionMessageProps 
                        image={ "/Icon - Warning.svg" }
                        message={`This program can not be edited because it has Cohort that contains ${numberOfLoanee > 1? "loanees" : "loanee"}` }
                    />    
                </TableModal>
            }
            {numberOfLoanee === 0?
                <DeleteModal
                    isOpen={isDeleteOpen}
                    closeOnOverlayClick={true}
                    closeModal={() => {
                        setIsDeleteOpen(false)
                            setDeleteProgram("")
                            store.dispatch(resetInitialProgramFormValue())
                    }}
                    icon={Cross2Icon}
                    width='auto'
                >
                    <DeleteProgram
                        setIsOpen={() =>{ setIsDeleteOpen(false)}}
                        headerTitle='Program'
                        title='program'
                        handleDelete={handleDeleteAProgram}
                        id={programId}
                        errorDeleting={deleteProgram}
                        isLoading={isDeleteLoading}
                    />
                </DeleteModal> : 
                <TableModal
                    isOpen={isDeleteOpen}
                    closeOnOverlayClick={true}
                    closeModal={() => {
                        setIsDeleteOpen(false)
                        store.dispatch(resetInitialProgramFormValue())
                        store.dispatch(setTotalNumberOfLoanee(0))
                    }}  
                    icon={Cross2Icon}
                    reset={() => {
                        store.dispatch(resetInitialProgramFormValue())
                        store.dispatch(setTotalNumberOfLoanee(0))}
                    }
                    styeleType= "styleBodyTwo"
                >
                    <DeletionRestrictionMessageProps 
                        message={ `This program can not be deleted because it has Cohort that contains ${numberOfLoanee > 0? "loanees" : "loanee"}`}
                    />    
                </TableModal>
            }
        </div>
        </main>
    )
}

export default ProgramView