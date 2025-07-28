"use client"
import React, {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import {inter, cabinetGrotesk} from "@/app/fonts";
import {
    MdOutlinePeopleAlt,
    MdOutlineDateRange,
    MdPersonOutline,
} from "react-icons/md";
import {FiBook} from "react-icons/fi";
import {TagButton} from "@/reuseable/tagButton/TagButton";
import {Button} from "@/components/ui/button";
import Kebab from "@/reuseable/Kebab/Kebab";
import {IoEllipsisHorizontalSharp} from "react-icons/io5";
import {DetailsTabContainer} from "@/reuseable/details/DetailsTabContainer";
import TableModal from "@/reuseable/modals/TableModal";
import DeleteModal from '@/reuseable/modals/Delete-modal';
import {Cross2Icon} from "@radix-ui/react-icons";
import EditProgramForm from "@/components/program/edit-program-form";
import DeleteCohort from "@/reuseable/details/DeleteCohort";
import {useGetProgramByIdQuery} from "@/service/admin/program_query";
import {formatAmount} from '@/utils/Format'
import {useDeleteProgramMutation} from '@/service/admin/program_query';
import { capitalizeFirstLetters } from "@/utils/GlobalMethods";
import SkeletonForDetailPage from "@/reuseable/Skeleton-loading-state/Skeleton-for-detailPage";
import { useToast } from "@/hooks/use-toast";
import {useAppSelector} from "@/redux/store";



interface ApiError {
    status: number;
    data: {
        message: string;
    };
}


const ProgramDetails = () => {
    const id = useAppSelector(state => (state.program.currentProgramId))
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [programId] = useState(id);
    const [deleteProgram, setDeleteProgram] = useState("")
    const {toast} = useToast()

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
            numberOfCohort: 0,
            numberOfLoanees: 0,
            repaymentRate: 0,
            debtPercentage: 0,
        }
    )

    const {data: program,isLoading:loading} = useGetProgramByIdQuery({id: programId}, {refetchOnMountOrArgChange: true, skip: !programId});
    const [deleteItem, {isLoading}] = useDeleteProgramMutation()



    useEffect(() => {
        if (program?.data) {
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
                numberOfCohort: detail?.numberOfCohort,
                numberOfLoanees: detail?.numberOfLoanees,
                repaymentRate: detail?.repaymentRate || 0,
                debtPercentage: detail?.debtPercentage || 0,
            });
        }
    }, [program])

    const dataList = [
        {label: "Program mode", value: capitalizeFirstLetters(progamDetail.mode.replace(/_/g, ' '))},
        {label: "Program delivery type", value: capitalizeFirstLetters(progamDetail.deliveryType)},
        {label: "Completion rate", value: "0%"},
        {label: "Employment rate", value: "0%"},
        {label: "Average starting income", value: formatAmount(0)},

    ];

    const loanDetail = [
        {detail: "Total loan amount disbursed", value: formatAmount(progamDetail.totalAmountDisbursed)},
        {detail: "Total loan amount repaid", value: formatAmount(progamDetail.totalAmountRepaid)},
        {detail: "Total loan amount outstanding", value: formatAmount(progamDetail.totalAmountOutstanding)},
        {detail: "Debt percentage", value: Math.ceil(Number(progamDetail?.debtPercentage))+"%"},
        {detail: "Repayment rate", value: Math.ceil(Number(progamDetail?.repaymentRate))+"%"},

    ]


    const tagButtonData = [
        {
            tagIcon: MdOutlineDateRange,
            tagCount: progamDetail.duration ?? 0,
            tagButtonStyle: "bg-lightBlue100",
            tagText: progamDetail.duration <= 1 ? 'month' : 'months',
            textColor: "text-meedlBlue",
        },
        {tagIcon: MdOutlinePeopleAlt, tagCount: progamDetail.numberOfCohort, tagButtonStyle: "bg-warning80", tagText: progamDetail.numberOfCohort <= 1 ? 'cohort' : 'cohorts', textColor: "text-success700"},
        {tagIcon: MdPersonOutline, tagCount: progamDetail.numberOfLoanees || 0, tagButtonStyle : "bg-warning50", tagText: progamDetail.numberOfLoanees <= 1 ? 'loanee' : 'loanees', textColor: "text-warning900" },
    ];

    const programOptions = [
        {name: 'Delete program', id: '3'},
    ]
    const handleDropdownClick = (id: string) => {
        if (id === "3") setIsDeleteOpen(true)
    }

    const router = useRouter();

    const handleDeleteAProgram = async (id: string) => {

        try {
            const itemDeleted = await deleteItem({id}).unwrap();
            if (itemDeleted) {
                setIsDeleteOpen(false)
                setTimeout(() => {
                    toast({
                        description: "Program deleted successfully",
                        status: "success",
                    })
                }, 600);
                router.push('/program')
            }

        } catch (error) {
            const err = error as ApiError;
            setDeleteProgram(err?.data?.message || "Program with loanee cannot be deleted")
            setTimeout(() => {
                toast({
                    description: deleteProgram || "Program with loanee cannot be deleted",
                    status: "error",
                })
            }, 600)
        }
    }

    const handleModalClick = () => {
        setIsOpen(true)
    }



    return (
        <>
          {loading ? ( <SkeletonForDetailPage /> ) : (
        <main className={`${inter.className} w-full max-h-full`} id={"mainDiv"}>
                    <section className={`p- flex md:flex-row flex-col md:gap-0 md:justify-between`} id={`section`}>
                        <div className={'flex flex-col gap-5 md:h-[70vh] md:max-h-none'} id={`status`}>
                            <div
                                id={`fibookIcon`}
                                className={'grid place-items-center h-[7.5rem] w-[7.5rem] bg-lightBlue500 rounded-full'}>
                                <FiBook id={`book`} className={'h-[50px] w-[50px] text-meedlBlue'}/>
                            </div>
                            <div className={'flex flex-col gap-3'} id={`tagDiv`}>
                                <h1 id={`name`}
                                    className={`text-meedlBlack ${cabinetGrotesk.className} text-[28px] font-medium leading-[33.6px] md:w-[351px] break-words overflow-y-auto max-h-28`}>
                                    {progamDetail.name}
                                </h1>
                                <div className={'grid gap-5'} id={`tagButtonDiv`}>
                                    <p id={`details`}
                                       className={'text-sm font-normal w-[351px] text-grey400 break-words scrollbar-width:none overflow-y-auto max-h-40'}
                                       dangerouslySetInnerHTML={{__html: progamDetail.programDescription}}
                                       />
                                      
                                    <div id={`details`} data-testid="details"
                                         className="grid md:grid-cols-3 grid-cols-2 gap-3 w-fit">
                                        {tagButtonData.map((tagProps, index) => (
                                            <TagButton key={index} {...tagProps} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div id={`buttons`} className={'flex md:justify-between gap-5'}>
                                <Button onClick={handleModalClick}
                                        id="editButton"
                                        variant={"secondary"}
                                        className={' w-[18.1875rem] h-[2.8125rem] text-meedlWhite  shadow-none'}>Edit
                                    program</Button>
                                {
                                 <div role={"button"}
                                     id="kebabId"
                                     className={`w-12 h-12 flex justify-center items-center border border-meedlBlue rounded-full`}>
                                    <Kebab kebabOptions={programOptions} icon={IoEllipsisHorizontalSharp}
                                           handleDropDownClick={handleDropdownClick}/>
                                </div>}
                            </div>
                        </div>

                        <div id={`container`} className={`w-full md:w-1/2 md:pt-0 pt-5 overflow-x-hidden`}>
                            <DetailsTabContainer isTable={false} isNotTableDataList={loanDetail} dataList={dataList}
                                                 tabTitle1={"program details"} tabTitle2={"Loan details"}/>
                        </div>
                    </section>
            {
                <>
                    <TableModal
                        isOpen={isOpen}
                        closeModal={() => setIsOpen(false)}
                        closeOnOverlayClick={true}
                        headerTitle={"Edit program"}
                        icon={Cross2Icon}
                    >
                        <EditProgramForm
                            // programId={programId}
                            setIsOpen={setIsOpen}
                            programDetail={progamDetail}
                        />
                    </TableModal>

                    <DeleteModal
                        isOpen={isDeleteOpen}
                        closeModal={() => setIsDeleteOpen(false)}
                        closeOnOverlayClick={true}
                        icon={Cross2Icon}
                        width='auto'
                    >
                        <DeleteCohort
                            setIsOpen={() => setIsDeleteOpen(false)}
                            headerTitle={'Program'}
                            title={'program'}
                            handleDelete={handleDeleteAProgram}
                            id={programId}
                            isLoading={isLoading}
                        />
                    </DeleteModal>
                </>
            }
        </main>
          )}
        </>
    );
}
export default ProgramDetails;