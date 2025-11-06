'use client'
import React, {useEffect, useState} from 'react';
import BackButton from "@/components/back-button";
import {useRouter} from "next/navigation";
import {cabinetGroteskMediumBold, inter, inter700} from "@/app/fonts";
import {Label} from "@/components/ui/label";
import CurrencySelectInput from "@/reuseable/Input/CurrencySelectInput";
import {NumericFormat} from "react-number-format";
import {useViewAllLoanProductQuery} from "@/service/admin/loan_product";
import {MdInfoOutline} from 'react-icons/md';
import { Button } from '../ui/button';
import {store, useAppSelector} from '@/redux/store';
import {formatAmount, unformatAmount} from "@/utils/Format";

import {setSelectedLoanProductId,setAmount,setAmountAvailable,setLoanProductType,setLoanProductName} from "@/redux/slice/create/createLoanOfferSlice";
import SelectWithAmount from "@/reuseable/select/SelectWithAmount";
import { loanProductObj } from '@/redux/slice/create/createLoanOfferSlice'; 

interface viewAllProps {
    id: string;
    name: string;
    size?: number;
    totalAvailableAmount?: number;
    totalAmountAvailable?: number;
    availableAmountToBeOffered: number,
    rate?: number
  }



const Index = () => {
    const amountRequested = useAppSelector(state => state?.loanOffer?.loaneeAmountRequested)
    const loaneeName = useAppSelector(state => state?.loanOffer?.loaneeName)
    const  amountApproved = useAppSelector(state => state?.createLoanOffer?.amount)
    const  loanProductId = useAppSelector(state => state?.createLoanOffer?.selectedLoanProductId)
    const  totalAmountAvailable = useAppSelector(state => state?.createLoanOffer?.amountAvailable)
    const productName = useAppSelector(state => state?.createLoanOffer?.loanProductName)
    const loanProductData = useAppSelector(state => state?.createLoanOffer?.loanProductType)
    const router = useRouter();
    const [amount , setAmounts] = useState(amountApproved);
    const [pageNumber,setPageNumber] = useState(0);
    const [selectedLoanProductId, setSelectedProductId] = useState(loanProductId)
    const [loanProducts, setLoanProduct] = useState<viewAllProps[]>([])
    const selectedLoanRequestId = useAppSelector(state => state.loanOffer.selectedLoanRequestId);
    const [selectedLoanProductName, setSelectedLoanProductName] = useState(productName);
    const [isSelectOpen, setIsSelectOpen] = useState(false);

    const [hasNextPage, setHasNextPage] = useState(true);
    const parameter = {
        pageSize: 10,
        pageNumber: pageNumber
    }

    const {data, isFetching,isLoading  } = useViewAllLoanProductQuery(parameter)
    const unformatedAmount =  unformatAmount(amount);
        
    const [selectedLoanProduct, setSelectedLoanProduct] = useState<loanProductObj>(loanProductData);
    // const [remainingAmount, setRemainingAmount] = useState(0)
    const [amountApprovedError, setAmountApprovedError] = useState('')
    const getLoanProductById = (id: string) => {
        return loanProducts?.find((loanProduct: viewAllProps) => loanProduct.id === id);
    };

    useEffect(() => {
        if (loanProductId && loanProducts.length > 0) {
            const product = getLoanProductById(loanProductId);
            if (product) {
                setSelectedLoanProductName(product.name);
            }
        }
    }, [ loanProductId, loanProducts]);

    const isAmountExceedingLimits = () => {
        if (!unformatedAmount || !amountRequested || !selectedLoanProduct?.availableAmountToBeOffered) {
            return true;
        }
        
        const amountApproved = Number(unformatedAmount);
        const requestedAmount = Number(amountRequested);
        const availableToOffer = Number(selectedLoanProduct.availableAmountToBeOffered);
        
        return amountApproved > requestedAmount || amountApproved > availableToOffer;
    };

    const dd = (unformatedAmount?.length === 0) ||
        (selectedLoanProductId?.length === 0)
            || (amountApprovedError?.length !== 0) ||
            isAmountExceedingLimits() ||
            Number(unformatedAmount) === 0;;

    useEffect(() => {
        if(data?.data){
          setLoanProduct((prev) => {
            if(pageNumber === 0) {
                return [...data?.data?.body].sort((a, b) => a.name.localeCompare(b.name));
            }
            const newLoanProducts = data?.data?.body.filter(
                (newLoanProducts: viewAllProps) => !prev?.some((prevloanProducts) => prevloanProducts.id === newLoanProducts.id)
            );
            return [...prev, ...newLoanProducts].sort((a,b) => a.name.localeCompare(b.name));
          });
          setHasNextPage(data?.data?.hasNextPage)
        }
    
    },[data, pageNumber])


    useEffect(() => {
        if(selectedLoanProductId ){
            const selectedLoanProduct = getLoanProductById(selectedLoanProductId)
            const totalAvailableInLoanProduct = Number(selectedLoanProduct?.totalAmountAvailable);
            // setRemainingAmount(totalAvailableInLoanProduct)
            const unformatedAmount = Number(unformatAmount(amount));
            // const remain = totalAvailableInLoanProduct - unformatedAmount;
            // setRemainingAmount(remain)
            if (unformatedAmount >  totalAvailableInLoanProduct){
                setAmountApprovedError('Amount approved cannot be greater than selected loan product size')
            }else{
                setAmountApprovedError('')
            }
            getLoanProductByIds(selectedLoanProductId)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedLoanProductId]);

    const backToLoanRequest = () => {
        router.push(`/loan-request-details?id=${selectedLoanRequestId}`);

    }


    const handleLoanProductSelection = (value: string) => {
        setSelectedProductId(value);
        
        const selectedProduct = getLoanProductById(value);
        if (selectedProduct) {
            setSelectedLoanProductName(selectedProduct.name);
            if (selectedProduct.totalAmountAvailable !== undefined) {
                store.dispatch(setAmountAvailable(selectedProduct.totalAmountAvailable));
            }
            getLoanProductByIds(value);
        }
    };

    const loadMore = () => {
        if (!isFetching && hasNextPage) {
            setPageNumber((prevPage) => prevPage + 1);
        }
    };

    const handleCreateLoanProduct = async () => {

        store.dispatch(setSelectedLoanProductId(selectedLoanProductId))
        store.dispatch(setAmount(String(unformatedAmount)))
        store.dispatch(setLoanProductName(selectedLoanProductName))
        router.push('/create-loan-offer/generate-repayment-schedule')

    }

    const getLoanProductByIds = (id: string) => {
        const datas:  loanProductObj[] = data?.data?.body
        const filtered = datas?.filter((item)=> item.id === id)
        const foundProduct = filtered?.at(0);
        if (foundProduct) {
            setSelectedLoanProduct(foundProduct);
            store.dispatch(setLoanProductType(foundProduct));
        }
    }


    const handleAmountInputChange = (value: string) => {
        const rawValue = value.replace(/,/g, ''); 
        
        if (rawValue === '0' || rawValue === '0.00' || rawValue === '0.0') {
            setAmountApprovedError('Amount approved cannot be zero');
            setAmounts(value);
            return;
        }
        
        if (rawValue.length > 1 && rawValue.startsWith('0') && !rawValue.startsWith('0.')) {
            setAmountApprovedError('Amount cannot start with zero');
            setAmounts(value);
            return;
        }

        if (rawValue.startsWith('-')) {
            setAmountApprovedError('Amount cannot be negative');
            setAmounts(value);
            return;
        }
        setAmountApprovedError('');

        if (selectedLoanProductId ) {
            const selectedLoanProduct = getLoanProductById(selectedLoanProductId)
            const totalAvailableInLoanProduct = Number(selectedLoanProduct?.totalAmountAvailable);
            const amountApproved = Number(unformatAmount(value));
            const requestedAmount = Number(amountRequested);
             const availableToOffer = Number(selectedLoanProduct?.availableAmountToBeOffered);
             if (amountApproved > availableToOffer) {
                setAmountApprovedError('Amount approved cannot be greater than amount available to be offered')
            }else 
            if (amountApproved > requestedAmount) {
                setAmountApprovedError('Amount approved cannot be greater than amount requested')
            }
             else
            if (amountApproved > totalAvailableInLoanProduct) {
                setAmountApprovedError('Amount approved cannot be greater than selected loan product availabe amount')
           }
            else{
                setAmountApprovedError('')
                setAmounts(value)
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
                <div className='border-b-[1px] border-solid pb-2'>
                <p className={` ${cabinetGroteskMediumBold.className} text-[#101828] text-[28px]  `}>Create loan offer for <span className='font-semibold'>{loaneeName}</span></p>
                <p className='text-[14px] text-[#4D4E4D]'>Amount requested: {formatAmount(amountRequested)}</p>
                </div>
                <div className="grid gap-2 mt-4 relative bottom-2">
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
                        <SelectWithAmount
                            selectedProgram={selectedLoanProductName}
                            setSelectedProgram={setSelectedLoanProductName}
                            isSelectOpen={isSelectOpen}
                            setIsSelectOpen={setIsSelectOpen}
                            selectOptions={loanProducts}
                            setId={handleLoanProductSelection}
                            setAvailableAmount={(availableAmount) => {
                                store.dispatch(setAmountAvailable(availableAmount));
                            }}
                            availableAmount={totalAmountAvailable || 0}
                            onChange={() => {
                                
                            }}
                            placeholder='Select loan product'
                            isLoading={isLoading}
                            infinityScroll={{
                                hasMore: hasNextPage,
                                loadMore: loadMore,
                                loader: isFetching
                            }}
                            label=""
                        />
                        {/* <span className={`text-[14px]  ${inter.className}  `}>Loan product balance after creating loan offer <b>{formatAmount(remainingAmount)}</b></span> */}
                    </div>
                    <div className={` bg-[#F9F9F9] px-4 py-4 grid gap-4  `}>
                        <div className={ ` grid gap-3 `}>
                            <p className={` text-[#6A6B6A] text-[14px] ${inter.className} `}>Loan product size</p>
                            <p className={` text-[#212221] text-[14px] ${inter.className} `} >{formatAmount(selectedLoanProduct?.loanProductSize)}</p>
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