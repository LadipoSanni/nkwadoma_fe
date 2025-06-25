"use client"
import React, {useState, useEffect, useRef, useCallback } from 'react';
import {cabinetGrotesk, inter} from '@/app/fonts';
import SearchInput from "@/reuseable/Input/SearchInput";
import AllProgramsCard from "@/reuseable/cards/AllProgramsList";
import DisplayOptions from "@/reuseable/display/DisplayOptions";
import Table from "@/reuseable/table/LoanProductTable";
import CreateProgram from "@/components/program/create-program";
import {formatAmount} from '@/utils/Format'
import {Book} from 'lucide-react';
import {MdGridView, MdOutlineDateRange, MdOutlinePeopleAlt, MdOutlineViewList, MdPersonOutline} from "react-icons/md";
import {Cross2Icon} from "@radix-ui/react-icons";
import {Button} from "@/components/ui/button";
import TableModal from "@/reuseable/modals/TableModal";
import DeleteModal from '@/reuseable/modals/Delete-modal';
import {useRouter} from 'next/navigation'
import DeleteProgram from '@/reuseable/details/DeleteCohort'
import EditProgramForm from '@/components/program/edit-program-form';
import {useGetAllProgramsQuery} from '@/service/admin/program_query';
import {useDeleteProgramMutation} from '@/service/admin/program_query';
import {useGetProgramByIdQuery} from '@/service/admin/program_query';
import SkeletonForGrid from '@/reuseable/Skeleton-loading-state/Skeleton-for-grid';
import {useSearchProgramQuery} from '@/service/admin/program_query';
import TableEmptyState from '@/reuseable/emptyStates/TableEmptyState';
import {setTimeout} from 'timers';
import {useToast} from "@/hooks/use-toast"
import { capitalizeFirstLetters } from '@/utils/GlobalMethods';
import SearchEmptyState from '@/reuseable/emptyStates/SearchEmptyState'
import { MdSearch } from 'react-icons/md'
import {store} from "@/redux/store";
import {setCurrentProgramId} from "@/redux/slice/program/programSlice";


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


interface viewAllProgramProps extends TableRowData {
    id?: string;
    programDescription?: string;
    name?: string;
    durationType?: string;
    programStartDate?: string;
    duration?: number;
    mode?: string;
    deliveryType?: string;
    totalAmountRepaid?: number;
    totalAmountDisbursed?: number;
    totalAmountOutstanding?: number
    numberOfLoanees?: number;
    numberOfCohort: number
}


