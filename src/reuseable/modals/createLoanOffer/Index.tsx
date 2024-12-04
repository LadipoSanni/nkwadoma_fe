import React from 'react';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cabinetGrotesk, inter } from "@/app/fonts";
import { MdClose } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface CreateLoanOfferProps {
    onSubmit: (data: { amountApproved: string, loanProduct: string }) => void;
}

const CreateLoanOffer: React.FC<CreateLoanOfferProps> = ({ onSubmit }) => {
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const data = {
            amountApproved: formData.get('amountApproved') as string,
            loanProduct: formData.get('loanProduct') as string,
        };
        onSubmit(data);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    id="createCohortButton"
                    size={"lg"}
                    className={`${inter.className} h-12 shadow-none bg-meedlBlue hover:bg-meedlBlue cursor-pointer text-meedlWhite md:mt-0 mt-3 text-sm font-semibold leading-5`}
                >
                    Create loan offer
                </Button>
            </DialogTrigger>
            <DialogContent
                id="createLoanOfferDialogContent"
                className="max-w-[425px] md:max-w-[533px] [&>button]:hidden gap-8 py-5 pl-5 pr-2"
            >
                <DialogHeader id="createCohortDialogHeader">
                    <DialogTitle
                        className={`${cabinetGrotesk.className} text-[28px] font-medium text-labelBlue leading-[120%]`}
                    >
                        Create cohort
                    </DialogTitle>
                    <DialogClose asChild>
                        <button
                            id="createCohortDialogCloseButton"
                            className="absolute right-5"
                            onClick={() => {}}
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
                        <Input
                            type="number"
                            id="amountApproved"
                            name="amountApproved"
                            placeholder="Enter amount"
                            className="p-4 focus-visible:outline-0 w-full shadow-none focus-visible:ring-transparent rounded-md h-[3.10rem] font-normal leading-[21px] text-[14px] placeholder:text-grey150 text-black500 border border-solid border-neutral650"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="loanProduct">Loan product</Label>
                        <Select name="loanProduct">
                            <SelectTrigger id="loanProductSelectTrigger" className="mt-0 mb-0 min-w-[78px]">
                                <SelectValue placeholder="Select product" />
                            </SelectTrigger>
                            <SelectContent id="loanProductSelectContent">
                                <SelectItem value="Product1">Product1</SelectItem>
                                <SelectItem value="Product2">Product2</SelectItem>
                                <SelectItem value="Product3">Product3</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit" className="mt-4">Create</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateLoanOffer;