import React from 'react';
import {cabinetGrotesk} from '@/app/fonts'
import SearchInput from "@/reuseable/Input/SearchInput";
import ReusableButton from "@/reuseable/buttons/ReusableButton";
import AllProgramsCard from "@/reuseable/cards/Index";
import DisplayOptions from "@/reuseable/display/DisplayOptions";

const Program = () => {
    return (
        <main id="programMain" className={`${cabinetGrotesk.className} flex flex-col gap-8 px-5 pt-7 bg-white`}>
            <section id="programSection" className={'grid gap-7 '}>
                <h1 id="programTitle" className={"text-black text-2xl font-medium leading-[120%]"}>Program</h1>
                <div id="programControls" className={'flex justify-between'}>
                    <SearchInput id={'ProgramSearchInput'}/>
                    <ReusableButton id={'createProgramButton'}>Create program</ReusableButton>
                </div>
            </section>
            <div id="programContent" className={'grid gap-4'}>
                <DisplayOptions/>
                <AllProgramsCard
                    cohorts={10}
                    description={'Design thinking is a process for creative problem solving. Design thinking has a human-centered core. It encourages organizations to focus on the people they\'re creating for, which leads to better products, services, and internal processes.'}
                    months={4}
                    title={'Design Thinking'}
                    trainees={50}
                    menu={<div>ff</div>}
                />
            </div>
        </main>
    );
};

export default Program;