const ProgramView = () => {
    const [view, setView] = useState<string>('grid');
    const [searchTerm, setSearchTerm] = useState('');
    const [pageNumber, setPageNumber] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(true);
    const {toast} = useToast()

    const router = useRouter()

    const [programView, setProgramView] = useState<viewAllProgramProps[]>([])
    const [progamDetail, setProgramDetail] = useState({
            id: "",
            programDescription: "",
            name: "",
            durationType: "",
            programStartDate: "",
            duration: 0,
            mode: "",
            deliveryType: "",
            totalAmountRepaid: 0,
            totalAmountDisbursed: 0,
            totalAmountOutstanding: 0,
        }
    )

    const [programId, setProgramId] = useState("");
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteProgram, setDeleteProgram] = useState("");

    // Conditional pageSize based on view
    const pageSize = view === 'grid' ? 10 : 100;

    const { data, isLoading, isFetching } = useGetAllProgramsQuery(
        { pageSize,
            pageNumber: view === 'grid' ? pageNumber : 0
        },
        { refetchOnMountOrArgChange: true }
    );
    const [deleteItem] = useDeleteProgramMutation();
    const { data: searchResults, isFetching: isSearchFetching, error: searchError } = useSearchProgramQuery(searchTerm, { skip: !searchTerm});
    const { data: program, isLoading: loading, refetch } = useGetProgramByIdQuery(
        { id: programId },
        {
            skip: !programId,
            refetchOnMountOrArgChange: true
        }
    );

    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        setPageNumber(0);
        setProgramView([]);
        setHasNextPage(true);
    }, [searchTerm, view]);

    useEffect(() => {
        if (searchTerm && searchResults?.data) {
            const programs = searchResults.data as viewAllProgramProps[];
            setProgramView((prev) => {
                const newPrograms = pageNumber === 0 || view === 'list' ? programs : [...prev, ...programs];
                const uniquePrograms = newPrograms.reduce<viewAllProgramProps[]>((acc, program) => {
                    if (!acc.some((p) => p.id === program.id)) {
                        acc.push(program);
                    }
                    return acc;
                }, []);
                return uniquePrograms;
            });
            setHasNextPage(view === 'grid' ? searchResults.data.hasNextPage : false);
        } else if (!searchTerm && data?.data?.body) {
            const programs = data.data.body as viewAllProgramProps[];
            setProgramView((prev) => {
                const newPrograms = pageNumber === 0 || view === 'list' ? programs : [...prev, ...programs];
                const uniquePrograms = newPrograms.reduce<viewAllProgramProps[]>((acc, program) => {
                    if (!acc.some((p) => p.id === program.id)) {
                        acc.push(program);
                    }
                    return acc;
                }, []);
                return uniquePrograms;
            });
            setHasNextPage(view === 'grid' ? data.data.hasNextPage : false);
        }
        if (searchError) {
            toast({
                description: "Failed to fetch search results",
                status: "error",
            });
        }
    }, [searchTerm, searchResults, data, pageNumber, view, searchError, toast]);

    const lastCardObserver = useCallback(
        (node: HTMLDivElement | null) => {
            if (isLoading || isFetching || isSearchFetching || !hasNextPage || view !== 'grid') return;

            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        setPageNumber((prevPage) => prevPage + 1);
                    }
                },
                {
                    rootMargin: "100px",
                }
            );

            if (node) observer.current.observe(node);
        },
        [isLoading, isFetching, isSearchFetching, hasNextPage, view]
    );

    useEffect(() => {
        return () => {
            if (observer.current) observer.current.disconnect();
        };
    }, []);

    const handleRowClick = (row: TableRowData) => {
        store.dispatch(setCurrentProgramId(String(row?.id)))
        router.push('/program/program-details')


    }



    const handleProgramDetailsOnclick = (id: string) => {
        store.dispatch(setCurrentProgramId(id))
        setProgramId(id)
        router.push('/program/program-details')
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };


    const ProgramHeader = [
        {title: 'Programs', sortable: true, id: 'name', selector: (row: TableRowData) => row.name},
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
            title: 'No. of cohorts',
            sortable: true,
            id: 'numberOfCohort',
            selector: (row: TableRowData) => row.numberOfCohort ?? "0"
        },
        {
            title: 'No. of loanees',
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


    const dropDownOption = [
        {name: 'View Program', id: '1'},
        {name: 'Edit Program', id: '2'},
        {name: 'Delete Program', id: '3'}
    ];

    const handleDropdownClick = async (id: string, row: rowData) => {
        if (id === "1") {
            store.dispatch(setCurrentProgramId(String(row?.id)))
            router.push('/program/program-details')


        } else if (id === "2") {
            setProgramId(String(row.id))
            if (programId) {
                await refetch();
                setTimeout(() => {
                    setEditOpen(true)
                }, 700)
            }
            setTimeout(() => {
                setEditOpen(true)
            }, 700)


        } else {
            setIsDeleteOpen(true)
            setProgramId(String(row.id))
        }
    }

    const handleCardDropDownClick = async (optionId: string, id: string) => {
        if (optionId === "1") {
            store.dispatch(setCurrentProgramId(id))
            router.push(`/program/program-details`);

        } else if (optionId === "2") {
            setProgramId(id);
            if (programId) {
                await refetch();
                setTimeout(() => {
                    setEditOpen(true)
                }, 700)
            }
            setTimeout(() => {
                setEditOpen(true)
            }, 700)
        } else if (optionId === "3") {
            setProgramId(id);
            setIsDeleteOpen(true);

        }
    };


    const handleEditProgram = (id: string) => {
        setProgramId(id);
        setEditOpen(true);
    };

    const handleDeleteProgram = (id: string) => {
        setProgramId(id);
        setIsDeleteOpen(true)
    };


    const handleDeleteAProgram = async (id: string) => {

        try {
            const deletePro = await deleteItem({id}).unwrap();
            if (deletePro) {
                setProgramView((prevData) => prevData.filter((item) => item.id !== id))
                setTimeout(() => {
                    toast({
                        description: "Program deleted successfully",
                        status: "success",
                    })
                }, 600);
            } else {
                setDeleteProgram("Failed to delete program")

            }

        } catch (error) {
            const err = error as ApiError;
            setDeleteProgram(err?.data?.message || "Program with loanee cannot be deleted")
            setTimeout(() => {
                toast({
                    description: deleteProgram || "Program with loanee cannot be deleted",
                    status: "error",
                })
            }, 600);
        }
    }


    useEffect(() => {
        if (editOpen && program?.data) {
            const detail = program?.data
            setProgramDetail({
                id: detail?.id || "",
                programDescription: detail?.programDescription || "",
                name: detail?.name || "",
                durationType: detail?.durationType || "",
                programStartDate: detail?.programStartDate || "",
                duration: detail?.duration || 0,
                mode: detail?.mode || "",
                deliveryType: detail?.deliveryType || "",
                totalAmountRepaid: detail?.totalAmountRepaid || 0,
                totalAmountDisbursed: detail?.totalAmountDisbursed || 0,
                totalAmountOutstanding: detail?.totalAmountOutstanding || 0,
            });
        }
        // saveObjectItemToSessionStorage("programDetail",progamDetail)

    }, [editOpen, program])




    const [isOpen, setIsOpen] = React.useState(false);

    const handleModalOpen = () => {
        setIsOpen(!isOpen)
    }

    const options = [
        {
            id: 'grid',
            label: 'Grid',
            icon: <MdGridView className={`w-5 h-5 ${view === 'grid' ? 'text-meedlBlue' : 'text-neutral950'}`}/>
        },
        {
            id: 'list',
            label: 'List',
            icon: <MdOutlineViewList className={`w-5 h-5 ${view === 'list' ? 'text-meedlBlue' : 'text-neutral950'}`}/>
        }
    ];

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
                            onClick={handleModalOpen}>
                        Create program
                    </Button>

                    <TableModal isOpen={isOpen}
                                closeModal={() => setIsOpen(false)}
                                closeOnOverlayClick={true}
                                headerTitle={"Create program"}
                                className={"w-full"}
                                icon={Cross2Icon}

                        // width={`32%`}
                    >

                        <CreateProgram setIsOpen={setIsOpen}
                            //  programDeliveryTypes={["ONSITE", "ONLINE","HYBRID"]}
                            //  programModes={["PART_TIME", "FULL_TIME"]}
                            //  programDurations={["3", "4"]}
                            //  submitButtonText={"Create"}
                        />

                    </TableModal>
                </div>
            </section>
            {isLoading && pageNumber === 0 || isSearchFetching ? (
                <SkeletonForGrid />
            ) : searchTerm && programView.length === 0 && !isSearchFetching ? (
                <div className={`grid justify-center items-center text-center min-h-[60vh] w-full`}>
                    <SearchEmptyState icon={MdSearch} name="Program" />
                </div>
            ) : programView.length === 0 ? (
                <TableEmptyState
                    name={"program"}
                    icon={<Book width={"2.5rem"} height={"2.5rem"}/>}
                    condition={true}
                />
                // <TableEmptyState icon={Book} name="program" condition={true}/>
            ) : (
                <div
                    id="programContent"
                    className={`grid gap-4 relative bottom-3 overflow-hidden`}>
                    <DisplayOptions setView={setView} activeView={view} options={options} />
                    {view === "grid" ? (
                        <div
                            id={"programGrid"}
                            className="grid grid-cols-1 pr-2 md:grid-cols-3 w-full h-[66vh] sm:grid-cols-1 lg:grid-cols-3 gap-y-6 gap-x-4 overflow-y-auto overflow-x-hidden"
                        >
                            {programView.map((program, index) => {
                                const tagButtonData = [
                                    {
                                        tagIcon: MdPersonOutline,
                                        tagCount: Number(program.numberOfLoanees ?? 0),
                                        tagButtonStyle: "bg-tagButtonColor text-meedlBlue",
                                        tagText: Number(program.numberOfLoanees ?? 0) <= 1 ? "loanee" : "loanees",
                                    },
                                    {
                                        tagIcon: MdOutlineDateRange,
                                        tagCount: Number(program.duration ?? 0),
                                        tagButtonStyle: "bg-tagButtonColor text-meedlBlue",
                                        tagText: Number(program.duration ?? 0) <= 1 ? "month" : "months",
                                    },
                                    {
                                        tagIcon: MdOutlinePeopleAlt,
                                        tagCount: Number(program.numberOfCohort ?? 0),
                                        tagButtonStyle: "bg-tagButtonColor text-meedlBlue",
                                        tagText: Number(program.numberOfCohort ?? 0) <= 1 ? "cohort" : "cohorts",
                                    },
                                ];

                                const isLastCard = index === programView.length - 1;

                                return (
                                    <div key={`wrapper-${program.id}-${index}`} ref={isLastCard ? lastCardObserver : null}>
                                        <AllProgramsCard
                                            key={program.id}
                                            description={program.programDescription || "No description"}
                                            title={program.name ?? ""}
                                            id={program.id ?? ""}
                                            dropdownOption={dropDownOption}
                                            tagButtonData={tagButtonData}
                                            onEdit={handleEditProgram}
                                            onDelete={handleDeleteProgram}
                                            handleCardDropDownClick={(optionId: string) =>
                                                handleCardDropDownClick(optionId, program.id ?? "")
                                            }
                                            handleProgramDetails={() => handleProgramDetailsOnclick(program.id ?? "")}
                                        />
                                    </div>
                                );
                            })}
                            {
                                isFetching && pageNumber > 0 && (
                                // <SkeletonForGrid/>
                                <div className="col-span-full text-center py-4">Loading more...</div>
                            )
                            }
                        </div>
                    ) : (
                        <div id="programListView" className={"grid -6"} style={{ height: "62vh" }}>
                            {searchTerm && programView.length === 0 && !isSearchFetching ? (
                                <SearchEmptyState icon={MdSearch} name="Program" />
                            ) : (
                                <Table
                                    tableData={programView}
                                    tableHeader={ProgramHeader}
                                    staticHeader={"program"}
                                    staticColunm={"name"}
                                    tableHeight={52}
                                    handleRowClick={handleRowClick}
                                    sx="cursor-pointer"
                                    showKirkBabel={true}
                                    kirkBabDropdownOption={dropDownOption}
                                    icon={Book}
                                    sideBarTabName="program"
                                    handleDropDownClick={handleDropdownClick}
                                    optionalRowsPerPage={10}
                                    isLoading={false}
                                />
                            )}
                        </div>
                    )}
                </div>
            )}
            <div>
                {loading ? "" : (
                    <TableModal
                        isOpen={editOpen}
                        closeOnOverlayClick={true}
                        closeModal={() => setEditOpen(!editOpen)}
                        icon={Cross2Icon}
                        headerTitle='Edit Program'
                    >

                        <EditProgramForm
                            setIsOpen={setEditOpen}
                            programDetail={progamDetail}
                        />
                    </TableModal>
                )
                }
                <DeleteModal
                    isOpen={isDeleteOpen}
                    closeOnOverlayClick={true}
                    closeModal={() => setIsDeleteOpen(false)}
                    icon={Cross2Icon}
                    width='auto'
                >
                    <DeleteProgram
                        setIsOpen={() => setIsDeleteOpen(false)}
                        headerTitle='Program'
                        title='program'
                        handleDelete={handleDeleteAProgram}
                        id={programId}
                        errorDeleted={deleteProgram}
                    />
                </DeleteModal>
            </div>

        </main>
    );
};

export default ProgramView;