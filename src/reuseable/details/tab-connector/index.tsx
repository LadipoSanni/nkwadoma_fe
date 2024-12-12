"use client"
import React from 'react';
import {inter} from "@/app/fonts";

interface props {
    tabNames: string[],
    currentTab?: number | string,
}

const TabConnector = ({ tabNames, currentTab = 0 }: props) => {
    const currentTabIndex = typeof currentTab === 'string' ? parseInt(currentTab, 10) : currentTab;

    return (
        <div
            id={`tabConnectContainer`}
            data-testid={`tabConnectContainer`}
            className={`${inter.className} w-fit flex h-fit`}
        >
            {tabNames.map((tab, index) => (
                <div key={index + tab} className={`flex items-center`}>
                    <div
                        data-testid={"tab" + tab}
                        id={"tab" + tab}
                        className={`border rounded-full w-fit h-auto text-sm px-2 py-1 ${currentTabIndex === index ? 'border-meedlBlue text-meedlBlue' : currentTabIndex > index ? 'border-meedlBlue text-meedlBlue bg-lightBlue200' : 'border-lightBlue250 text-black300'}`}
                    >
                        <span className={`flex gap-1 text-nowrap whitespace-nowrap text-sm font-normal w-object-fit`}>{tab}</span>
                    </div>
                    {index + 1 < tabNames.length &&
                        <span
                            className={`w-[20px] md:w-[6rem] h-[2px] md:h-[1px] ${currentTabIndex > index ? 'bg-meedlBlue' : 'bg-lightBlue250'}`}></span>
                    }
                </div>
            ))}
        </div>
    );
};

export default TabConnector;