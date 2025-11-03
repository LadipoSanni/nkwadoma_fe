'use client'
import React, {useCallback, useEffect, useRef, useState} from 'react';
import BackButton from "@/components/back-button";
import { cabinetGroteskMediumBold} from '@/app/fonts'
import styles from '@/features/Overview/index.module.css';
import Details from "@/components/loanee-my-profile/Details";
import SearchInput from "@/reuseable/Input/SearchInput";
import { useRouter } from 'next/navigation';
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
import {setOrganizationFrom, setUnderlineTabCurrentTab} from "@/redux/slice/layout/adminLayout";
import OrganizationLoan from "@/reuseable/cards/OrganizationLoan";

interface LoanGridProps  {
    data: AdminViewLoanType[];
    lastCardObserver: React.RefCallback<HTMLDivElement>;
    isLoading: boolean;
}
interface EmptyState {
    searchTerm: string;
}
const ViewLoaneeLoans = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const selectedLoaneeId = useAppSelector(state => state.loanees.selectedLoaneeId);
    const selectedLoanFirstName = useAppSelector(state => state.loanees.selectedLoaneeFirstName);
    const selectedLoanLastName = useAppSelector(state => state.loanees.selectedLoaneeLastName);
    const selectedLoanFullName = selectedLoanFirstName ? `${selectedLoanFirstName} ` + `${selectedLoanLastName} `  :   '';
    const router = useRouter()
    const [fetchData, setFetchData] = useState<AdminViewLoanType[]>([]);
    const [pageNumber,setPageNumber] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(10);
    const userRole  = getItemSessionStorage("user_role")
    const observer = useRef<IntersectionObserver | null>(null);
    const [hasMore, setHasMore] = useState(true);

    const [debouncedSearchTerm] = useDebounce(searchTerm, 100);

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
    const [loadedData, setLoadedData] = useState<AdminViewLoanType[]>([]);

    useEffect(() => {
        if (debouncedSearchTerm){
            setFetchData( searchData?.data?.body );
            setHasMore(searchData?.data?.hasNextPage)
            if (searchData?.data?.totalPage){
                setPageSize(searchData?.data?.totalPages)
            }
        }else {

            setFetchData((prev) => {
                const combined = [...prev, ...(loadedData || []), ...(viewAllLoans?.data?.body || [])];
                const seen = new Set<number>();
                return combined.filter((item) => {
                    if (seen.has(item.id)) return false;
                    seen.add(item.id);
                    return true;
                });
            });
            setHasMore(viewAllLoans?.data?.hasNextPage)
            if (viewAllLoans?.data?.pageSize){
                setPageSize(viewAllLoans?.data?.pageSize)
            }
        }

    }, [viewAllLoans, debouncedSearchTerm,searchData ])

    const onBackButtonClick = () => {
        if (MEEDLE_ORG_ADMIN?.includes?.(userRole ? userRole : '')){
            store.dispatch(setOrganizationFrom('FromLoans'))
        }
        router.push('/loanees')
    }
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event?.target?.value !== ''){
            setLoadedData(fetchData)
        }
        setSearchTerm(event.target.value);
    };


    const onCardClick = (item: AdminViewLoanType) => {
        store.dispatch(setcohortId(item?.cohortId))
        store.dispatch(setLoaneeId(item?.loaneeId))
        store.dispatch(setClickedLoanId(item?.id))
        store.dispatch(setUnderlineTabCurrentTab('Details'))
        store.dispatch(setOrganizationFrom('FromLoans'))
        router.push(`${LoaneeLoannDetails(item.id)}`);

    }

    const lastCardObserver = useCallback(
        (node: HTMLDivElement | null) => {
            if (isLoadingViewAll || isFetchingViewAll || isLoadingSearch || isFetchingSearch ) return;

            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver(
                entries => {
                    if (entries[0].isIntersecting && hasMore) {
                        setPageNumber(prevPage => prevPage + 1);
                    }
                },
                {
                    rootMargin: "100px",
                }
            );

            if (node) observer.current.observe(node);
        },
        [isLoadingViewAll, isFetchingViewAll,isLoadingSearch,isFetchingSearch, hasMore]
    );


    const LoanLoadingSkeleton = () => (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-[50vh] px-4">
            {[...Array(4)].map((_, i) => (
                <div
                    key={i}
                    className="w-full h-[20rem] animate-pulse bg-[#f4f4f5] rounded-lg"
                />
            ))}
        </div>
    );

    const EmptyLoanState = ({ searchTerm }:EmptyState) => (
        <div className="h-60 relative bottom-3">
            <GeneralEmptyState
                icon={searchTerm ? MdSearch : MdPersonOutline}
                iconSize="1.8rem"
                iconContainerClass="w-[50px] h-[50px]"
                message={
                    <div className="relative bottom-2">
                        <p>
                            {searchTerm
                                ? "No matching loan found for the organization you searched."
                                : "Loanee does not have loan"}
                        </p>
                    </div>
                }
                className="h-14"
            />
        </div>
    );



    const LoanGrid = ({ data, lastCardObserver, isLoading }: LoanGridProps) => (
        <div className="w-full h-full grid gap-4 md:grid-cols-3">
            {data.map((loan:AdminViewLoanType, index) => (
                <div key={"key"+loan.id + index} ref={lastCardObserver}>
                    <OrganizationLoan
                        id={loan.id}
                        isLoading={isLoading}
                        loanAmountApproved={loan.loanAmountApproved?.toString()}
                        loanAmountOutstanding={loan.loanAmountOutstanding?.toString()}
                        loanAmountRepaid={loan.loanAmountRepaid?.toString()}
                        organizationName={loan.organizationName}
                        handleClick={() => {onCardClick(loan)}}
                    />
                </div>
            ))}
        </div>
    );

    const RenderIf = ({ condition, children }: { condition: boolean; children: React.ReactNode }) =>
        condition ? <>{children}</> : null;

    const isLoading =
        isLoadingViewAll || isFetchingViewAll || isLoadingSearch || isFetchingSearch;

    const isEmpty =
        (debouncedSearchTerm && searchData?.data?.body?.length === 0) ||
        viewAllLoans?.data?.body?.length === 0;

    const hasData = !isLoading && !isEmpty;


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
                   // max-h-[58vh] overflow-y-aut
                   className={`h-full   grid  bg-white py-4 w-full `}
               >
                   <RenderIf condition={isLoading}>
                       <LoanLoadingSkeleton />
                   </RenderIf>
                   <RenderIf condition={isEmpty}>
                       <EmptyLoanState searchTerm={searchTerm} />
                   </RenderIf>
                   <RenderIf condition={hasData}>
                       <LoanGrid
                           data={fetchData}
                           lastCardObserver={lastCardObserver}
                           isLoading={ isLoading}
                       />
                   </RenderIf>
               </section>
           </div>

        </div>
    );
};

export default ViewLoaneeLoans;