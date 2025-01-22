"use client";
import React,{useState,useEffect} from 'react'
import { inter, cabinetGrotesk } from "@/app/fonts";
import { IoGlobeOutline } from "react-icons/io5";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { DetailsTabContainer } from "@/reuseable/details/DetailsTabContainer";
import SearchInput from "@/reuseable/Input/SearchInput";
import LoanProductTable from "@/reuseable/table/LoanProductTable";
import { Book } from "lucide-react";
// import { getItemSessionStorage } from "@/utils/storage";
import { formatAmount } from "@/utils/Format";
import {  useGetDetailsOfOrganizationQuery } from '@/service/admin/organization';
import TableModal from '@/reuseable/modals/TableModal';
import { Cross2Icon } from "@radix-ui/react-icons";
import InviteAdmin from '@/components/portfolio-manager/organization/Invite-admin';
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import { useSearchOrganisationAdminByNameQuery } from "@/service/admin/organization";
import { useViewOrganizationAdminQuery } from '@/service/admin/organization';
import SkeletonForDetailPage from '@/reuseable/Skeleton-loading-state/Skeleton-for-detailPage';



interface meedlUser{
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  status: string,
}



interface TableRowData {
  [key: string]: string | number | null | React.ReactNode ;
}

interface adminProps extends TableRowData  {
 fullName: string,
  email: string,
  status: string
}

// type viewAllEmployees = adminProps & tableRowData


const ViewOrganizationDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {data:organizationDetail} = useGetDetailsOfOrganizationQuery({})
  const [searchTerm, setSearchTerm] = useState('');
  // const [adminEmployees, setAdminEmployees] = useState<viewAllEmployees[]>([])
  const [adminList, setAdminList] = useState<adminProps[]>([])
  const[] = useState('');
  const {data: searchResults} =  useSearchOrganisationAdminByNameQuery(searchTerm,{skip: !searchTerm})

  const dataElement = {
    pageNumber: 0,
    pageSize: 200
}
  const {data: adminData,isLoading} = useViewOrganizationAdminQuery(dataElement)
  // console.log(adminData);
    

  useEffect(()=> {
    if(searchTerm && searchResults && searchResults?.data){
        const adminEmployees = searchResults.data
        setAdminList(adminEmployees)
    }
   else if(!searchTerm && adminData && adminData?.data  ){
       const adminEmployees = adminData?.data?.body
        setAdminList(adminEmployees)
    }
  },[adminData,searchTerm,searchResults])


  const handleInviteClick = () => {
    setIsModalOpen(true);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
};

  const organizationName = organizationDetail?.data.name ?? "";
  const firstCharInName = organizationName.charAt(0).toUpperCase()

  const dataList = [
    { label: "Phone number", value: organizationDetail?.data.phoneNumber  },
    {
      label: "Status",
      value: (
        <span
          id="status"
          className={`rounded-[32px] h-[21px] w-[58px] flex items-center justify-center ${
            organizationDetail?.data.status === "ACTIVE"
              ? "bg-[#E7F5EC] text-[#063F1A]"
              : "bg-[#FEF6E8] text-[#66440A]"
          }`}
        >
            {organizationDetail?.data.status}
        </span>
      ),
    },
    {
      label: "Address",
      value:  organizationDetail?.data.address || "Not provided",
    },
    {
      label: "Number of programs",
      value: organizationDetail?.data.numberOfPrograms,
    },
    { label: "Number of cohorts", value: organizationDetail?.data.numberOfCohort },
    {
      label: "Number of loanees",
      value: organizationDetail?.data.numberOfLoanees,
    },
    { label: "Still in training", value: "0" },
  ];

  const loanDetail = [
    { detail: "Number of loan requests", value: "0" },
    { detail: "Pending loan offers", value: "0" },
    { detail: "Number of performing loans", value: "0" },
    { detail: "Number of non-performing loans", value: "0" },
    {
      detail: "Historical debt",
      value: organizationDetail?.data.totalHistoricalDebt,
    },
    {
      detail: "Amount repaid (in percent)",
      value:
        formatAmount(organizationDetail?.data.totalDebtRepaid) +
        " " +
        `(${organizationDetail?.data.repaymentRate})` +
        "%",
    },
    { detail: "Amount outstanding", value: formatAmount("0") },
    {
      detail: "Moratorium (in percent)",
      value: formatAmount("0") + " " + "(0)" + "%",
    },
  ];

  // const adminsHeader = [
  //   {
  //     title: "Full name",
  //     sortable: true,
  //     id: "fullName",
  //     selector: (row:  viewAllEmployees) =>row.meedlUser?.firstName + " " + row.meedlUser?.lastName,
  //   },
  //   {
  //     title: <div className="relative md:left-20 md:right-10">Email</div>,
  //     sortable: true,
  //     id: "email",
  //     selector: (row:  viewAllEmployees) => ( <div className="relative md:left-12 md:right-12">{row.meedlUser?.email ? row.meedlUser?.email : "nill"}</div>),
  //   },
  //   {
  //     title: (
  //       <div id="adminStatusHeader" className="relative md:left-28 md:right-64">
  //         Status
  //       </div>
  //     ),
  //     sortable: true,
  //     id: "adminStatus",
  //     selector: (row:  viewAllEmployees) => (
  //       <span
  //         id="adminStatus"
  //         className={`pt-1 pb-1 pr-3 pl-3 rounded-xl relative md:left-24 md:right-60 ${
  //           row.meedlUser?.status=== "ACTIVE"
  //             ? "text-[#063F1A] bg-[#E7F5EC]"
  //             : row.meedlUser?.status === "INVITED"
  //             ? "text-[#142854] bg-[#F3F8FF]"
  //             : "text-[#59100D] bg-[#FBE9E9]"
  //         }`}
  //       >
  //         {capitalizeFirstLetters(String(row.meedlUser?.status || "INVITED"))}

  //       </span>
  //     ),
  //   },
  // ];


  const adminsHeader = [
    {
      title: "Full name",
      sortable: true,
      id: "fullName",
      selector: (row: TableRowData) => row.fullName,
    },
    {
      title: <div className="relative md:left-16 md:right-16">Email</div>,
      sortable: true,
      id: "email",
      selector: (row: TableRowData) => ( <div className="relative md:left-12 md:right-12 -z-50">{row.email ? row.email : "nill"}</div>),
    },
    {
      title: (
        <div id="adminStatusHeader" className="">
          Status
        </div>
      ),
      sortable: true,
      id: "adminStatus",
      selector: (row: TableRowData) => (
        <span
          id="adminStatus"
          className={`pt-1 pb-1 pr-3 pl-3 rounded-xl relative right-2 -z-50 ${
            row.status === "ACTIVE"
              ? "text-[#063F1A] bg-[#E7F5EC]"
              : row.status === "INVITED"
              ? "text-[#142854] bg-[#F3F8FF]"
              : "text-[#59100D] bg-[#FBE9E9]"
          }`}
        >
          {capitalizeFirstLetters(String(row.status))}
        </span>
      ),
    },
  ];


  return (
    <>
    {isLoading ? ( <SkeletonForDetailPage /> ) : (
    <main
      id="organizationDetailsMain"
      className={`${inter.className} grid gap-7 py-6 px-3 md:px-10`}
    >
      
      <Tabs id="organizationTabs" defaultValue="details">
        <TabsList
          id="tabsList"
          className={
            "p-0.5 gap-1 h-[2.0625rem] items-center cursor-pointer rounded-md bg-neutral100"
          }
        >
          <TabsTrigger
            id="detailsTab"
            value="details"
            className={
              "py-1 px-2 gap-1 items-center rounded-md h-[1.8125rem] w-[3.875rem] data-[state=active]:shadow-custom"
            }
          >
            Details
          </TabsTrigger>
          <TabsTrigger
            id="adminsTab"
            value="admins"
            className={
              "py-1 px-2 gap-1 items-center rounded-md h-[1.8125rem] data-[state=active]:shadow-custom"
            }
          >
            Admins
          </TabsTrigger>
        </TabsList>
        <TabsContent id="detailsContent" value="details">
          <div
            id="detailsContainer"
            className={"mt-10 grid gap-9 md:gap-0 md:flex  md:justify-between"}
          >
            
            <section id="bannerSection" className={"relative"}>
              {organizationDetail?.data.bannerImage ? (
                <Image
                  id="bannerImage"
                  src={organizationDetail.data.bannerImage}
                  alt="banner"
                  height={134}
                  width={351}
                />
              ) : (
                <Image
                  id="bannerImage"
                  src="/asset/Image/Banner.svg"
                  alt="banner"
                  height={134}
                  width={351}
                />
              )}

              <div
                id="logoContainer"
                className={
                  "flex items-center justify-center absolute top-[70px] left-[14px] w-[140px] h-[140px] bg-greyBase200 rounded-full border-[10px] border-meedlWhite"
                }
              >
                {
                  organizationDetail?.data.logoImage ?(
                   <Image
                   id="organizationLogo"
                   src={organizationDetail?.data.logoImage}
                   alt={"organization logo"}
                   height={70}
                   width={70}
                   className={""}
                 />
                  ) :( <div className="flex justify-center items-center font-extrabold text-4xl">{firstCharInName}</div>)

                }
               
              </div>
              <div id="organizationInfo" className={"grid mt-24 gap-3 "}>
                <h1
                  id="organizationName"
                  className={`${cabinetGrotesk.className} text-black500 font-medium text-[24px] leading-[120%]`}
                >
                  {organizationDetail?.data.name}
                </h1>
                <div
                  id="organizationWebsite"
                  className={"flex items-center gap-2"}
                >
                  <IoGlobeOutline className={"h-5 w-5 text-meedlBlue"} />
                  <p
                    className={
                      "text-meedlBlue text-[14px] font-medium leading-[150%]"
                    }
                  >
                    {organizationDetail?.data.websiteAddress}
                  </p>
                </div>
              </div>
            </section>
            <div
              id="detailsTabContainer"
              className={`relative md:w-6/12 md:pt-0 pt-0`}
            >
              <DetailsTabContainer
                isTable={false}
                isNotTableDataList={loanDetail}
                dataList={dataList}
                tabTitle1={"Organization details"}
                tabTitle2={"Loan details"}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent id="adminsContent" value="admins" className={"mt-4"}>
          <section
            id="adminActions"
            className={
              "md:flex md:justify-between grid  gap-5 items-center mt-10"
            }
          >
            <SearchInput
              id={"organizationSearch"}
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Button
              id="inviteAdminButton"
              className={
                "h-[2.8125rem] md:w-[10.375rem] w-full rounded-md bg-meedlBlue hover:bg-meedlBlue text-meedlWhite text-[0.875rem] font-semibold leading-[150%] "
              }
              onClick={handleInviteClick}
            >
              Invite admin
            </Button>
          </section>
          <div
            id="adminListView"
            className={"grid mt-7"}
            style={{
              height: "62vh",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            }}
          >
            <LoanProductTable
              tableData={adminList.slice().reverse()}
              tableHeader={adminsHeader}
              staticHeader={"Full name"}
              staticColunm={"fullName"}
              tableHeight={42}
              handleRowClick={() => {}}
              // sx='cursor-pointer'
              icon={Book}
              sideBarTabName="Admin"
              optionalRowsPerPage={10}
              tableCellStyle="h-12"
              condition={true}
            />
          </div>

          
        </TabsContent>
      </Tabs>
      <div>
        {
          <TableModal
           isOpen={isModalOpen}
           closeModal={() => setIsModalOpen(false)}
           closeOnOverlayClick={true}
           icon={Cross2Icon}
           headerTitle='Invite Admin'
          >
           <InviteAdmin 
           setIsOpen={setIsModalOpen}
           adminType="ORGANIZATION_ADMIN"
           />
          </TableModal>
        }
      </div>
    </main>
    )}
    </>
  )
}

export default ViewOrganizationDetail;