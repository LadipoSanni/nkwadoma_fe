'use client'
import { Tabs , TabsContent, TabsTrigger, TabsList} from '@/components/ui/tabs';
import React from 'react';
import {inter, inter500} from "@/app/fonts";
import Loan from './Loan';
import Investment from './Investment';
import styles from '@/features/Overview/index.module.css';

const Overview = () => {
    return (
        <div className={` px-4 pt-2 `}>
            <Tabs defaultValue={'loan'}>
                <TabsList>
                    <TabsTrigger id={'loan'} className={`w-fit ${inter.className} text-[14px] text-[#6A6B6A] data-[state=active]:text-[#212221] data-[state=active]:border data-[state=active]:border-grey-200 data-[state=active]:${inter500.className} `} value="loan">Loan</TabsTrigger>
                    <TabsTrigger id={'investment'} className={`w-fit ${inter.className} text-[14px] text-[#6A6B6A] data-[state=active]:text-[#212221] data-[state=active]:border data-[state=active]:border-grey-200 data-[state=active]:${inter500.className} `} value="investment">Investment</TabsTrigger>
                </TabsList>
                <div className={` w-full h-[78vh] ${styles.container} `}>
                    <TabsContent value={'loan'}>
                        <Loan/>
                    </TabsContent>
                    <TabsContent value={'investment'}>
                        <Investment/>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
};

export default Overview;