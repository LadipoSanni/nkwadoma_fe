"use client"
import React, { useState, useEffect } from 'react';
import { cabinetGrotesk } from '@/app/fonts';
import SearchInput from "@/reuseable/Input/SearchInput";
import ReusableButton from "@/reuseable/buttons/ReusableButton";
import AllProgramsCard from "@/reuseable/cards/Index";
import DisplayOptions from "@/reuseable/display/DisplayOptions";

const Program = () => {
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [dummyData, setDummyData] = useState<{ cohorts: number; description: string; months: number; title: string; trainees: number; }[]>([]);

    useEffect(() => {
        const data = Array.from({ length: 24 }, (_, index) => ({
            cohorts: Math.floor(Math.random() * 20) + 1,
            description: `Design thinking is a process for creative problem solving. Design thinking has a human-centered core. It encourages organizations to focus on the people they're creating for, which leads to better products, services, and internal processes.${index + 1}`,
            months: Math.floor(Math.random() * 12) + 1,
            title: `Program Title ${index + 1}`,
            trainees: Math.floor(Math.random() * 100) + 1,
        }));
        setDummyData(data);
    }, []);

    return (
        <main id="programMain" className={`${cabinetGrotesk.className} flex flex-col gap-8 px-5 pt-7 bg-white`}>
            <section id="programSection" className={'grid gap-7 '}>
                <h1 id="programTitle" className={"text-black text-2xl font-medium leading-[120%]"}>Program</h1>
                <div id="programControls" className={'flex justify-between'}>
                    <SearchInput id={'ProgramSearchInput'} />
                    <ReusableButton id={'createProgramButton'}>Create program</ReusableButton>
                </div>
            </section>
            <div id="programContent" className={'grid gap-4'}>
                <DisplayOptions setView={setView} activeView={view} />
                {view === 'grid' ? (
                    <div
                        id={'programGrid'}
                        className={'grid gap-6 overflow-y-auto'}
                        style={{
                            height: '370px',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
                        }}
                    >
                        {dummyData.map((program, index) => (
                            <AllProgramsCard
                                key={index}
                                cohorts={program.cohorts}
                                description={program.description}
                                months={program.months}
                                title={program.title}
                                trainees={program.trainees}
                            />
                        ))}
                    </div>
                ) : (
                    <div
                        id="programListView"
                        className={'grid gap-6 overflow-y-auto'}
                        style={{
                            height: '370px',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
                        }}
                    >
                        <table id="programTable" className="w-full border-collapse">
                            <thead id="programTableHead">
                            <tr id="programTableHeadRow">
                                <th id="programTableHeadTitle" className="border p-2">Title</th>
                                <th id="programTableHeadDescription" className="border p-2">Description</th>
                                <th id="programTableHeadCohorts" className="border p-2">Cohorts</th>
                                <th id="programTableHeadMonths" className="border p-2">Months</th>
                                <th id="programTableHeadTrainees" className="border p-2">Trainees</th>
                            </tr>
                            </thead>
                            <tbody id="programTableBody">
                            {dummyData.map((program, index) => (
                                <tr id={`programTableRow${index}`} key={index}>
                                    <td id={`programTableTitle${index}`} className="border p-2">{program.title}</td>
                                    <td id={`programTableDescription${index}`}
                                        className="border p-2">{program.description}</td>
                                    <td id={`programTableCohorts${index}`} className="border p-2">{program.cohorts}</td>
                                    <td id={`programTableMonths${index}`} className="border p-2">{program.months}</td>
                                    <td id={`programTableTrainees${index}`}
                                        className="border p-2">{program.trainees}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Program;