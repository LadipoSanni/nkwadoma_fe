"use client"
import React, {useState, useEffect} from 'react';
import {cabinetGrotesk, inter} from '@/app/fonts';
import SearchInput from "@/reuseable/Input/SearchInput";
import AllProgramsCard from "@/reuseable/cards/AllProgramsList";
import DisplayOptions from "@/reuseable/display/DisplayOptions";
import LoanProductTable from "@/reuseable/table/LoanProductTable";
import {programData} from "@/utils/ProgramData";
import CreateProgram from "@/components/program/create-program/Index";
import {formatAmount} from '@/utils/Format'
import {Book} from 'lucide-react';
import {MdOutlineCalendarMonth, MdOutlinePeopleAlt} from "react-icons/md";
import {Cross2Icon, PersonIcon} from "@radix-ui/react-icons";
import {Button} from "@/components/ui/button";
import TableModal from "@/reuseable/modals/TableModal";
import { useRouter } from 'next/navigation'
import { DeleteCohort } from '@/reuseable/details/DeleteCohort'
import EditProgramForm from '@/components/program/edit-program-form';
// import { useGetAllProgramsQuery } from '@/service/admin/program_query';


const ProgramView = () => {
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [dummyData, setDummyData] = useState<{
        cohorts: number;
        description: string;
        months: number;
        title: string;
        trainees: number;
        programId: string;
    }[]>([]);
    const router = useRouter()

    const [programId, setProgramId] =  React.useState("")
    const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
    const [editOpen, setEditOpen] = useState(false);
    // const [page] = useState(0);
    // const size = 10;
    // const instiuteId = "6dbc5d46-e96c-4421-8e92-9747b4fc0ad1"
    

    // const { data } = useGetAllProgramsQuery({
    //     organizationId:instiuteId,
    //     pageSize:size,
    //     pageNumber:page

    // })

    // useEffect(() => {
    //     if(data) {
    //         setDummyData(data.program)
    //     }
    // },[])

    interface TableRowData {
        [key: string]: string | number | null | React.ReactNode;
    }

    const handleRowClick = () => {
        router.push('/program/details')
       
    }

    const handleProgramDetailsOnclick= (id:string) => {
        router.push('/program/details')
        setProgramId(id)
    }


    const ProgramHeader = [
        {title: 'Programs', sortable: true, id: 'programs', selector: (row: TableRowData) => row.programs},
        {
            title: 'Status',
            sortable: true,
            id: 'status',
            selector: (row: TableRowData) => <span
                className={` pt-1 pb-1 pr-3 pl-3 rounded-xl ${row.status === "Accepted" ? "text-success600 bg-[#E6F4EB]" : "text-error600 bg-error50"}`}>{row.status}</span>
        },
        {title: 'No. of Cohorts', sortable: true, id: 'noOfCohorts', selector: (row: TableRowData) => row.noOfCohorts},
        {
            title: 'No. of Trainees',
            sortable: true,
            id: 'noOfTrainees',
            selector: (row: TableRowData) => row.noOfTrainees
        },
        {
            title: 'Amount Disbursed',
            sortable: true,
            id: 'amountDisbursed',
            selector: (row: TableRowData) => formatAmount(row.amountDisbursed)
        },
        {
            title: 'Amount Repaired',
            sortable: true,
            id: 'amountRepaired',
            selector: (row: TableRowData) => formatAmount(row.amountRepaired)
        },
        {
            title: 'Amount Outstanding',
            sortable: true,
            id: 'amountOutstanding',
            selector: (row: TableRowData) => formatAmount(row.amountOutstanding)
        },


    ]


    

    useEffect(() => {
        const data = Array.from({length: 9}, (_, index) => ({
            cohorts: Math.floor(Math.random() * 20) + 1,
            description: `Design thinking is a process for creative problem solving. Design thinking has a human-centered core. It encourages organizations to focus on the people they're creating for, which leads to better products, services, and internal processes.${index + 1}`,
            months: Math.floor(Math.random() * 12) + 1,
            title: `Program Thinking ${index + 1}`,
            trainees: Math.floor(Math.random() * 100) + 1,
            programId: `${index + 1}`
        }));
        setDummyData(data);
    }, []);

    const dropDownOption = [
        {name: 'View Program', id: '1'},
        {name: 'Edit Program', id: '2'},
        {name: 'Delete Program', id: '3'}
    ];

    const handleDropdownClick = (id:string,row: TableRowData) => {
        if(id === "1") {
            router.push('/program/details')
          
        }
        else if(id === "2") {
          setProgramId(String(row.cohortId))
          setEditOpen(true)
          
        
        }
        else {
          setIsDeleteOpen(true)
          setProgramId(String(row.id))
        }
      }

      const handleCardDropDownClick = (optionId: string, id: string) => {
        if (optionId === "1") {
            router.push(`/program/details`);
        } else if (optionId === "2") {
            setProgramId(id);
            setEditOpen(true);
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


    

    const tagButtonData = [
        {tagIcon: PersonIcon, tagCount: 10, tagButtonStyle: "bg-lightBlue100", tagText: "trainees"},
        {tagIcon: MdOutlineCalendarMonth, tagCount: 50, tagButtonStyle: "bg-lightBlue100", tagText: "cohorts"},
        {tagIcon: MdOutlinePeopleAlt, tagCount: 50, tagButtonStyle: "bg-lightBlue100", tagText: "cohorts"},
    ];

    const [isOpen, setIsOpen] = React.useState(false);

    const handleModalOpen = () => {
        setIsOpen(!isOpen)
    }

    return (
        <main id="programMain"
              className={`${cabinetGrotesk.className} flex flex-col gap-8 pl-5 pr-2 pt-7 bg-meedlWhite overflow-hidden`}>
            <section id="programSection" className={'grid gap-7 '}>
                <div id="programControls" className={'md:flex pr-2 md:justify-between gap-5 grid'}>
                    <SearchInput id={'ProgramSearchInput'}/>
                    <Button variant={"secondary"}
                            size={"lg"}
                            className={`${inter.className} bg-meedlBlue text-meedlWhite  h-12 flex justify-center items-center`}
                            onClick={handleModalOpen}>Create program</Button>

                    <TableModal isOpen={isOpen}
                                closeModal={() => setIsOpen(false)}
                                closeOnOverlayClick={true}
                                headerTitle={"Create program"}
                                className={"md:w-full pb-1"}
                                icon={Cross2Icon}
                    >
                        <CreateProgram setIsOpen={setIsOpen}
                                             programDeliveryTypes={["Full-time", "Part-time"]}
                                             programModes={["Online", "Physical"]}
                                             programDurations={["3years", "4years"]}
                                             submitButtonText={"Create Program"}/>

                    </TableModal>
                </div>
            </section>
            <div id="programContent" className={'grid gap-4 relative bottom-3 overflow-hidden'}>
                <DisplayOptions setView={setView} activeView={view}/>
                {view === 'grid' ? (
                    <div
                        id={'programGrid'}
                        className={'grid gap-6 pr-2 overflow-y-auto'}
                        style={{
                            height: '62vh',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
                        }}
                    >
                        {dummyData.map((program, index) => (
                            <AllProgramsCard
                                key={index}
                                description={program.description}
                                title={program.title}
                                id={program.programId} dropdownOption={dropDownOption} 
                                tagButtonData={tagButtonData}
                                onEdit={handleEditProgram}
                                onDelete={handleDeleteProgram}
                                handleCardDropDownClick={(optionId:string) => handleCardDropDownClick(optionId, program.programId)}
                                handleProgramDetails={()=> handleProgramDetailsOnclick(program.programId)}                   
                                />
                        ))}
                    </div>
                ) : (
                    <div
                        id="programListView"
                        className={'grid gap-6'}
                        style={{
                            height: '62vh',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
                        }}
                    >
                        <LoanProductTable
                            tableData={programData}
                            tableHeader={ProgramHeader}
                            staticHeader={"Programs"}
                            staticColunm={'programs'}
                            tableHeight={52}
                            handleRowClick={handleRowClick}
                            sx='cursor-pointer'
                            showKirkBabel={true}
                            kirkBabDropdownOption={dropDownOption}
                            icon={Book}
                            sideBarTabName='Program'
                            handleDropDownClick={handleDropdownClick}
                        />
                    </div>
                )}
            </div>
            <div>
                <TableModal
                isOpen={editOpen}
                closeOnOverlayClick={true}
                closeModal={() => setEditOpen(false)}
                icon={Cross2Icon}
                headerTitle='Edit Program'
                >
                    <EditProgramForm programId={programId} setIsOpen={setEditOpen}/>
                </TableModal>
                
                <TableModal
                isOpen={isDeleteOpen}
                closeOnOverlayClick={true}
                closeModal={() => setIsDeleteOpen(false)}
                icon={Cross2Icon}
                width='auto'
                >
                   <DeleteCohort setIsOpen={()=> setIsDeleteOpen(false)} headerTitle='Program' title='program'/>
                </TableModal>
            </div>

        </main>
    );
};

export default ProgramView;