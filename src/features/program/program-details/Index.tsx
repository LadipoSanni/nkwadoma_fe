"use client"
import React,{useState,useEffect} from "react";
import {useRouter} from "next/navigation";
import {inter, cabinetGrotesk} from "@/app/fonts";
import {
    MdOutlinePeopleAlt,
    MdOutlineDateRange,
    MdPersonOutline,
    MdOutlineArrowBack,
    MdOutlinePerson
} from "react-icons/md";
import {FiBook} from "react-icons/fi";
import {TagButton} from "@/reuseable/tagButton/TagButton";
import {Button} from "@/components/ui/button";
import Kebab from "@/reuseable/Kebab/Kebab";
import {IoEllipsisHorizontalSharp} from "react-icons/io5";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import SearchInput from "@/reuseable/Input/SearchInput";
import Tables from "@/reuseable/table/LoanProductTable";
// import {cohortDataDetails} from "@/utils/LoanRequestMockData/cohortProduct"
import {DetailsTabContainer} from "@/reuseable/details/DetailsTabContainer";
import TableModal from "@/reuseable/modals/TableModal";
import {Cross2Icon} from "@radix-ui/react-icons";
import EditProgramForm from "@/components/program/edit-program-form";
import {DeleteCohort} from "@/reuseable/details/DeleteCohort";
// import { useSearchParams } from 'next/navigation';
import { useGetProgramByIdQuery } from "@/service/admin/program_query";
import { getItemSessionStorage } from "@/utils/storage";
import {formatAmount} from '@/utils/Format'
import { useDeleteProgramMutation } from '@/service/admin/program_query';
import { useGetAllCohortByAParticularProgramQuery } from "@/service/admin/program_query";
// import { useSearchCohortsInAParticularProgramQuery } from "@/service/admin/program_query";


interface loanDetails {
    totalAmountRepaid?: number;
   totalAmountDisbursed?: number;
   totalAmountOutstanding?: number;
   totalAmountRecieved?: number;
   totalAmountRequested?: number;
}

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode | loanDetails;
}

interface viewAllProgramProps  {
    programId?: string;
    cohortDescription?: string;
    name?: string;
   tuitionAmount?: number;
    loanDetails ?: loanDetails
 }


 type ViewAllProgramProps = viewAllProgramProps & TableRowData;
 

