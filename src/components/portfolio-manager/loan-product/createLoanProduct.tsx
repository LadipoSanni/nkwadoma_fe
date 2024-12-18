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

    const handleFormDataChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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

    const sponsors = [
        "Zenith",
        "Apple",
        "FCMB",
        "Access",
        "Google"
    ];
    const funds = [
        "Equity Fund",
        "Debt Fund",
        "Hybrid Fund",
        "Index Fund",
        "International Fund",
        "Sector Fund",
    ];
    const durations = [
        "2 months",
        "4 months",
        "6 month",
        "8 month",
        "10 month",
        "1 year"
    ];
    const bankPartner = [
        "2 months",
        "4 months",
        "6 month",
        "8 month",
        "10 month",
        "1 year"
    ];

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
                        <div className={`grid md:grid-cols-2 grid-col gap-5`}>
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
                                />
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
                            </div>

                            <div>
                                <Label htmlFor="costOfFunds"
                                       className={`${inter.className} text-sm font-medium text-labelBlue`}>Cost of funds
                                    (%)</Label>
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
                            </div>

                            <div className={`flex gap-3 w-full`}>
                                <div>
                                    <Label htmlFor="productName"
                                           className={`${inter.className} text-sm font-medium text-labelBlue`}>Tenor</Label>
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
                                </div>
                                <div className={`pt-3`}>
                                    <CustomSelect
                                        triggerId='FundProduct'
                                        id="FundProduct"
                                        selectContent={durations}
                                        // name="FundProduct"
                                        value={formData.tenorDuration}
                                        onChange={(value: string) => setFormData({...formData, tenorDuration: value})}
                                        placeHolder='Select duration'
                                    />
                                </div>
                            </div>

                            <div>
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
                                </div>
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="loanProductMandate"
                                   className={`${inter.className} text-sm font-medium text-labelBlue`}>Loan product
                                mandate</Label>
                            <Textarea
                                name="loanProductMandate"
                                placeholder="Enter mandate"
                                className="h-5 placeholder:text-grey150 resize-none focus-visible:outline-0 ring-transparent focus-visible:ring-transparent"
                                value={formData.loanProductMandate}
                                onChange={handleFormDataChange}
                            />
                        </div>

                        <div>
                            <Label htmlFor="loanProductTermsAndCondition"
                                   className={`${inter.className} text-sm font-medium text-labelBlue`}>Loan terms and
                                conditions</Label>
                            <Textarea
                                name="loanProductTermsAndCondition"
                                placeholder="Enter terms and conditions"
                                className="h-5 placeholder:text-grey150 resize-none focus-visible:outline-0 ring-transparent focus-visible:ring-transparent"
                                value={formData.loanProductTermsAndCondition}
                                onChange={handleFormDataChange}
                            />
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
                            className={`bg-meedlBlue text-meedlWhite h-12 w-32`}
                            variant={"secondary"}
                            onClick={handleContinueButton}
                        >
                            Continue
                        </Button>
                    </div>


                </div>
            )}

            {step === 2 && (
                <div id={`step2Div`}>
                    <div>
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


                        <Label htmlFor="loanProductMandate"
                               className={`${inter.className} text-sm font-medium text-labelBlue`}>
                            Loan product mandate
                        </Label>
                        <Textarea
                            name="loanProductMandate"
                            placeholder="Enter mandate"
                            className="h-5 placeholder:text-grey150"
                            value={formData.loanProductMandate}
                            onChange={handleFormDataChange}
                        />
                    </div>


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


// import React, {useState} from "react";
// import {Label} from "@/components/ui/label";
// import {Input} from "@/components/ui/input";
// import {Button} from "@/components/ui/button";
// import CurrencySelectInput from "@/reuseable/Input/CurrencySelectInput";
// import {Textarea} from "@/components/ui/textarea";
// import {inter} from '@/app/fonts';
// import CustomSelect from "@/reuseable/Input/Custom-select";
//
//
// interface CreateLoanProductProps {
//     setIsOpen?: (b: boolean) => void
// }
//
// export const CreateLoanProduct = ({setIsOpen}: CreateLoanProductProps) => {
//
//     const handleModalClose = () => {
//         if (setIsOpen) {
//             setIsOpen(false);
//         }
//     };
//     const [step, setStep] = useState(1);
//     const [selectCurrency, setSelectCurrency] = useState('NGN');
//     const [formData, setFormData] = useState({
//         productName: '',
//         productSponsor: '',
//         FundProduct: '',
//         costOfFunds: '',
//         tenor: '',
//         loanProductSize: '',
//         minimumRepaymentAmount: '',
//         moratorium: '',
//         interest: '',
//         obligorLimit: '',
//         loanProductMandate: '',
//         loanProductTermsAndCondition: '',
//         bankPartner: '',
//         loanInsuranceProvider: '',
//         loanDisbursementTerms: '',
//     });
//     const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         const {name, value} = e.target;
//         setFormData({...formData, [name]: value});
//         console.log(formData)
//     };
//
//
//     // const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     //     const {name, value} = e.target;
//     //     setFormData({...formData, [name]: value});
//     //     console.log(formData)
//     // };
//
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//     };
//
//     const handleContinueButton = () => {
//         setStep(2);
//     };
//
//     const sponsors = [
//         "Zenith",
//         "Apple",
//         "Amazon",
//         "Access",
//         "Google"
//     ];
//     const funds = [
//         "Equity Fund",
//         "Debt Fund",
//         "Hybrid Fund",
//         "Index Fund",
//         "International Fund",
//         "Sector Fund",
//     ];
//     const durations = [
//         "2 months",
//         "4 months",
//         "6 month",
//         "8 month",
//         "10 month",
//         "1 year"
//     ]
//
//
//     return (
//         <form id={`formDiv`} onSubmit={handleSubmit}>
//             <div id={`nameDiv`}>
//                 <div>
//                     <Label htmlFor="productName" className={`${inter.className} text-sm font-medium text-labelBlue`}>Loan
//                         product name</Label>
//                     <Input
//                         id="productName"
//                         data-testid="productName"
//                         name="productName"
//                         type="text"
//                         value={formData.productName}
//                         onChange={handleFormDataChange}
//                         className="w-full p-3 h-14 placeholder:text-grey150 focus:outline-none focus:ring-0 focus-visible:ring-0"
//                         placeholder="Enter name"
//                     />
//                     <div className={`grid md:grid-cols-2 grid-col gap-5`}>
//                         <div>
//                             <Label htmlFor="productSponsor"
//                                    className={`${inter.className} text-sm font-medium text-labelBlue`}>Loan product
//                                 sponsor</Label>
//                             <CustomSelect
//                                 triggerId='productSponsor'
//                                 id="productSponsor"
//                                 selectContent={sponsors}
//                                 name="productSponsor"
//                                 value={formData.productSponsor}
//                                 onChange={handleFormDataChange}
//                                 placeHolder='Select sponsor'
//                             />
//                         </div>
//
//                         <div>
//                             <Label htmlFor="FundProduct"
//                                    className={`${inter.className} text-sm font-medium text-labelBlue`}>Fund
//                                 product</Label>
//                             <CustomSelect
//                                 triggerId="FundProduct"
//                                 id="FundProduct"
//                                 selectContent={funds}
//                                 value={formData.FundProduct}
//                                 onChange={handleFormDataChange}
//                                 name="FundProduct"
//                                 placeHolder="Select fund"
//                             />
//
//                             {/*<CustomSelect*/}
//                             {/*    triggerId='FundProduct'*/}
//                             {/*    id="FundProduct"*/}
//                             {/*    selectContent={funds}*/}
//                             {/*    value={formData.FundProduct}*/}
//                             {/*    onChange={handleFormDataChange}*/}
//                             {/*    name="FundProduct"*/}
//                             {/*    placeHolder='Select fund'*/}
//                             {/*/>*/}
//                         </div>
//
//                         <div>
//                             <Label htmlFor="costOfFunds"
//                                    className={`${inter.className} text-sm font-medium text-labelBlue`}>Cost of funds
//                                 (%)</Label>
//                             <Input
//                                 id="costOfFunds"
//                                 data-testid="costOfFunds"
//                                 name="costOfFunds"
//                                 type="number"
//                                 value={formData.costOfFunds}
//                                 onChange={handleFormDataChange}
//                                 className="w-full p-3 h-14 placeholder:text-grey150 focus:outline-none focus:ring-0 focus-visible:ring-0"
//                                 placeholder="0"
//                             />
//                         </div>
//
//                         <div className={`flex gap-3 w-full`}>
//                             <div>
//                                 <Label htmlFor="productName"
//                                        className={`${inter.className} text-sm font-medium text-labelBlue`}>Tenor</Label>
//                                 <Input
//                                     id="tenor"
//                                     data-testid="tenor"
//                                     name="tenor"
//                                     type="number"
//                                     value={formData.tenor}
//                                     onChange={handleFormDataChange}
//                                     className="full p-3 h-14 placeholder:text-grey150 focus:outline-none focus:ring-0 focus-visible:ring-0"
//                                     placeholder="0"
//                                 />
//                             </div>
//                             <div className={`pt-3`}>
//                                 <CustomSelect
//                                     triggerId='FundProduct'
//                                     id="FundProduct"
//                                     selectContent={durations}
//                                     value={formData.FundProduct}
//                                     onChange={handleFormDataChange}
//                                     name="FundProduct"
//                                     placeHolder='Select duration'
//                                 />
//                             </div>
//                         </div>
//
//                         <div>
//                             <Label htmlFor="Loan product size"
//                                    className={`${inter.className} text-sm font-medium text-labelBlue`}>Loan product
//                                 size</Label>
//                             <div className={`flex gap-3 w-full`}>
//                                 <div>
//                                     <CurrencySelectInput readOnly={false} selectedcurrency={selectCurrency}
//                                                          setSelectedCurrency={setSelectCurrency}/>
//                                 </div>
//                                 <div className={`pt-2`}>
//                                     <Input
//                                         id="loanProductSize"
//                                         data-testid="loanProductSize"
//                                         name="loanProductSize"
//                                         type="number"
//                                         value={formData.loanProductSize}
//                                         onChange={handleFormDataChange}
//                                         className="full p-3 h-14 placeholder:text-grey150 mb-5 focus:outline-none focus:ring-0 focus-visible:ring-0"
//                                         placeholder="0"
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                         <div>
//                             <Label htmlFor="minimum repayment amount"
//                                    className={`${inter.className} text-sm font-medium text-labelBlue`}>Minimum repayment
//                                 amount</Label>
//                             <div className={`flex gap-3 w-full`}>
//                                 <div>
//                                     <CurrencySelectInput readOnly={false} className={`placeholder:text-grey150`}
//                                                          selectedcurrency={selectCurrency}
//                                                          setSelectedCurrency={setSelectCurrency}/>
//                                 </div>
//                                 <div className={`pt-2`}>
//                                     <Input
//                                         id="minimumRepaymentAmount"
//                                         data-testid="minimumRepaymentAmount"
//                                         name="minimumRepaymentAmount"
//                                         type="number"
//                                         value={formData.minimumRepaymentAmount}
//                                         onChange={handleFormDataChange}
//                                         className="full p-3 h-14 placeholder:text-grey150 mb-5 focus:outline-none focus:ring-0 focus-visible:ring-0"
//                                         placeholder="0"
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                         <div>
//                             <Label htmlFor="moratorium"
//                                    className={`${inter.className} text-sm font-medium text-labelBlue`}>Moratorium
//                                 (month)</Label>
//                             <Input
//                                 id="moratorium"
//                                 data-testid="moratorium"
//                                 name="moratorium"
//                                 type="number"
//                                 value={formData.moratorium}
//                                 onChange={handleFormDataChange}
//                                 className="w-full p-3 h-14 placeholder:text-grey150 focus:outline-none focus:ring-0 focus-visible:ring-0"
//                                 placeholder="Enter name"
//                             />
//                         </div>
//
//                         <div className={`flex gap-3 w-full`}>
//                             <div>
//                                 <Label htmlFor="Interest"
//                                        className={`${inter.className} text-sm font-medium text-labelBlue`}>Interest
//                                     (%)</Label>
//                                 <Input
//                                     id="interest"
//                                     data-testid="interest"
//                                     name="interest"
//                                     type="number"
//                                     value={formData.interest}
//                                     onChange={handleFormDataChange}
//                                     className="full p-3 h-14 placeholder:text-grey150 focus:outline-none focus:ring-0 focus-visible:ring-0"
//                                     placeholder="0"
//                                 />
//                             </div>
//                             <div>
//                                 <Label htmlFor="Obligor limit"
//                                        className={`${inter.className} text-sm font-medium text-labelBlue`}>Obligor limit
//                                     (%)</Label>
//                                 <Input
//                                     id="obligorLimit"
//                                     data-testid="obligorLimit"
//                                     name="obligorLimit"
//                                     type="number"
//                                     value={formData.obligorLimit}
//                                     onChange={handleFormDataChange}
//                                     className="full p-3 h-14 placeholder:text-grey150 focus:outline-none focus:ring-0 focus-visible:ring-0"
//                                     placeholder="0"
//                                 />
//                             </div>
//                         </div>
//                     </div>
//
//                     <div>
//                         <Label htmlFor="loanProductMandate"
//                                className={`${inter.className} text-sm font-medium text-labelBlue`}>Loan product
//                             mandate</Label>
//                         <Textarea
//                             name="loanProductMandate"
//                             placeholder="Enter mandate"
//                             className="h-5 placeholder:text-grey150"
//                             value={formData.loanProductMandate}
//                             onChange={handleFormDataChange}
//                         />
//                         {/*<Textarea placeholder="Enter mandate" className={`h-5 placeholder:text-grey150`} value={formData.loanProductMandate} onChange={handleFormDataChange}/>*/}
//                     </div>
//
//                     <div>
//                         <Label htmlFor="loanProductTermsAndCondition"
//                                className={`${inter.className} text-sm font-medium text-labelBlue`}>Loan terms and
//                             conditions</Label>
//                         <Textarea
//                             name="loanProductTermsAndCondition"
//                             placeholder="Enter terms and conditions"
//                             className="h-5 placeholder:text-grey150"
//                             value={formData.loanProductTermsAndCondition}
//                             onChange={handleFormDataChange}
//                         />
//                     </div>
//                 </div>
//
//
//             </div>
//             <div className={`flex justify-end py-5 gap-3`}>
//                 <Button className={`text-meedlBlue border border-meedlBlue h-12 w-32`} variant={"outline"} onClick={handleModalClose}>
//                     Cancel
//                 </Button>
//                 <Button className={`bg-meedlBlue text-meedlWhite h-12 w-32`} variant={"secondary"} onClick={handleContinueButton}>
//                     Continue
//                 </Button>
//
//             </div>
//
//         </form>
//
//     )
// }