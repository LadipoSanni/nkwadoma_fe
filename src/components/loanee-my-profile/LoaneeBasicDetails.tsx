import React from 'react';
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs";
import {inter, inter500} from "@/app/fonts";
import styles from "@/components/loanee-my-profile/index.module.css";
import Image from "next/image";

const LoaneeBasicDetails = () => {

    const basicDetails = [
        {label: 'Gender', value: ''},
        {label: 'Date of birth', value: ''},
        {label: 'Marital status', value: ''},
        {label: 'Nationality', value: ''},
        {label: 'State of origin ', value: ''},
        {label: 'State of residence', value: ''},
        {label: 'Residential address', value: ''},
        {label: 'Phone number', value: ''},
        {label: 'Alternate residential address', value: ''},
        {label: 'Alternate email address', value: ''},
        {label: 'Alternate email address', value: ''},
        {label: 'Next of kin full name', value: ''},
        {label: 'Next of kin phone number', value: ''},
        {label: 'Next of kin residential address', value: ''},
        {label: 'Next of kin relationship ', value: ''},
        {label: 'Highest level of education ', value: ''},
        {label: 'Institution name ', value: ''},
        {label: 'Program of study ', value: ''},

    ]


    return (
        <div
            id={'loaneeBasicDetails'}
            data-testid={'loaneeBasicDetails'}
            className={`md:max-h-fit hidden  md:w-[45%] pb-6 pt-6 md:flex lg:flex sm:hidden    sm:w-full w-full  `}
        >
            <Tabs defaultValue={'bioDetails'} className={` px-4 w-full  `}>
                <TabsList className="grid w-fit px-0 pb-2  grid-cols-2">
                    <TabsTrigger id={'bioDetails'} className={`w-fit ${inter.className} text-[14px] text-[#6A6B6A] data-[state=active]:text-[#212221] data-[state=active]:border data-[state=active]:border-grey-200 data-[state=active]:${inter500.className} `} value="bioDetails">Bio details</TabsTrigger>
                    <TabsTrigger id={'document'} className={`w-fit ${inter.className} text-[14px] text-[#6A6B6A] data-[state=active]:text-[#212221] data-[state=active]:border data-[state=active]:border-grey-200 data-[state=active]:${inter500.className} `} value="documents">Document</TabsTrigger>
                </TabsList>
                <div
                    className={` md:max-h-[65vh] w-full  ${styles.container}`}
                >
                    <TabsContent value={'bioDetails'} className={` md:w-full pt-3 w-full   `}>
                        <div className={` bg-grey105  w-full rounded-md  `}>
                            {basicDetails?.map((item, index) => (
                                <li key={"key" + index} className={'p-4  grid gap-9 rounded-md'}>
                                    <div
                                        className={'md:flex md:justify-between md:items-center md:gap-0 grid gap-3 '}>
                                        <div
                                            id={'name:'+item.label}
                                            className={`  ${inter.className} break-all md:max-w-[40%] text-black300 text-[14px] `}>{item.label}</div>
                                        <div
                                            id={'name:'+item.value}
                                            className={` ${inter.className} break-all md:max-w-[50%]   text-black500 text-[14px] `}> {item.value ? item.value : 'Not provided'}</div>
                                    </div>
                                </li>
                            ))
                            }
                        </div>

                    </TabsContent>
                    <TabsContent value={'documents'} className={` grid md:flex pt-3 gap-5  md:flex-col-2  `}>
                        <div className={` h-fit  w-full rounded-md px-3 pt-5 pb-3  bg-[#F6F6F6] `}>
                            <div className={` h-[8rem] bg-white  w-full rounded-md `}>

                            </div>

                            <div className={`flex py-4 gap-2 `}>
                                <Image
                                    src={'/MyMandateLogo.png'}
                                    alt="circle"
                                    width={20}
                                    height={29}
                                    data-testid="circle-image"
                                    loading="lazy"
                                />
                                <span className={` ${inter.className} text-[#212221] text-[14px] `}>mymandate25.pdf</span>
                            </div>
                        </div>
                        <div className={` h-fit  w-full rounded-md px-3 pt-5 pb-3   bg-[#F6F6F6] `}>
                            <div className={` h-[8rem] bg-white  w-full rounded-md `}>

                            </div>
                            <div className={`flex py-4  gap-2 `}>
                                <Image
                                    src={'/MyMandateLogo.png'}
                                    alt="circle"
                                    width={20}
                                    height={29}
                                    // className="object-right-bottom flex  "
                                    data-testid="circle-image"
                                    loading="lazy"
                                />
                                <span className={` ${inter.className} text-[#212221] text-[14px] `}>mymandate25.pdf</span>
                            </div>
                        </div>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
};

export default LoaneeBasicDetails;