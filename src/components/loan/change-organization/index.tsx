import React, {useState} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {MdOutlineAccountBalance, MdSearch} from 'react-icons/md';
import {inter} from "@/app/fonts";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button"
import styles from "./index.module.css"
import {store, useAppSelector} from "@/redux/store";
import {setClickedOrganization} from "@/redux/slice/loan/selected-loan";
import Image from "next/image";
import {useSearchOrganisationByNameQuery, useViewOrganizationsQuery} from "@/service/admin/organization";
import ConfirmOrgButton from "@/reuseable/buttons/filter/LoaneeButton";
import SkeletonForLoanOrg from "@/reuseable/Skeleton-loading-state/Skeleton-for-loan-organizations";
import TableEmptyState from "@/reuseable/emptyStates/TableEmptyState";
import SearchEmptyState from "@/reuseable/emptyStates/SearchEmptyState";
import {ChangeOrganization} from "@/types/loan/loan-request.type";
// import InfiniteScroll from "react-infinite-scroll-component";


interface OrganizationType {
    id: string;
    name: string;
    loanRequestCount: number;
    logoImage: string;
}

interface SaveClickedId {
    id: string | number;
    name: string;
    logoImage: string;
}


const ChangeInstitutionModal = () => {

    const currentTab = useAppSelector(state => state?.selectedLoan?.currentTab)
    const currentTabStatus = useAppSelector(state => state?.selectedLoan?.currentTabStatus)
    const [current, setCurrent] = useState<number | string>('')
    const [saveClickedId, setSaveClickedId] = useState<SaveClickedId | null>(null);
    const [pageNumber] = useState(0)
    // const [nextPage,setNextPage] = useState(false)
    // const [totalPage,setTotalPage] = useState(0)
    const [disabled, setDisabled] = React.useState(true)
    const [searchTerm, setSearchTerm] = useState('');
    const pageSize = 10

    const searchElement = {
        name:searchTerm,
        pageNumber: pageNumber,
        pageSize,
    }

   

    const element = {
        loanType:currentTabStatus,
        pageNumber: pageNumber,
        pageSize,
    }

    const {data, isLoading} = useViewOrganizationsQuery(element);
    const {
        data: searchResults,
    } = useSearchOrganisationByNameQuery(searchElement, {skip: !searchTerm});
    const organisationList: ChangeOrganization[] = searchTerm.length > 0 ? searchResults?.data.body || [] : data?.data?.body

   
    const handleClick = (id: string | number, name?: string, logoImage?: string) => {
        if (id === current) {
            setCurrent('');
            setDisabled(true);
        } else {
            setCurrent(id);
            setDisabled(false);
        }
        setSaveClickedId({id, name: name || '', logoImage: logoImage || ''})
    };

    const getLoanCounts = (index: number) => {
        switch (currentTab) {
            case 'Loan requests':
                return roundUpAmount(data?.data?.body?.at(index)?.loanRequestCount.toString());
            case 'Loan offers':
                return roundUpAmount(data?.data?.body?.at(index)?.loanOfferCount.toString());
            case 'Disbursed loan':
                return roundUpAmount(data?.data?.body?.at(index)?.loanDisbursalCount.toString());
            case 'Loan referrals':
                return roundUpAmount(data?.data?.body?.at(index)?.loanReferralCount.toString())
        }
    }


    const roundUpAmount = (number: string) => {
        const numberGotten = Number(number)
        if (numberGotten >= 1000 && numberGotten < 10000) {
            return number.charAt(0) + '.' + number.charAt(1) + 'k'
        } else if (numberGotten >= 10000) {
            return number.charAt(0) + number.charAt(1) + 'k'
        }
        return numberGotten
    }

    const handleContinue = () => {
        setCurrent('');
        setDisabled(true);
        store.dispatch(setClickedOrganization(saveClickedId || {id: '', name: '', logoImage: ''}));
    }

    const getInitials = (name: string): string => {
        const nameArray = name.split(' ');
        let initials = nameArray.map(word => word[0]).join('');
        if (initials.length > 2) {
            initials = initials.slice(0, 2);
        }
        return initials.toUpperCase();
    };

    return (
        <div>
                    <div
                        className={` h-full md:h-full w-full md:w-full `}
                    >
                        <div className='relative  '>
                             <span className="absolute inset-y-0 left-0 flex items-center pr-4 pl-3">
                                <MdSearch className="h-5 w-5 pr-4 text-[#939CB0]"/>
                            </span>
                            <Input
                                id='searchOrganizationOn'
                                placeholder='Search'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className='w-full md:w-full rounded h-11 md:h-11 focus-visible:ring-0 shadow-none  border-solid border border-neutral650  text-grey450 '
                            />
                        </div>
                        {isLoading ?
                            <div className={`w-full h-fit md:w-full md:h-full`}>
                                <SkeletonForLoanOrg/>
                            </div> :
                            (<div
                                className={`${styles.organizations} space-y-3 lg:max-h-[56.5vh] md:max-h-[50vh] overflow-y-auto  py-2 grid md:grid`}>
                                {searchTerm ? (
                                        searchResults?.data.length === 0 || !searchResults ?
                                            <SearchEmptyState name={"organization"}
                                                              icon={MdSearch}/> :
                                            searchResults?.data?.body?.map((searchResult: OrganizationType, index: number) => {

                                                const initial = getInitials(searchResult.name)
                                                return (
                                                    <button key={searchResult.id} id={"index" + index}
                                                            onClick={() => {
                                                                handleClick(searchResult?.id, searchResult?.name)
                                                            }}
                                                            className={` ${styles.institutionMiniCard2} md:flex  md:place-items-center md:px-2 py-2 px-2 md:justify-between grid md:py-4  w-[98%] h-fit gap-3 md:h-fit rounded-md border ${searchResult.id === current ? `border-meedlBlue` : `border-[#ECECEC]`}   `}>

                                                        <div
                                                            className={`flex md:flex gap-3 place-items-center md:place-items-center `}
                                                        >
                                                            <div id={`radioGroupOnOrganizationModal`}
                                                                 data-testid={`radioGroupOnOrganizationModal`}
                                                                 className={`flex w-fit h-fit px-1 py-1 ring-1 ${searchResult.id === current ? `ring-meedlBlue` : `ring-[#ECECEC]`} rounded-full items-center space-x-2`}>
                                                                <div id={`radioGroupCheeckedOnOrganizationModal`}
                                                                     data-testid={`radioGroupCheeckedOnOrganizationModal`}
                                                                     className={` w-[0.5rem]  h-[0.5rem] rounded-full  ${searchResult.id === current ? `bg-meedlBlue md:bg-meedlBlue` : `bg-white`} `}></div>
                                                            </div>
                                                            <div
                                                                className={` md:grid grid place-content-center  md:place-content-center  px-2 py-3 md:object-fit bg-[#F7F7F7] md:bg-[#F7F7F7] object-fit rounded-full  md:rounded-full   md:w-[3rem] md:h-[2rem] w-[3rem] h-[3rem]   `}

                                                            >
                                                                {
                                                                    searchResult.logoImage ? (
                                                                        <Image
                                                                            id={'organizationImageOnLoan'}
                                                                            data-testid={'oranizationImageOnLoan'}
                                                                            width={100}
                                                                            height={100}
                                                                            className={`rounded-full md:rounded-full`}
                                                                            // style={{marginTop: 'auto', marginBottom: 'auto', backgroundColor: '#da9494'}}
                                                                            src={searchResult.logoImage}
                                                                            alt={'image'}
                                                                        />
                                                                    ) : (
                                                                        <div>{initial}</div>
                                                                    )
                                                                }

                                                            </div>
                                                            <div
                                                                className={` ${inter.className} text-black500 md:text-black500 grid md:grid md:place-content-start md:px-0 md:w-[60%] text-sm md:text-sm md:h-fit h-fit  break-words  `}>{searchResult.name}</div>
                                                        </div>
                                                        <div
                                                            className={`flex md:flex bg-grey105 md:bg-grey105 px-2 py-1 md:px-3 md:py-2  rounded-full md:rounded-full w-fit h-fit md:w-fit md:gap-2 md:h-fit md:place-items-between   place-items-center gap-3 `}>
                                                <span
                                                    className={`text-xs md:text-xs  md:break-normal  w-fit md:w-fit `}>{currentTab}</span>
                                                            <div
                                                                className={` w-fit h-fit ring-1 ring-[#E1EEFF] rounded-md  px-1 py-1 md:w-fit md:h-fit md:ring-1 md:ring-[#E1EEFF] md:rounded-md  md:px-1 md:py-1 `}
                                                            >
                                                                <div
                                                                    className={`bg-[#E1EEFF]  h-fit  flex place-content-center w-fit`}>
                                                        <span
                                                            className={`text-xs mt-auto mb-auto text-meedlBlue`}>{getLoanCounts(index)}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </button>
                                                )
                                            })
                                    ) :
                                    (organisationList?.length === 0 || !organisationList ?
                                        <div className={`w-full h-fit md:w-full md:h-full`}>
                                            <TableEmptyState name={"organization"} icon={MdOutlineAccountBalance}
                                                             condition={true}/>
                                        </div>
                                        : organisationList?.map((organization: OrganizationType, index: number) => {

                                            const initial = getInitials(organization.name)
                                            return (
                                                <button key={organization.id} id={"index" + index}
                                                        onClick={() => {
                                                            handleClick(organization?.id, organization?.name, organization?.logoImage)
                                                        }}
                                                        className={` ${styles.institutionMiniCard2} md:flex  md:place-items-center md:px-2 py-2 px-2 md:justify-between grid md:py-4  w-[98%] h-fit gap-3 md:h-fit rounded-md border ${organization.id === current ? `border-meedlBlue` : `border-[#ECECEC]`}   `}>

                                                    <div
                                                        className={`flex md:flex gap-3 place-items-center md:place-items-center `}
                                                    >
                                                        <div id={`radioGroupOnOrganizationModal`}
                                                             data-testid={`radioGroupOnOrganizationModal`}
                                                             className={`flex w-fit h-fit px-1 py-1 ring-1 ${organization.id === current ? `ring-meedlBlue` : `ring-[#ECECEC]`} rounded-full items-center space-x-2`}>
                                                            <div id={`radioGroupCheeckedOnOrganizationModal`}
                                                                 data-testid={`radioGroupCheeckedOnOrganizationModal`}
                                                                 className={` w-[0.5rem]  h-[0.5rem] rounded-full  ${organization.id === current ? `bg-meedlBlue md:bg-meedlBlue` : `bg-white`} `}></div>
                                                        </div>
                                                        <div
                                                            className={` md:grid grid place-content-center  md:place-content-center  px-2 py-3 md:object-fit bg-[#F7F7F7] md:bg-[#F7F7F7] object-fit rounded-full  md:rounded-full   md:w-[3rem] md:h-[2rem] w-[3rem] h-[3rem]   `}

                                                        >
                                                            {
                                                                organization.logoImage ? (
                                                                    <Image
                                                                        id={'organizationImageOnLoan'}
                                                                        data-testid={'oranizationImageOnLoan'}
                                                                        width={100}
                                                                        height={100}
                                                                        className={`rounded-full md:rounded-full`}
                                                                        // style={{marginTop: 'auto', marginBottom: 'auto', backgroundColor: '#da9494'}}
                                                                        src={organization.logoImage}
                                                                        alt={'image'}
                                                                    />
                                                                ) : (
                                                                    <div>{initial}</div>
                                                                )
                                                            }

                                                        </div>
                                                        <div
                                                            className={` ${inter.className} text-black500 md:text-black500 grid md:grid md:place-content-start md:px-0 md:w-[60%] text-sm md:text-sm md:h-fit h-fit  break-words  `}>{organization.name}</div>
                                                    </div>
                                                    <div
                                                        className={`flex md:flex bg-grey105 md:bg-grey105 px-2 py-1 md:px-3 md:py-2  rounded-full md:rounded-full w-fit h-fit md:w-fit md:gap-2 md:h-fit md:place-items-between   place-items-center gap-3 `}>
                                                <span
                                                    className={`text-xs md:text-xs  md:break-normal  w-fit md:w-fit `}>{currentTab}</span>
                                                        <div
                                                            className={` w-fit h-fit ring-1 ring-[#E1EEFF] rounded-md  px-1 py-1 md:w-fit md:h-fit md:ring-1 md:ring-[#E1EEFF] md:rounded-md  md:px-1 md:py-1 `}
                                                        >
                                                            <div
                                                                className={`bg-[#E1EEFF]  h-fit  flex place-content-center w-fit`}>
                                                        <span
                                                            className={`text-xs mt-auto mb-auto text-meedlBlue`}>{getLoanCounts(index)}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </button>
                                            )
                                        }))
                                }
                            </div>)}
                    </div>

                    <div
                        className="  py-4   md:flex md:justify-end h-fit  grid gap-3 md:gap-4  md:h-fit   w-full md:w-full ">
                        <Dialog.Close asChild>
                            <Button
                                 variant={"outline"}
                                id={'cancel'} data-testid={'cancel'}
                                className={` border border-meedlBlue rounded-md text-sm h-fit md:w-fit md:px-10 md:py-4 py-4   text-meedlBlue`}
                            >
                                Cancel
                            </Button>
                        </Dialog.Close>
                        <div className={`w-full  md:w-[8rem]`}>
                            <ConfirmOrgButton
                                disable={disabled}
                                backgroundColor={''} textColor={"white"}
                                id={"continueButtonOnOrganizationModal"}
                                height={'3.4rem'}
                                data-testid={`continueButtonOnOrganizationModal`}
                                buttonText={"Confirm"} width={"inherit"}
                                // isLoading={isLoading}
                                handleClick={handleContinue}
                            >
                            </ConfirmOrgButton>
                        </div>
                    </div>
</div>
    )

}
export default ChangeInstitutionModal;