import React from 'react';
import {MdGridView, MdOutlineViewList} from 'react-icons/md';
import {inter} from "@/app/fonts";

const DisplayOptions = ({ setView }: { setView: (view: 'grid' | 'list') => void, activeView: 'grid' | 'list' }) => {
    return (
        <section id="displayOptions"
            className={`${inter.className} flex p-0.5 items-center cursor-pointer gap-1 rounded-md bg-neutral100 w-[8.75rem] h-[2.0625rem]`}>
            <div id={'gridDisplay'}
                className={"flex py-1 px-2 gap-1 items-center rounded-md bg-white shadow-custom text-meedlBlue h-[1.8125rem] w-[4.25rem]"}
                onClick={() => setView('grid')}
            >
                <MdGridView className="w-5 h-5 text-meedlBlue"/>
                <span id={'GridText'} className={'text-[14px] font-normal leading-[150%]'}>Grid</span>
            </div>
            <div id={'listDisplay'}
                className="flex py-1 px-2 gap-1 items-center rounded-md text-grey450 h-[1.8125rem] w-[4.25rem]"
                onClick={() => setView('list')}
            >
                <MdOutlineViewList className="w-5 h-5 text-neutral950"/>
                <span id={'listDisplay'} className={'text-[14px] font-normal leading-[150%]'}>List</span>
            </div>
        </section>
    );
};

export default DisplayOptions;