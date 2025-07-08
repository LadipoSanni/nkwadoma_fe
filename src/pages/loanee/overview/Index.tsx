import React from 'react';
import BalanceCard from '@/reuseable/cards/BalanceCard/Index';
import {inter, inter500} from '@/app/fonts';
import TableEmptyState from "@/reuseable/emptyStates/TableEmptyState";
import {Icon} from "@iconify/react";
import {MdOutlineErrorOutline} from "react-icons/md";
import {RootState, store} from "@/redux/store";
import {setCurrentNavbarItem} from "@/redux/slice/layout/adminLayout";
import {setCurrentStep} from "@/service/users/loanRerralSlice";
import {useRouter} from "next/navigation";
import {useSelector} from "react-redux";

const loaneeCardData = [
    {
        title: "Wallet balance", amount: "₦0.00", linkText: "Go to wallet"
    },
    {
        title: "Loan balance", amount: "₦0.00", linkText: "Go to repayment"
    }
];

const LoaneeOverview = () => {
    const router = useRouter()
    const {  isLoaneeIdentityVerified } = useSelector((state: RootState) => state.loanReferral);

    const handleBannerClick = () => {
        store.dispatch(setCurrentNavbarItem("Onboarding"))
        store.dispatch(setCurrentStep(1))
        router.push("/onboarding")
    }
    return (
        <main id={'OverviewTr'}
              className={` ${inter.className} h-full w-full bg-learnSpaceWhite rounded-[8px] md:px-6`}>
            {isLoaneeIdentityVerified && <button
                onClick={() => {
                    handleBannerClick()
                }}
                className={`${inter500.className} h-16 w-full mt-[20px] mb-[20px] md:p- py-4 px-3 flex gap-2 bg-warning150 border-[0.5px] border-[#F7C164] rounded-[6px]`}>
                <MdOutlineErrorOutline className={'h-[22px] w-[22px] mt-auto mb-auto text-warning650'}/>
                <p className={` ${inter500.className} cursor-pointer mt-auto mb-auto text-warning650  text-[14px] md:text-[14px]`}>
                    Identity verification is not successful,try again.
                </p>
            </button>}
            <BalanceCard cardData={loaneeCardData} />
            <TableEmptyState
                name={'Repayment'}
                icon={
                    <Icon
                    icon="iconoir:hand-cash"
                    height="2.5rem"
                    width="2.5rem"
                    />
                }
                condition={true}
            />
        </main>
    );
};

export default LoaneeOverview;