const ProgramDetails = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [programId, setProgramId] = useState('');
    const [page] = useState(0);
    const size = 100;
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
    const [cohorts,setCohorts] = useState<ViewAllProgramProps[]>([])

    useEffect(() =>{
        const id = getItemSessionStorage("programId")
        if(id){
            setProgramId(id)
        }
    },[])

    console.log(`handleProgram details: `,programId)

    const { data: program} = useGetProgramByIdQuery({id:programId},{ refetchOnMountOrArgChange: true });
    const [deleteItem,{isLoading}] = useDeleteProgramMutation()
    const { data: cohortsByProgram} = useGetAllCohortByAParticularProgramQuery({programId: programId,pageSize: size,pageNumber: page},{ refetchOnMountOrArgChange: true });

    

    useEffect(()=> {
        if(program?.data ){
            console.log( program.data)
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
    },[program])

     useEffect(()=> {
        if(cohortsByProgram?.data ){
            setCohorts(cohortsByProgram.data.body)
        }
     },[cohortsByProgram])

     console.log("The cohorts: ",cohorts)

    const dataList = [
        {label: "Program mode", value: progamDetail.mode},
        {label: "Program delivery type", value: progamDetail.deliveryType},
        {label: "Completion rate", value: "0%"},
        {label: "Employment rate", value: "0%"},
        {label: "Average starting income", value: formatAmount(0)},
    ];

    const loanDetail = [
        {detail: "Repayment rate", value: "0%"},
        {detail: "Debt percentage", value: "0%"},
        {detail: "Total loan amount disbursed", value: formatAmount(progamDetail.totalAmountDisbursed)},
        {detail: "Total loan amount repaid", value: formatAmount(progamDetail.totalAmountRepaid)},
        {detail: "Total loan amount outstanding", value: formatAmount(progamDetail.totalAmountOutstanding)},

    ]


    const tagButtonData = [
        {tagIcon: MdOutlineDateRange, tagCount: progamDetail.duration, tagButtonStyle: "bg-lightBlue100", tagText: "months"},
        {tagIcon: MdOutlinePeopleAlt, tagCount: 10, tagButtonStyle: "bg-warning80", tagText: "cohorts"},
        {tagIcon: MdPersonOutline, tagCount: 50, tagButtonStyle: "bg-warning50", tagText: "trainees"},
    ];
    const ProgramHeader = [
        {title: "Cohort", sortable: true, id: "name"},
        {title: "No of trainees", sortable: true, id: "noOfTrainees"},
        {title: "Tuition", sortable: true, id: "tuitionAmount", selector: (row: ViewAllProgramProps) => formatAmount(row.tuitionAmount)},
        // {title: "Amount Requested", sortable: true, id: "amountRequested"},
        // {title: "Amount Received", sortable: true, id: "amountReceived"},
        // {title: "Amount Outstanding", sortable: true, id: "totalAmountOutstanding"},
        { title: "Amount Requested", sortable: true, id: "amountRequested", selector: (row: ViewAllProgramProps) => row.loanDetails?.totalAmountRequested }, 
        { title: "Amount Received", sortable: true, id: "amountReceived", selector: (row: ViewAllProgramProps) => row.loanDetails?.totalAmountRecieved }, 
        { title: "Amount Outstanding", sortable: true, id: "totalAmountOutstanding", selector: (row: ViewAllProgramProps) => row.loanDetails?.totalAmountOutstanding },

    ];
    const programOptions = [
            {name: 'Delete program', id: '3'},
    ]
    const handleDropdownClick = (id: string) => {
        if (id === "3") setIsDeleteOpen(true)
    }

    const router = useRouter();

    const handleDeleteAProgram = async (id: string) => {
       
        try{
           const itemDeleted = await deleteItem({id}).unwrap();
           if(itemDeleted){
               setIsDeleteOpen(false)
               router.push('/program')
           }
           
        }catch(error){
            console.error("Error deleting program: ", error);
        }
    }

    const handleBackClick = () => {
        router.push('/program')
    }

    const  handleModalClick = () => {
        setIsOpen(true)
    }


    // const description = "Design thinking is a process for creative problem solving. Design thinking has a human-centered core. It encourages organizations to focus on the people they're creating for, which leads to better products, services, and internal processes."
   
    return (
        <main className={`${inter.className} grid gap-7 pt-6 md:px-10 px-2 w-full`}>
                <div className={`flex gap-2 w-[9.2rem] items-center cursor-pointer text-meedlBlue`} id={`backClick`}
                     data-testid={`backClick`} onClick={handleBackClick}>
                    <MdOutlineArrowBack className={'h-5 w-5 text-meedlBlue'}/>
                    <h1 id={`backClickText`} className={'text-meedlBlue text-[14px] font-medium leading-[21px]'}
                        data-testid={`backClickText`}>Back to programs</h1>
                </div>

            <Tabs defaultValue="details">
                <TabsList className={'p-0.5 gap-1 h-[2.0625rem] items-center cursor-pointer rounded-md bg-neutral100'}>
                    <TabsTrigger value="details" className={'py-1 px-2 gap-1 items-center rounded-md h-[1.8125rem] w-[3.875rem] data-[state=active]:shadow-custom'}>Details</TabsTrigger>
                    <TabsTrigger value="cohorts" className={'py-1 px-2 gap-1 items-center rounded-md h-[1.8125rem] data-[state=active]:shadow-custom'}>Cohorts</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className={'mt-4'}>
                    <section className={`p- flex md:flex-row flex-col md:justify-between`}>
                        <div className={'flex flex-col gap-10'}>
                            <div className={'grid place-items-center h-[7.5rem] w-[7.5rem] bg-lightBlue500 rounded-full'}>
                                <FiBook className={'h-[50px] w-[50px] text-meedlBlue'} />
                            </div>
                            <div className={'flex flex-col gap-3'}>
                                <h1 className={`text-meedlBlack ${cabinetGrotesk.className} text-[28px] font-medium leading-[33.6px]`}>
                                {progamDetail.name}
                                </h1>
                                <div className={'grid gap-5'}>
                                    <p className={'text-sm font-normal text-black400 w-[351px]'}>{progamDetail.programDescription}</p>
                                    <div id={`details`} data-testid="details" className="grid md:grid-cols-3 grid-cols-2 gap-3 w-fit">
                                        {tagButtonData.map((tagProps, index) => (
                                            <TagButton key={index} {...tagProps} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className={'flex justify-between'}>
                                <Button onClick={handleModalClick} className={'bg-meedlBlue w-[18.1875rem] h-[2.8125rem] text-meedlWhite hover:bg-meedlBlue shadow-none'}>Edit program</Button>
                                <div role={"button"} className={`w-12 h-12 flex justify-center items-center border border-meedlBlue rounded-full`}>
                                    <Kebab kebabOptions={programOptions} icon={IoEllipsisHorizontalSharp} handleDropDownClick={handleDropdownClick} />
                                </div>
                            </div>
                        </div>
                            <div className={`md:w-6/12 md:pt-0 pt-0`}>
                                <DetailsTabContainer isTable={false} isNotTableDataList={loanDetail} dataList={dataList} tabTitle1={"Program details"} tabTitle2={"Loan details"}/>
                            </div>
                    </section>
                </TabsContent>
                <TabsContent value="cohorts" className={'mt-4 grid gap-7'}>
                    <SearchInput  id={'programCohortSearch'} value="search" onChange={()=> {}}/>
                    <Tables
                        tableData={cohorts}
                        tableHeader={ProgramHeader}
                        staticHeader={'Cohort'}
                        staticColunm={'name'}
                        tableHeight={45}
                        icon={MdOutlinePerson}
                        sideBarTabName={"Cohort"}
                        handleRowClick={() => {
                        }}
                        optionalRowsPerPage={10}
                        tableCellStyle={'h-12'}
                    />
                </TabsContent>
            </Tabs>
            {
                <>
                <TableModal
                    isOpen={isOpen}
                    closeModal={()=> setIsOpen(false)}
                    closeOnOverlayClick={true}
                    headerTitle={"Edit program"}
                    icon={Cross2Icon}
                    >
                    <EditProgramForm 
                    programId={programId} 
                    setIsOpen={setIsOpen}
                    programDetail={progamDetail}
                    />
                </TableModal>

                    <TableModal
                        isOpen={isDeleteOpen}
                        closeModal={()=> setIsDeleteOpen(false)}
                        closeOnOverlayClick={true}
                        icon={Cross2Icon}
                        width='auto'
                    >
                        <DeleteCohort   
                        setIsOpen={()=> setIsDeleteOpen(false)} 
                        headerTitle={'Program'} 
                        title={'program'}
                        handleDelete={handleDeleteAProgram}
                        id={programId}
                        isLoading={isLoading}
                        />
                    </TableModal>
                </>


                }
        </main>
    );
}
export default ProgramDetails;