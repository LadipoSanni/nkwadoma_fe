"use client"
import React from 'react';
import {AuthButtonPropsType} from "@/types/ButtonTypes";
import {Button} from "@/components/ui/button"
import Isloading from "@/reuseable/display/Isloading";
import { inter } from '../textArea/FormikCustomQuillField';


const UpdateDraftButton = ({
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
                    backgroundColor: `${disable ? "#D0D0D0" : backgroundColor}`
                }}
                className={`${inter.className} grid place-content-center rounded-md font-bold text-sm`}
            >
                {isLoading ? <Isloading/> : buttonText}

            </Button>
    );
};

export default UpdateDraftButton;