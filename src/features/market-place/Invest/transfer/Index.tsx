import React,{ useState } from 'react'
import { Button } from "@/components/ui/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Label } from "@/components/ui/label";
import { inter } from "@/app/fonts";
import CurrencySelectInput from "@/reuseable/Input/CurrencySelectInput";
import Isloading from "@/reuseable/display/Isloading";
import { validateNumber } from "@/utils/Format";
import CustomInputField from "@/reuseable/Input/CustomNumberFormat";
import {useRouter } from 'next/navigation';


const initialFormValue = {
    amount: "",
};

function Transfer() {
    const [selectCurrency, setSelectCurrency] = useState("NGN");
    const router = useRouter();
    const isLoading = false

    const handlenext = () => {
        router.push('/marketplace/confirmTransfer');
    }

    const validationSchema = Yup.object().shape({
        amount: Yup.string().required("Amount is required"),
    });

    const handleSubmit = (values: typeof initialFormValue) => {
        console.log(values)
        handlenext()
    }

    return (
        <div className={`${inter.className} `}>
            <div className='xl:px-36 grid grid-cols-1 gap-y-6 w-3/5'>
                <div className='grid grid-cols-1 gap-y-1'>
                    <h1 className='text-[18px] font-normal'>Transfer funds</h1>
                    <p className='text-[14px] font-normal'>Add the investment amount and the investment terms and conditions</p>
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
                          })=> (
                            <Form className={`${inter.className}`}>
                                <div>
                                    <div className="grid grid-cols-1 gap-y-4 md:max-h-[48vh] md:relative overflow-y-auto "
                                         style={{
                                             overflowY: "auto",
                                             marginRight: "-10px",
                                             paddingRight: "10px",
                                         }}
                                    >
                                        <div>
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
                                    </div>
                                    <div className= "md:flex justify-end mt-6  md:mb-0">
                                        <Button
                                            id='submitAmount'
                                            variant={"default"}
                                            className={` w-full lg:w-36 h-[48px] ${
                                                !isValid
                                                    ? "bg-neutral650 cursor-auto hover:bg-neutral650 "
                                                    : "hover:bg-meedlBlue bg-meedlBlue cursor-pointer"
                                            }`}
                                            type="submit"
                                            disabled={!isValid}
                                        >
                                            {
                                                isLoading ? <Isloading /> : "Continue"}
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default Transfer
