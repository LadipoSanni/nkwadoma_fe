'use client'
import { Tabs , TabsContent, TabsTrigger, TabsList} from '@/components/ui/tabs';
import React from 'react';
import {inter, inter500} from "@/app/fonts";
import Loan from './Loan';
import Investment from './Investment';
import styles from '@/features/Overview/index.module.css';
import {useViewMeedlPortfolioQuery} from "@/service/admin/overview";

const Overview = () => {
    const {data, isFetching, isLoading } = useViewMeedlPortfolioQuery({})
    return (
        <div className={` px-4 pt-2  `}>
            <Tabs defaultValue={'loan'}>
               <div className={`  h-fit py-4 `}>
                   <TabsList >
                       <TabsTrigger id={'loan'} className={`w-fit ${inter.className} text-[14px] text-[#6A6B6A] data-[state=active]:text-[#212221] data-[state=active]:border data-[state=active]:border-grey-200 data-[state=active]:${inter500.className} `} value="loan">Loan</TabsTrigger>
                       <TabsTrigger id={'investment'} className={`w-fit ${inter.className} text-[14px] text-[#6A6B6A] data-[state=active]:text-[#212221] data-[state=active]:border data-[state=active]:border-grey-200 data-[state=active]:${inter500.className} `} value="investment">Investment</TabsTrigger>
                   </TabsList>
               </div>
                <div className={` w-full pb-4  h-[76vh] ${styles.container} `}>
                    <TabsContent value={'loan'}>
                        <Loan data={data?.data} isLoading={isLoading || isFetching}/>
                    </TabsContent>
                    <TabsContent value={'investment'}>
                        <Investment data={data?.data} isLoading={isLoading || isFetching} />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
};

export default Overview;