"use client"
import React from 'react';
import {Tabs, Tab} from "@mui/material";
import {store, useAppSelector} from "@/redux/store";
import styles from "./SelectedLoan.module.css"
import {setCurrentTab} from "@/redux/slice/SelectedLoan";
import {useRouter} from "next/navigation"

interface type{
    name: string,
    index: number,
}

const SelectLoanTab = () => {
    const currentTabItem = useAppSelector(state => state.selectedLoan.currentTab)
    const [currentTab, setCurrentTabs] = React.useState(0)
    const router = useRouter()

    const tabContent = [
        {name: "loan referrals", id: "loanReferrals", route: 'loanReferral'},
        {name: "loan requests", id:"loanRequests", route:"loanRequest"},
        {name: 'loan offers', id: 'loanOffers', route :"loanOffer" },
        {name: 'loan disbursal', id:"loanDisbursal", route: 'loanDisbursal'},
        {name: 'loan books', id: "loanBooks", route: "loanBook"}
    ]


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTabs(newValue)
        store.dispatch(setCurrentTab(tabContent[newValue].name))
        router.push(`/loan/${tabContent[newValue].route}` )

    }

    function MenuItem (props: type) {
        const {name, index} = props
        return (
            <div
                id="loanStatusBox"
                data-testid="loanStatusBox"
                style={{textTransform: 'none', color: 'black'}}
                className={`${currentTab === index ? `${styles.selectedLoan}` : `` }`}
                onClick={(event)=> {handleChange(event, index)}}
            >
                <span
                    data-testid={name}
                    id={"loanStatusText"}
                    style={{textTransform: 'none', color: 'black'}}
                    className={`${styles.loanText}`}
                >{name}</span>

            </div>
        )
    }

    return (
        <div
            id="selectLoanTabContainer"
            data-testid="selectLoanContainer"
            className={`flex bg-[#fafbfc] w-[70%] ml-1 mt-1 md:w-[50%] h-[6vh] md:h-[8vh] md:rounded rounded- `}
        >

            <Tabs
                value={0}
                data-testid="selectLoanTabs"
                style={{display: 'flex',placeContent: 'center', textAlign: 'center',
                    height: '99%', width: '99%', gap: '1rem' }}
                id="selectLoanTabs"
                TabIndicatorProps={{ hidden: true }}
            >
                <div className={`h-[99%] w-[99%] overflow-x-scroll md:overflow-hidden`}>
                    {tabContent?.map((item, index) => (
                        <Tab
                            id={item.id}
                            key={index}
                            label={<MenuItem name={item.name} index={index}/>}
                            value={index}
                        />
                    ))}
                </div>
            </Tabs>
        </div>
    );
};

export default SelectLoanTab;