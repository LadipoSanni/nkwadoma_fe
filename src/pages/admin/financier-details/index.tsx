'use client'
import React from 'react';
import BackButton from "@/components/back-button";
import {useRouter} from "next/navigation";
import {Card} from "@/components/ui/card";
import Image from "next/image";
import {cabinetGroteskRegular, inter, cabinetGroteskMediumBold, cabinetGroteskBold} from "@/app/fonts";
import styles from "@/pages/admin/loan-request-details/index.module.css";
import TabSwitch from "@/reuseable/details/TabSwitch";
import {Breakdown} from "@/reuseable/details/breakdown";

const FinancierDetails = () => {

    const router = useRouter();
    const navigateToViewAllFinancier = () => {
        router.push("/funds/financiers");
    }
    // const initial = getInitials(`${details?.data.firstName} ${details?.data.lastName}`);
    const initial = 'RK';
    const [currentTab, setCurrentTab] = React.useState(0);

    const tabContent = [
        'Basic details',
        'Investment details'
    ]
    const handleTabChange = (index: number) => {
        setCurrentTab(index)
    }

    const basicDetails = [
        {label: 'Financier type', value: <div className={` w-fit h-fit bg-[#EEF5FF] text-[#142854] `}>corporate</div>},
        {label: 'Alternate phone number', value: ''},
        {label: 'Alternate residential address', value: ''},
        {
            label: 'Next of kin name',
            value: ''
        },
        {label: 'Next of kin email address', value: ''},
        {label: 'Next of kin phone number', value: ''},
        {label: 'Next of kin relationship', value:''},
    ]

    const investmentDetails  = [
        {label: 'Investment details', value: ''},
        {label: 'Financier type', value: <div className={` w-fit h-fit bg-[#EEF5FF] text-[#142854] `}>corporate</div>},
        {label: 'Alternate phone number', value: ''},
        {label: 'Alternate residential address', value: ''},
        {
            label: 'Next of kin name',
            value: ''
        },
        {label: 'Next of kin email address', value: ''},
        {label: 'Next of kin phone number', value: ''},
        {label: 'Next of kin relationship', value:''},
    ]

    const getCurrentDataList = () => {
        switch (currentTab) {
            case 0:
                return basicDetails;
            case 1:
                return investmentDetails;
            default:
                return [];
        }
    };


    return (
        <div id={'financierDetailsPage'}
             data-testid={'financierDetailsPage'}
             className={` w-full md:w-full h-full md:h-full md:grid m px-4 py-2  md:px-8 md:py-4`}
        >
            <BackButton handleClick={navigateToViewAllFinancier} iconRight={true} text={"Back to financiers"}
                        id={"backButtonToViewAllFinancier"} textColor={'#142854'}/>
            <div
                id={'financierDetailsPageContainer'}
                data-testid={'financierDetailsPageContainer'}
                className={` md:flex md:justify-between md:h-full md:w-full bg-purple-600 md:bg-purple-600  w-full h-full  `}
            >
                <div>
                    <Card id={"financierDetailsDetails"} data-testid={"financierDetailsDetails"}
                        // className={`h-[8rem] w-[8rem] md:w-[8rem] md:h-[8rem]`}
                          className="rounded-lg md:max-w-md "
                    >
                            <div
                                className={` ${cabinetGroteskMediumBold.className} md:text-[28px] w-32 h-32 md:w-20 md:h-20 text-[#885A3C]  flex bg-[#FEF6F0] rounded-full justify-center items-center`}>
                                {initial}
                            </div>
                    </Card>
                    <div
                        className={`grid gap-2 mt-4`}
                    >
                        <div id={'financierName'}
                             data-testid={'financierName'}
                             className={`${cabinetGroteskMediumBold.className} text-black text-xl md:text-[28px]  `}>
                            Rebecca Kuroebi
                        </div>
                        <span id={'email'}
                              data-testid={'email'}
                              className={`${inter.className} text-sm text-black400`}>
                            rebecca@semicolon.africa
                        </span>
                    </div>
                </div>
                <div
                    className={`  overflow-x-hidden overflow-y-auto md:w-[35rem] mt-4   w-full md:h-fit border border-gray500 rounded-md md:px-4 md:py-4 py-3 grid gap-3 md:grid `}
                >
                    <div
                        className={` ${styles.tabConnector} md:w-full pl-1  h-fit md:h-fit  flex md:flex `}

                    >
                        <TabSwitch componentId={'financierDetailsPageTabSwitch'} currentTab={currentTab}
                                   tabContent={tabContent} handleChange={handleTabChange}/>
                    </div>
                    <div className={`px `}>
                        <div className={`bg-grey105  `}>
                            {getCurrentDataList().map((item, index) => (
                                <li key={"key" + index} className={'p-5  grid gap-9 rounded-md'}>
                                    <div
                                        className={'md:flex md:justify-between md:items-center md:gap-0 grid gap-3 '}>
                                        <div
                                            className={'text-black300 text-[14px] leading-[150%] font-normal'}>{item.label}</div>
                                        <div
                                            className={'text-black500 text-[14px] leading-[150%] font-normal'}> {item.value ? item?.value : 'Not provided'}</div>
                                    </div>
                                </li>
                            ))
                            }

                        </div>
                    </div>
                </div>

            </div>


        </div>
    );
};

export default FinancierDetails;