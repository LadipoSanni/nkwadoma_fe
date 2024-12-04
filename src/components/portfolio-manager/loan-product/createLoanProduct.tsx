import React from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";


interface CreateLoanProductProps {
    setIsOpen?: (b: boolean) => void
}

export const CreateLoanProduct = ({setIsOpen}: CreateLoanProductProps) => {

    const handleModalClose = () => {
        if (setIsOpen) {
            setIsOpen(false);
        }
    };
    return (
        <form id={`formDiv`}>
            <div id={`nameDiv`}>
                <Label htmlFor="productName">Loan product name</Label>
                <Input
                    id="productName"
                    data-testid="productName"
                    name="productName"
                    type="text"
                    className="w-full p-3 h-14 focus:outline-none focus:ring-0 focus-visible:ring-0"
                    placeholder="Enter name"
                />
            </div>
            <Button onClick={handleModalClose}>
                Cancel
            </Button>
        </form>

    )
}