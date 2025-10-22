"use client"
import React, {useState,useEffect} from "react";
import {useRouter} from "next/navigation";
import {inter} from "@/app/fonts";
import {
    MdOutlinePeopleAlt,
    MdOutlineDateRange,
    MdPersonOutline,
} from "react-icons/md";
// import {FiBook} from "react-icons/fi";
// import {TagButton} from "@/reuseable/tagButton/TagButton";
// import {Button} from "@/components/ui/button";
// import Kebab from "@/reuseable/Kebab/Kebab";
// import {IoEllipsisHorizontalSharp} from "react-icons/io5";
// import {DetailsTabContainer} from "@/reuseable/details/DetailsTabContainer";
// import TableModal from "@/reuseable/modals/TableModal";
// import DeleteModal from '@/reuseable/modals/Delete-modal';
// import {Cross2Icon} from "@radix-ui/react-icons";
// import DeleteCohort from "@/reuseable/details/DeleteCohort";
import {useGetProgramByIdQuery} from "@/service/admin/program_query";
// import {formatAmount} from '@/utils/Format'
// import {useDeleteProgramMutation} from '@/service/admin/program_query';
import { capitalizeFirstLetters } from "@/utils/GlobalMethods";
// import SkeletonForDetailPage from "@/reuseable/Skeleton-loading-state/Skeleton-for-detailPage";
import { useToast } from "@/hooks/use-toast";
import {useAppSelector,store} from "@/redux/store";
// import styles from "../../index.module.css"
import SafeHTMLRenderer from "@/reuseable/display/Safe-html-Renderer";
// import CreateProgram from "@/components/program/create-program";
import { setInitialProgramFormValue,setCurrentProgramDetailData,setProgramDetail } from "@/redux/slice/program/programSlice";
// import DeletionRestrictionMessageProps from "@/components/cohort/DeletionRestrictionMessageProps";
import style from "@/components/portfolio-manager/organization/index.module.css"
import Details from "@/components/loanee-my-profile/Details";
// import SkeletonForSidebar from '@/reuseable/Skeleton-loading-state/Skeleton-for-sidebar';
import BasicDetail from "@/reuseable/details/BasicDetail";

interface ApiError {
    status: number;
    data: {
        message: string;
    };
}


