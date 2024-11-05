"use client"
import React from "react";
import {useRouter} from "next/navigation";
import {inter, cabinetGrotesk} from "@/app/fonts";
import {MdOutlinePeopleAlt, MdOutlineDateRange, MdPersonOutline} from "react-icons/md";
import {BiArrowBack} from "react-icons/bi";
import {FiBook} from "react-icons/fi";
import {TagButton} from "@/reuseable/tagButton/TagButton";
import {Button} from "@/components/ui/button";
import Kebab from "@/reuseable/Kebab/Kebab";
import {IoEllipsisHorizontalSharp} from "react-icons/io5";
import {ProgramTab} from "@/reuseable/details/ProgramTab";


const ProgramDetails = () => {

    const dataList = [
        {label: "Program mode", value: "Online"},
        {label: "Program delivery type", value: "Full-time"},
        {label: "Completion rate", value: "88%"},
        {label: "Employment rate", value: "78%"},
        {label: "Average starting income", value: "₦3,000,000.00"},
        {label: "Repayment rate", value: "40%"},
        {label: "Debt percentage", value: "55.5%"},
        {label: "Total loan amount disbursed", value: "₦3,000,000.00"},
        {label: "Total loan amount repaid", value: "₦3,000,000.00"},
        {label: "Total loan amount outstanding", value: "₦3,000,000.00"},
    ];

    // const program1Options = [
    //     {name: 'Edit Cohort', id: '1'},
    //     {name: 'Delete Cohort', id: '3'},
    // ];

    const tagButtonData = [
        {tagIcon: MdOutlineDateRange, tagCount: 4, tagButtonStyle: "bg-lightBlue100", tagText: "months"},
        {tagIcon: MdOutlinePeopleAlt, tagCount: 10, tagButtonStyle: "bg-warning80", tagText: "cohorts"},
        {tagIcon: MdPersonOutline, tagCount: 50, tagButtonStyle: "bg-warning50", tagText: "trainees"},
    ];


    const router = useRouter();
    const handleBackClick = () => {
        router.push('/cohort')
    }


    const description = "Design thinking is a process for creative problem solving. Design thinking has a human-centered core. It encourages organizations to focus on the people they're creating for, which leads to better products, services, and internal processes."

    return (
        <main className={`${inter.className} grid gap-10  pt-6 md:px-10 px-2 w-full`}>
            <div className={`flex gap-2 items-center cursor-pointer text-meedlBlue`} id={`backClick`}
                 data-testid={`backClick`} onClick={handleBackClick}>
                <BiArrowBack className={'h-5 w-5 text-meedlBlue'}/>
                <h1 id={`backClickText`} className={'text-meedlBlue text-[14px] font-medium leading-[21px]'}
                    data-testid={`backClickText`}>Back to programs</h1>
            </div>

            <section className={`p- flex md:flex-row flex-col md:justify-between`}>
                <div className={'flex flex-col gap-10'}>
                    <div className={'grid place-items-center h-[7.5rem] w-[7.5rem] bg-lightBlue500 rounded-full'}>
                        <FiBook className={'h-[50px] w-[50px] text-meedlBlue'}/>
                    </div>
                    <div className={'flex flex-col gap-3'}>
                        <h1 className={`text-meedlBlack ${cabinetGrotesk.className} text-[28px] font-medium leading-[33.6px]`}>Product Design</h1>
                        <div className={'grid gap-5'}>
                            <p className={'text-sm font-normal text-black400 w-[351px]'}>{description}</p>
                            <div
                                id={`details`}
                                data-testid="details"
                                className="grid md:grid-cols-3 grid-cols-2 gap-3 w-fit"
                            >
                                {tagButtonData.map((tagProps, index) => (
                                    <TagButton key={index} {...tagProps} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={'flex justify-between'}>
                        <Button
                            className={'bg-meedlBlue w-[18.1875rem] h-[2.8125rem] text-meedlWhite hover:bg-meedlBlue shadow-none'}>Edit
                            program</Button>
                        <div role={"button"}
                             className={`w-12 h-12 flex justify-center items-center border border-meedlBlue rounded-full`}>
                            <Kebab icon={IoEllipsisHorizontalSharp}/>
                        </div>
                    </div>

                </div>

                <div className={`md:w-6/12 h-[96%] md:pt-0 pt-0`}>
                    <ProgramTab dataList={dataList} />
                </div>
            </section>
        </main>
    );
}
export default ProgramDetails;