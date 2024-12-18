import React, {useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import CurrencySelectInput from "@/reuseable/Input/CurrencySelectInput";
import {Textarea} from "@/components/ui/textarea";
import {inter} from '@/app/fonts';
import CustomSelect from "@/reuseable/Input/Custom-select";
import {toast} from "@/hooks/use-toast";

interface CreateLoanProductProps {
    setIsOpen?: (b: boolean) => void;
}

export const CreateLoanProduct = ({setIsOpen}: CreateLoanProductProps) => {
    const handleModalClose = () => {
        if (setIsOpen) {
            setIsOpen(false);
        }
    };
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState({
        productName: '',
        productSponsor: '',
        FundProduct: '',
        costOfFunds: '',
        tenor: '',
        tenorDuration: '',
        loanProductSize: '',
        minimumRepaymentAmount: '',
        moratorium: '',
        interest: '',
        obligorLimit: '',
        loanProductMandate: '',
        loanProductTermsAndCondition: '',
    });

    const [selectCurrency, setSelectCurrency] = useState('NGN');
    const [formData, setFormData] = useState({
        productName: '',
        productSponsor: '',
        FundProduct: '',
        costOfFunds: '',
        tenor: '',
        tenorDuration: '',
        loanProductSize: '',
        minimumRepaymentAmount: '',
        moratorium: '',
        interest: '',
        obligorLimit: '',
        loanProductMandate: '',
        loanProductTermsAndCondition: '',
        bankPartner: '',
        loanInsuranceProvider: '',
        loanDisbursementTerms: '',
    });

    const isStep1FieldsFilled = () => {
        const requiredFields = [formData.productName, formData.productSponsor, formData.FundProduct, formData.costOfFunds,
            formData.tenor, formData.tenorDuration, formData.loanProductSize, formData.minimumRepaymentAmount, formData.moratorium,
            formData.interest, formData.obligorLimit, formData.loanProductMandate, formData.loanProductTermsAndCondition,
        ];
        return requiredFields.every((field) => field && (typeof field === 'string' ? field.trim() !== '' : true));
    };

    const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
        validateFields();
    };
    const validateFields = () => {
        const newErrors = {...errors};

        if (formData.productName.length < 1) {
            newErrors.productName = 'Loan product name is required';
        } else {
            newErrors.productName = '';
        }

        if (formData.moratorium === '') {
            newErrors.moratorium = 'Moratorium cannot be empty';
        } else if (isNaN(Number(formData.moratorium))) {
            newErrors.moratorium = 'Moratorium must be a valid number';
        } else if (Number(formData.moratorium) < 0) {
            newErrors.moratorium = 'Moratorium cannot be negative';
        } else if (Number(formData.moratorium) === 0) {
            newErrors.moratorium = 'Moratorium must be greater than 0';
        } else if (Number(formData.moratorium) > 12) {
            newErrors.moratorium = 'Moratorium cannot be greater than 12';
        } else {
            newErrors.moratorium = '';
        }


        if (formData.costOfFunds === '') {
            newErrors.costOfFunds = 'Cost of funds is required';
        } else if (isNaN(Number(formData.costOfFunds))) {
            newErrors.costOfFunds = 'Cost of funds must be a valid number';
        } else if (Number(formData.costOfFunds[0]) < 0) {
            newErrors.costOfFunds = 'Cost of funds cannot be negative';
        } else if (Number(formData.costOfFunds[0]) === 0) {
            newErrors.costOfFunds = 'Cost of funds must be greater than 0';
        } else {
            newErrors.costOfFunds = '';
        }

        if (formData.tenor === '') {
            newErrors.tenor = 'Tenor is required';
        } else if (isNaN(Number(formData.tenor))) {
            newErrors.tenor = 'Tenor must be a valid number';
        } else if (Number(formData.tenor[0]) < 0) {
            newErrors.tenor = 'Tenor cannot be negative';
        } else if (Number(formData.tenor[0]) === 0) {
            newErrors.tenor = 'Tenor must be greater than 0';
        } else {
            newErrors.tenor = '';
        }

        if (formData.loanProductSize === '') {
            newErrors.loanProductSize = 'Loan product size is required';
        } else if (isNaN(Number(formData.loanProductSize))) {
            newErrors.loanProductSize = 'Loan product size must be a valid number';
        } else if (Number(formData.loanProductSize[0]) < 0) {
            newErrors.loanProductSize = 'Loan product size cannot be negative';
        } else if (Number(formData.loanProductSize[0]) === 0) {
            newErrors.loanProductSize = 'Loan product size must be greater than 0';
        } else {
            newErrors.loanProductSize = '';
        }

        if (formData.interest === '') {
            newErrors.interest = 'Interest product size is required';
        } else if (isNaN(Number(formData.interest[0]))) {
            newErrors.interest = 'Interest product size must be a valid number';
        } else if (Number(formData.interest[0]) < 0) {
            newErrors.interest = 'Interest product size cannot be negative';
        } else if (Number(formData.interest[0]) === 0) {
            newErrors.interest = 'Interest product size must be greater than 0';
        } else {
            newErrors.interest = '';
        }

        if (formData.obligorLimit === '') {
            newErrors.obligorLimit = 'Obligor limit size is required';
        } else if (isNaN(Number(formData.obligorLimit))) {
            newErrors.obligorLimit = 'Obligor limit size must be a valid number';
        } else if (Number(formData.obligorLimit[0]) < 0) {
            newErrors.obligorLimit = 'Obligor limit size cannot be negative';
        } else if (Number(formData.obligorLimit[0]) === 0) {
            newErrors.obligorLimit = 'Obligor limit size must be greater than 0';
        } else {
            newErrors.obligorLimit = '';
        }

        if (formData.minimumRepaymentAmount === '') {
            newErrors.minimumRepaymentAmount = 'Minimum repayment is required';
        } else if (isNaN(Number(formData.minimumRepaymentAmount))) {
            newErrors.minimumRepaymentAmount = 'Minimum repayment amount must be a valid number';
        } else if (Number(formData.minimumRepaymentAmount[0]) < 0) {
            newErrors.minimumRepaymentAmount = 'Minimum repayment amount cannot be negative';
        } else if (Number(formData.minimumRepaymentAmount[0]) === 0) {
            newErrors.minimumRepaymentAmount = 'Minimum repayment amount must be greater than 0';
        } else {
            newErrors.minimumRepaymentAmount = '';
        }


        if (formData.loanProductMandate === '') {
            newErrors.loanProductMandate = "Loan product mandate is required";
        } else if (formData.loanProductTermsAndCondition[0] === ' ') {
            newErrors.loanProductTermsAndCondition = 'Description should not start with a space';
        } else if (formData.loanProductMandate.length > 2500) {
            newErrors.loanProductMandate = 'Loan product mandate can not exceed 2500';
        } else {
            newErrors.loanProductMandate = '';
        }


        if (formData.loanProductTermsAndCondition === '' || formData.loanProductTermsAndCondition.length < 1) {
            newErrors.loanProductTermsAndCondition = "Terms and condition must be set";
        } else if (formData.loanProductTermsAndCondition[0] === ' ') {
            newErrors.loanProductTermsAndCondition = 'Description should not start with a space';
        } else if (formData.loanProductTermsAndCondition.length > 2500) {
            newErrors.loanProductTermsAndCondition = 'Maximum amount of characters cannot exceed 2,500';
        } else {
            newErrors.loanProductTermsAndCondition = '';
        }

        setErrors(newErrors);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        validateFields();
        if (Object.values(errors).some(error => error !== '')) {
            return;
        }
        console.log(formData);
        if (!navigator.onLine) {
            toast({
                description: "No internet connection",
                status: "error",
            });
            return;
        }
    };

    const handleBack = () => {
        setStep(1);
    }

    const handleContinueButton = () => {
        setStep(2);
    };

    const sponsors = ["Zenith", "Apple"];
    const funds = ["Equity Fund", "Debt Fund",];
    const durations = ["Day", "Month", "Year",];
    const bankPartner = ["2 months", "4 months",];

    type InsuranceType = 'creditLife' | 'health' | 'accommodation' | 'device';

    const insuranceOptions: { label: string; value: InsuranceType }[] = [
        {label: 'Credit life insurance provider', value: 'creditLife'},
        {label: 'Health insurance provider', value: 'health'},
        {label: 'Accommodation provider', value: 'accommodation'},
        {label: 'Device provider', value: 'device'},
    ];

    // const providerOptions: Record<InsuranceType, { value: string; label: string }[]> = {
    //     creditLife: [
    //         {value: 'creditLifeProvider1', label: 'Credit Life Provider 1'},
    //         {value: 'creditLifeProvider2', label: 'Credit Life Provider 2'},
    //     ],
    //     health: [
    //         {value: 'healthProvider1', label: 'Health Provider 1'},
    //         {value: 'healthProvider2', label: 'Health Provider 2'},
    //     ],
    //     accommodation: [
    //         {value: 'accommodationProvider1', label: 'Accommodation Provider 1'},
    //         {value: 'accommodationProvider2', label: 'Accommodation Provider 2'},
    //     ],
    //     device: [
    //         {value: 'deviceProvider1', label: 'Device Provider 1'},
    //         {value: 'deviceProvider2', label: 'Device Provider 2'},
    //     ],
    // };

    return (
        <form id={`formDiv`} onSubmit={handleSubmit}>
            {step === 1 && (
                <div id={`nameDiv`}>
                    <div>
                        <Label htmlFor="productName"
                               className={`${inter.className} text-sm font-medium text-labelBlue`}>Loan
                            product name</Label>
                        <Input
                            id="productName"
                            data-testid="productName"
                            name="productName"
                            type="text"
                            value={formData.productName}
                            onChange={handleFormDataChange}
                            className="w-full p-3 h-14 placeholder:text-grey150 focus:outline-none focus:ring-0 focus-visible:ring-0"
                            placeholder="Enter name"
                        />
                        {errors.productName && (
                            <p className="text-red-500 text-sm mt-2">{errors.productName}</p>
                        )}
                        <div className={`grid md:grid-cols-2 grid-col gap-5 pt-5`}>
                            <div>
                                <Label htmlFor="productSponsor"
                                       className={`${inter.className} text-sm font-medium text-labelBlue`}>Loan product
                                    sponsor</Label>
                                <CustomSelect
                                    triggerId="productSponsor"
                                    id="productSponsor"
                                    selectContent={sponsors}
                                    value={formData.productSponsor}
                                    onChange={(value: string) => setFormData({...formData, productSponsor: value})}
                                    placeHolder="Select sponsor"
                                    className={`placeholder:text-grey150`}
                                />
                                {errors.productSponsor && (
                                    <p className="text-red-500 text-sm mt-2">{errors.productSponsor}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="FundProduct"
                                       className={`${inter.className} text-sm font-medium text-labelBlue`}>Fund
                                    product</Label>
                                <CustomSelect
                                    triggerId="FundProduct"
                                    id="FundProduct"
                                    selectContent={funds}
                                    // name="FundProduct"
                                    value={formData.FundProduct}
                                    onChange={(value: string) => setFormData({...formData, FundProduct: value})}
                                    placeHolder="Select fund"
                                />
                                {errors.FundProduct && (
                                    <p className="text-red-500 text-sm mt-2">{errors.FundProduct}</p>
                                )}
                            </div>


                            <div className={`pt-3`}>
                                <Label htmlFor="costOfFunds"
                                       className={`${inter.className} text-sm font-medium text-labelBlue`}>Cost of funds
                                    (%)</Label>
                                <div>
                                    <Input
                                        id="costOfFunds"
                                        data-testid="costOfFunds"
                                        name="costOfFunds"
                                        type="number"
                                        value={formData.costOfFunds}
                                        onChange={handleFormDataChange}
                                        className="w-full p-3 h-14 placeholder:text-grey150 no-arrows focus:outline-none focus:ring-0 focus-visible:ring-0"
                                        placeholder="0"
                                    />
                                    {errors.costOfFunds && (
                                        <p className="text-red-500 text-sm mt-2">{errors.costOfFunds}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="productName"
                                       className={`${inter.className} text-sm font-medium text-labelBlue`}>Tenor</Label>
                                <div className={`flex gap-3`}>
                                    <div className={`w-28 pt-3`}>
                                        <Input
                                            id="tenor"
                                            data-testid="tenor"
                                            name="tenor"
                                            type="number"
                                            value={formData.tenor}
                                            onChange={handleFormDataChange}
                                            className="full p-3 h-14 placeholder:text-grey150 focus:outline-none focus:ring-0 focus-visible:ring-0"
                                            placeholder="0"
                                        />
                                        {errors.tenor && (
                                            <p className="text-red-500 text-sm mt-2">{errors.tenor}</p>
                                        )}
                                    </div>
                                    <div className={`w-full`}>
                                        <CustomSelect
                                            triggerId='FundProduct'
                                            id="FundProduct"
                                            selectContent={durations}
                                            value={formData.tenorDuration}
                                            onChange={(value: string) => setFormData({
                                                ...formData,
                                                tenorDuration: value
                                            })}
                                            placeHolder='Select duration'
                                        />
                                        {errors.tenorDuration && (
                                            <p className="text-red-500 text-sm mt-2">{errors.tenorDuration}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className={`p[b-5`}>
                                <Label htmlFor="Loan product size"
                                       className={`${inter.className} text-sm font-medium text-labelBlue`}>Loan product
                                    size</Label>
                                <div className={`flex gap-3 w-full`}>
                                    <div>
                                        <CurrencySelectInput readOnly={false} selectedcurrency={selectCurrency}
                                                             setSelectedCurrency={setSelectCurrency}/>
                                    </div>
                                    <div className={`pt-2`}>
                                        <Input
                                            id="loanProductSize"
                                            data-testid="loanProductSize"
                                            name="loanProductSize"
                                            type="number"
                                            value={formData.loanProductSize}
                                            onChange={handleFormDataChange}
                                            className="full p-3 h-14 placeholder:text-grey150 mb-5 focus:outline-none focus:ring-0 focus-visible:ring-0"
                                            placeholder="0"
                                        />
                                        {errors.loanProductSize && (
                                            <p className="text-red-500 text-sm mt-2">{errors.loanProductSize}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="minimum repayment amount"
                                       className={`${inter.className} text-sm font-medium text-labelBlue`}>Minimum
                                    repayment
                                    amount</Label>
                                <div className={`flex gap-3 w-full`}>
                                    <div>
                                        <CurrencySelectInput readOnly={false} className={`placeholder:text-grey150`}
                                                             selectedcurrency={selectCurrency}
                                                             setSelectedCurrency={setSelectCurrency}/>
                                    </div>
                                    <div className={`pt-2`}>
                                        <Input
                                            id="minimumRepaymentAmount"
                                            data-testid="minimumRepaymentAmount"
                                            name="minimumRepaymentAmount"
                                            type="number"
                                            value={formData.minimumRepaymentAmount}
                                            onChange={handleFormDataChange}
                                            className="full p-3 h-14 placeholder:text-grey150 mb-5 focus:outline-none focus:ring-0 focus-visible:ring-0"
                                            placeholder="0"
                                        />
                                        {errors.minimumRepaymentAmount && (
                                            <p className="text-red-500 text-sm mt-2">{errors.minimumRepaymentAmount}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="moratorium"
                                       className={`${inter.className} text-sm font-medium text-labelBlue`}>Moratorium
                                    (month)</Label>
                                <Input
                                    id="moratorium"
                                    data-testid="moratorium"
                                    name="moratorium"
                                    type="number"
                                    value={formData.moratorium}
                                    onChange={handleFormDataChange}
                                    className="w-full p-3 h-14 placeholder:text-grey150 focus:outline-none focus:ring-0 focus-visible:ring-0"
                                    placeholder="Enter name"
                                />
                                {errors.moratorium && (
                                    <p className="text-red-500 text-sm mt-2">{errors.moratorium}</p>
                                )}
                            </div>

                            <div className={`flex gap-3 w-full`}>
                                <div>
                                    <Label htmlFor="Interest"
                                           className={`${inter.className} text-sm font-medium text-labelBlue`}>Interest
                                        (%)</Label>
                                    <Input
                                        id="interest"
                                        data-testid="interest"
                                        name="interest"
                                        type="number"
                                        value={formData.interest}
                                        onChange={handleFormDataChange}
                                        className="full p-3 h-14 placeholder:text-grey150 focus:outline-none focus:ring-0 focus-visible:ring-0"
                                        placeholder="0"
                                    />
                                    {errors.interest && (
                                        <p className="text-red-500 text-sm mt-2">{errors.interest}</p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="Obligor limit"
                                           className={`${inter.className} text-sm font-medium text-labelBlue`}>Obligor
                                        limit
                                        (%)</Label>
                                    <Input
                                        id="obligorLimit"
                                        data-testid="obligorLimit"
                                        name="obligorLimit"
                                        type="number"
                                        value={formData.obligorLimit}
                                        onChange={handleFormDataChange}
                                        className="full p-3 h-14 placeholder:text-grey150 focus:outline-none focus:ring-0 focus-visible:ring-0"
                                        placeholder="0"
                                    />
                                    {errors.obligorLimit && (
                                        <p className="text-red-500 text-sm mt-2">{errors.obligorLimit}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className={`pt-5`}>
                            <div>
                                <Label htmlFor="loanProductMandate"
                                       className={`${inter.className} text-sm font-medium text-labelBlue`}>Loan product
                                    mandate</Label>
                                <Textarea
                                    name="loanProductMandate"
                                    placeholder="Enter mandate"
                                    className="md:h-32 h-9 placeholder:text-grey150 resize-none focus-visible:outline-0 ring-transparent focus-visible:ring-transparent"
                                    value={formData.loanProductMandate}
                                    onChange={handleFormDataChange}
                                />
                                {errors.loanProductMandate && (
                                    <p className="text-red-500 text-sm mt-2">{errors.loanProductMandate}</p>
                                )}
                            </div>

                            <div className={`pt-5`}>
                                <Label htmlFor="loanProductTermsAndCondition"
                                       className={`${inter.className} text-sm font-medium text-labelBlue`}>Loan terms
                                    and
                                    conditions</Label>
                                <Textarea
                                    name="loanProductTermsAndCondition"
                                    placeholder="Enter terms and conditions"
                                    className="md:h-32 h-5 placeholder:text-grey150 resize-none focus-visible:outline-0 ring-transparent focus-visible:ring-transparent"
                                    value={formData.loanProductTermsAndCondition}
                                    onChange={handleFormDataChange}
                                />
                            </div>
                            {errors.loanProductTermsAndCondition && (
                                <p className="text-red-500 text-sm mt-2">{errors.loanProductTermsAndCondition}</p>
                            )}
                        </div>
                    </div>
                    <div className={`flex justify-end py-5 gap-3`}>
                        <Button
                            className={`text-meedlBlue border border-meedlBlue h-12 w-32`}
                            variant={"outline"}
                            onClick={handleModalClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            className={`h-12 w-32 ${
                                isStep1FieldsFilled()
                                    ? 'bg-meedlBlue text-meedlWhite cursor-pointer'
                                    : 'bg-neutral650 text-meedlWhite cursor-not-allowed'
                            }`}
                            variant="secondary"
                            onClick={handleContinueButton}
                            disabled={!isStep1FieldsFilled()}
                        >
                            Continue
                        </Button>
                    </div>


                </div>
            )}

            {step === 2 && (
                <div id={`step2Div`}>
                    {/*<div>*/}
                    <div>
                        <Label className={`${inter.className} text-sm font-medium text-labelBlue`}>Bank partner
                            (optional)</Label>
                        <CustomSelect
                            triggerId='bankPartner'
                            id="bankPartner"
                            name="bankPartner"
                            selectContent={bankPartner}
                            value={formData.bankPartner}
                            onChange={(value: string) => setFormData({...formData, bankPartner: value})}
                            placeHolder='Select partner'
                        />
                    </div>

                    <div>
                        <Label htmlFor={"loanInsuranceProvider"}>Select loan insurance provider (optional)</Label>
                        {
                            insuranceOptions.map((option) => (
                                <div key={option.value}
                                     className={' w-full pl-8 py-3 border-[#D0D5DD] border rounded mt-2 '}>
                                    <div className='flex '>
                                        <Input
                                            type="checkbox"
                                            name="loanInsuranceProvider"
                                            value={option.value}
                                            className="w-4 mr-4 accent-meedlBlue"
                                        />
                                        <Label className={'mt-2 ml-4'}>{option.label}</Label>
                                    </div>
                                    {
                                        formData.loanInsuranceProvider?.includes(option.value) && (
                                            <>
                                                <div>
                                                    <CustomSelect
                                                        triggerId='bankPartner'
                                                        id="bankPartner"
                                                        name="bankPartner"
                                                        // selectContent={providerOptions[option.value]}
                                                        value={formData.loanInsuranceProvider}
                                                        onChange={(value: string) => setFormData({
                                                            ...formData,
                                                            loanInsuranceProvider: value
                                                        })}
                                                        // placeholder={`Select ${option.label.toLowerCase()}`}
                                                        className=' bg-white w-full h-10 border rounded  mt-4 md:w-[92%] ml-1'
                                                    />
                                                </div>
                                            </>
                                        )
                                    }
                                </div>
                            ))
                        }
                    </div>

                    <div className={`pt-5`}>

                        <Label htmlFor="loanDisbursementTerms"
                               className={`${inter.className} text-sm font-medium text-labelBlue`}>
                            Loan disbursement terms (optional)
                        </Label>
                        <Textarea
                            name="loanDisbursementTerms"
                            placeholder="Enter disbursement terms"
                            className="md:h-32 h-5 placeholder:text-grey150 resize-none focus-visible:outline-0 ring-transparent focus-visible:ring-transparent"
                            value={formData.loanDisbursementTerms}
                            onChange={handleFormDataChange}
                        />
                    </div>
                    {/*</div>*/
                    }


                    <div className={`flex justify-end py-5 gap-3`}>
                        <Button
                            className={`text-meedlBlue border border-meedlBlue h-12 w-32`}
                            variant={"outline"}
                            onClick={handleBack}
                        >
                            Back
                        </Button>
                        <Button
                            className={`bg-meedlBlue text-meedlWhite h-12 w-32`}
                            variant={"secondary"}
                            type={"submit"}
                        >
                            Create
                        </Button>
                    </div>
                </div>

            )}

        </form>
    );
};
