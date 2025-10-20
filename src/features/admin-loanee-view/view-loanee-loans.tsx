'use client'
import React, {useEffect, useState} from 'react';
import BackButton from "@/components/back-button";
import { cabinetGroteskMediumBold, inter, inter500, inter600, inter700} from '@/app/fonts'
import styles from '@/features/Overview/index.module.css';

import Details from "@/components/loanee-my-profile/Details";
import SearchInput from "@/reuseable/Input/SearchInput";
import {capitalizeFirstLetters, getFirstLetterOfWord} from "@/utils/GlobalMethods";
import {formatAmount} from "@/utils/Format";
import { useRouter } from 'next/navigation';
import {Badge} from "@/components/ui/badge";
import {LoaneeLoannDetails} from "@/utils/routes";
import {store, useAppSelector} from "@/redux/store";
import {useViewAllLoansTotalCountsByAdminsQuery, useViewLoaneeLoansByAdminQuery,useSearchLoaneeLoansByAdminQuery} from "@/service/users/Loanee_query";
import {AdminViewLoanType} from "@/types/loanee";
import {setcohortId} from "@/redux/slice/create/cohortSlice"
import {setLoaneeId} from "@/redux/slice/organization/organization"
import { setClickedLoanId } from '@/redux/slice/loan/selected-loan';
import { useDebounce } from '@/hooks/useDebounce';
import GeneralEmptyState from '@/reuseable/emptyStates/General-emptystate';
import {MdSearch,MdPersonOutline} from 'react-icons/md';
import {getItemSessionStorage} from "@/utils/storage";
import {MEEDLE_ORG_ADMIN} from "@/types/roles";

const ViewLoaneeLoans = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const isLoading = false;
    const selectedLoaneeId = useAppSelector(state => state.loanees.selectedLoaneeId);
    const selectedLoanFirstName = useAppSelector(state => state.loanees.selectedLoaneeFirstName);
    const selectedLoanLastName = useAppSelector(state => state.loanees.selectedLoaneeLastName);
    const selectedLoanFullName = selectedLoanFirstName ? `${selectedLoanFirstName} ` + `${selectedLoanLastName} `  :   '';
    const router = useRouter()
    const [fetchData, setFetchData] = useState<AdminViewLoanType[]>([]);
    const [pageNumber,
    ] = useState<number>(0);
    const [pageSize] = useState<number>(10);
    const userRole  = getItemSessionStorage("user_role")

    const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);

    const data = {
        loaneeId: selectedLoaneeId,
        pageNumber: pageNumber,
        pageSize: pageSize,
    }
    const searchProps = {
        loaneeId: selectedLoaneeId,
        pageNumber: pageNumber,
        pageSize: pageSize,
        organizationName: debouncedSearchTerm,
    }

    const {data: viewAllLoans, isLoading: isLoadingViewAll, isFetching: isFetchingViewAll} = useViewLoaneeLoansByAdminQuery(data)
    const {data: searchData, isLoading: isLoadingSearch, isFetching: isFetchingSearch} = useSearchLoaneeLoansByAdminQuery(searchProps, {skip: !debouncedSearchTerm})
    const {data: loanCounts, isLoading: isLoadingLoanCounts, isFetching: isFetchingCounts} = useViewAllLoansTotalCountsByAdminsQuery(selectedLoaneeId)

    useEffect(() => {
        if (debouncedSearchTerm){
            setFetchData(searchData?.data?.body)
            // setTotalPage(searchData?.data?.totalPages)
            // setPageNumber(searchData?.data?.pageNumber)
        }else {
            setFetchData(viewAllLoans?.data?.body)
            // setTotalPage(viewAllLoans?.data?.totalPages)
            // setPageNumber(viewAllLoans?.data?.pageNumber)
        }

    }, [viewAllLoans, debouncedSearchTerm,searchData ])

    const onBackButtonClick = () => {
        router.push('/loanees')
    }
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };


    const onCardClick = (item: AdminViewLoanType) => {
        store.dispatch(setcohortId(item?.cohortId))
        store.dispatch(setLoaneeId(item?.loaneeId))
        store.dispatch(setClickedLoanId(item?.id))
        router.push(`${LoaneeLoannDetails(item.id)}`);

    }


    return (
        <div
            id={'viewLoaneeLoans'}
            data-testid="viewLoaneeLoans"
            className={` w-full h-full grid gap-4  px-4 py-4 `}
        >
           <div className={` h-fit w-full grid gap-4 `}>
               <BackButton id={'backToAllLoanee'} textColor={'#142854'} iconBeforeLetters={true} text={'Back'} handleClick={onBackButtonClick}/>
               <span className={` text-[24px] text-black ${cabinetGroteskMediumBold.className}  `}>{selectedLoanFullName}</span>
           </div>
           <div className={` ${isLoadingLoanCounts || isFetchingCounts || isLoadingViewAll  || isFetchingViewAll || isLoadingSearch || isFetchingSearch ? 'max-h-fit' :  'md:max-h-[70vh] h-full'} grid gap-2  pr-3  ${styles.verticalScrollbar}   `}>
               <section
                   className={`  grid gap-4 `}
               >
                   <div className={`w-full h-fit flex gap-6 mb-5  ${styles.overviewCard}`}>
                       <Details isLoading={isLoadingLoanCounts || isFetchingCounts} sx={`  w-[20em] md:w-[100%]  `} name={'Total loan amount'} valueType={'currency'}  id={'totalLoanAmount'} showAsWholeNumber={false}  value={loanCounts?.data ? loanCounts?.data?.totalAmountReceived :''}/>
                       <Details isLoading={isLoadingLoanCounts || isFetchingCounts} sx={` w-[20em] md:w-[100%] `} id={'TotalAmountOutstanding'} showAsWholeNumber={false}    name={'Total amount outstanding'} value={loanCounts?.data ? loanCounts?.data?.totalAmountOutstanding :''} valueType={'currency'}  />
                       <Details isLoading={isLoadingLoanCounts || isFetchingCounts} sx={` w-[20em] md:w-[100%] `} id={"totalAmountRepaid"} showAsWholeNumber={false}    name={'Total amount repaid'} value={loanCounts?.data ? loanCounts?.data?.totalAmountRepaid : ''} valueType={'currency'}  />
                   </div>
                   {!MEEDLE_ORG_ADMIN?.includes(userRole ? userRole :'' ) &&
                       <SearchInput
                           id={'searchField'}
                           data-testid={'searchField'}
                           placeholder={'Search by organization'}
                           value={searchTerm}
                           onChange={handleSearchChange}
                       />
                   }

               </section>
               <section
                   className={`h-full   grid  bg-white py-4 w-full `}
               >
                   { isLoadingViewAll  || isFetchingViewAll || isLoadingSearch || isFetchingSearch?
                   <div className={` grid grid-cols-3 h-[50vh] `}>
                       <div className={` w-full h-[10rem] animate-pulse bg-[#f4f4f5]  `}>

                       </div>
                       <div className={` w-full h-[10rem] animate-pulse bg-[#f4f4f5]  `}>

                       </div>
                       <div className={` w-full h-[10rem] animate-pulse bg-[#f4f4f5]  `}>

                       </div>
                   </div>

                               : (debouncedSearchTerm && searchData?.data?.body?.length === 0) || viewAllLoans?.data?.body?.length === 0 ?
                               (
                                   <div className={`h-60 relative bottom-3`}>
                                       {/* <div className={`  grid aspect-square h-[10rem] w-[10rem] mr-auto ml-auto  rounded-full bg-[#D9EAFF]  `}>
                                           <MdOutlinePersonOutline  color={'#142854'} className={` mr-auto ml-auto mt-auto mb-auto  h-8 w-8 `}/>
                                       </div>
                                      <p className={` text-black text-[20px] ${cabinetGroteskMediumBold.className}`}> Loanee does not have loan with Organization</p> */}
                                      <GeneralEmptyState
                                       icon={searchTerm? MdSearch : MdPersonOutline}
                                       iconSize='1.8rem'
                                       iconContainerClass='w-[50px] h-[50px]'
                                       message={<div className='relative bottom-2'>
                                        <p>{ searchTerm?"Organization  not found with loan" : " Loanee does not have loan" }</p>
                                      </div>}
                                      className='h-14'
                                      />

                                   </div>
                               )
                               :
                               <div className={` grid gap-4 md:grid md:grid-cols-3 `}>
                                   {fetchData?.map((loan : AdminViewLoanType) => (
                                       <div  key={"key"+loan?.id} className={` w-full h-fit pb-4 px-4  bg-[#F9F9F9] rounded-md `}>
                                           <div className={` flex gap-2   py-4  `}>
                                               <Badge className={`h-[40px] w-[40px] hover:bg-[#F6F6F6]    bg-[#F6F6F6] rounded-full `}>

                                                   <p className={` w-fit h-fit mt-auto mb-auto mr-auto ml-auto ${inter600.className} text-[#4D4E4D] md:text-[#4D4E4D] text-[16px] `}>{getFirstLetterOfWord(loan?.organizationName) ? getFirstLetterOfWord(loan?.organizationName) : loan?.organizationName?.at(0)?.toUpperCase()}</p>
                                               </Badge>
                                               <p id={'loaneeProgram'} data-testid={'loaneeProgram'}
                                                  className={`${inter600.className} mt-auto break-all w-full  mb-auto text-black text-[16px] `}>{capitalizeFirstLetters(loan?.organizationName)}</p>
                                           </div>
                                           <div
                                               className={`grid justify-items-start pl-3 py-3  rounded-md gap-4 ${isLoading ? `bg-white h-[10em] animate-pulse` : `bg-white `}    `}>
                                               <div className={`${isLoading ? `h-6 rounded bg-gray-200 animated_pulse w-[90%]  bg-[#F9F9F9]` : ``}`}>
                                                   <p className={` ${inter.className} ${isLoading ? `hidden` : ``} text-[#6A6B6A] text-[14px] `}>Loan amount</p>
                                                   <p className={`${inter500.className} ${isLoading ? `hidden` : `flex`} text-black text-[14px]`}>{formatAmount(Number(loan?.loanAmountApproved),false)}</p>
                                               </div>
                                               <div className={`${isLoading ? `h-6 rounded bg-gray-200 animated_pulse w-[90%]  bg-[#F9F9F9]` : ``}`}>
                                                   <p className={` ${inter.className} ${isLoading ? `hidden` : ``} text-[#6A6B6A] text-[14px] `}>Amount outstanding</p>
                                                   <div className={`${inter500.className} ${isLoading ? `hidden` : `flex `} text-black text-[14px]`}>{formatAmount(Number(loan?.loanAmountOutstanding),false)}</div>
                                               </div>
                                               <div className={`${isLoading ? `h-6 rounded bg-gray-200 animated_pulse w-[90%]  bg-[#F9F9F9]` : ``}`} >
                                                   <p className={` ${inter.className} ${isLoading ? `hidden` : ``}  text-[#6A6B6A] text-[14px] `}>Amount repaid</p>
                                                   <p className={`${inter500.className} ${isLoading ? `hidden` : `flex`}  text-black text-[14px]`}>{formatAmount(Number(loan?.loanAmountRepaid),false)}</p>
                                               </div>
                                               <div className={`${isLoading ? `h-6 rounded bg-gray-200 animated_pulse w-[90%]  bg-[#F9F9F9]` : ``}`} >
                                                   <p className={` ${inter.className} ${isLoading ? `hidden` : ``}  text-[#6A6B6A] text-[14px] `}>Loan status</p>
                                                   <p className={`${inter500.className} ${isLoading ? `hidden` : `flex`}  text-black text-[14px]`}></p>
                                               </div>
                                           </div>
                                           <div className={`flex w-full  pt-3 pb-1 justify-end`}>
                                               <button
                                                   onClick={() => {onCardClick(loan)}}
                                                   className={`text-[14px] hover:bg-[#E8EAEE] focus:bg-[#E8EAEE] ${inter700.className} border border-meedlBlue w-fit h-fit px-4 py-2 rounded-md text-meedlBlue `}>View details</button>
                                           </div>
                                       </div>
                                   ))}
                               </div>
                   }

               </section>
           </div>

        </div>
    );
};

export default ViewLoaneeLoans;