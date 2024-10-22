"use client"
import React, {useState, useEffect} from 'react';
import {cabinetGrotesk} from '@/app/fonts';
import SearchInput from "@/reuseable/Input/SearchInput";
import AllProgramsCard from "@/reuseable/cards/AllProgramsList";
import DisplayOptions from "@/reuseable/display/DisplayOptions";
import LoanProductTable from "@/reuseable/table/LoanProductTable";
import {programData} from "@/utils/ProgramData";
import CreateProgramButton from "@/features/admin/program/createProgramButton/Index";

import { Book } from 'lucide-react';

const ProgramView = () => {
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [dummyData, setDummyData] = useState<{
        cohorts: number;
        description: string;
        months: number;
        title: string;
        trainees: number;
    }[]>([]);

    const ProgramHeader = [
        {
            title: "cohorts",
            sortable: true,
            id: "cohorts"

    const handleRowClick = () => {

    }

    const dropDownOption = [
        {
          name: "View Program",
          id: "1"
        },
        {
          name: "Edit Program",
          id: "2"
        },
        {
          name: "Delete Program",
          id: "3"
        }
      ]

    interface TableRowData {
        [key: string]: string | number | null | React.ReactNode;
       }
       const ProgramHeader = [
        { title: 'Programs', sortable: true, id: 'programs', selector: (row:TableRowData ) => row.programs },
        { title: 'Status', sortable: true, id: 'status', selector: (row:TableRowData ) => <span className={`bg-error50 pt-1 pb-1 pr-3 pl-3 rounded-xl ${row.status === "Accepted"? "text-success600" : "text-error600"}`}>{row.status}</span>},
        { title: 'No. of Cohorts', sortable: true, id: 'noOfCohorts', selector: (row: TableRowData) => row.noOfCohorts },
        { title: 'No. of Trainees', sortable: true, id: 'noOfTrainees', selector: (row:TableRowData) => row.noOfTrainees },
        { title: 'Amount Disbursed', sortable: true, id: 'amountDisbursed', selector: (row:TableRowData) => row.amountDisbursed},
        { title: 'Amount Repaired', sortable: true, id: 'amountRepaired', selector: (row:TableRowData) => row.amountRepaired },
        { title: 'Amount Outstanding', sortable: true, id: 'amountOutstanding', selector: (row:TableRowData) => row.amountOutstanding},


      ]



    useEffect(() => {
        const data = Array.from({length: 9}, (_, index) => ({
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
                    <CreateProgramButton buttonText={"Create Program"} title={"Create Program"}
                                         programDeliveryTypes={["2years", "hgjfhgfgf"]}
                                         programModes={["2semesters", "uthuightuit"]}
                                         programDurations={["3years", "hgfrregfre"]}/>
                </div>
            </section>
            <div id="programContent" className={'grid gap-4'}>
                <DisplayOptions setView={setView} activeView={view}/>
                {view === 'grid' ? (
                    <div
                        id={'programGrid'}
                        className={'grid gap-6 overflow-y-auto'}
                        style={{
                            height: '55vh',
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
                        className={'grid gap-6'}
                        style={{
                            height: '55vh',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
                        }}
                    >
                        <LoanProductTable tableData={programData} tableHeader={ProgramHeader} staticHeader={"cohorts"}
                                          staticColunm={'cohorts'} tableHeight={45} handleRowClick={() => {
                        }}/>
                        <LoanProductTable
                        tableData={programData}
                        tableHeader={ProgramHeader}
                        staticHeader={"Programs"}
                        staticColunm={'programs'}
                        tableHeight={42}
                        handleRowClick={handleRowClick}
                        sx='cursor-pointer'
                        showKirkBabel={true}
                        kirkBabDropdownOption={dropDownOption}
                        icon={Book}
                        sideBarTabName='Program'
                        />
                    </div>
                )}
            </div>
        </main>
    );
};

export default ProgramView;