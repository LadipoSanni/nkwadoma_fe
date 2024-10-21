"use client"
import React, {useState, useEffect} from 'react';
import {cabinetGrotesk} from '@/app/fonts';
import SearchInput from "@/reuseable/Input/SearchInput";
import AllProgramsCard from "@/reuseable/cards/AllProgramsList";
import DisplayOptions from "@/reuseable/display/DisplayOptions";
import LoanProductTable from "@/reuseable/table/LoanProductTable";
import {programData} from "@/utils/ProgramData";
import CreateProgramButton from "@/features/admin/program/createProgramButton/Index";
// import CreateCohort from "@/reuseable/modals/CreateCohort";
// import AdminButton from "@/reuseable/buttons/AdminButton";

const ProgramView = () => {
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [dummyData, setDummyData] = useState<{
        cohorts: number;
        description: string;
        months: number;
        title: string;
        trainees: number;
    }[]>([]);
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const ProgramHeader = [
        {
            title: "cohorts",
            sortable: true,
            id: "cohorts"

        },
        {
            title: "description",
            sortable: true,
            id: "description"

        }, {
            title: "months",
            sortable: true,
            id: "months"

        }, {
            title: "title",
            sortable: true,
            id: "title"

        }
        , {
            title: "trainees",
            sortable: true,
            id: "trainees"
        }
    ]
    useEffect(() => {
        const data = Array.from({length: 24}, (_, index) => ({
            cohorts: Math.floor(Math.random() * 20) + 1,
            description: `Design thinking is a process for creative problem solving. Design thinking has a human-centered core. It encourages organizations to focus on the people they're creating for, which leads to better products, services, and internal processes.${index + 1}`,
            months: Math.floor(Math.random() * 12) + 1,
            title: `Program Thinking ${index + 1}`,
            trainees: Math.floor(Math.random() * 100) + 1,
        }));
        setDummyData(data);
    }, []);

    const program1Options = [
        { name: 'View Program', id: '1' },
        { name: 'Edit Program', id: '2' },
        { name: 'Delete Program', id: '3' }
    ];

    return (
        <main id="programMain" className={`${cabinetGrotesk.className} flex flex-col gap-8 px-5 pt-7 bg-meedlWhite`}>
            <section id="programSection" className={'grid gap-7 '}>
                <h1 id="programTitle" className={"text-meedlBlack text-2xl font-medium leading-[120%]"}>Program</h1>
                <div id="programControls" className={'md:flex md:justify-between gap-5 grid'}>
                    <SearchInput id={'ProgramSearchInput'}/>
                    {/*<AdminButton id={'createProgramButton'} onClick={() => setIsModalOpen(true)}>Create program</AdminButton>*/}
                <CreateProgramButton buttonText={"Create Program"} title={"Create Program"} programDeliveryTypes={["2years", "hgjfhgfgf"]} programModes={["2semesters", "uthuightuit"]} programDurations={["3years", "hgfrregfre"]}/>
                </div>
            </section>
            <div id="programContent" className={'grid gap-4'}>
                <DisplayOptions setView={setView} activeView={view}/>
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
                             id={'program'} dropdownOption={program1Options}/>
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
                        <LoanProductTable tableData={programData} tableHeader={ProgramHeader} staticHeader={"cohorts"} staticColunm={'cohorts'} tableHeight={40}  handleRowClick={() => {}} />
                    </div>
                )}
            </div>
            {/*{isModalOpen && <CreateCohort />}*/}
        </main>
    );
};

export default ProgramView;