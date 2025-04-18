"use client";
import React,{ useState } from 'react'
import { Button } from "@/components/ui/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Label } from "@/components/ui/label";
import { inter } from "@/app/fonts";
import CurrencySelectInput from "@/reuseable/Input/CurrencySelectInput";
import Isloading from "@/reuseable/display/Isloading";
import {formatAmount, validateNumber} from "@/utils/Format";
import CustomInputField from "@/reuseable/Input/CustomNumberFormat";
import { MdInfoOutline } from 'react-icons/md';
import {useConfirmInvestMutation} from "@/service/financier/marketplace";
import ToastPopUp from "@/reuseable/notification/ToastPopUp";
import DeleteModal from "@/reuseable/modals/Delete-modal";
import {Cross2Icon} from "@radix-ui/react-icons";
import ConfirmTransferDialogue from "@/reuseable/modals/ConfirmTransferDualogue";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";


interface ApiError {
    status: number;
    data: {
        message: string;
    };
}

const initialFormValue = {
    amount: "",
    minimumAmount: ""
};

function Transfer() {
    const {
        marketInvestmentVehicleId,
        minimumInvestmentAmount
    } = useSelector((state: RootState) => state.marketPlace.savedMarketplaceData) || {};
    const [selectCurrency, setSelectCurrency] = useState("NGN");
    const [isChecked, setIsChecked] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
    const [error, setError] = useState('');
    const [amountForModal, setAmountForModal] = useState<string | number>("");
    // const router = useRouter();

    const [create, {isLoading}] = useConfirmInvestMutation();

    // const HandleNext = () => {
    //     router.push('/marketplace/confirmTransfer');
    // }
    const invest = Number(minimumInvestmentAmount)

    const validationSchema = Yup.object().shape({
        amount: Yup.number()
            .required("Amount is required")
            .typeError("Amount must be a number")
            .min(
                invest,
                `Amount cannot be less than ${formatAmount(invest)}`
            )
            .test(
                'is-greater-than-min',
                `Amount cannot be less than ${formatAmount(invest)}`,
                (value) => value === undefined || value >= invest
            ),
    });

    const networkPopUp = ToastPopUp({
        description: "No internet connection",
        status: "error",
    });

    const handleSubmit = async (values: typeof initialFormValue) => {
        if (!navigator.onLine) {
            networkPopUp.showToast();
        }
        // HandleNext()
        const formData = {
            amountToInvest: Number(values.amount),
            investmentVehicleId: marketInvestmentVehicleId
        };
        try {
            const confirm = await create(formData).unwrap();
            if (confirm) {
                setAmountForModal(values.amount);
                setIsConfirmOpen(true);
            }
        } catch (err) {
            const error = err as ApiError;
            setError(error ? error?.data?.message : "Error occurred");
        }
    }

    return (
        <div className={`${inter.className} `}>
            <div className='xl:px-36 grid grid-cols-1 gap-5 md:w-3/4 w-full'>
                <div className='grid grid-cols-1 gap-y-1'>
                    <h1 className='text-[18px] font-normal'>Transfer funds</h1>
                    <p className='text-[14px] font-normal text-[#4D4E4D]'>Add the investment amount and the investment terms <br/> and
                        conditions</p>
                </div>
                <div>
                    <Formik
                        initialValues={initialFormValue}
                        onSubmit={handleSubmit}
                        validateOnMount={true}
                        validationSchema={validationSchema}
                    >
                        {({
                              errors,
                              isValid,
                              touched,
                              setFieldValue,
                          }) => (
                            <Form className={`${inter.className}`}>
                                <div>
                                    <div
                                        className="grid grid-cols-1 md:max-h-[48vh] md:relative overflow-y-auto "
                                        style={{
                                            overflowY: "auto",
                                            marginRight: "-10px",
                                            paddingRight: "10px",
                                        }}
                                    >
                                        <div className={`w-full`}>
                                            <Label htmlFor="size">Amount</Label>
                                            <div className="flex gap-2 items-center justify-center">
                                                <CurrencySelectInput
                                                    selectedcurrency={selectCurrency}
                                                    setSelectedCurrency={setSelectCurrency}
                                                />
                                                <Field
                                                    id="size"
                                                    name="amount"
                                                    type="text"
                                                    component={CustomInputField}
                                                    onChange={validateNumber("amount", setFieldValue)}
                                                    placeholder="0.00"
                                                />
                                            </div>
                                            <div className="relative bottom-3">
                                                {errors.amount && touched.amount && (
                                                    <ErrorMessage
                                                        name="amount"
                                                        component="div"
                                                        className="text-red-500 text-sm"
                                                    />
                                                )}
                                            </div>
                                        </div>

                                        <div className={`gap-5 flex flex-col `}>
                                            <div className={`flex justify-start gap-3 flex-row bg-[#FEF6E8] items-center py-4 w-full rounded-lg h-9 px-4`}>
                                                <div className={``}>
                                                    <MdInfoOutline className={`text-[#66440A]`}/>
                                                </div>
                                                <div className={`text-[#66440A] text-sm font-normal`}>Minimum amount to invest is {formatAmount(minimumInvestmentAmount)}</div>
                                            </div>

                                            <div className={`bg-[#F9F9F9] w-full rounded-sm p-5 flex md:flex-row gap-4`}>
                                                <div className={``}>
                                                    <input
                                                        type="checkbox"
                                                        id={`agreeToTermsAndCondition`}
                                                        data-testid="agreeToTermsAndCondition"
                                                        className={`border-2 border-[#D7D7D7] accent-meedlBlue rounded-md`}
                                                        checked={isChecked}
                                                        onChange={(e) => setIsChecked(e.target.checked)}
                                                    />
                                                </div>

                                                <div>
                                                    <p className={`${inter.className} text-sm font-normal text-meedlBlack `}>I
                                                        have read, understood and I agree to the <span
                                                            className="underline text-meedlBlue font-semibold cursor-pointer"> Terms and <br/> conditions</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {error && (
                                        <div className="text-red-500 text-sm mt-2 text-center">
                                            {error}
                                        </div>
                                    )}

                                    <div className="md:flex md:justify-end mt-6 w-full md:mb-0">
                                        <Button
                                            id='submitAmount'
                                            variant={"default"}
                                            className={` w-full md:w-32 py-3 px-5 font h-11 ${
                                                !isValid || !isChecked
                                                    ? "bg-neutral650 cursor-auto hover:bg-neutral650 "
                                                    : "hover:bg-meedlBlue bg-meedlBlue cursor-pointer"
                                            }`}
                                            type="submit"
                                            disabled={!isValid || !isChecked}
                                        >
                                            {
                                                isLoading ? <Isloading/> : "Confirm "}
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <DeleteModal
                isOpen={isConfirmOpen}
                closeOnOverlayClick={true}
                closeModal={() => setIsConfirmOpen(false)}
                icon={Cross2Icon}
                width='auto'
            >
                <ConfirmTransferDialogue
                    headerTitle='complete'
                    amount={formatAmount(amountForModal)}
                />
            </DeleteModal>
        </div>
    )
}

export default Transfer
