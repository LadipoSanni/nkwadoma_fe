import React, {useEffect, useState } from 'react';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cabinetGrotesk, inter } from "@/app/fonts";
import { MdClose } from "react-icons/md";
import CurrencySelectInput from "@/reuseable/Input/CurrencySelectInput";
import { NumericFormat } from "react-number-format";
import { useRespondToLoanRequestMutation } from "@/service/admin/loan/loan-request-api"; // Import the new mutation
import {useViewAllLoanProductQuery} from '@/service/admin/loan_product'
import { Loader2 } from "lucide-react"
import { useToast} from "@/hooks/use-toast";
import {store} from "@/redux/store";
import {setCurrentTab} from "@/redux/slice/loan/selected-loan";
import {useRouter} from "next/navigation";
import {unformatAmount} from "@/utils/Format";
import CustomSelectId from "@/reuseable/Input/custom-select-id";
import {LoanProduct} from "@/types/Component.type";

interface CreateLoanOfferProps {
    onSubmit?: (data: { amountApproved: string, loanProduct: string }) => void;
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    loanRequestId: string;
}


interface selectedIdType {
    id: string,
    organizationName: string,
    userIdentity: {
        firstName: string,
        lastName: string,
    }
}

const CreateLoanOffer: React.FC<CreateLoanOfferProps> = ({ onSubmit, isOpen, setIsOpen, loanRequestId }) => {
    const router = useRouter()
    const [hasNextPage, setNextPage] = useState(true);
    const [selectedLoanProductId, setSelectedLoanProductId] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [respondToLoanRequest, {isError, isLoading: isLoanOfferCreating, error}] = useRespondToLoanRequestMutation(); // Use the new mutation
    const [amount , setAmount] = useState('');
    const isValid = amount.length > 0 && selectedLoanProductId !== null;
    const [pageNumber,setPageNumber] = useState(0)
    const [loanProducts, setLoanProducts] = useState<selectedIdType[]>([])

    const parameter = {
        pageSize: 10,
        pageNumber: pageNumber
    }
    const {data, isFetching,isLoading  } = useViewAllLoanProductQuery(parameter)

    useEffect(()=> {
        setLoanProducts((prev) => {
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
        setNextPage(data?.data?.hasNextPage)
    }, [data, pageNumber])


    const {toast} = useToast()


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!selectedLoanProductId) {
            setIsFormValid(false);
            setErrorMessage("Please select a program.");
            return;
        }
        setIsFormValid(true);
        setErrorMessage("");

        const unformatedAmount =  unformatAmount(amount);
        const data = {
            loanRequestId,
            loanProductId: selectedLoanProductId,
            status: "APPROVED",
            amountApproved: unformatedAmount,
            loanRequestDecision: 'ACCEPTED',
            declineReason: ""
        };
         const response=  await respondToLoanRequest(data);
       if (onSubmit){
           onSubmit({
               amountApproved: amount,
               loanProduct: selectedLoanProductId
           });
       }

        if (response?.data?.message === 'Loan request approved successfully'){
            store.dispatch(setCurrentTab('Loan requests'))
            router.push("/loan/loan-request")
            setIsOpen(false)
            toast({
                description:'Loan offer has been created',
                status: "success",
            })
        }
    };

    if (!isOpen) return null;

    const handleOnSelectLoanProductModal = (value: string)=> {
        setSelectedLoanProductId(value)
    }
    const loadMore = () => {
        if (!isFetching && hasNextPage) {
            setPageNumber((prevPage) => prevPage + 1);
        }
    };


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent
                id="createLoanOfferDialogContent"
                className="max-w-[425px] md:max-w-[533px] [&>button]:hidden gap-8 py-5 pl-5 pr-2"
            >
                <DialogHeader id="createCohortDialogHeader">
                    <DialogTitle
                        className={`${cabinetGrotesk.className} text-[28px] font-medium text-labelBlue leading-[120%]`}
                    >
                        Create loan offer
                    </DialogTitle>
                    <DialogClose asChild>
                        <button
                            id="createCohortDialogCloseButton"
                            className="absolute right-5"
                            onClick={() => setIsOpen(false)}
                        >
                            <MdClose
                                id={"createCohortCloseIcon"}
                                className="h-6 w-6 text-neutral950"
                            />
                        </button>
                    </DialogClose>
                </DialogHeader>
                <form
                    id="createCohortForm"
                    className={`grid gap-5 ${inter.className} pr-2 overflow-y-auto overflow-x-hidden max-h-[calc(100vh-10rem)]`}
                    style={{ scrollbarGutter: "stable both-edge" }}
                    onSubmit={handleSubmit}
                >
                    <div className="grid gap-2">
                        <Label htmlFor="amountApproved">Amount approved</Label>
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
                                className="p-4 focus-visible:outline-0 w-full shadow-none focus-visible:ring-transparent rounded-md h-[3.20rem] font-normal leading-[21px] text-[14px] placeholder:text-grey150 text-black500 border border-solid border-neutral650"
                                thousandSeparator=","
                                decimalScale={2}
                                fixedDecimalScale={true}
                                onChange={(e)=> {
                                    const {value} = e.target
                                    setAmount(value)
                                }}

                            />
                        </div>
                    </div>
                    <CustomSelectId
                        placeholder={'Select loan product'}
                        selectContent={loanProducts}
                        value={selectedLoanProductId}
                        onChange={(value) => handleOnSelectLoanProductModal(value)}
                        isLoading={isLoading}
                        displayName={true}
                        triggerId={`financier-select-${selectedLoanProductId}`}
                        selectItemCss='text-[#6A6B6A]'
                        className="w-full"
                        emptyStateText={'No loan products available'}
                        infinityScroll={{
                            hasMore: hasNextPage,
                            loadMore: loadMore,
                            loader: isFetching
                        }}
                    />
                    {!isFormValid && (
                        <div className="text-red-500 text-sm">{errorMessage}</div>
                    )}
                    {isError && (
                        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        <div className="text-red-500 text-sm">{error?.data?.message}</div>
                    )}
                    <div className={'flex justify-end gap-2'}>
                        <DialogClose asChild>
                            <Button
                                id="CancelCohortButton"
                                variant={"outline"}
                                className={`text-meedlBlue font-bold border-solid border-meedlBlue w-full md:w-[8.75rem] h-[3.5625rem]`}
                            >
                                Back
                            </Button>
                        </DialogClose>
                        <Button
                            id="CreateCohortButton"
                            className={`text-meedlWhite gap-2 font-bold ${!isValid ? 'bg-neutral650' : 'bg-meedlBlue hover:bg-meedlBlue'} w-full md:w-[8.75rem] h-[3.5625rem]`}
                            type="submit"
                            disabled={!isValid}

                        >
                            {isLoanOfferCreating && <Loader2 className="animate-spin" />}
                            Create
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateLoanOffer;