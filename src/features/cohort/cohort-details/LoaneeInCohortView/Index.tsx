"use client";
import React, {useEffect} from 'react'
import {MdOutlinePerson, MdSearch} from "react-icons/md";
import {Input} from "@/components/ui/input";
import CustomSelect from "@/reuseable/Input/Custom-select";
import {Button} from "@/components/ui/button";
import SelectableTable from "@/reuseable/table/SelectableTable";
import {formatAmount} from "@/utils/Format";
import {useState} from "react";
import {
    useReferLoaneeToACohortMutation,
    useSearchForLoaneeInACohortQuery,
    useViewAllLoaneeQuery
} from "@/service/admin/cohort_query";
import TableModal from "@/reuseable/modals/TableModal";
import {Cross2Icon} from "@radix-ui/react-icons";
import AddTraineeForm from "@/components/cohort/AddTraineeForm";
import {getItemSessionStorage} from "@/utils/storage";
import {useToast} from "@/hooks/use-toast";
import {cohortLoaneeResponse} from "@/types/Component.type";
import Table from "@/reuseable/table/LoanProductTable"

interface userIdentity {
    firstName: string;
    lastName: string;
}

interface loaneeLoanDetail {
    initialDeposit: number;
    amountRequested: number;
    amountReceived: number;
}

interface viewAllLoanee {
    userIdentity: userIdentity;
    loaneeLoanDetails: loaneeLoanDetail;
    loaneeStatus: string;
}

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode | userIdentity | loaneeLoanDetail | cohortLoaneeResponse;
}

type viewAllLoanees = viewAllLoanee & TableRowData;

interface props {
    cohortFee?: string,
}

export const LoaneeInCohortView = ({cohortFee}: props) => {
    const [allLoanee, setAllLoanee] = useState<viewAllLoanees[]>([]);
    const [addLoanee, setAddLoanee] = React.useState(false);
    const [isRowSelected, setIsRowSelected] = React.useState(false);
    const [loaneeName, setLoaneeName] = React.useState("");
    // const [enableRefferButton, setRefferBottom] = useState(true)
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
    const [isReferred, setIsReferred] = React.useState("Not referred");



    const cohortId = getItemSessionStorage("cohortId")
    const size = 100;
    const [page] = useState(0);
    const cohortsId = sessionStorage.getItem("cohortId") ?? undefined;

    const {data} = useViewAllLoaneeQuery({
        cohortId: cohortsId,
        pageSize: size,
        pageNumber: page
    },{refetchOnMountOrArgChange: true})

    const {data: searchResults, isLoading: isLoading} = useSearchForLoaneeInACohortQuery({
            loaneeName: loaneeName,
            cohortId: cohortsId
        },
        {skip: !loaneeName || !cohortsId})


    const [refer] = useReferLoaneeToACohortMutation()

    useEffect(() => {
        let result: viewAllLoanees[] = [];
        if (loaneeName && searchResults && searchResults?.data) {
            result = searchResults.data; }
        else if (!loaneeName && data && data?.data) {
            result = data.data.body;
        }
        if (isReferred === "Not referred") {
            result = result.filter(filter => filter.loaneeStatus === "ADDED");
        }
        else if
            (isReferred === "Referred") {
                result = result.filter(filter => filter.loaneeStatus === "REFERRED");
            }

        setAllLoanee(result);
    }, [data, loaneeName, searchResults, isReferred]);


    const handleSelectedRow = (rows: Set<string>) => {
        setSelectedRows(rows)
    }

    const loanProduct = [
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
        {title: "Amount received", sortable: true, id: "AmountReceived",
            selector:(row: viewAllLoanees) => formatAmount((row.loaneeLoanDetail as loaneeLoanDetail)?.amountReceived)
        },
    ]

    const items = ["Not referred","Referred"]

    const handleSelected = (value: string) => {
        setIsReferred(value);
    }
    const handleAddLoane = () => {
        setAddLoanee(true)
    }
    const {toast} = useToast()


    const handleRefer = async () => {
        const data = {
            cohortId: cohortId,
            loaneeIds: Array.from(selectedRows)
        }
        try {
            const response = await refer(data).unwrap()
            toast({
                description: response?.message,
                status: "success",
            })
        } catch (error) {
            toast({
                //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                description: error?.data?.message,
                status: "error",
            })
        }

    }

    const handleRowClick = () => {
        setIsRowSelected(isRowSelected);
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
                                    type="search" value={loaneeName} id={`search`} placeholder={"Search"}
                                    onChange={(e) => setLoaneeName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='w-32 md:pt-2 pt-2' id={`selectId`}>
                            <CustomSelect onChange={handleSelected}
                                          selectContent={items}
                                          placeHolder={"Not referred"}
                                          className={` w-full text-black  bg-neutral100 h-12 border-1 focus-visible:outline-0 focus-visible:ring-0 shadow-none hover:bg-neutral100 ring-1 ring-neutral650`}
                                          />
                        </div>
                    </div>

                    <div className={`flex md:flex-row flex-col gap-4 md:items-center`}
                         id={`ReferAndTraineeDiv`}>
                        <div className={`md:block hidden`} id={`largerScreenReferButton`}>
                            <Button variant={"outline"}
                                    size={"lg"}
                                    className={`bg-neutral100  ${selectedRows.size !== 0 ? ' border-solid  border-[#142854] text-[#142854] ' : 'text-[#939CB0]'} md:border-solid md:border-neutral650 border-solid border border-neutral650 w-full h-12 flex justify-center items-center`}
                                    onClick={handleRefer} disabled={selectedRows.size === 0}>Refer</Button>
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
                                    disabled={selectedRows.size === 0}
                                    className={`bg-neutral100   ${selectedRows.size !== 0 ? ' border-solid ring-2 ring-[#142854] border-[#142854] text-[#142854] ' : 'text-[#939CB0] border border-neutral650'} w-full h-12 flex justify-center items-center`}
                                    onClick={handleRefer}>Refer</Button>
                        </div>

                    </div>
                </div>

                <div className={`pt-5 md:pt-2`} id={`traineeTable`}>
                    { isReferred === "Not referred"?
                        <SelectableTable
                            tableData={allLoanee}
                            tableHeader={loanProduct}
                            staticHeader="Trainee"
                            staticColunm="firstName"
                            tableHeight={45}
                            icon={MdOutlinePerson}
                            sideBarTabName="Trainee"
                            handleRowClick={ handleRowClick}
                            optionalRowsPerPage={10}
                            tableCellStyle="h-12"
                            enableRowSelection={true}
                            isLoading={isLoading}
                            condition={true}
                            handleSelectedRow={handleSelectedRow}
                        /> : <Table
                            tableData={allLoanee}
                            tableHeader={loanProduct}
                            handleRowClick={()=> {}}
                            staticHeader="Trainee"
                            staticColunm="firstName"
                            icon={MdOutlinePerson}
                            sideBarTabName="Trainee"
                            optionalRowsPerPage={10}
                            tableCellStyle="h-12"
                            isLoading={isLoading}
                            condition={true}
                            tableHeight={45}
                        />
                    }
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
                    <AddTraineeForm tuitionFee={cohortFee} setIsOpen={() => setAddLoanee(false)}/>
                </TableModal>

            </div>
        </main>
    )
}