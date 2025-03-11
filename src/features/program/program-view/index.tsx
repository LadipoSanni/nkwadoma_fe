"use client"
import React, {useState, useEffect} from 'react';
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
import {setItemSessionStorage} from '@/utils/storage';
import {Button} from "@/components/ui/button";
import TableModal from "@/reuseable/modals/TableModal";
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

    const [programId, setProgramId] = React.useState("")
    const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [page] = useState(0);
    const size = 300;
    const [deleteProgram, setDeleteProgram] = useState("")

    const {data, isLoading} = useGetAllProgramsQuery({
        pageSize: size,
        pageNumber: page
    },{ refetchOnMountOrArgChange: true, })
    const [deleteItem] = useDeleteProgramMutation()
    const {data: searchResults} = useSearchProgramQuery(searchTerm, {skip: !searchTerm});




    const handleRowClick = (row: TableRowData) => {
        router.push('/program/details')
        setItemSessionStorage("programId", String(row.id))


    }


    const handleProgramDetailsOnclick = (id: string) => {
        router.push('/program/details')
        setProgramId(id)
        setItemSessionStorage("programId", id)

    }


    useEffect(() => {
        if (searchTerm && searchResults && searchResults.data) {
            const programs = searchResults.data;
            setProgramView(programs);
        } else if
        (!searchTerm && data && data?.data) {
            const programs = data?.data?.body
            setProgramView(programs)
            // setProgramView((prevPrograms) => [...prevPrograms, ...programs]);
            // setSearchTerm("")
        }
    }, [searchTerm, searchResults, data]);
    

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
            title: 'No. of Cohorts',
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
            title: 'Amount Disbursed',
            sortable: true,
            id: 'totalAmountDisbursed',
            selector: (row: TableRowData) => formatAmount(row.totalAmountDisbursed)
        },
        {
            title: 'Amount Repaired',
            sortable: true,
            id: 'totalAmountRepaid',
            selector: (row: TableRowData) => formatAmount(row.totalAmountRepaid)
        },
        {
            title: 'Amount Outstanding',
            sortable: true,
            id: 'totalAmountOutstanding',
            selector: (row: TableRowData) => formatAmount(row.totalAmountOutstanding)
        },


    ]


    const {data: program, isLoading: loading, refetch} = useGetProgramByIdQuery({id: programId}, {
        skip: !programId,
        refetchOnMountOrArgChange: true
    });

    const dropDownOption = [
        {name: 'View Program', id: '1'},
        {name: 'Edit Program', id: '2'},
        {name: 'Delete Program', id: '3'}
    ];

    const handleDropdownClick = async (id: string, row: rowData) => {
        if (id === "1") {
            router.push('/program/details')
            setItemSessionStorage("programId", String(row.id))


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
            router.push(`/program/details`);
            setItemSessionStorage("programId", id)
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
            <div id="programContent" className={'grid gap-4 relative bottom-3 overflow-hidden'}>
                <DisplayOptions setView={setView} activeView={view} options={options}/>
                {view === 'grid' ? (
                    <div
                        id={'programGrid'}
                        className={'grid gap-6 pr-2 overflow-y-auto'}
                        style={{
                            height: '62vh',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
                        }}
                    >
                        {isLoading ? (<SkeletonForGrid/>) :
                            (searchTerm && programView.length === 0? <div><SearchEmptyState icon={MdSearch} name='Program'/></div> : 
                         ( 
                         programView.length === 0 ?
                                <TableEmptyState
                                    icon={Book}
                                    name='program'
                                /> :
                            programView.slice().reverse().map((program, index) => {

                                    const tagButtonData = [{
                                        tagIcon: MdPersonOutline,
                                        tagCount: Number(program.numberOfLoanees ?? 0),
                                        tagButtonStyle: 'bg-tagButtonColor text-meedlBlue',
                                        tagText: 'loanees'
                                    },
                                        {
                                            tagIcon: MdOutlineDateRange,
                                            tagCount: Number(program.duration ?? 0),
                                            tagButtonStyle: 'bg-tagButtonColor text-meedlBlue',
                                            tagText: 'months'
                                        },
                                        {
                                            tagIcon: MdOutlinePeopleAlt,
                                            tagCount: Number(program.numberOfCohort ?? 0),
                                            tagButtonStyle: 'bg-tagButtonColor text-meedlBlue',
                                            tagText: 'cohorts'
                                        }];
                                    return (
                                        <AllProgramsCard
                                            key={index}
                                            description={program.programDescription ?? ''}
                                            title={program.name ?? ''}
                                            id={program.id ?? ""} dropdownOption={dropDownOption}
                                            tagButtonData={tagButtonData}
                                            onEdit={handleEditProgram}
                                            onDelete={handleDeleteProgram}
                                            handleCardDropDownClick={(optionId: string) => handleCardDropDownClick(optionId, program.id ?? '')}
                                            handleProgramDetails={() => handleProgramDetailsOnclick(program.id ?? '')}
                                        />
                                    )
                                }
                            )) 

                            )}

                    </div>
                ) : (
                    <div
                        id="programListView"
                        className={'grid -6'}
                        style={{
                            height: '62vh',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
                        }}
                    >
                     {searchTerm && programView.length === 0? <div><SearchEmptyState icon={MdSearch} name='Program'/></div> : <Table
                            tableData={programView.slice().reverse()}
                            tableHeader={ProgramHeader}
                            staticHeader={"Programs"}
                            staticColunm={'name'}
                            tableHeight={52}
                            handleRowClick={handleRowClick}
                            sx='cursor-pointer'
                            showKirkBabel={true}
                            kirkBabDropdownOption={dropDownOption}
                            icon={Book}
                            sideBarTabName='program'
                            handleDropDownClick={handleDropdownClick}
                            optionalRowsPerPage={10}
                            isLoading={isLoading}
                        />
                }
                    </div>
                )}
            </div>
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
                            programId={programId}
                            setIsOpen={setEditOpen}
                            programDetail={progamDetail}
                        />
                    </TableModal>
                )
                }
                <TableModal
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
                </TableModal>
            </div>

        </main>
    );
};

export default ProgramView;