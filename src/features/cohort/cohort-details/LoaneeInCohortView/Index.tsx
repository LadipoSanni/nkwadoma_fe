"use client";
import React from 'react'
import {MdOutlinePerson, MdSearch} from "react-icons/md";
import {Input} from "@/components/ui/input";
import CustomSelect from "@/reuseable/Input/Custom-select";
import {Button} from "@/components/ui/button";
import SelectableTable from "@/reuseable/table/SelectableTable";
import {formatAmount} from "@/utils/Format";
import {useEffect, useState} from "react";
import {useViewAllLoaneeQuery} from "@/service/admin/cohort_query";
import TableModal from "@/reuseable/modals/TableModal";
import {Cross2Icon} from "@radix-ui/react-icons";
import AddTraineeForm from "@/components/cohort/AddTraineeForm";

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

export const LoaneeInCohortView = () => {
    const [allLoanee, setAllLoanee] = useState<viewAllLoanees[]>([]);
    const [isReferred, setIsReferred] = React.useState(``);
    const [addLoanee, setAddLoanee] = React.useState(false);
    const [isRowSelected, setIsRowSelected] = React.useState(false);

    const id = "1";
    const size = 100;
    const [page] = useState(0);
    const cohortsId = sessionStorage.getItem("cohortId") ?? undefined;

    const {data} = useViewAllLoaneeQuery({
        cohortId: cohortsId,
        pageSize: size,
        pageNumber: page
    }, {refetchOnMountOrArgChange: true,})


    useEffect(() => {
        if (data && data?.data) {
            const result = data?.data?.body
            setAllLoanee(result)
        }
    }, [data])

    const TraineeHeader = [
        {
            title: "Loanee",
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
    const handleAddLoane = () => {
        setAddLoanee(true)
    }

    const handleRefer = () => {

    }

    const handleRowClick = (row: TableRowData) => {
        setIsRowSelected(isRowSelected);
        console.log('Row clicked:', row);
    };

    return (
        <main>
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
                                    onClick={handleAddLoane}>Add Loanee</Button>
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
                        staticHeader={"LoaneeInCohortView"}
                        staticColunm={"firstName"}
                        tableHeight={45}
                        icon={MdOutlinePerson}
                        sideBarTabName={"LoaneeInCohortView"}
                        handleRowClick={(row) => handleRowClick(row)}
                        optionalRowsPerPage={10}
                        tableCellStyle={"h-12"}
                        enableRowSelection={true}
                    />
                </div>
            </div>
            <div className={`md:max-w-sm`} id={`AddTraineeDiv`}>
                <TableModal
                    isOpen={addLoanee}
                    closeModal={() => setAddLoanee(false)}
                    closeOnOverlayClick={true}
                    icon={Cross2Icon}
                    headerTitle={`Add Loanee`}
                    width="30%"
                >
                    <AddTraineeForm cohortId={id} setIsOpen={() => setAddLoanee(false)}/>
                </TableModal>

            </div>
        </main>
    )
}