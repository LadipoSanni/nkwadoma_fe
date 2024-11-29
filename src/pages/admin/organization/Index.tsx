'use client';
import React from 'react';
import {inter} from '@/app/fonts'
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import SearchInput from "@/reuseable/Input/SearchInput";

import {Button} from '@/components/ui/button';

const ViewAllOrganization = () => {
    return (
        <main className={`${inter.className} py-6 px-5`}>

            <Tabs defaultValue="active">
                <TabsList className={'p-0.5 gap-1 h-[2.0625rem] items-center cursor-pointer rounded-md bg-neutral100'}>
                    <TabsTrigger value="active"
                                 className={'py-1 px-2 gap-1 items-center rounded-md h-[1.8125rem] w-[3.875rem] data-[state=active]:shadow-custom'}>Active</TabsTrigger>
                    <TabsTrigger value="Invited"
                                 className={'py-1 px-2 gap-1 items-center rounded-md h-[1.8125rem] data-[state=active]:shadow-custom'}>Invited</TabsTrigger>
                    <TabsTrigger value="Deactivated"
                                 className={'py-1 px-2 gap-1 items-center rounded-md h-[1.8125rem] data-[state=active]:shadow-custom'}>Deactivated</TabsTrigger>
                </TabsList>
                <section className={'flex justify-between items-center mt-10'}>
                    <SearchInput id={'programCohortSearch'} value="search" onChange={() => {
                    }}/>

                    <Button
                        className={'h-[2.8125rem] w-[10.375rem] rounded-md bg-meedlBlue hover:bg-meedlBlue text-meedlWhite text-[0.875rem] font-semibold leading-[150%]'}>Invite
                        organization</Button>
                </section>
                <TabsContent value="active" className={'mt-4'}>


                </TabsContent>
                <TabsContent value="Invited" className={'mt-4 grid gap-7'}>
                </TabsContent>
            </Tabs>

        </main>
    );
};

export default ViewAllOrganization;