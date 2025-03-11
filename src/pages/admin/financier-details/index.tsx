'use client'
import React from 'react';
import BackButton from "@/components/back-button";
import {useRouter} from "next/navigation";
import { inter, cabinetGroteskMediumBold} from "@/app/fonts";
import styles from "./index.module.css";
import TabSwitch from "@/reuseable/details/TabSwitch";
import {NumericFormat} from "react-number-format";

const FinancierDetails = () => {

    const router = useRouter();
    const navigateToViewAllFinancier = () => {
        router.push("/vehicle/financiers");
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
        {label: 'Financier type', value: <div className={` w-fit h-fit rounded-full px-2 bg-[#EEF5FF] text-[#142854] `}>corporate</div>},
        {label: 'phone number', value: '+2348095953713'},
        {label: 'Address', value: '300, Herbert Macaulay Way, Alagomeji, Sabo, Yaba'},
        {
            label: 'Company email address',
            value: 'admin@semicolon.africa'
        },
        {label: 'Organization admin name', value: 'Rebecca Kuroebi'},
        {label: 'Organization admin email address', value: 'rebecca@semicolon.africa'},

    ]

    const investmentDetails  = [
        {label: 'No. of investments', value: '20'},
        {label: 'Total amount invested', value: <NumericFormat
                id={'totalAmountInvested'}
                name={'totalAmountInvested'}
                type="text"
                disabled={true}
                thousandSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                prefix={'₦'}
                value={'1,000,000,000.00 '}
                className='bg-grey105 flex md:place-items-end'

            />},
        {label: 'Total income earned', value: <NumericFormat
                id={'totalAmountInvested'}
                name={'totalAmountInvested'}
                type="text"
                disabled={true}
                thousandSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                prefix={'₦'}
                value={'1,000,000,000.00 '}
                className='bg-grey105 flex md:place-items-end'

            />},
        {
            label: 'Portfolio value',
            value: <NumericFormat
                id={'totalAmountInvested'}
                name={'totalAmountInvested'}
                type="text"
                disabled={true}
                thousandSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                prefix={'₦'}
                value={'1,000,000,000.00 '}
                className='bg-grey105 flex md:place-items-end'

            />
        },

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
             className={` w-full md:w-full h-full md:h-fit  grid gap-2 md:grid md:gap-8 px-4 py-2  md:px-8 md:py-4`}
        >
            <BackButton handleClick={navigateToViewAllFinancier} iconRight={true} text={"Back to financiers"}
                        id={"backButtonToViewAllFinancier"} textColor={'#142854'}/>

            <div
                id={'financierDetailsPageContainer'}
                data-testid={'financierDetailsPageContainer'}
                className={` md:flex md:justify-between grid gap-4 md:h-full md:w-full   w-full h-full  `}
            >
                <div>

                            <div
                                className={` ${cabinetGroteskMediumBold.className} md:text-[28px] w-32 h-32 md:w-20 md:h-20 text-[#885A3C]  flex bg-[#FEF6F0] rounded-full justify-center items-center`}>
                                {initial}
                            </div>
                    <div
                        className={`grid gap-2 mt-4`}
                    >
                        <div id={'financierName'}
                             data-testid={'financierName'}
                             className={`${cabinetGroteskMediumBold.className} text-black text-xl md:text-[28px]  `}>
                            Rebecca Kuroebi
                        </div>
                        <span id={'financierEmail'}
                              data-testid={'financierEmail'}
                              className={`${inter.className} text-sm text-black400`}>
                            rebecca@semicolon.africa
                        </span>
                    </div>
                </div>
                <div
                    className={`  overflow-x-hidden overflow-y-auto md:w-[35rem]    w-full md:h-fit border border-gray500 rounded-md md:px-4 md:py-4 py-3 grid gap-3 md:grid `}
                >
                    <div
                        className={` ${styles.tabConnector} md:w-full pl-1  h-fit md:h-fit  flex md:flex `}

                    >
                        <TabSwitch componentId={'financierDetailsPageTabSwitch'} currentTab={currentTab}
                                   tabContent={tabContent} handleChange={handleTabChange}/>
                    </div>
                    <div className={`px `}>
                        <div className={`bg-grey105 ${styles.container} `}>
                            {getCurrentDataList().map((item, index) => (
                                <li key={"key" + index} className={'p-4  grid gap-4 rounded-md'}>
                                    <div
                                        className={'md:flex md:justify-between md:items-center md:gap-0 grid gap-3 '}>
                                        <div
                                            className={` ${inter.className}text-black300 md:text-black300 md:text-[14px] text-[14px] `}>{item.label}</div>
                                        <div
                                            className={` ${inter.className}  md:max-w-[40%] md:text-[14px] md:text-black500  md:break-all break-all text-black500 text-[14px] `}> {item.value ? item?.value : 'Not provided'} </div>
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