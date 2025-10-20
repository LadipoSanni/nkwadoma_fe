'use client'
import React, {useEffect} from 'react';
import { Tabs , TabsContent, TabsList, TabsTrigger} from './ui/tabs';
import {setUnderlineTabCurrentTab} from "@/redux/slice/layout/adminLayout";
import {store, useAppSelector} from '@/redux/store';

interface Props {
    tabTriggers: {name: string; id: string}[];
    tabValue: {name: string;displayValue: React.ReactNode}[];
    defaultTab: string;
}
const UnderlineTab = ({tabTriggers, tabValue, defaultTab}: Props) => {

    const currentTab = useAppSelector(state => state.adminLayout.underlineTabCurrentTab);
    useEffect(() => {
        if (!currentTab) {
            store.dispatch(setUnderlineTabCurrentTab(defaultTab));
        }
    }, [defaultTab, currentTab]);

    const handleTabChange = (val: string) => {
        store.dispatch(setUnderlineTabCurrentTab(val))
    };

    return (
        <div>
            <Tabs defaultValue={currentTab ? currentTab  : defaultTab} onValueChange={handleTabChange} className="relative mr-auto w-full">
                <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                    {tabTriggers?.map((item, i) => (
                        <TabsTrigger
                            value={item.name}
                            key={item.id+i}
                            id={item.id}
                            data-testid={item.id}
                            className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-[#142854] data-[state=active]:text-[#142854] data-[state=active]:shadow-none"
                            // className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none "
                        >
                            {item.name}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {tabValue?.map((value, index) => (
                    <TabsContent
                        key={value.name + index}
                        data-testid={'display'+ value.name}
                        id={'display'+ value.name}
                        className={` md:max-h-[60vh] lg:max-h-[60vh] w-full mb-6   `}
                        value={value.name}>
                        {value.displayValue}

                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
};

export default UnderlineTab;