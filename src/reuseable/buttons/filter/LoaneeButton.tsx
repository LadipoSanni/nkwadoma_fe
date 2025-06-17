"use client"
import React from 'react';
import {AuthButtonPropsType} from "@/types/ButtonTypes";
import {Button} from "@/components/ui/button"
import Isloading from "@/reuseable/display/Isloading";
import * as Dialog from "@radix-ui/react-dialog";


const LoaneeButton = ({
                        id,
                        buttonText,
                        width,
                        handleClick,
                        textColor,
                        backgroundColor,
                        disable,
                        isLoading,
                        height
                    }: AuthButtonPropsType) => {
    return (
        <Dialog.Close asChild>
        <Button
           variant={"secondary"}
            data-testid="auth-button"
            disabled={disable}
            id={id}
            onClick={(event) => {
                handleClick(event)
            }}
            style={{
                height: `${height ? height : '3rem'}`,
                width: `${width}`,
                color: `${textColor}`,
                backgroundColor: `${disable ? "#D7D7D7" : backgroundColor}`
            }}
            className={`grid place-content-center rounded font-bold text-sm`}
        >
            {isLoading ? <Isloading/> : buttonText}

        </Button>
        </Dialog.Close>
    );
};

export default LoaneeButton;