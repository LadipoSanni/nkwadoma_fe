'use client'
import React, {useEffect, useState} from 'react';
import BackButton from "@/components/back-button";
import {useRouter} from "next/navigation";
import {cabinetGroteskMediumBold, inter, inter700} from "@/app/fonts";
import {Label} from "@/components/ui/label";
import CurrencySelectInput from "@/reuseable/Input/CurrencySelectInput";
import {NumericFormat} from "react-number-format";
import CustomSelectId from "@/reuseable/Input/custom-select-id";
import {useViewAllLoanProductQuery} from "@/service/admin/loan_product";
import {MdInfoOutline} from 'react-icons/md';
import { Button } from '../ui/button';
import {store} from '@/redux/store';
import {formatAmount, unformatAmount} from "@/utils/Format";
import {LoanProduct} from "@/types/loanee";
import {LoanProuctType} from "@/types/loan/loan-request.type";
import {setSelectedLoanProductId,setAmount} from "@/redux/slice/create/createLoanOfferSlice";

const Index = () => {

    const router = useRouter();
    const [amount , setAmounts] = useState('');
    const [pageNumber,setPageNumber] = useState(0);
    const [selectedLoanProductId, setSelectedProductId] = useState('')
    const [loanProducts, setLoanProduct] = useState<LoanProduct[]>()

    const [hasNextPage, setHasNextPage] = useState(true);
    const parameter = {
        pageSize: 10,
        pageNumber: pageNumber
    }
    const {data, isFetching,isLoading  } = useViewAllLoanProductQuery(parameter)
    const unformatedAmount =  unformatAmount(amount);
    const [selectedLoanProduct, setSelectedLoanProduct] = useState<LoanProuctType>();
    const [remainingAmount, setRemainingAmount] = useState(0)
    const [amountApprovedError, setAmountApprovedError] = useState('')

    const dd = (unformatedAmount?.length === 0) ||
        (selectedLoanProductId?.length === 0)
            || (amountApprovedError?.length !== 0);

    useEffect(() => {
        setLoanProduct((prev) => {
            if(pageNumber === 0) {
                return data?.data?.body
            }
            const newLoanProducts = data?.data?.body.filter(
                (newLoanProducts: LoanProduct) => !prev?.some((prevloanProducts) => prevloanProducts.id === newLoanProducts.id)
            );
            if (prev) {
                return [...prev, ...newLoanProducts]
            }
        });
        setHasNextPage(data?.data?.hasNextPage)
    },[data?.data?.body, ])


    useEffect(() => {
        if(selectedLoanProductId ){
            const selectedLoanProduct = getLoanProductById(selectedLoanProductId)
            const totalAvailableInLoanProduct = Number(selectedLoanProduct?.totalAmountAvailable);
            setRemainingAmount(totalAvailableInLoanProduct)
            const unformatedAmount = Number(unformatAmount(amount));
            const remain = totalAvailableInLoanProduct - unformatedAmount;
            setRemainingAmount(remain)
            if (unformatedAmount >  totalAvailableInLoanProduct){
                setAmountApprovedError('Amount approved cannot be greater than selected loan product size')
            }else{
                setAmountApprovedError('')
            }
            getLoanProductByIds(selectedLoanProductId)
        }


    }, [selectedLoanProductId]);

    const backToLoanRequest = () => {
        // router.push(`/loan-request-details?id=${ID?.id}`);

        router.push("/loan/loan-request")
    }
    const getLoanProductById = (id: string) => {
        return loanProducts?.find((loanProduct: LoanProduct) => loanProduct.id === id);
    };


    const handleOnSelectLoanProductModal = (value: string)=> {
        setSelectedProductId(value)
    }

    const loadMore = () => {
        if (!isFetching && hasNextPage) {
            setPageNumber((prevPage) => prevPage + 1);
        }
    };

    const handleCreateLoanProduct = async () => {

        store.dispatch(setSelectedLoanProductId(selectedLoanProductId))
        store.dispatch(setAmount(String(unformatedAmount)))
        router.push('/create-loan-offer/generate-repayment-schedule')

    }

    const getLoanProductByIds = (id: string) => {
        const datas: LoanProuctType[] = data?.data?.body
        const filtered = datas?.filter((item)=> item.id === id)
        setSelectedLoanProduct(filtered?.at(0))
    }


    const handleAmountInputChange = (value: string) => {
        if (selectedLoanProductId ) {
            const selectedLoanProduct = getLoanProductById(selectedLoanProductId)
            const totalAvailableInLoanProduct = Number(selectedLoanProduct?.totalAmountAvailable);
            const amountApproved = Number(unformatAmount(value));
            if (amountApproved > totalAvailableInLoanProduct) {
                 setAmountApprovedError('Amount approved cannot be greater than selected loan product size')
            }else{
                setAmountApprovedError('')
                setAmounts(value)
                const remain = totalAvailableInLoanProduct - amountApproved;
                setRemainingAmount(remain)
            }
        }else{
            setAmounts(value)
        }
    }


    return (
        <div
            id={'createLoanOffer'}
            data-testid={'createLoanOffer'}
            className={` w-full h-full px-3 py-3 md:py-4  md:px-6  `}
        >
            <BackButton handleClick={backToLoanRequest} iconBeforeLetters={true} text={"Back"}
                        id={"loanRequestDetailsBackButton"} textColor={'#142854'}/>

            <div
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    scrollbarGutter: "stable both-edge"

                }}
                className={` grid md:w-fit max-h-[80vh]  gap-3 overflow-y-scroll   md:ml-auto mr-auto md: `}
            >
                <p className={` ${cabinetGroteskMediumBold.className} text-[#101828] text-[28px]  `}>Create loan offer</p>
                <div className="grid gap-2 mt-4">
                    <Label htmlFor="amountApproved">Amount approved</Label>
                    <div>
                        <div className={'flex gap-2'}>
                            <CurrencySelectInput
                                selectedcurrency={"NGN"}
                                setSelectedCurrency={(currency) => console.log(currency)}
                                className="mt-0 mb-0 min-w-[78px] h-[3.10rem]"
                            />
                            <NumericFormat
                                id={`amountApproved`}
                                name={`amountApproved`}
                                placeholder="0.00"
                                className="p-4 focus-visible:outline-0  w-full shadow-none focus-visible:ring-transparent rounded-md h-[3.20rem] font-normal leading-[21px] text-[14px] placeholder:text-grey150 text-black500 border border-solid border-neutral650"
                                thousandSeparator=","
                                decimalScale={2}
                                value={amount}
                                fixedDecimalScale={true}
                                onChange={(e)=> {
                                    const {value} = e.target
                                   handleAmountInputChange(value)
                                }}

                            />
                        </div>
                        <p id={'amountApprovedError'} data-testid={'amountApprovedError'} className={`text-[12px] text-red-400 `}>{amountApprovedError}</p>
                    </div>
                    <div>
                        <CustomSelectId
                            placeholder={'Select loan product'}
                            //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            selectContent={loanProducts}
                            value={selectedLoanProductId}
                            onChange={(value) => handleOnSelectLoanProductModal(value)}
                            isLoading={isLoading || isFetching}
                            displayName={true}
                            triggerId={`financier-select-${selectedLoanProductId}`}
                            selectItemCss='text-[#6A6B6A] cursor-pointer hover:bg-[#F9F9F9]'
                            className="w-full"
                            emptyStateText={'No loan products available'}
                            infinityScroll={{
                                hasMore: hasNextPage,
                                loadMore: loadMore,
                                loader: isFetching
                            }}
                        />
                        <span className={`text-[14px]  ${inter.className}  `}>Loan product balance after creating loan offer <b>{formatAmount(remainingAmount)}</b></span>
                    </div>
                    <div className={` bg-[#F9F9F9] px-4 py-4 grid gap-4  `}>
                        <div className={ ` grid gap-3 `}>
                            <p className={` text-[#6A6B6A] text-[14px] ${inter.className} `}>Loan product size</p>
                            <p className={` text-[#212221] text-[14px] ${inter.className} `} >{formatAmount(selectedLoanProduct?.loanProductSize)}</p>
                        </div>
                        <div className={ ` grid gap-3 `} >
                            <p className={` text-[#6A6B6A] text-[14px] ${inter.className} `} >Actual amount available</p>
                            <p className={` text-[#212221] text-[14px] ${inter.className} `} >{formatAmount(selectedLoanProduct?.totalAmountAvailable)}</p>
                        </div>
                        <div className={ ` grid gap-3 `} >
                            <p className={` text-[#6A6B6A] text-[14px] ${inter.className} `} >Amount available to be offered</p>
                            <p className={` text-[#212221] text-[14px] ${inter.className} `} >{formatAmount(selectedLoanProduct?.availableAmountToBeOffered)}</p>
                        </div>

                    </div>
                   <div
                        id={'repaymentSchedule'}
                        data-tesid={'repaymentSchedule'}
                        className={` w-full pr-8  pl-4 gap-2  py-4  h-fit flex rounded-md bg-[#FEF6E8]  `}
                    >
                        <MdInfoOutline className={` text-[#66440A]  `}/>
                        <p className={` ${inter.className} text-[12px] text-[#212221]   `}>A repayment schedule will be generated on the next page</p>
                    </div>

                </div>
                <Button
                    id={'createLoanOffer'}
                    data-testid={'createLoanOffer'}
                    disabled={dd}
                    onClick={handleCreateLoanProduct}
                    className={` w-full text-white h-fit py-3 ${inter700.className} ${dd ? `bg-[#D7D7D7] ` : `bg-meedlBlue`}   `}
                >
                     Generate repayment schedule

                </Button>
            </div>
            
        </div>
    );
};

export default Index;