"use client"
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {FiBook} from "react-icons/fi";
import {inter} from "@/app/fonts";
import {DetailsTabContainer} from "@/reuseable/details/DetailsTabContainer";
import DetailsImageSection from "@/reuseable/details/DetailsImageSection";
import {MdOutlinePerson, MdPersonOutline, MdSearch} from "react-icons/md";
import {BiArrowBack} from "react-icons/bi";
import {traineeData} from "@/utils/cohort/trainee-details-mock-data/Index";
import TableModal from "@/reuseable/modals/TableModal";
import {Cross2Icon} from "@radix-ui/react-icons";
import {DeleteCohort} from "@/reuseable/details/DeleteCohort";
import EditCohortForm from "@/components/cohort/EditCohortForm";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import CustomSelect from "@/reuseable/Input/Custom-select";
import AddTraineeForm from "@/components/cohort/AddTraineeForm";
import {useViewAllLoaneeQuery, useViewCohortDetailsQuery} from "@/service/admin/cohort_query";
import SelectableTable from "@/reuseable/table/SelectableTable";
import {getItemSessionStorage} from "@/utils/storage";
import {formatAmount} from '@/utils/Format'


interface userIdentity {
    firstName: string;
    lastName: string;
}

interface loaneeLoanDetail {
    initialDeposit: number;
    amountRequested: number
}

interface viewAllLoanee {
    userIdentity: userIdentity;
    loaneeLoanDetails: loaneeLoanDetail;
}

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode | userIdentity | loaneeLoanDetail;
}

type viewAllLoanees = viewAllLoanee & TableRowData;

