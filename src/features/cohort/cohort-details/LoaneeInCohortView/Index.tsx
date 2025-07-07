"use client";
import React, {useEffect} from 'react'
import {MdOutlinePerson, MdSearch} from "react-icons/md";
import {Input} from "@/components/ui/input";
import CustomSelect from "@/reuseable/Input/Custom-select";
import {Button} from "@/components/ui/button";
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
import {useToast} from "@/hooks/use-toast";
import {cohortLoaneeResponse} from "@/types/Component.type";
import Isloading from "@/reuseable/display/Isloading";
import SearchEmptyState from "@/reuseable/emptyStates/SearchEmptyState";
import { useAppSelector } from '@/redux/store';
import CheckBoxTable from '@/reuseable/table/Checkbox-table';

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

interface ApiError {
    status: number;
    data: {
      message: string;
    };
  }

export const LoaneeInCohortView = ({cohortFee}: props) => {
    const [addLoanee, setAddLoanee] = React.useState(false);
    const [loaneeName, setLoaneeName] = React.useState("");
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
    const [isReferred, setIsReferred] = React.useState("Not referred");
    const [enableButton, setEnableButton] = useState(false)
    const cohortTab = useAppSelector(state => state?.cohort?.cohortStatusTab)
    const cohortId =  useAppSelector(store=> store?.cohort?.setCohortId)
    const size = 10;
    const [page,setPageNumber] = useState(0);
    const [totalPage,setTotalPage] = useState(0)
    const [hasNextPage,setNextPage] = useState(false)
    const status = isReferred === "Not referred"? "ADDED" : "REFERRED"

   

    const {data,isLoading: loaneeIsloading} = useViewAllLoaneeQuery({
        cohortId: cohortId,
        status: status,
        pageSize: size,
        pageNumber: page
    })

    const {data: searchResults, isLoading: isLoading} = useSearchForLoaneeInACohortQuery({
            loaneeName: loaneeName,
            cohortId: cohortId,
            status: status,
            pageSize: size,
            pageNumber: page
        },
        {skip: !loaneeName || !cohortId})


    const [refer, {isLoading: isLoadingRefer}] = useReferLoaneeToACohortMutation()

    const handleSelectedRow = (rows: Set<string>) => {
        setSelectedRows(rows)
    }

    useEffect(()=> {
        if (loaneeName && searchResults && searchResults?.data) {
            setNextPage(searchResults?.data?.hasNextPage)
            setTotalPage(searchResults?.data?.totalPages)
            setPageNumber(searchResults?.data?.pageNumber)
        }else if(!loaneeName && data &&  data?.data) {
            setNextPage(data?.data?.hasNextPage)
            setTotalPage(data?.data?.totalPages)
            setPageNumber(data?.data?.pageNumber)
        }
    },[loaneeName,searchResults,data])

    const loanProduct = [
        {title: "Loanee", sortable: true, id: "firstName", selector: (row: viewAllLoanees) => row.userIdentity?.firstName + " " + row.userIdentity?.lastName},
        {title: "Initial deposit", sortable: true, id: "InitialDeposit", selector: (row: viewAllLoanees) => formatAmount((row.loaneeLoanDetail as loaneeLoanDetail)?.initialDeposit)},
        {title: "Amount requested", sortable: true, id: "AmountRequested", selector: (row: viewAllLoanees) => formatAmount((row.loaneeLoanDetail as loaneeLoanDetail)?.amountRequested)},
        {title: "Amount received", sortable: true, id: "AmountReceived", selector:(row: viewAllLoanees) => formatAmount((row.loaneeLoanDetail as loaneeLoanDetail)?.amountReceived)},
    ]

    const items = ["Not referred","Referred"]

    const getTableData = () => {
        if (!data?.data?.body) return [];
        if (loaneeName) return searchResults?.data?.body || [];
        return data?.data?.body;
    }

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
            setSelectedRows(new Set());
            setEnableButton(false)
        } catch (err) {
            const error = err as ApiError;
            toast({
                description: error?.data?.message,
                status: "error",
            })
        }

    }


    return (
        <main>
            <div className={`pb-4`} id={`searchReferAddTraineeAndTable`}>
                <div className={`flex md:flex-row flex-col md:justify-between`}
                     id={`searchReferAndAddTrainee`}>
                    <div className={`flex md:flex-row gap-4 md:items-center items-center`} id={`searchId`}>
                        <div className="max-w-md flex-1 mx-auto" id={`searchInput`}>
                            <div className="relative" id={`searchDiv`}>
                                <div
                                    className="absolute inset-y-0 start-0 w-full flex items-center ps-3 pointer-events-none"
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
                            <Button
                                aria-disabled={!enableButton}
                                variant={"outline"}
                                    size={"lg"}
                                    className={`bg-neutral100  ${enableButton ? ' border-solid ring-1 ring-[#142854] border-[#142854] text-[#142854] ' : 'text-[#939CB0] border border-neutral650'} md:border-solid md:border-neutral650 border-solid border border-neutral650 hover:border-neutral650 hover:bg-neutral100 w-full h-12 flex justify-center items-center`}
                                    onClick={handleRefer} disabled={selectedRows.size === 0 || isLoadingRefer}>
                                {isLoadingRefer ? <Isloading /> : 'Refer'}

                            </Button>
                        </div>
                        <div id={`addTraineeButton`}>
                            <Button variant={"secondary"}
                                    size={"lg"}
                                    className={` w-full h-12 flex justify-center items-center  ${cohortTab === "incoming" || cohortTab ===  "current"? "bg-meedlBlue text-meedlWhite" : "bg-[#D7D7D7] hover:bg-[#D7D7D7]"}`}
                                    onClick={handleAddLoane}
                                    disabled={cohortTab === "graduated"}
                                    >Add Loanee</Button>
                                    
                        </div>
                        <div className={`md:hidden block`} id={`smallScreenReferButton`}>
                            <Button
                                aria-disabled={!enableButton}
                                   variant={"outline"}
                                    size={"lg"}
                                    disabled={selectedRows.size === 0 || isLoadingRefer}
                                    className={`bg-neutral100   ${enableButton ? ' border-solid ring-1 ring-[#142854] border-[#142854] text-[#142854] ' : 'text-[#939CB0] border border-neutral650'} w-full h-12 flex justify-center items-center`}
                                    onClick={handleRefer}>
                                {isLoadingRefer ? <Isloading />: 'Refer'}

                            </Button>
                        </div>

                    </div>
                </div>

                <div className={`pt-5 md:pt-2`} id={`traineeTable`}>
                  {loaneeName && searchResults?.data?.body?.length === 0? <div><SearchEmptyState icon={MdSearch} name='loanee'/></div> :  
                  <div>
                    <CheckBoxTable
                        tableData={getTableData()}
                        tableHeader={loanProduct}
                        handleRowClick={()=> {}}
                        staticHeader="Loanee"
                        staticColunm="firstName"
                        icon={MdOutlinePerson}
                        sideBarTabName="loanee"
                        tableCellStyle="h-12"
                        isLoading={isLoading || loaneeIsloading}
                        condition={true}
                        tableHeight={45}
                        hasNextPage={hasNextPage}
                        pageNumber={page}
                        setPageNumber={setPageNumber}
                        totalPages={totalPage}
                        enableButton={() =>setEnableButton(true) }
                        disabledButton={()=> setEnableButton(false) }
                        handleSelectedRow={handleSelectedRow}
                        enableRowSelection={cohortTab === "graduated" 
                            ? false 
                            : isReferred === "Not referred" 
                              ? true 
                              : false}
                    />
                  </div>

                  }
                </div>
            </div>
            <div className={`md:max-w-sm`} id={`AddTraineeDiv`}>
                <TableModal
                    isOpen={addLoanee}
                    closeModal={() => setAddLoanee(false)}
                    closeOnOverlayClick={true}
                    icon={Cross2Icon}
                    headerTitle={`Add loanee`}
                    width="30%"
                >
                    <AddTraineeForm  tuitionFee={cohortFee} setIsOpen={() => setAddLoanee(false)} cohortId={cohortId}/>
                </TableModal>

            </div>
        </main>
    )
}