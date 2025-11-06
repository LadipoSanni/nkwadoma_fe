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
    useSearchForLoaneeInACohortQuery, useUpdateLoaneeEmploymentStatusMutation,
    useViewAllLoaneeQuery
} from "@/service/admin/cohort_query";
import TableModal from "@/reuseable/modals/TableModal";
import {Cross2Icon} from "@radix-ui/react-icons";
import AddTraineeForm, {cohortBreakDown} from "@/components/cohort/AddTraineeForm";
import {useToast} from "@/hooks/use-toast";
import {cohortLoaneeResponse} from "@/types/Component.type";
import Isloading from "@/reuseable/display/Isloading";
import SearchEmptyState from "@/reuseable/emptyStates/SearchEmptyState";
import {store, useAppSelector } from '@/redux/store';
import CheckBoxTable from '@/reuseable/table/Checkbox-table';
import { useDebounce } from '@/hooks/useDebounce';
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import DropDownWithActionButton from "@/reuseable/Dropdown";
import { setcohortId } from '@/redux/slice/create/cohortSlice';
import { setLoaneeId } from '@/redux/slice/organization/organization';
import {useRouter} from "next/navigation";
import {setUnderlineTabCurrentTab} from "@/redux/slice/layout/adminLayout";

interface userIdentity {
    firstName: string;
    lastName: string;
}

interface loaneeLoanDetail {
    initialDeposit: number;
    amountRequested: number;
    amountReceived: number;
    amountRepaid: string;
}

interface viewAllLoanee {
    userIdentity: userIdentity;
    loaneeLoanDetails: loaneeLoanDetail;
    loaneeStatus: string;
    employmentStatus: string;
    id: string;
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
    const selectedCohortInOrganizationType = useAppSelector(store => store?.cohort?.selectedCohortInOrganizationType)
    const cohortBreakdownText = useAppSelector(store => store.cohortBreakDownSlice.cohortBreakdown);
    const [selectedLoaneeEmploymentStatus, setSelectedLoaneeEmploymentStatus] = React.useState('')
    const [debouncedSearchTerm, isTyping] = useDebounce(loaneeName, 1000);
    const [selectedLoaneeId, setSelectedLoaneeId] = React.useState('')
    const [loaneeModalText, setLoaneeModalText] = useState('Add Loanee')
    const [isEdit, setIsEdit] = useState(false)
    const [editLoaneeBasicDetails, setEditLoaneeBasicDetails] = React.useState<{loaneeFirstName: string, loaneeLastName: string, loaneeEmail: string, loaneeInitialDeposit: string}>()
    const [editLoaneeBreakDown, setEditLoaneeBreakDown] = React.useState<cohortBreakDown[]>()
    const [selectedEditLoaneeId, setSelectedEditLoaneeId] = useState<string>('');

    const statuss = selectedCohortInOrganizationType === 'GRADUATED' ?  {
            cohortId: cohortId,
            pageSize: size,
            pageNumber: page
        } : {
            cohortId: cohortId,
            status,
            pageSize: size,
            pageNumber: page
        }

    const {data,isLoading: loaneeIsloading,isFetching} = useViewAllLoaneeQuery(statuss)

    const searchProps = selectedCohortInOrganizationType === 'GRADUATED' ?
        {
            loaneeName: debouncedSearchTerm,
            cohortId: cohortId,
            pageSize: size,
            pageNumber: page
        }
        :
        {  loaneeName: debouncedSearchTerm,
            cohortId: cohortId,
            status: status,
            pageSize: size,
            pageNumber: page
        };

    const {data: searchResults, isLoading: isLoading,isFetching:isfetching} = useSearchForLoaneeInACohortQuery(searchProps,
        {skip: !debouncedSearchTerm || !cohortId})


    const [refer, {isLoading: isLoadingRefer}] = useReferLoaneeToACohortMutation()
    const [updateU, ]= useUpdateLoaneeEmploymentStatusMutation()

    const handleSelectedRow = (rows: Set<string>) => {
        setSelectedRows(rows)
    }

    const changeLoaneeStatusToEmployed = async () => {
        const data = {
            cohortId: cohortId,
            employmentStatus:selectedLoaneeEmploymentStatus?.toUpperCase(),
            loaneeId: selectedLoaneeId,
        }
        try {
            const response = await updateU(data).unwrap()
            toast({
                description: response?.message,
                status: "success",
            })
        } catch (err) {
            const error = err as ApiError;
            toast({
                description: error?.data?.message,
                status: "error",
            })
        }
    }

