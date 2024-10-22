import React from 'react';
import {MdGridView, MdOutlineViewList} from 'react-icons/md';
import {inter} from "@/app/fonts";

interface DisplayOptionsProps {
    setView: (view: 'grid' | 'list') => void,
    activeView: 'grid' | 'list'

}

const DisplayOptions = ({setView, activeView}: DisplayOptionsProps) => {
    const displayOptions = ['grid', 'list'];
    return (
        <section id="displayOptions"
                 className={`${inter.className} flex p-0.5 items-center cursor-pointer gap-1 rounded-md bg-neutral100 w-[8.75rem] h-[2.0625rem]`}>
            {displayOptions.map((option) => (
                <div
                    key={option}
                    id={`${option}Display`}
                    className={`flex py-1 px-2 gap-1 items-center rounded-md ${activeView === option ? 'bg-white shadow-custom text-meedlBlue' : 'text-grey450'} h-[1.8125rem] w-[4.25rem]`}
                    onClick={() => setView(option as 'grid' | 'list')}
                >
                    {option === 'grid' ? (
                        <MdGridView
                            id={`${option}Icon`}
                            className={`w-5 h-5 ${activeView === 'grid' ? 'text-meedlBlue' : 'text-neutral950'}`}/>
                    ) : (
                        <MdOutlineViewList
                            id={`${option}Icon`}
                            className={`w-5 h-5 ${activeView === 'list' ? 'text-meedlBlue' : 'text-neutral950'}`}/>
                    )}
                    <span id={`${option}Text`}
                          className={'text-[14px] font-normal leading-[150%]'}>{option.charAt(0).toUpperCase() + option.slice(1)}</span>
                </div>
            ))}
        </section>
    );
};

export default DisplayOptions;