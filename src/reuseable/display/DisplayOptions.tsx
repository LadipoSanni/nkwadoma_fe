import React from 'react';
import {inter} from '@/app/fonts';

interface DisplayOptionsProps {
    setView: (view: string) => void;
    activeView: string;
    options: { id: string, label: string, icon: React.ReactNode }[];
}

const DisplayOptions = ({setView, activeView, options}: DisplayOptionsProps) => {
    return (
        <section id="displayOptions"
                 className={`${inter.className} flex p-0.5 items-center cursor-pointer gap-1 rounded-md bg-neutral100 w-[8.75rem] h-[2.0625rem]`}>
            {options.map((option) => (
                <div
                    key={option.id}
                    id={`${option.id}Display`}
                    className={`flex py-1 px-2 gap-1 items-center rounded-md ${activeView === option.id ? 'bg-white shadow-custom text-meedlBlue' : 'text-grey450'} h-[1.8125rem] w-[4.25rem]`}
                    onClick={() => setView(option.id)}
                >
                    {option.icon}
                    <span id={`${option.id}Text`}
                          className={'text-[14px] font-normal leading-[150%]'}>{option.label}</span>
                </div>
            ))}
        </section>
    );
};

export default DisplayOptions;