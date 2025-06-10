import React from 'react';
import { inter500, inter} from "@/app/fonts";
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs";

import styles from "@/components/loanee-my-profile/index.module.css";
import Image from "next/image";
import {LoaneeDetails} from "@/types/loanee";
import {getItemSessionStorage} from "@/utils/storage";
import Document from "@/components/loanee-my-profile/Document";
interface props{
    data?: LoaneeDetails
}


const LoaneeBasicDetails = ({data}: props) => {

    console.log(data)
    const userRole  = getItemSessionStorage("user_role")
        const basicData = data?.userIdentity

        const basicDetails = [
            {label: 'Gender', value: `${basicData?.gender ? basicData?.gender : 'Not provided'}`},
            {label: 'Date of birth', value: `${basicData?.dateOfBirth ? basicData?.dateOfBirth : 'Not provided'}`},
            {label: 'Marital status', value: `${basicData?.maritalStatus ? basicData?.maritalStatus : 'Not provided'}`},
            {label: 'Nationality', value: `${basicData?.nationality ? basicData?.nationality : 'Not provided'}`},
            {label: 'State of origin ', value: `${basicData?.stateOfOrigin ? basicData?.stateOfOrigin : 'Not provided'}`},
            {label: 'State of residence', value: `${basicData?.stateOfResidence ? basicData?.stateOfResidence : 'Not provided'}`},
            {label: 'Residential address', value: `${basicData?.residentialAddress ? basicData?.residentialAddress : 'Not provided'}`},
            {label: 'Phone number', value: `${basicData?.phoneNumber ? basicData?.phoneNumber : 'Not provided'}`},
            {label: 'Alternate residential address', value: `${basicData?.residentialAddress ? basicData?.residentialAddress : 'Not provided'}`},
            // {label: 'Alternate email address', value: ''},
            {label: 'Alternate email address', value: `${basicData?.alternateEmail? basicData?.alternateEmail : 'Not provided'}`},
            {label: 'Next of kin full name', value: `${basicData?.nextOfKinResponse}`},
            {label: 'Next of kin phone number', value: ''},
            {label: 'Next of kin residential address', value: ''},
            {label: 'Next of kin relationship ', value: ''},
            {label: 'Highest level of education ', value: ''},
            {label: 'Institution name ', value: data?.institutionName},
            {label: 'Program of study ', value: data?.programOfStudy},

        ]



        return (
        <div
            id={'loaneeBasicDetails'}
            data-testid={'loaneeBasicDetails'}
            className={`md:h-fit hidden  md:w-[45%]   gap-0 md:grid lg:grid px-4  sm:hidden    sm:w-full w-full  `}
        >
            {userRole === 'LOANEE'?
                <div>
                  <span id={'document'} className={`w-fit ${inter500.className} text-[18px]  py-4 h-fit  text-[#212221]  `} >Document</span>
                <div
                    className={` md:max-h-fit grid  grid-cols-2 w-full   `}
                >

                        <div className={` h-fit  w-full rounded-md px-3 pt-5 pb-3   bg-[#F6F6F6] `}>
                        <div className={` h-[8rem] w-full bg-white   rounded-md `}>

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
                </div>
                </div>
                :
                <Tabs defaultValue={'bioDetails'} className={` px-4 py-4  w-full  `}>
                    <TabsList className="grid w-fit px-0 pb-2  grid-cols-2">
                        <TabsTrigger id={'bioDetails'} className={`w-fit ${inter.className} text-[14px] text-[#6A6B6A] data-[state=active]:text-[#212221] data-[state=active]:border data-[state=active]:border-grey-200 data-[state=active]:${inter500.className} `} value="bioDetails">Bio details</TabsTrigger>
                        <TabsTrigger id={'document'} className={`w-fit ${inter.className} text-[14px] text-[#6A6B6A] data-[state=active]:text-[#212221] data-[state=active]:border data-[state=active]:border-grey-200 data-[state=active]:${inter500.className} `} value="documents">Document</TabsTrigger>
                    </TabsList>
                    <div
                        className={` md:max-h-[56vh] w-full  ${styles.container}`}
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
                            {/*<Document/>*/}
                            <p>No Document available</p>
                        </TabsContent>
                    </div>
                </Tabs>
            }
        </div>
    );
};

export default LoaneeBasicDetails;