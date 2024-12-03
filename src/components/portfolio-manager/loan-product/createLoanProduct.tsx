import React from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

// interface Props {
//     setIsOpen?: (e: boolean | undefined) => void;
// }


export const CreateLoanProduct = () => {
    return (
        <form >
            <div>
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
        </form>

    )
}