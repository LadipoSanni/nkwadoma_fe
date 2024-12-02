"use client"
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {FiBook} from "react-icons/fi";
import {inter} from "@/app/fonts";
import {DetailsTabContainer} from "@/reuseable/details/DetailsTabContainer";
import DetailsImageSection from "@/reuseable/details/DetailsImageSection";
import { MdPersonOutline} from "react-icons/md";
import {BiArrowBack} from "react-icons/bi";
import {traineeData} from "@/utils/cohort/trainee-details-mock-data/Index";
import TableModal from "@/reuseable/modals/TableModal";
import {Cross2Icon} from "@radix-ui/react-icons";
import {DeleteCohort} from "@/reuseable/details/DeleteCohort";
import EditCohortForm from "@/components/cohort/EditCohortForm";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useViewCohortDetailsQuery} from "@/service/admin/cohort_query";
import {formatAmount} from '@/utils/Format'
import {LoaneeInCohortView} from "@/features/cohort/cohort-details/LoaneeInCohortView/Index";


const CohortDetails = () => {
    const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
    const [isEditOpen, setEditOpen] = React.useState(false);


    const cohortsId = sessionStorage.getItem("cohortId") ?? undefined;
    const {data: cohortDetails} = useViewCohortDetailsQuery({
        cohortId: cohortsId
    }, {refetchOnMountOrArgChange: true});

    const [details, setDetails] = useState({
        id: "",
        programId: "",
        organizationId: "",
        cohortDescription: "",
        name: "",
        activationStatus: "",
        cohortStatus: "",
        tuitionAmount: 0,
        totalCohortFee: 0,
        imageUrl: "",
        startDate: "",
        expectedEndDate: "",
    })

    useEffect(() => {
        if (cohortDetails && cohortDetails?.data) {
            const details = cohortDetails.data
            setDetails({
                id: details?.id || "",
                programId: details?.programId || "",
                organizationId: details?.organizationId || "",
                cohortDescription: details?.cohortDescription || "",
                name: details?.name || "",
                activationStatus: details?.activationStatus || "",
                cohortStatus: details?.cohortStatus || "",
                tuitionAmount: details?.tuitionAmount || "",
                totalCohortFee: details?.totalCohortFee || "",
                imageUrl: details?.imageUrl || "",
                startDate: details?.startDate || "",
                expectedEndDate: details?.expectedEndDate || "",
            })
        }
    }, [cohortDetails]);

    const id = "1";

    const dataList = [
        {label: "Start Date", value: details.startDate},
        {label: "End Date", value: details.expectedEndDate},
        {
            label: "Cohort status",
            value: <div
                className={`rounded-2xl px-2 py-1 ${details.cohortStatus === "ACTIVE" ? "bg-[#E7F5EC] text-[#0B6B2B]" : "bg-[#FEF6E8] text-[#66440A]"}`}>
                {details.cohortStatus}
            </div>
        },
        {label: "Number of Dropouts", value: "10"},
        {label: "Dropout rate", value: "0.5%"},
        {label: "Number employed", value: "38"},
        {label: "Employment rate", value: "38%"},
        {label: "Average starting salary", value: "3,000,000.00"},
        {label: "Total amount disbursed", value: "3,000,000.00"},
        {label: "Total amount repaid", value: "3,000,000.00"},
        {label: "Total amount outstanding", value: "3,000,000.00"},
        {label: "Repayment rate", value: "70%"},
        {label: "Tuition amount", value: formatAmount(details.tuitionAmount)},
    ];

    const breakDown = [
        {title: "Tuition", amount: "200,000,000.00"},
        {title: "Device", amount: "600,000,000.00"},
        {title: "Accommodation", amount: "200,000,000.00"},
        {title: "Feeding", amount: "200,000.00"},
        {title: "Total", amount: "300,500,000.00"},
    ];

    const program1Options = [
        {name: 'Edit Cohort', id: '1'},
        traineeData.length > 0
            ?
            {name: 'Refer Cohort', id: '2'}
            :
            {name: 'Delete Cohort', id: '3'},
    ]


    const tagButtonData = [
        {tagIcon: FiBook, tagCount: 10, tagButtonStyle: "bg-lightBlue100", tagText: "trainees"},
        {tagIcon: MdPersonOutline, tagCount: 50, tagButtonStyle: "bg-warning50", tagText: "cohorts"},
    ];


    const router = useRouter();
    const handleBackClick = () => {
        router.push('/cohort')
    }

    const handleDropdownClick = (id: string) => {
        if (id === "1") {
            setEditOpen(true)
        } else if (id === "2") {
            // setIsOpen(true)
        } else {
            setIsDeleteOpen(true)
        }
    }


    return (
        <main className={`${inter.className}  py-3 md:px-10 px-3 w-full`} id={`cohortDetails`}>
            <div className={` `} id={`backClickContainer`}>
                <div className={`flex py-2 space-x-1 text-meedlBlue`} id={`backClick`}
                     data-testid={`backClick `}>
                    <BiArrowBack className={`mt-1 cursor-pointer`} id={`backClickIcon`}/>
                    <h1 id={`backClickText`} data-testid={`backClickText `} className={`cursor-pointer`}
                        onClick={handleBackClick}>Back to cohort</h1>
                </div>
            </div>

            <Tabs
                id={"detailsAndTraineeTab"}
                data-test-id={"detailsAndTraineeTab"}
                defaultValue={"details"}
                className={`pt-3`}
            >
                <TabsList className={'p-0.5 gap-1 h-[2.0625rem] items-center cursor-pointer rounded-md bg-neutral100'}
                          id={`tabsList`}>
                    <TabsTrigger value="details"
                                 className={'py-1 px-2 gap-1 items-center rounded-md'}
                                 id={`tabsTrigger1`}>Details</TabsTrigger>
                    <TabsTrigger value="loanees"
                                 className={'py-1 px-2 gap-1 items-center rounded-md'}
                                 id={`tabsTrigger2`}>Loanees</TabsTrigger>
                </TabsList>

                <div id={`tabsContentDiv`}>
                    <TabsContent value="details" className={'mt-4'} id={`tabsContent`}>
                        <div className={`py-1 flex md:flex-row flex-col md:justify-between`} id={`sections`}>
                            <div id={`firstSection`}>
                                <DetailsImageSection imageSrc={details.imageUrl} cohortTitle={details.name}
                                                     cohortDescription={details.cohortDescription}
                                                     dropdownOption={program1Options}
                                                     handleDropdownClicked={handleDropdownClick}
                                                     buttonText={"Edit Cohort"} tagButtonData={tagButtonData}
                                                     isEditButton={false}
                                                     icon={FiBook}
                                />
                            </div>
                            <div className={`md:w-6/12 min-w-sm md:pt-0 h-[96%]`} id={`secondSection`}>
                                <DetailsTabContainer dataList={dataList} breakDown={breakDown}
                                                     tabTitle1={"cohort-details details"} isTable={true}
                                                     tabTitle2={"trainee"} useBreakdown={true}/>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value={"loanees"} id={`traineeId`}>
                        <LoaneeInCohortView/>
                    </TabsContent>

                </div>

            </Tabs>
            <div id={`deleteModal`}>
                <TableModal
                    isOpen={isDeleteOpen}
                    closeModal={() => setIsDeleteOpen(false)}
                    closeOnOverlayClick={true}
                    icon={Cross2Icon}
                    width="auto"
                >
                    <DeleteCohort setIsOpen={() => setIsDeleteOpen(false)} headerTitle={"Delete cohort"}
                                  title={"cohort"}/>
                </TableModal>
            </div>

            <div className={`md:max-w-sm w-full`} id={`editCohortModal`}>
                <TableModal
                    isOpen={isEditOpen}
                    closeModal={() => setEditOpen(false)}
                    closeOnOverlayClick={true}
                    headerTitle={`Edit Cohort`}
                    icon={Cross2Icon}
                >
                    <EditCohortForm cohortId={id} setIsOpen={() => setEditOpen(false)}/>
                </TableModal>
            </div>
        </main>
    );
}
export default CohortDetails;