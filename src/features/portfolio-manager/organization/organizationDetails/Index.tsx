"use client";
import React, { useState, useEffect } from "react";
import { inter, cabinetGrotesk } from "@/app/fonts";
import { MdOutlineArrowBack } from "react-icons/md";
import { IoGlobeOutline } from "react-icons/io5";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { DetailsTabContainer } from "@/reuseable/details/DetailsTabContainer";
import SearchInput from "@/reuseable/Input/SearchInput";
import Table from "@/reuseable/table/Table";
import { Book } from "lucide-react";
// import InviteAdminDialog from "@/reuseable/modals/InviteAdminDialog/Index";
import {
  useViewAllAdminsInOrganizationQuery,
  useGetOrganizationDetailsQuery,
} from "@/service/admin/organization";
import { useRouter } from "next/navigation";
// import { getItemSessionStorage } from "@/utils/storage";
import { formatAmount } from "@/utils/Format";
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
// import { useSearchOrganisationAdminByNameQuery } from "@/service/admin/organization"
import { Button } from "@/components/ui/button";
import ActivateOrganization from "@/components/portfolio-manager/organization/ActivateOrganization";
import DeactivateOrganization from "@/components/portfolio-manager/organization/DeactivateOrganization";
import TableModal from "@/reuseable/modals/TableModal";
import { Cross2Icon } from "@radix-ui/react-icons";
import SkeletonForDetailPage from "@/reuseable/Skeleton-loading-state/Skeleton-for-detailPage";
// import Link from "next/link";
import { useSearchOrganizationAsPortfolioManagerQuery } from "@/service/admin/organization";
import { store, useAppSelector } from "@/redux/store";
import { setOrganizationDetail } from "@/redux/slice/organization/organization";
import CohortView from "@/features/cohort/cohort-view";
import { ensureHttpsUrl } from "@/utils/GlobalMethods";
import { useDebounce } from '@/hooks/useDebounce';
import SearchEmptyState from '@/reuseable/emptyStates/SearchEmptyState';
import { MdSearch } from 'react-icons/md';
import { setCurrentNavbarItem } from "@/redux/slice/layout/adminLayout";
import { SafeImage } from "@/reuseable/images/Safe-image";

interface TableRowData {
  [key: string]: string | number | null | React.ReactNode;
}

interface adminProps extends TableRowData {
  fullName: string,
  email: string,
  status: string
}


const OrganizationDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [page,setPageNumber] = useState(0);
  const [totalPage,setTotalPage] = useState(0);
  const [nextPage,hasNextPage] = useState(false)
  const [searchTerm, setSearchTerm] = useState('');
  const [adminList, setAdminList] = useState<adminProps[]>([])
  const organizationId = useAppSelector(store => store.organization?.setOrganizationId)
  const organizationDetailTab = useAppSelector(store => store.organization?.organizationDetailTab)
  const notificationId = useAppSelector(state => (state?.notification?.setNotificationId))
  const notification = useAppSelector(state => (state?.notification?.setNotification))
   const { data: adminData,isLoading: isloadingAdmin,isFetching } = useViewAllAdminsInOrganizationQuery(
    {
      organizationId: organizationId,
      pageNumber: page,
      pageSize: 300,
    },
    { skip: organizationDetailTab !== "admins"}
  );
   
   const [debouncedSearchTerm, isTyping] = useDebounce(searchTerm, 1000);

  const { data: organizationDetails, isLoading } = useGetOrganizationDetailsQuery(
    {
      id: organizationId,
    },
    { skip: !organizationId }
  );
  console.log('organiza:: ', organizationDetails);

  const param = {
    organizationId: organizationId,
    name:debouncedSearchTerm,
    pageNumber: page,
    pageSize: 300,
  }

  const {data: searchResult,isLoading: isloadingSearch, isFetching:isSearchFetching} =  useSearchOrganizationAsPortfolioManagerQuery(param,{skip: !debouncedSearchTerm})

  const organizationLink = ensureHttpsUrl(organizationDetails?.data.websiteAddress);

    useEffect(() => {
      if (debouncedSearchTerm && searchResult && searchResult.data) {
        const admins = searchResult?.data?.body
        setAdminList(admins);
        setPageNumber(searchResult?.data?.pageNumber)
        setTotalPage(searchResult?.data?.totalPages)
        hasNextPage(searchResult?.data?.hasNextPage)
      } else if (!debouncedSearchTerm&& adminData && adminData?.data) {
        const admins = adminData?.data?.body;
        setAdminList(admins);
        setPageNumber( adminData?.data?.pageNumber)
        setTotalPage(adminData?.data?.totalPages)
        hasNextPage(adminData?.data?.hasNextPage)
      }
    },[debouncedSearchTerm, searchResult,adminData]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
  };


  const router = useRouter();

  const organizationName = organizationDetails?.data.name ?? "";
  const firstCharInName = organizationName.charAt(0).toUpperCase()
  

  const handleBackClick = () => {
    if (notification === "notification"){
       store.dispatch(setCurrentNavbarItem("Notification"))
      router.push(`/notifications/notification/${notificationId}`);
  } else {
    router.push("/organizations");
  }
   
  };

  const handleActivateClick = () => {
    setModalType("activate");
    setIsModalOpen(true);
  };

  const handleDeactivateClick = () => {
    setModalType("deactivate");
    setIsModalOpen(true);
  };


  const dataList = [
    { label: "Phone number", value: organizationDetails?.data.phoneNumber },
    {
      label: "Status",
      value: (
        <span
          id="status"
          className={`rounded-[32px] h-[21px] w-[58px] flex items-center justify-center ${
            organizationDetails?.data.status === "ACTIVE"
              ? "bg-[#E7F5EC] text-[#063F1A]"
              : "bg-[#FEF6E8] text-[#66440A]"
          }`}
        >
          {capitalizeFirstLetters(organizationDetails?.data.status?.toLowerCase())}
        </span>
      ),
    },
    {
      label: "Address",
      value: organizationDetails?.data.address || "Not provided",
    },
    {
      label: "Number of programs",
      value: organizationDetails?.data.numberOfPrograms,
    },
    { label: "Number of cohorts", value: organizationDetails?.data.numberOfCohort },
    {
      label: "Number of loanees",
      value: organizationDetails?.data.numberOfLoanees,
    },
    { label: "Still in training", value: organizationDetails?.data?.stillInTraining },
  ];

  const loanDetail = [
    { detail: "Number of loan requests", value: organizationDetails?.data?.loanRequestCount },
    { detail: "Pending loan offers", value: organizationDetails?.data?.loanOfferCount },
    { detail: "Number of performing loans", value: "" },
    { detail: "Number of non-performing loans", value: "" },
    {
      detail: "Historical debt",
      value: organizationDetails?.data.totalAmountReceived,
    },
    {
      detail: "Amount repaid (in percent)",
      value:
        formatAmount(organizationDetails?.data.totalDebtRepaid) +
        " " +
        `(${organizationDetails?.data.repaymentRate})` +
        "%",
    },
    { detail: "Amount outstanding", value: formatAmount("0") },
    {
      detail: "Moratorium ",
      value: "0" ,
    },
  ];

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
      selector: (row: TableRowData) => ( <div className="relative md:left-12 md:right-12">{row.email ? row.email : "nill"}</div>),
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
          className={`pt-1 pb-1 pr-3 pl-3 rounded-xl relative right-2 ${
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
      <div
        id="backButton"
        onClick={handleBackClick}
        className={
          "inline-flex  w-[10.375rem] cursor-pointer gap-2 items-center"
        }
      >
        <MdOutlineArrowBack className={"h-5 w-5 text-meedlBlue"} />
        <p className={"text-meedlBlue font-medium text-[14px] leading-[150%]"}>
         {notification === "notification"? "Back to notification" : "Back to organization"}
        </p>
      </div>
      <Tabs id="organizationTabs"  value={organizationDetailTab}
        onValueChange={(value) => {
          store.dispatch(setOrganizationDetail(value))
        }}
      >
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
            value="cohorts"
            className={
              "py-1 px-2 gap-1 items-center rounded-md h-[1.8125rem] data-[state=active]:shadow-custom"
            }
          >
            Cohort
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
            <div className="w-full mb-4">
            <section id="bannerSection" className={"relative"}>
              {organizationDetails?.data.bannerImage ? (
                <SafeImage
                id="bannerImage"
                src={organizationDetails.data.bannerImage}
                alt="banner"
                height={134}
                width={351}
                priority={true}
                imageType="banner"
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
                  organizationDetails?.data.logoImage ?(
                <SafeImage
                id="organizationLogo"
                src={organizationDetails?.data.logoImage}
                alt={"organization logo"}
                height={70}
                width={70}
                priority={true}
                imageType="logo"
                orgName={firstCharInName}
                />
                  ) :( <div className="flex justify-center items-center font-extrabold text-4xl">{firstCharInName}</div>)

                }
               
              </div>
              <div id="organizationInfo" className={"grid mt-24 gap-3 "}>
                <h1
                  id="organizationName"
                  className={`${cabinetGrotesk.className} text-black500 font-medium text-[24px] leading-[120%]`}
                >
                  {organizationDetails?.data.name}
                </h1>
                <div
                  id="organizationWebsite"
                  className={"flex items-center gap-2"}
                >
                  <IoGlobeOutline className={"h-5 w-5 text-meedlBlue"} />
                  <a
                      href={organizationLink}
                       target="_blank"
                     rel="noopener noreferrer"
                    className={
                      "text-meedlBlue text-[14px] font-medium leading-[150%] truncate max-w-[17rem]  md:max-w-[16rem] lg:max-w-[25rem] xl:max-w-[30rem] lg:whitespace-normal "
                    }
                  >
                    {organizationDetails?.data.websiteAddress}
                  </a>
                </div>
                <div className="mt-5 ">
                  {  organizationDetails?.data.status == "INVITED"?
                  "" :
                  <Button
                     id='activateAndDeactiveButton'
                     variant={'outline'}
                     className="w-full   md:w-[25vw]  h-[45px] text-[#142854] font-semibold border-solid border-[#142854]"
                     onClick={organizationDetails?.data.status === "ACTIVE"? handleDeactivateClick : handleActivateClick }
                  >
                    {
                      organizationDetails?.data.status === "ACTIVE" 
                       ? "Deactivate"
                        : "Activate"
                    }
                  </Button>
                  
              }
                </div>
              </div>
            </section>
            
            </div>
            <div
              id="detailsTabContainer"
              className={`relative w-full md:pt-0 pt-0`}
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
       <TabsContent id="adminsContent" value="cohorts" className={"mt-4"}>
       <CohortView/>
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
           
          </section>
          <div
            id="adminListView"
            className={"grid mt-7"}
            style={{
              height: "62vh",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            }}
          >
            {
               !isTyping && debouncedSearchTerm  && adminList.length === 0?  <div>
                 <SearchEmptyState icon={MdSearch} name={"Search"} />
               </div> :
            <Table
              tableData={adminList}
              tableHeader={adminsHeader}
              staticHeader={"Full name"}
              staticColunm={"fullName"}
              tableHeight={42}
              handleRowClick={() => {}}
              icon={<Book/>}
              sideBarTabName="Admin"
              // optionalRowsPerPage={10}
              tableCellStyle="h-12"
              searchEmptyState={true}
              hasNextPage={nextPage}
              pageNumber={page}
              setPageNumber={setPageNumber}
              totalPages={totalPage}
              isLoading={isloadingAdmin || isloadingSearch || isFetching || isSearchFetching}
            />
            }
          </div>

          {/* <InviteAdminDialog
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          /> */}
        </TabsContent>
      </Tabs>
        <div>
          <TableModal
           isOpen={isModalOpen}
           closeModal={()=> setIsModalOpen(false)}
           className='pb-1'
           closeOnOverlayClick={true}
           icon={Cross2Icon}
           headerTitle={modalType === "activate"? "Activate Reason" : "Deactivate Reason" }
          >
            {
              modalType === "activate" ? (<ActivateOrganization setIsOpen={setIsModalOpen} id={organizationId}/>) : (<DeactivateOrganization setIsOpen={setIsModalOpen} id={organizationId}/>)
            }
          </TableModal>
        </div>
    </main>
    )}
    </>
  );
};

export default OrganizationDetails;
