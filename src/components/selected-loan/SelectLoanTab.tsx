"use client"
import React from 'react';
import {store, useAppSelector} from "@/redux/store";
import styles from "./SelectedLoan.module.css"
import {setCurrentTab} from "@/redux/slice/loan/selected-loan";
import {useRouter} from "next/navigation"

interface menuItemsProps {
    name: string,
    index: number,
}

const SelectLoanTab = () => {
    const router = useRouter()
    const currentTab = useAppSelector(state => state.selectedLoan.currentTab)

    const tabContent = [
        {name: "Loan referrals", id: "loanReferrals", route: 'loan-referral'},
        {name: "Loan requests", id: "loanRequests", route: "loan-request"},
        {name: 'Loan offers', id: 'loanOffers', route: "loan-offer"},
        {name: 'Loan disbursal', id: "loanDisbursal", route: 'loan-disbursal'},
        {name: 'Loan book', id: "loanBook", route: "loan-book"},

    ]


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        // setCurrentTabs(newValue)
        store.dispatch(setCurrentTab(tabContent[newValue].name))
        router.push(`/loan/${tabContent[newValue].route}`)

    }

    function  MenuItem(props: menuItemsProps) {
        const {name, index} = props
        return (
            <button
                id="loanStatusBox"
                data-testid="loanStatusBox"
                style={{textTransform: 'none', color: 'black'}}
                className={` py-1 flex px-2 place-self-center mr-auto ml-auto text-sm ${currentTab === name ? `  rounded-md border px-2 border-[#e5e8ec] ${styles.selectedLoan}` : `text-black300`}`}
                onClick={(event) => {
                    handleChange(event, index)
                }}
            >
                <div
                    data-testid={name}
                    id={"loanStatusText"}
                    className={`flex gap-1 text-nowrap whitespace-nowrap text-sm w-object-fit md:w-auto md:text-sm`}
                >{name}</div>

            </button>
        )
    }

    return (
        <div
            id="selectLoanTabContainer"
            data-testid="selectLoanContainer"
            className={` ${styles.tab} flex bg-[#fafbfc]  w-auto ml-1 mt-1 md:w-fit h-fit md:h-fit md:rounded-md rounded-md `}
        >
            {tabContent?.map((item, index) => (
                <div
                    key={item?.name}
                    id={item.id}
                    className={`flex place-self-center w-auto  md:h-auto md:px-2 md:w-auto `}
                >
                    <MenuItem name={item.name} index={index}/>
                </div>
            ))}
        </div>
    );
};

export default SelectLoanTab;