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
import {useRespondToLoanRequestMutation} from "@/service/admin/loan/loan-request-api";
import { useAppSelector } from '@/redux/store';
import {formatAmount, unformatAmount} from "@/utils/Format";
import {LoanProduct} from "@/types/loanee";
import {Loader2} from "lucide-react";
import {useToast} from "@/hooks/use-toast";
const Index = () => {

    const router = useRouter();
    const [amount , setAmount] = useState('');
    const [pageNumber,setPageNumber] = useState(0);
    const [selectedLoanProductId, setSelectedProductId] = useState('')
    const [loanProducts, setLoanProduct] = useState<LoanProduct[]>()

    const [hasNextPage] = useState(false)
    const parameter = {
        pageSize: 10,
        pageNumber: pageNumber
    }
    const [respondToLoanRequest, { isLoading:isLoanOfferCreating}] = useRespondToLoanRequestMutation(); // Use the new mutation
    const {data, isFetching,isLoading  } = useViewAllLoanProductQuery(parameter)
    const loanRequestId = useAppSelector(state => state.createLoanOffer.selectedLoanRequestId);
    const [disableButton, setDiableButton] = useState(true)
    const unformatedAmount =  unformatAmount(amount);

    const [remainingAmount, setRemainingAmount] = useState(0)
    const [amountApprovedError, setAmountApprovedError] = useState('')

    useEffect(() => {
        setLoanProduct(data?.data?.body)
    },[data?.data?.body, ])

    useEffect(() => {
        if(selectedLoanProductId ){
            const selectedLoanProduct = getLoanProductById(selectedLoanProductId)
            const totalAvailableInLoanProduct = Number(selectedLoanProduct?.totalAmountAvailable);
            setRemainingAmount(totalAvailableInLoanProduct)
            const unformatedAmount = Number(unformatAmount(amount));
            if (unformatedAmount >  totalAvailableInLoanProduct){
                setAmountApprovedError('Amount approved cannot be greater than selected loan product size')
            }else{
                setDiableButton(false)
            }
        }


    }, [selectedLoanProductId]);

    const backToLoanRequest = () => {
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
    const {toast} = useToast()

    const handleCreateLoanProduct = async () => {
        const data = {
            loanRequestId,
            loanProductId: selectedLoanProductId,
            status: "APPROVED",
            amountApproved: unformatedAmount,
            loanRequestDecision: 'ACCEPTED',
            declineReason: ""
        };

        const response=  await respondToLoanRequest(data);
        if (response?.error){
            toast({
                //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                description: response?.error?.data?.message,
                status: "error",
            })
        }else{
            router.push('/create-loan-offer/generate-repayment-schedule')
        }

    }


    const handleAmountInputChange = (value: string) => {
        if (selectedLoanProductId ) {
            const selectedLoanProduct = getLoanProductById(selectedLoanProductId)
            const totalAvailableInLoanProduct = Number(selectedLoanProduct?.totalAmountAvailable);
            const amountApproved = Number(unformatAmount(value));
            if (amountApproved > totalAvailableInLoanProduct) {
                 setDiableButton(true)
                 setAmountApprovedError('Amount approved cannot be greater than selected loan product size')
            }else{
                setAmountApprovedError('')
                setDiableButton(false)
                setAmount(value)
                const remain = totalAvailableInLoanProduct - amountApproved;
                setRemainingAmount(remain)
            }
        }else{
            setAmount(value)
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
                className={` grid md:w-fit max-h-full  gap-3    md:ml-auto mr-auto md: `}
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
                            selectContent={data?.data?.body}
                            value={selectedLoanProductId}
                            onChange={(value) => handleOnSelectLoanProductModal(value)}
                            isLoading={isLoading || isFetching}
                            displayName={true}
                            triggerId={`financier-select-${selectedLoanProductId}`}
                            selectItemCss='text-[#6A6B6A] cursor-pointer hover:bg-[#F9F9F9]'
                            className="w-full"
                            emptyStateText={'No loan products available'}
                            infinityScroll={{
                                hasMore: data?.data?.hasNextPage,
                                loadMore: loadMore,
                                loader: isFetching
                            }}
                        />
                        <span className={`text-[14px]  ${inter.className}  `}>Remaining balance is <b>{formatAmount(remainingAmount)}</b></span>
                    </div>
                   <div
                        id={'repaymentSchedule'}
                        data-tesid={'repaymentSchedule'}
                        className={` w-full pr-8  pl-4 gap-2  py-4  h-fit flex rounded-md bg-[#FEF6E8]  `}
                    >
                        <MdInfoOutline className={` text-[#66440A]  `}/>
                        <p className={` ${inter.className} text-[12px] text-[#212221]   `}>A repayment schedule will be generated after creating a loan offer</p>
                    </div>

                </div>
                <Button
                    id={'createLoanOffer'}
                    data-testid={'createLoanOffer'}
                    disabled={disableButton}
                    onClick={handleCreateLoanProduct}
                    className={` w-full text-white h-fit py-3 ${inter700.className} ${disableButton ? `bg-[#D7D7D7] ` : `bg-meedlBlue`}   `}
                >
                    {isLoanOfferCreating? <Loader2 className="animate-spin"  />  : "Create"}

                </Button>
            </div>
            
        </div>
    );
};

export default Index;