"use client"
import React from 'react';
import {Tabs, Tab} from "@mui/material";
import {store} from "@/redux/store";
import styles from "./SelectedLoan.module.css"
import {setCurrentTab} from "@/redux/slice/SelectedLoan";
import {useRouter} from "next/navigation"

interface type {
    name: string,
    index: number,
}

const SelectLoanTab = () => {
    const [currentTab, setCurrentTabs] = React.useState(0)
    const router = useRouter()

    const tabContent = [
        {name: "loan referrals", id: "loanReferrals", route: 'loanReferral'},
        {name: "loan requests", id: "loanRequests", route: "loanRequest"},
        {name: 'loan offers', id: 'loanOffers', route: "loanOffer"},
        {name: 'loan disbursal', id: "loanDisbursal", route: 'loanDisbursal'},
        {name: 'loan books', id: "loanBooks", route: "loanBook"},
        {name: 'loan books', id: "loanBooks", route: "loanBook"},

    ]


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTabs(newValue)
        store.dispatch(setCurrentTab(tabContent[newValue].name))
        router.push(`/loan/${tabContent[newValue].route}`)

    }

    function MenuItem(props: type) {
        const {name, index} = props
        return (
            <div
                id="loanStatusBox"
                data-testid="loanStatusBox"
                style={{textTransform: 'none', color: 'black'}}
                className={`py-1  flex place-self-center mr-auto ml-auto text-sm ${currentTab === index ? ` shadow ring-grey-100 ${styles.selectedLoan}` : ``}`}
                onClick={(event) => {
                    handleChange(event, index)
                }}
            >
                <div
                    data-testid={name}
                    id={"loanStatusText"}
                    style={{textTransform: 'none', color: 'black'}}
                    className={`flex text-sm`}
                >{name}</div>

            </div>
        )
    }

    return (
        <div
            id="selectLoanTabContainer"
            data-testid="selectLoanContainer"
            className={`flex bg-[#fafbfc] overflow-x-auto md:overflow-hidden  w-[98%] ml-1 mt-1 md:w-[55%] h-[9vh] md:h-[8vh] md:rounded rounded `}
        >
            {tabContent?.map((item, index) => (
                // eslint-disable-next-line react/jsx-key
                <div
                    id={item.id}
                    className={`flex place-self-center w-auto bg-pink-200 md:h-auto md:px-2 md:w-auto ml-1 mr-1`}
                >
                    <MenuItem name={item.name} index={index}/>
                </div>
            ))}
        </div>
    );
};

export default SelectLoanTab;