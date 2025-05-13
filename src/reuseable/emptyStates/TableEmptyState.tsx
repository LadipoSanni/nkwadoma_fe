"use client"
import React, { ElementType } from 'react'
import {cabinetGroteskRegular} from "@/app/fonts";

type Props = {
    name?:string,
    icon?: ElementType | React.ReactNode,
    className?:string ,
    optionalFilterName?:string,
    condition?: boolean,
    isSearch?: boolean,
    notification?: boolean
    message?: string
    descriptionId?: string

}

function TableEmptyState({name, icon: Icon, className, optionalFilterName, condition, isSearch, notification, message, descriptionId}: Props) {
    // const lowercaseName = name?.charAt(0).toLowerCase()
    // const remainingPart = name?.slice(1);
    // const title = `${lowercaseName}${remainingPart}`;

    return (
        <div className={`flex justify-center items-center min-h-[60vh] w-full ${className}`}>
            <div className="grid gap-1 justify-items-center text-center">
                <div className="flex justify-center text-center">
                    {Icon && (
                        <div
                            id="emptyStateIconId"
                            data-testid="icon-container"
                            className="bg-lightBlue500 w-24 h-24 flex justify-center items-center rounded-full mb-5"
                        >
                            {typeof Icon === 'function' ? (
                                <Icon style={{ fontSize: '2.5rem', color: '#142854' }} />
                            ) : (
                                Icon
                            )}
                        </div>
                    )}

                </div>
                {isSearch ? (
                    <div className="flex gap-1 justify-center text-center">
                        {name}
                        <p>not found</p>
                    </div>
                ) : (
                    <div>
                        <span id={ descriptionId ? descriptionId :`loanEmptyStateTitle`} data-testid={descriptionId ? descriptionId :'loanEmptyStateTitle'} className={` ${cabinetGroteskRegular.className} mr-auto ml-auto  text-black500 `}>{""}</span>
                        <h1 id="titleId" className="font-normal mb-2">
                            <span className="normal-case">{name ? name.charAt(0).toUpperCase() + name.slice(1) + 's' : ''}</span>{' '}
                            will show here
                        </h1>
                        {!notification ? (<p id="bodyMessageId" className="text-foundationBlue800 md:w-96 w-72 text-[14px] normal-case">There are
                                no {optionalFilterName} {name}s available yet.{' '}{!condition ? (
                                    <span> To create a  <span className="lowercase">{name}</span>, click on the{' '}<span
                                        className="font-semibold lowercase"> create {name} </span> </span>) : ( '')}</p>)
                              : ( <p className="text-foundationBlue800 text-[14px]">{
                                  notification ? <span className='pr-3 md:pr-0'>{message}</span> : ''
                              }
                              </p>)}
                    </div>
                )}
            </div>
        </div>
    );
}

export default TableEmptyState;