    const updateLoaneeEmploymentStatusItems = [
        {id: 'employed', name: 'Employed'},
        {id: 'unemployed', name: 'Unemployed'},

    ]

    useEffect(()=> {
        if (debouncedSearchTerm && searchResults && searchResults?.data) {
            setNextPage(searchResults?.data?.hasNextPage)
            setTotalPage(searchResults?.data?.totalPages)
            setPageNumber(searchResults?.data?.pageNumber)
        }else if(!debouncedSearchTerm && data &&  data?.data) {
            setNextPage(data?.data?.hasNextPage)
            setTotalPage(data?.data?.totalPages)
            setPageNumber(data?.data?.pageNumber)
        }

        if(cohortBreakdownText){
            setLoaneeModalText(cohortBreakdownText)
        }
    },[debouncedSearchTerm,searchResults,data, cohortBreakdownText])

    const handleSelectedItem = (item: string) => {
        if (item === selectedLoaneeEmploymentStatus){
            setSelectedLoaneeEmploymentStatus('')
        }else {
            setSelectedLoaneeEmploymentStatus(item)
        }
    }

    const currentAndIncomingTableHeader = [
        {title: "Loanee", sortable: true, id: "firstName", selector: (row: viewAllLoanees) => capitalizeFirstLetters(row.userIdentity?.firstName) + " " + capitalizeFirstLetters(row.userIdentity?.lastName)},
        {title: "Initial deposit", sortable: true, id: "InitialDeposit", selector: (row: viewAllLoanees) => formatAmount((row.loaneeLoanDetail as loaneeLoanDetail)?.initialDeposit)},
        {title: "Amount requested", sortable: true, id: "AmountRequested", selector: (row: viewAllLoanees) => formatAmount((row.loaneeLoanDetail as loaneeLoanDetail)?.amountRequested)},
        {title: "Amount received", sortable: true, id: "AmountReceived", selector:(row: viewAllLoanees) => formatAmount((row.loaneeLoanDetail as loaneeLoanDetail)?.amountReceived)},
    ]

    const graduatedTableHeader = [
        {title: "Name", sortable: true, id: "firstName", selector: (row: viewAllLoanees) => capitalizeFirstLetters(row?.userIdentity?.firstName) + " " + capitalizeFirstLetters(row?.userIdentity?.lastName)},
        {title: "Employment status", sortable: true, id: "employmentStatus", selector: (row: viewAllLoanees) => <div className={`  flex justify-center md:justify-start `}><DropDownWithActionButton  selectedItem={selectedLoaneeEmploymentStatus} setSelectItem={handleSelectedItem} buttonText={'Save'} handleButtonClick={changeLoaneeStatusToEmployed} id={`id+`+ row?.id} trigger={capitalizeFirstLetters(row?.employmentStatus)} dropDownItems={updateLoaneeEmploymentStatusItems} isDisabled={false} /></div>},
        {title: "Amount requested", sortable: true, id: "AmountRequested", selector: (row: viewAllLoanees) => formatAmount((row?.loaneeLoanDetail as loaneeLoanDetail )?.amountRequested)},
        {title: "Amount repaid", sortable: true, id: "AmountRepaid", selector:(row: viewAllLoanees) => formatAmount((row?.loaneeLoanDetail as loaneeLoanDetail )?.amountRepaid)},
    ]
    const tableHeader = selectedCohortInOrganizationType === 'GRADUATED' ? graduatedTableHeader : currentAndIncomingTableHeader;

    const items = ["Not referred","Referred"]

    const getTableData = () => {
        if (!data?.data?.body) return [];
        if (debouncedSearchTerm) return searchResults?.data?.body || [];
        return data?.data?.body;
    }


    const router = useRouter();
    const handleSelected = (value: string) => {
        setIsReferred(value);
    }
    const handleAddLoane = () => {
        setAddLoanee(true)
        setIsEdit(false)
        setLoaneeModalText('Add Loanee')
    }
    const {toast} = useToast()
    const handleRowClick = (row: TableRowData) => {
        store.dispatch(setLoaneeId(String(row?.id)))
        store.dispatch(setcohortId(String(cohortId)))
        setSelectedLoaneeId(String(row?.id))
        store.dispatch(setUnderlineTabCurrentTab('Details'))
        router.push('/cohort/loaneeDetails')

    }


