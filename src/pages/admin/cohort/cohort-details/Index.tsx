"use client"
import React from "react";
import {useRouter} from "next/navigation";
import {FiBook} from "react-icons/fi";
import {inter} from "@/app/fonts";
import CohortDetailsImage from "../../../../../public/asset/Image/CohortDetailsImage.png"
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
import {CohortTrainees} from "@/utils/LoanRequestMockData/cohortProduct";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import CustomSelect from "@/reuseable/Input/Custom-select";
import AddTraineeForm from "@/components/cohort/AddTraineeForm";
import SelectableTable from "@/reuseable/table/SelectedTable";

const CohortDetails = () => {
    const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
    const [isEditOpen, setEditOpen] = React.useState(false);
    const [isReferred, setIsReferred] = React.useState(``);
    const [addTrainee, setAddTrainee] = React.useState(false);

    const id = "1";

    const dataList = [
        {label: "Start Date", value: "13, Dec 2023"},
        {label: "End Date", value: "15, Jan 2024"},
        {label: "Cohort status", value: "10"},
        {label: "Number of Dropouts", value: "10"},
        {label: "Dropout rate", value: "0.5%"},
        {label: "Number employed", value: "38"},
        {label: "Employment rate", value: "38%"},
        {label: "Average starting salary", value: "3,000,000.00"},
        {label: "Total amount disbursed", value: "3,000,000.00"},
        {label: "Total amount repaid", value: "3,000,000.00"},
        {label: "Total amount outstanding", value: "3,000,000.00"},
        {label: "Repayment rate", value: "70%"},
        {label: "Tuition amount", value: "3,500,000.00"},
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

    const description = "Design thinking is a process for creative problem solving." +
        "Design thinking has a human-centered core. It encourages organizations to focus on " +
        "thepeople they're creating for, which leads to better products, services, and internal processes."

    const TraineeHeader = [
        {title: "Trainee", sortable: true, id: "Trainee"},
        {title: "Initial deposit", sortable: true, id: "InitialDeposit"},
        {title: "Amount requested", sortable: true, id: "AmountRequested"},
        {title: "Amount received", sortable: true, id: "AmountReceived"},
    ]

    const items = ["Referred", "Not referred"]

    const handleSelected = ()=>{
        setIsReferred()
    }
    const handleAddTrainee = () => {
        setAddTrainee(true)
    }

    const handleRefer =()=>{

    }
    return (
        <main className={`${inter.className}  py-3 md:px-10 px-3 w-full`}>
            <div className={` `}>
                <div className={`flex py-2 space-x-1 text-meedlBlue`} id={`backClick`}
                     data-testid={`backClick `}>
                    <BiArrowBack className={`mt-1 cursor-pointer`}/>
                    <h1 id={`backClickText`} data-testid={`backClickText `} className={`cursor-pointer`}
                        onClick={handleBackClick}>Back to cohort</h1>
                </div>
            </div>

            <Tabs
                id={"detailsAndTraineeTab"}
                data-test-id={"detailsAndTraineeTab"}
                defaultValue={"details"}
                className={`pt-1`}
            >
                <TabsList className={'p-0.5 gap-1 h-[2.0625rem] items-center cursor-pointer rounded-md bg-neutral100'}>
                    <TabsTrigger value="details"
                                 className={'py-1 px-2 gap-1 items-center rounded-md'}>Details</TabsTrigger>
                    <TabsTrigger value="trainee"
                                 className={'py-1 px-2 gap-1 items-center rounded-md'}>Trainees</TabsTrigger>
                </TabsList>

                <div>
                    <TabsContent value="details" className={'mt-4'}>
                        <div className={`py-1 flex md:flex-row flex-col md:justify-between`}>
                            <div>
                                <DetailsImageSection imageSrc={CohortDetailsImage.src} cohortTitle={"Luminary"}
                                                     cohortDescription={description}
                                                     dropdownOption={program1Options}
                                                     handleDropdownClicked={handleDropdownClick}
                                                     buttonText={"Edit Cohort"} tagButtonData={tagButtonData}
                                                     isEditButton={false}/>
                            </div>
                            <div className={`md:w-6/12 pt-8 md:pt-0 h-[96%]`}>
                                <DetailsTabContainer dataList={dataList} breakDown={breakDown}
                                                     tabTitle1={"cohort details"}
                                                     tabTitle2={"trainee"} useBreakdown={true}/>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value={"trainee"} className={`mt-4 grid `}>
                        <div className={`space-y-5`}>
                            <div className={`flex md:flex-row flex-col md:justify-between`}>
                                <div className={`flex md:flex-row gap-4`}>
                                    <div className="max-w-md mx-auto">
                                        <div className="relative">
                                            <div
                                                className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                <MdSearch className="h-5 w-5 text-grey200"/>
                                            </div>
                                            <Input
                                                className='w-full lg:w-80 h-12 focus-visible:outline-0 focus-visible:ring-0 shadow-none  border-solid border border-neutral650  text-grey450 pl-10' type="search" required/>
                                        </div>
                                    </div>
                                    <div className='w-32'>
                                        <CustomSelect value={isReferred} onChange={handleSelected}
                                                      selectContent={items}
                                                      className={`w-10px w-full text-black  bg-neutral100 h-11 border-1 focus-visible:outline-0 focus-visible:ring-0 shadow-none hover:bg-neutral100 ring-1 ring-neutral650`}
                                                      placeHolder={`referred`}/>
                                    </div>
                                </div>

                                <div className={`flex md:flex-row flex-col gap-4`}>
                                    <div className={`md:block hidden`}>
                                        <Button variant={"outline"}
                                                size={"lg"}
                                                className={`bg-neutral100 text-meedlBlack focus-visible:ring-0 shadow-none  border-solid border border-neutral650 w-full h-12 flex justify-center items-center`}
                                                onClick={handleRefer}>Refer</Button>
                                    </div>
                                    <div>
                                        <Button variant={"secondary"}
                                                size={"lg"}
                                                className={`bg-meedlBlue text-meedlWhite w-full h-12 flex justify-center items-center`}
                                                onClick={handleAddTrainee}>Add Trainee</Button>
                                    </div>
                                    <div className={`md:hidden block`}>
                                        <Button variant={"outline"}
                                                size={"lg"}
                                                className={`bg-neutral100 text-meedlBlack focus-visible:ring-0 shadow-none  border-solid border border-neutral650 w-full h-12 flex justify-center items-center`}
                                                onClick={handleRefer}>Refer</Button>
                                    </div>

                                </div>
                            </div>

                            <div>

                                <SelectableTable
                                    tableData={CohortTrainees}
                                    tableHeader={TraineeHeader}
                                    staticHeader={'Trainee'}
                                    staticColunm={'trainee'}
                                    tableHeight={45}
                                    icon={MdOutlinePerson}
                                    sideBarTabName={"Trainee"}
                                    handleRowClick={() => {
                                    }}
                                    optionalRowsPerPage={10}
                                    tableCellStyle={'h-12'}
                                    enableRowSelection={true}
                                />
                            </div>
                        </div>

                    </TabsContent>

                </div>

            </Tabs>
            <div>
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

            <div className={`md:max-w-sm w-full`}>
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

            <div className={`md:max-w-sm w-full`}>
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