const CohortDetails = () => {
    const [allLoanee, setAllLoanee] = useState<viewAllLoanees[]>([]);
    const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
    const [isEditOpen, setEditOpen] = React.useState(false);
    const [isReferred, setIsReferred] = React.useState(``);
    const [addTrainee, setAddTrainee] = React.useState(false);
    const [isRowSelected, setIsRowSelected] = React.useState(false);
    const [cohortsId, setCohortId] = React.useState("")
    const [programId, setProgramId] = React.useState("")
    const size = 100;
    const [page] = useState(0);
    const {data} = useViewAllLoaneeQuery({
        cohortId: cohortsId,
        pageSize: size,
        pageNumber: page
    }, {refetchOnMountOrArgChange: true,})
    const {data: cohortDetails} = useViewCohortDetailsQuery({
        programId: programId,
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
        if (data && data?.data) {
            const result = data?.data?.body
            setAllLoanee(result)
        }
    }, [data])

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

    useEffect(() => {
        const idOfCohort = getItemSessionStorage("cohortId")
        const programsId = getItemSessionStorage("programsId")
        if (idOfCohort) {
            setCohortId(idOfCohort)
        }
        if (programsId) {
            setProgramId(programsId)
        }
    }, [])

    const id = "1";

    const dataList = [
        {label: "Start Date", value: details.startDate},
        {label: "End Date", value: details.expectedEndDate},
        {label: "Cohort status", value: <div className={`rounded-2xl px-2 py-1 ${details.cohortStatus === "ACTIVE"? "bg-[#E7F5EC] text-[#0B6B2B]" : "bg-[#FEF6E8] text-[#66440A]"}`}>
                {details.cohortStatus}
        </div>},
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

    const TraineeHeader = [
        {
            title: "Trainee",
            sortable: true,
            id: "firstName",
            selector: (row: viewAllLoanees) => row.userIdentity?.firstName + " " + row.userIdentity?.lastName
        },
        {
            title: "Initial deposit",
            sortable: true,
            id: "InitialDeposit",
            selector: (row: viewAllLoanees) => formatAmount((row.loaneeLoanDetail as loaneeLoanDetail)?.initialDeposit)
        },
        {
            title: "Amount requested",
            sortable: true,
            id: "AmountRequested",
            selector: (row: viewAllLoanees) => formatAmount((row.loaneeLoanDetail as loaneeLoanDetail)?.amountRequested)
        },
        {title: "Amount received", sortable: true, id: "AmountReceived"},
    ]

    const items = ["Referred", "Not referred"]

    const handleSelected = () => {
        setIsReferred(isReferred)
    }
    const handleAddTrainee = () => {
        setAddTrainee(true)
    }

    const handleRefer = () => {

    }

    const handleRowClick = (row: TableRowData) => {
        setIsRowSelected(isRowSelected);
        console.log('Row clicked:', row);
    };

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
                    <TabsTrigger value="trainee"
                                 className={'py-1 px-2 gap-1 items-center rounded-md'}
                                 id={`tabsTrigger2`}>Trainees</TabsTrigger>
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
                                                     tabTitle1={"cohort details"} isTable={true}
                                                     tabTitle2={"trainee"} useBreakdown={true}/>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value={"trainee"} id={`traineeId`}>
                        <div className={`pb-4`} id={`searchReferAddTraineeAndTable`}>
                            <div className={`flex md:flex-row flex-col md:justify-between`}
                                 id={`searchReferAndAddTrainee`}>
                                <div className={`flex md:flex-row gap-4 md:items-center items-center`} id={`searchId`}>
                                    <div className="max-w-md mx-auto" id={`searchInput`}>
                                        <div className="relative" id={`searchDiv`}>
                                            <div
                                                className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
                                                id={`searchIcon`}>
                                                <MdSearch className="h-5 w-5 text-grey200"/>
                                            </div>
                                            <Input
                                                className='w-full lg:w-80 h-12 focus-visible:outline-0 focus-visible:ring-0 shadow-none  border-solid border border-neutral650  text-grey450 pl-10'
                                                type="search" id={`search`} placeholder={"Search"} required/>
                                        </div>
                                    </div>
                                    <div className='w-32 md:pt-2 pt-2' id={`selectId`}>
                                        <CustomSelect value={isReferred} onChange={handleSelected}
                                                      selectContent={items}
                                                      className={` w-full text-black  bg-neutral100 h-12 border-1 focus-visible:outline-0 focus-visible:ring-0 shadow-none hover:bg-neutral100 ring-1 ring-neutral650`}
                                                      placeHolder={`referred`}/>
                                    </div>
                                </div>

                                <div className={`flex md:flex-row flex-col gap-4 md:items-center`}
                                     id={`ReferAndTraineeDiv`}>
                                    <div className={`md:block hidden`} id={`largerScreenReferButton`}>
                                        <Button variant={"outline"}
                                                size={"lg"}
                                                className={`bg-neutral100 text-meedlBlack focus-visible:ring-0 shadow-none  border-solid border border-neutral650 w-full h-12 flex justify-center items-center`}
                                                onClick={handleRefer} disabled={!isRowSelected}>Refer</Button>
                                    </div>
                                    <div id={`addTraineeButton`}>
                                        <Button variant={"secondary"}
                                                size={"lg"}
                                                className={`bg-meedlBlue text-meedlWhite w-full h-12 flex justify-center items-center`}
                                                onClick={handleAddTrainee}>Add Trainee</Button>
                                    </div>
                                    <div className={`md:hidden block`} id={`smallScreenReferButton`}>
                                        <Button variant={"outline"}
                                                size={"lg"}
                                                className={`bg-neutral100 text-meedlBlack focus-visible:ring-0 shadow-none  border-solid border border-neutral650 w-full h-12 flex justify-center items-center`}
                                                onClick={handleRefer}>Refer</Button>
                                    </div>

                                </div>
                            </div>

                            <div className={`pt-5 md:pt-2`} id={`traineeTable`}>
                                <SelectableTable
                                    tableData={allLoanee}
                                    tableHeader={TraineeHeader}
                                    staticHeader={"Trainee"}
                                    staticColunm={"firstName"}
                                    tableHeight={45}
                                    icon={MdOutlinePerson}
                                    sideBarTabName={"Trainee"}
                                    handleRowClick={(row) => handleRowClick(row)}
                                    optionalRowsPerPage={10}
                                    tableCellStyle={"h-12"}
                                    enableRowSelection={true}
                                />
                            </div>
                        </div>

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

            <div className={`md:max-w-sm w-full`} id={`AddTraineeDiv`}>
                <TableModal
                    isOpen={addTrainee}
                    closeModal={() => setAddTrainee(false)}
                    closeOnOverlayClick={true}
                    icon={Cross2Icon}
                    headerTitle={`Add Trainee`}
                    width="auto"
                >
                    <AddTraineeForm cohortId={id} setIsOpen={() => setAddTrainee(false)}/>
                </TableModal>

            </div>
        </main>
    );
}
export default CohortDetails;