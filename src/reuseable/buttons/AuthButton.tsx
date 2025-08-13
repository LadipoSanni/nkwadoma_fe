"use client"
import React from 'react';
import {AuthButtonPropsType} from "@/types/ButtonTypes";
import {Button} from "@/components/ui/button"
import Isloading from "@/reuseable/display/Isloading";
import { inter, cabinetGrotesk} from "@/app/fonts";

const AuthButton = ({
                        id,
                        buttonText,
                        width,
                        handleClick,
                        textColor,
                        backgroundColor,
                        disable,
                        isLoading,
                        height,
                        useCabinetGrotesk,
                        showBorder,
                        borderColor,
                    }: AuthButtonPropsType) => {
    return (
            <Button
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
                    backgroundColor: `${disable ? "#D0D0D0" : backgroundColor}`,
                    borderColor: `${showBorder ? `${borderColor} ` : ``}`
                }}
                className={`${useCabinetGrotesk ? cabinetGrotesk.className : inter.className} ${showBorder ? `border border-[${borderColor}]` : ``} grid place-content-center rounded font-bold text-sm`}>
                {isLoading ? <Isloading/> : buttonText}

            </Button>
    );
};

export default AuthButton;