const ProgramDetails = () => {
    const id = useAppSelector(state => (state.program.currentProgramId))
    // const [isOpen, setIsOpen] = useState(false);
    // const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [programId] = useState(id);
    // const [deleteProgram, setDeleteProgram] = useState("")
    // const {toast} = useToast()


    const {data: program,isLoading:loading} = useGetProgramByIdQuery({id: programId}, {refetchOnMountOrArgChange: true, skip: !programId});
    // const [deleteItem, {isLoading}] = useDeleteProgramMutation()

    // const programDetail = {
    //     id: program?.data?.id || "",
    //     programName:program?.data?.name  || "",
    //     deliveryType: program?.data?.deliveryType ||  "",
    //     programMode: program?.data?.mode ||  "",
    //     programDuration: String(program?.data?.duration) ||  "",
    //     programDescription:program?.data?.programDescription ||  "",
    // }

    useEffect(() => {
        if(program && program?.data){
            const data = {
                programName:program?.data?.name,
                numberOfLoanee: program?.data?.numberOfLoanees
            }

            const programDetail = {
                id: program?.data?.id || "",
                programName:program?.data?.name  || "",
                deliveryType: program?.data?.deliveryType ||  "",
                programMode: program?.data?.mode ||  "",
                programDuration: String(program?.data?.duration) ||  "",
                programDescription:program?.data?.programDescription ||  "",
            }
            store.dispatch(setCurrentProgramDetailData(data))
            store.dispatch(setInitialProgramFormValue(programDetail))
            store.dispatch(setProgramDetail("detail"))
        }
    },[program])


    // const dataList = [
    //     {label: "Program mode", value: capitalizeFirstLetters(program?.data?.mode.replace(/_/g, ' '))},
    //     {label: "Program delivery type", value: capitalizeFirstLetters(program?.data?.deliveryType)},
    //     {label: "Completion rate", value: "0%"},
    //     {label: "Employment rate", value: "0%"},
    //     {label: "Average starting income", value: formatAmount(0)},

    // ];

    // const loanDetail = [
    //     {detail: "Total loan amount disbursed", value: formatAmount(program?.data?.totalAmountDisbursed)},
    //     {detail: "Total loan amount repaid", value: formatAmount(program?.data?.totalAmountRepaid)},
    //     {detail: "Total loan amount outstanding", value: formatAmount(program?.data?.totalAmountOutstanding)},
    //     {detail: "Debt percentage", value: Math.ceil(Number(program?.data?.debtPercentage))+"%"},
    //     {detail: "Repayment rate", value: Math.ceil(Number(program?.data?.repaymentRate))+"%"},

    // ]


    // const tagButtonData = [
    //     {
    //         tagIcon: MdOutlineDateRange,
    //         tagCount:program?.data?.duration ?? 0,
    //         tagButtonStyle: "bg-lightBlue100",
    //         tagText: program?.data?.duration <= 1 ? 'month' : 'months',
    //         textColor: "text-meedlBlue",
    //     },
    //     {tagIcon: MdOutlinePeopleAlt, tagCount: program?.data?.numberOfCohort, tagButtonStyle: "bg-warning80", tagText: program?.data?.numberOfCohort <= 1 ? 'cohort' : 'cohorts', textColor: "text-success700"},
    //     {tagIcon: MdPersonOutline, tagCount: program?.data?.numberOfLoanees || 0, tagButtonStyle : "bg-warning50", tagText: program?.data?.numberOfLoanees <= 1 ? 'loanee' : 'loanees', textColor: "text-warning900" },
    // ];

    // const programOptions = [
    //     {name: 'Delete program', id: '3'},
    // ]
    // const handleDropdownClick = (id: string) => {
    //     if (id === "3") setIsDeleteOpen(true)
    // }

    const router = useRouter();

    // const handleDeleteAProgram = async (id: string) => {

    //     try {
    //         const itemDeleted = await deleteItem({id}).unwrap();
    //         if (itemDeleted) {
    //             setIsDeleteOpen(false)
    //             setTimeout(() => {
    //                 toast({
    //                     description: "Program deleted successfully",
    //                     status: "success",
    //                 })
    //             }, 600);
    //             router.push('/program')
    //         }

    //     } catch (error) {
    //         const err = error as ApiError;
    //         setDeleteProgram(err?.data?.message || "Program with loanee cannot be deleted")
    //         setTimeout(() => {
    //             toast({
    //                 description: deleteProgram || "Program with loanee cannot be deleted",
    //                 status: "error",
    //             })
    //         }, 600)
    //     }
    // }

    // const handleModalClick = () => {
    //     store.dispatch(setInitialProgramFormValue(programDetail))
    //     setIsOpen(true)
    // }

    const datasList = [
        {
            label: "Program description",
            value : program?.data?.programDescription? <SafeHTMLRenderer html={program?.data?.programDescription} /> : "Not provided"
        },
        {
            label: "Program mode",
            value : capitalizeFirstLetters(program?.data?.mode.replace(/_/g, ' '))
        },
        {
            label: "Program delivery type",
            value : capitalizeFirstLetters(program?.data?.deliveryType)
        },
        
        {label: 'Duration',  value: <span className="bg-lightBlue100 text-meedlBlue flex py-1 items-center px-3 max-w-[100%] w-fit h-fit rounded-full text-[14px]">
          <MdOutlineDateRange className="w-4 h-4"/> <span className="pl-2">{program?.data?.duration}</span> <span className="pl-1">{program?.data?.duration > 1? "months" : "month"}</span>
        </span>},
        {label: 'Total number of cohort',  value: <span className="bg-warning80 text-[#09090B] flex py-1 items-center px-3 max-w-[100%] w-fit h-fit rounded-full text-[14px]">
            <MdOutlinePeopleAlt className="w-4 h-4"/> <span className="pl-2">{program?.data?.numberOfCohort}</span> <span className="pl-1">{program?.data?.numberOfCohort > 1? "cohorts" : "cohort"}</span>
          </span>},
        {label: 'Total number of loanee',  value:  <span className="bg-warning50 text-[#09090B] flex py-1 items-center px-3 max-w-[100%] w-fit h-fit rounded-full text-[14px]">
            < MdPersonOutline className="w-4 h-4"/> <span className="pl-2">{program?.data?.numberOfLoanees}</span> <span className="pl-1">{program?.data?.numberOfLoanees > 1? "loanees" : "loanee"}</span>
          </span>},
          
    ]

    return (
        // <div 
        // className={`md:max-h-[70vh]  ${styles.container}`}
        // style={{
        //     scrollbarWidth: 'none',
        //     msOverflowStyle: 'none',  
        //       }}
        // >
        //   {loading ? ( <SkeletonForDetailPage /> ) : (
        // <main className={`${inter.className} w-full max-h-full`} id={"mainDiv"}>
        //             <section className={`p- flex md:flex-row flex-col md:gap-0 md:justify-between md:mb-10`} id={`section`}>
        //                 <div className={'flex flex-col gap-5 md:h-[70vh] md:max-h-none'} id={`status`}>
        //                     <div
        //                         id={`fiBookIcon`}
        //                         className={'grid place-items-center aspect-square h-[7.5rem] w-[7.5rem] bg-lightBlue500 rounded-full'}>
        //                         <FiBook id={`book`} className={'h-[50px] w-[50px] text-meedlBlue'}/>
        //                     </div>
        //                     <div className={'flex flex-col gap-3'} id={`tagDiv`}>
        //                         <h1 id={`name`}
        //                             className={`text-meedlBlack ${cabinetGrotesk.className} text-[28px] font-medium leading-[33.6px] md:w-[351px] break-words overflow-y-auto max-h-28`}>
        //                             {program?.data?.name}
        //                         </h1>
        //                         <div className={'grid gap-5'} id={`tagButtonDiv`}>
        //                         <SafeHTMLRenderer html={program?.data?.programDescription} className="md:max-w-80"/>
                                      
        //                             <div id={`details`} data-testid="details"
        //                                  className="grid md:grid-cols-3 grid-cols-2 gap-3 w-fit">
        //                                 {tagButtonData.map((tagProps, index) => (
        //                                     <TagButton key={index} {...tagProps} />
        //                                 ))}
        //                             </div>
        //                         </div>
        //                     </div>
        //                     <div id={`buttons`} className={'flex md:justify-between gap-5'}>
        //                         <Button onClick={handleModalClick}
        //                                 id="editButton"
        //                                 variant={"secondary"}
        //                                 className={' w-[18.1875rem] h-[2.8125rem] text-meedlWhite  shadow-none'}>Edit
        //                             program</Button>
        //                         {
        //                          <div role={"button"}
        //                              id="kebabId"
        //                              className={`w-12 h-12 flex justify-center items-center border border-meedlBlue rounded-full`}>
        //                             <Kebab kebabOptions={programOptions} icon={IoEllipsisHorizontalSharp}
        //                                    handleDropDownClick={handleDropdownClick}/>
        //                         </div>}
        //                     </div>
        //                 </div>

        //                 <div id={`container`} className={`w-full md:w-1/2 md:pt-0 pt-5 overflow-x-hidden`}>
        //                     <DetailsTabContainer isTable={false} isNotTableDataList={loanDetail} dataList={dataList}
        //                                          tabTitle1={"program details"} tabTitle2={"Loan details"}/>
        //                 </div>
        //             </section>
        //     {
        //         <>
        //             <TableModal
        //                 isOpen={isOpen}
        //                 closeModal={() => {
        //                     setIsOpen(false)
        //                     store.dispatch(resetInitialProgramFormValue())
        //                 }}
        //                 closeOnOverlayClick={true}
        //                 headerTitle={"Edit program"}
        //                 icon={Cross2Icon}
        //             >
        //                 <CreateProgram
        //                     setIsOpen={setIsOpen}
        //                     isEdit={true}
        //                 />
        //             </TableModal>

        //            { program?.data?.numberOfLoanees > 0?  <TableModal
        //       isOpen={isDeleteOpen}
        //       closeOnOverlayClick={true}
        //       closeModal={() => {
        //           setIsDeleteOpen(false)
        //       }}
        //       icon={Cross2Icon}
        //        styeleType="styleBodyTwo"
        //       >
        //       <DeletionRestrictionMessageProps 
        //       message={`This program can not be deleted because it has Cohort that contains ${program?.data?.numberOfLoanees > 0? "loanees" : "loanee"}`}
        //       /> 
        //       </TableModal>  : <DeleteModal
        //                 isOpen={isDeleteOpen}
        //                 closeModal={() => {setIsDeleteOpen(false)}}
        //                 closeOnOverlayClick={true}
        //                 icon={Cross2Icon}
        //                 width='auto'
        //             >
        //                 <DeleteCohort
        //                     setIsOpen={() => setIsDeleteOpen(false)}
        //                     headerTitle={'Program'}
        //                     title={'program'}
        //                     handleDelete={handleDeleteAProgram}
        //                     id={programId}
        //                     isLoading={isLoading}
        //                 />
        //             </DeleteModal>}
        //         </>
        //     }
        // </main>

        
        //   )}
        //    </div>
          <div className='md:flex h-full'>

            <div className={` md:w-[62%] md:border-r md:border-r-gray-200 pr-4`}>
             <div className={` ${style.detailContainer}`}>
              <div className='grid grid-cols-1 gap-y-5 mt-2'>
              <Details isLoading={loading}  id={'totalAmountDisbursed'}    maxWidth={'100%'} name={'Total loan amount disbursed'} value={program?.data?.totalAmountDisbursed} valueType={'currency'} className='w-full'/>
              <Details isLoading={loading}  id={'totalAmountrepaid'}    maxWidth={'100%'} name={'Total loan amount repaid'} value={program?.data?.totalAmountRepaid} valueType={'currency'} className='w-full'/>
              <Details isLoading={loading}  id={'totalAmountoutstanding'}    maxWidth={'100%'} name={'Total loan amount outstanding'} value={program?.data?.totalAmountOutstanding} valueType={'currency'} className='w-full'/>
              <Details isLoading={loading}  id={'averageStartingIncome'}    maxWidth={'100%'} name={'Average starting income'} value={program?.data?.AverageStartingIncome? program?.data?.AverageStartingIncome : 0} valueType={'currency'} className='w-full'/>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-y-5 md:gap-4'>
              <Details isLoading={loading}  id={'deptPercentage'}    maxWidth={'100%'} name={'Debt percentage'} value={program?.data?.debtPercentage} valueType={'percentage'} className='w-full'/>
              <Details isLoading={loading}  id={'repaymentRate'}    maxWidth={'100%'} name={'Repayment rate'} value={program?.data?.repaymentRate} valueType={'percentage'} className='w-full'/>
              <Details isLoading={loading}  id={'completionRate'}    maxWidth={'100%'} name={'Completion rate'} value={program?.data?.completionRate? program?.data?.completionRate : 0} valueType={'percentage'} className='w-full'/>
              <Details isLoading={loading}  id={'employmentRate'}    maxWidth={'100%'} name={'Employment rate'} value={program?.data?.employmentRate? program?.data?.employmentRate : 0} valueType={'percentage'} className='w-full'/>
              </div>
              </div>
              <div className='md:mb-14'/>
             </div>
            </div>

             <div className='md:w-[38%] flex items-start pl-4  md:mt-0 mb-5 md:mb-0 relative md:bottom-2'>
              
                <div className={`  w-full ${style.detailContainer}  ${inter.className}`}>
                <BasicDetail dataList={datasList} isLoading={loading}/>
               
                </div>
              
             </div>
          </div>
       
    );
}
export default ProgramDetails;