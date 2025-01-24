import React, {useState} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {MdOutlineAccountBalance, MdSearch} from 'react-icons/md';
import {inter, cabinetGroteskRegular} from "@/app/fonts";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button"
import styles from "./index.module.css"
import {store, useAppSelector} from "@/redux/store";
import {setClickedOrganization} from "@/redux/slice/loan/selected-loan";
import Image from "next/image";
import {useSearchOrganisationByNameQuery, useViewAllOrganizationsQuery} from "@/service/admin/organization";
import ConfirmOrgButton from "@/reuseable/buttons/filter/LoaneeButton";
import SkeletonForLoanOrg from "@/reuseable/Skeleton-loading-state/Skeleton-for-loan-organizations";
import TableEmptyState from "@/reuseable/emptyStates/TableEmptyState";
import {Cross2Icon} from "@radix-ui/react-icons";
import SearchEmptyState from "@/reuseable/emptyStates/SearchEmptyState";


interface OrganizationType {
    id: string;
    name: string;
    loanRequestCount: number;
    logoImage: string;
}

const ChangeInstitutionModal = () => {

    const currentTab = useAppSelector(state => state.selectedLoan.currentTab)
    const clickedOrganizationId = useAppSelector(state => state.selectedLoan.clickedOrganization)
    console.log(clickedOrganizationId)
    // const clickedOrganization = useSelector((state: RootState) => state.selectedLoan.clickedOrganization);
    const [current, setCurrent] = useState<number | string>('')
    const [disabled, setDisabled] = React.useState(true)
    const dataElement = {
        pageNumber: 0,
        pageSize: 100
    }
    const [searchTerm, setSearchTerm] = useState('');
    const {data, isLoading} = useViewAllOrganizationsQuery(dataElement);
    const {
        data: searchResults,
    } = useSearchOrganisationByNameQuery(searchTerm, {skip: !searchTerm});
    const organisationList: OrganizationType[] = searchTerm ? searchResults?.data.body || [] : data?.data.body

    const handleClick = (id: string | number, name?: string, logoImage?: string) => {
        if (id === current) {
            setCurrent('');
            setDisabled(true);
        } else {
            setCurrent(id);
            setDisabled(false);
        }
        store.dispatch(setClickedOrganization({id, name: name || '', logoImage: logoImage || ''}));
    };


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
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button id="changeOrganizationButton" data-testid={'changeOrganizationButton'} size={"lg"}
                        variant={"secondary"}
                        className={` ${inter.className} text-meedlBlue pt-0.5 underline w-fit h-fit md:font-size-0.875rem md:font-light px-1 bg-blue500 rounded `}>Change
                </Button>
            </Dialog.Trigger>
            <div className='hidden'><Dialog.DialogDescription></Dialog.DialogDescription></div>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-[#344054B2] data-[state=open]:animate-overlayShow"/>
                <Dialog.Content
                    className={`fixed left-1/2 top-1/2 ${styles.container} md:h-[75vh] md:w-[40vw] h-[90vh] w-[90vw] grid grid-rows-3 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white py-6 px-5 md:py-6 md:px-5 `}>
                    <Dialog.Title className={`${cabinetGroteskRegular.className}  text-2xl`}>
                        Organization
                    </Dialog.Title>
                    <div
                        className={` ${styles.innerContainer}  h-full md:h-full w-full md:w-full `}
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
                        {isLoading ? <SkeletonForLoanOrg/>
                            //     :
                            //     searchTerm.length === 0 ? (
                            //     <TableEmptyState name={"organization"}
                            //                      icon={MdOutlineAccountBalance}
                            //                      condition={true}/>
                            // )
                            :
                            (<div
                                className={`${styles.organizations} md:w-[30vw] md:h-fit  py-2 grid gap-3 md:grid md:gap-3 md:py-4 `}>
                                {searchResults ? (
                                        searchResults?.data.length === 0 ? <SearchEmptyState searchTerm={searchTerm}
                                                                                             icon={MdSearch}/> : searchResults?.data.map((searchResult: OrganizationType, index: number) => {

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
                                                            className={`text-xs mt-auto mb-auto text-meedlBlue`}>{roundUpAmount(searchResult.loanRequestCount.toString())}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </button>
                                            )
                                        })
                                    ) :
                                    (organisationList?.length === 0 ?
                                        <TableEmptyState name={"organization"} icon={MdOutlineAccountBalance}
                                                         condition={true}/> : organisationList?.map((organization: OrganizationType, index: number) => {

                                            const initial = getInitials(organization.name)
                                            return (
                                                <button key={organization.id} id={"index" + index}
                                                        onClick={() => {
                                                            handleClick(organization?.id, organization?.name, organization?.logoImage)
                                                        }}
                                                    // onClick={() => {
                                                    //     handleClick(organization?.id)
                                                    // }}
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
                                                            className={`text-xs mt-auto mb-auto text-meedlBlue`}>{roundUpAmount(organization.loanRequestCount.toString())}</span>
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
                        className="absolute bottom-0 px-4 pb-4   md:flex md:justify-end h-fit  grid gap-3 md:gap-4  md:h-fit   w-full md:w-full ">
                        <Dialog.Close asChild>
                            <Button
                                id={'cancel'} data-testid={'cancel'} onClick={handleContinue}
                                className={` border border-meedlBlue rounded-md text-sm h-fit md:w-fit md:px-10 md:py-4 py-4   text-meedlBlue`}
                            >
                                Cancel
                            </Button>
                        </Dialog.Close>
                        <div className={`w-full  md:w-[8rem]`}>
                            <ConfirmOrgButton
                                disable={disabled}
                                backgroundColor={'#142854'} textColor={"white"}
                                id={"continueButtonOnOrganizationModal"}
                                height={'3.4rem'}
                                data-testid={`continueButtonOnOrganizationModal`}
                                buttonText={"Confirm"} width={"inherit"}
                                isLoading={isLoading}
                                handleClick={handleContinue}
                            >
                            </ConfirmOrgButton>
                            {/*<AuthButton*/}
                            {/*    // disable={disabled} */}
                            {/*    backgroundColor={'#142854'} textColor={"white"}*/}
                            {/*    id={"continueButtonOnOrganizationModal"}*/}
                            {/*    height={'3.4rem'}*/}
                            {/*    data-testid={`continueButtonOnOrganizationModal`}*/}
                            {/*    buttonText={"Confirm"} width={"inherit"}*/}
                            {/*    isLoading={isLoading}*/}
                            {/*    handleClick={handleContinue}*/}
                            {/*>*/}
                            {/*</AuthButton>*/}
                        </div>
                    </div>
                    <Dialog.Close asChild>
                        <button
                            className="absolute right-4 top-6  inline-flex size-[25px]  "
                            aria-label="Close"
                        >
                            <Cross2Icon className={`text-[#939CB0] w-7 h-7`}/>
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )

}
export default ChangeInstitutionModal;