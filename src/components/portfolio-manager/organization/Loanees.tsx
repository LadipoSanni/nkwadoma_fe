'use client'
import React,{useState,useEffect} from 'react'
import dynamic from "next/dynamic";
import SearchInput from "@/reuseable/Input/SearchInput";
import { Button } from '@/components/ui/button';
import CheckBoxTable from '@/reuseable/table/Checkbox-table';
import {useSearchForLoaneeInACohortQuery, useViewAllLoaneeQuery,useUpdateLoaneeStatusMutation,useInviteLoaneeMutation} from "@/service/admin/cohort_query";
import {useAppSelector} from "@/redux/store";
import SearchEmptyState from "@/reuseable/emptyStates/SearchEmptyState";
import {MdOutlinePerson, MdSearch} from "react-icons/md";
import {formatAmount} from '@/utils/Format';
import {useToast} from "@/hooks/use-toast"
import { useRouter } from 'next/navigation';
import Isloading from '@/reuseable/display/Isloading';
import Modal from "@/reuseable/modals/TableModal";
import {Cross2Icon} from "@radix-ui/react-icons";
import UploadCSV from './Upload-csv';
import {setLoaneeId} from "@/redux/slice/organization/organization";
import {LoaneetDetails} from "@/types/loanee";
import { store } from '@/redux/store';

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}
interface userIdentity {
    firstName: string;
    lastName: string;
}

interface loaneeLoanDetails {
    initialDeposit: number;
    amountRequested: number;
    amountReceived: number;
}

interface viewAllLoanee {
    userIdentity: userIdentity;
    loaneeLoanDetail: loaneeLoanDetails;
    loaneeStatus: string;
}
type viewAllLoanees = viewAllLoanee & TableRowData;

const Loanees = dynamic(
    () => Promise.resolve(LoaneesInACohort),
    {ssr: false}
)
 interface Props {
    buttonName?: string;
    status?: string
    tabType?: string
    condition?: string
 }

 interface ApiError {
  status: number;
  data: {
    message: string;
  };
}