    const dropDownOption = [

        {
            name: "Edit Loanee Details",
            id: "1"
        },


    ]


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

    interface rowData {
        [key: string]: string | number | null | React.ReactNode | object;
    }

    const handleDropdownClick = async (id:string,row: rowData) => {
        if (id === '1'){
            setLoaneeModalText('Edit Loanee ')
            //eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setSelectedEditLoaneeId(row?.id)
            //eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const selectedLoaneebreakDown: cohortBreakDown[] = row?.loaneeLoanDetail?.loanBreakdown

            setEditLoaneeBreakDown(selectedLoaneebreakDown)
            //eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const selectedLoaneeDetails = {loaneeFirstName:row?.userIdentity?.firstName, loaneeLastName: row?.userIdentity?.lastName, loaneeEmail: row?.userIdentity?.email, loaneeInitialDeposit: row?.loaneeLoanDetail?.initialDeposit}
            setEditLoaneeBasicDetails(selectedLoaneeDetails)
            setAddLoanee(true)
            setIsEdit(true)

        }
    }


        return (
        <main>
            <div className={`pb-4`} id={`searchReferAddTraineeAndTable`}>
                <div className={`flex md:flex-row flex-col md:justify-between`}
                     id={`searchReferAndAddTrainee`}>
                    <div className={`  flex md:flex-row gap-4 md:items-start justify-start`} id={`searchId`}>
                        <div className="max-w-md flex-1  self-start " id={`searchInput`}>
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
                        {/*<div className={`'w-32  ${selectedCohortInOrganizationType === 'GRADUATED' ? 'hidden md:hidden lg:hidden' : 'h-fit mt-0' } h-fit bg-red-300 `} id={`selectId`}>*/}
                            <CustomSelect onChange={handleSelected}
                                          selectContent={items}
                                          placeHolder={"Not referred"}
                                          id={'selectId'}
                                          className={` w-full text-black w-32  ${selectedCohortInOrganizationType === 'GRADUATED' ? 'hidden md:hidden lg:hidden' : 'h-fit mt-0' } bg-neutral100 h-12 border-1 focus-visible:outline-0 focus-visible:ring-0 shadow-none hover:bg-neutral100 ring-1 ring-neutral650`}
                                          />
                        {/*</div>*/}
                    </div>

                    <div className={`flex ${selectedCohortInOrganizationType === 'GRADUATED' ? 'hidden md:hidden lg:hidden' : '' } md:flex-row flex-col gap-4 md:items-center`}
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
                  {!isTyping &&  debouncedSearchTerm && searchResults?.data?.body?.length === 0? <div><SearchEmptyState icon={MdSearch} name='loanee'/></div> :  
                  <div>
                    <CheckBoxTable
                        tableData={getTableData()}
                        tableHeader={tableHeader}
                        handleRowClick={handleRowClick}
                        staticHeader="Loanee"
                        staticColunm="firstName"
                        icon={MdOutlinePerson}
                        sideBarTabName="loanee"
                        isLoading={isLoading || loaneeIsloading || isFetching || isfetching}
                        condition={true}
                        tableHeight={45}
                        hasNextPage={hasNextPage}
                        pageNumber={page}
                        kirkBabDropdownOption={dropDownOption}
                        showKirkBabel={true}
                        handleDropDownClick={handleDropdownClick}
                        setPageNumber={setPageNumber}
                        tableCellStyle="h-12"
                        totalPages={totalPage}
                        enableButton={() =>setEnableButton(true) }
                        disabledButton={()=> setEnableButton(false) }
                        handleSelectedRow={handleSelectedRow}
                        enableRowSelection={cohortTab === "graduated" 
                            ? false 
                            : isReferred === "Not referred" 
                              ? true 
                              : false}
                        searchEmptyState={false}
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
                    headerTitle={loaneeModalText}
                    width="30%"
                >
                    <AddTraineeForm modalText={loaneeModalText} loaneeId={selectedEditLoaneeId} loaneeLoanBreakDown={editLoaneeBreakDown} isEdit={isEdit} loaneeBasicDetails={editLoaneeBasicDetails} tuitionFee={cohortFee} setIsOpen={() => setAddLoanee(false)} cohortId={cohortId}/>
                </TableModal>

            </div>
        </main>
    )
}