function LoaneesInACohort({buttonName,tabType,status,condition}: Props) {
    const [searchTerm, setSearchTerm] = useState("");
    const cohortDetails = useAppSelector((state) => state.cohort.selectedCohortInOrganization)
    const cohortId = cohortDetails?.id;
    const [page,setPageNumber] = useState(0);
    const [totalPage,setTotalPage] = useState(0)
    const [hasNextPage,setNextPage] = useState(false)
    const size = 10
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
    const [enableButton, setEnableButton] = useState(false)
    const [updateLoaneeStatus, {isLoading:statusIsloading}] = useUpdateLoaneeStatusMutation()
    const [inviteLoanee, {isLoading:inviteIsloading}] = useInviteLoaneeMutation()
    const {toast} = useToast()
    const router = useRouter();
     const [isOpen, setIsOpen] = useState(false);

      const {data, isLoading} = useViewAllLoaneeQuery({
            cohortId: cohortId,
            pageSize: size,
            pageNumber: page,
            status: status
        })

      const {data: searchResults, isLoading: isLoadingSearch} = useSearchForLoaneeInACohortQuery({
                 loaneeName: searchTerm,
                 cohortId: cohortId,
                 status: status,
                 pageSize: size,
                 pageNumber: page,
             },
             {skip: !searchTerm || !cohortId})
            
      useEffect(() => {
         if(searchTerm && searchResults && searchResults?.data){
          setNextPage(searchResults?.data?.hasNextPage)
          setTotalPage(searchResults?.data?.totalPages)
          setPageNumber(searchResults?.data?.pageNumber)
         }
        else if(!searchTerm && data && data?.data) {
          setNextPage(data?.data?.hasNextPage)
          setTotalPage(data?.data?.totalPages)
          setPageNumber(data?.data?.pageNumber)
        }
      },[searchTerm,data,searchResults])      

      const tableHeaderintegrated = [
              {title: "Loanee", sortable: true, id: "firstName", selector: (row: viewAllLoanees) => row?.userIdentity?.firstName + " " + row?.userIdentity?.lastName},
              {title: "Initial deposit", sortable: true, id: "initialDeposit", selector: (row: viewAllLoanees) => formatAmount((row?.loaneeLoanDetail?.initialDeposit))},
              {title: "Amount requested", sortable: true, id: "AmountRequested", selector: (row: viewAllLoanees) => formatAmount((row?.loaneeLoanDetail?.amountRequested))},
              {title: "Amount received", sortable: true, id: "AmountReceived", selector:(row: viewAllLoanees) => formatAmount((row?.loaneeLoanDetail?.amountReceived))},
          ];

      const handleSelectedRow = (rows: Set<string>) => {
          setSelectedRows(rows)

        }

        const handleRowClick = (row: TableRowData) => {
            store.dispatch(setLoaneeId(String(row?.id)))
               router.push('/organizations/view-loanee-profile')
        }
      
   
      
       const handleModalOpen = () => {
          setIsOpen(!isOpen)
      }

        const getTableData = () => {
          if (!data?.data?.body) return [];
          if (searchTerm) return searchResults?.data?.body || [];
          return data?.data?.body;
      }

      const handleClick= async () => {
          setSelectedRows(new Set()); 
          const formData = {
            loaneeIds: Array.from(selectedRows),
            loaneeStatus:condition || ""
          }
        try {
         const updateStatus =  await updateLoaneeStatus(formData).unwrap()
          if(updateStatus) {
            toast({
              description: `Loanees has been ${status === "ARCHIVE"? "unarchived" : "archived"}`,
              status: "success",
            })
            setSelectedRows(new Set());
            setEnableButton(false)
            if(status === "ARCHIVE"){
              router.push("/organizations/loanees/all")
            }else {
              router.push("/organizations/loanees/archived")
            }

          }
          
        } catch (err) {
          const error = err as ApiError;
          toast({
            description: error?.data?.message,
            status: "error",
          })
          
        }
      }

      const handleInvite = async () => {
         const loaneeId = Array.from(selectedRows)
         try {
          const inviteLoanees = await inviteLoanee(loaneeId).unwrap()
          if(inviteLoanees){
            setSelectedRows(new Set());
            setEnableButton(false)
            toast({
              description: inviteLoanees?.message,
              status: "success",
            })
          }
         } 
         catch (err) {
          const error = err as ApiError;
          toast({
            description: error?.data?.message,
            status: "error",
          })
         }
      }

  return (
    <main>
      <div className='md:flex justify-between items-center'>
        <div >
        <SearchInput
                    testId='search-input'
                    id="SearchLoanee"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style="md:w-20 w-full"
         />  
        </div>
        <div className='mt-3 md:mt-0 gap-4 flex'  >
        { tabType === "All" ?
         <Button
           id="inviteLoanee"
           aria-disabled={!enableButton}
         variant={"outline"}
         disabled={selectedRows.size === 0 || inviteIsloading }
         className={`h-[45px] w-full font-semibold md:w-[90px]  ${enableButton  ? "border-[#142854] text-[#142854]" :"border-[#ECECEC] text-[#A8A8A8] shadow-none"  }`}
         onClick={handleInvite}
         >
         { inviteIsloading?  <Isloading/> : " Invite"}
        </Button> : <Button
        id='action'
       data-testid='actionButton'
         aria-disabled={!enableButton}
         variant={tabType === "All"? "outline" :`secondary`}
        className={`h-[45px] w-full font-semibold ${tabType === "All"? "md:w-[90px] " : "md:w-[110px]"} ${enableButton && tabType === "All" ? "border-[#142854] text-[#142854]" : !enableButton && tabType === "All"? "border-[#ECECEC] text-[#A8A8A8] shadow-none" : enableButton && tabType === "Archived" ? "bg-[#142854]" :  !enableButton && tabType === "Archived" && "bg-[#B6BCCA]" }`}
        disabled={selectedRows.size === 0 || statusIsloading}
        onClick={handleClick}
         >
           { statusIsloading? <Isloading/> : buttonName}
        </Button>}
        {  tabType === "All" &&
          <Button
          variant={`secondary`}
          className='h-[45px] w-full'
          onClick={handleModalOpen}
          >
            Upload csv
          </Button>
        }
        </div>
      </div>
      <div className='mt-4'>
       { searchTerm && searchResults?.data?.body?.length === 0 ? <div><SearchEmptyState icon={MdSearch} name='loanees'/></div> :
        
        <CheckBoxTable
        // tableData={!data?.data?.body ? [] : searchTerm ? searchResults?.data : data?.data?.body}
        tableData={getTableData()}
        tableHeader={tableHeaderintegrated}
        handleRowClick={handleRowClick}
        staticHeader="Loanee"
        staticColunm="firstName"
        icon={MdOutlinePerson}
        sideBarTabName="loanees"
        tableCellStyle="h-12"
        isLoading={isLoading || isLoadingSearch}
        condition={true}
        tableHeight={40}
        hasNextPage={hasNextPage}
        pageNumber={page}
        setPageNumber={setPageNumber}
        totalPages={totalPage}
        enableRowSelection={true}
        enableButton={() =>setEnableButton(true) }
        disabledButton={()=> setEnableButton(false) }
        handleSelectedRow={handleSelectedRow}
         sx='cursor-pointer'
        />}
      </div>
       <div>
        <Modal
         isOpen={isOpen}
         closeOnOverlayClick={true}
         closeModal={() => setIsOpen(false)}
          width='36%'
          icon={Cross2Icon}
          headerTitle='Upload csv'
        >
        <UploadCSV setIsOpen={setIsOpen}/>
        </Modal>
       </div>
    </main>
  )
}

export default Loanees
