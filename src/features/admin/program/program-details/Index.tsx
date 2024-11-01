"use client"
import React from "react";
import {useRouter} from "next/navigation";
import {CiLaptop} from "react-icons/ci";
import {inter, cabinetGrotesk} from "@/app/fonts";
import CohortDetailsImage from "../../../../../public/asset/Image/CohortDetailsImage.png"
import {DetailsTabContainer} from "@/reuseable/details/DetailsTabContainer";
import DetailsImageSection from "@/reuseable/details/DetailsImageSection";
import {MdOutlinePerson, MdOutlinePeopleAlt, MdOutlineDateRange, MdPersonOutline} from "react-icons/md";
import {BiArrowBack} from "react-icons/bi";
import {FiBook} from "react-icons/fi";
import {TagButton} from "@/reuseable/tagButton/TagButton";
import {Button} from "@/components/ui/button";


const ProgramDetails = () => {
    const dataList = [
        {label: "Start Date", value: "13, Dec 2023"},
        {label: "End Date", value: "15, Jan 2024"},
        {label: "Cohort status", value: "10"},
        {label: "Number of Dropouts", value: "10"},
        {label: "Dropout rate", value: "0.5%"},
        {label: "Number employed", value: "38"},
        {label: "Employment rate", value: "38%"},
        {label: "Average starting salary", value: "3,000,000.00"},
        {label: "Total amount disbursed", value: "3,000,000.00"},
        {label: "Total amount repaid", value: "3,000,000.00"},
        {label: "Total amount outstanding", value: "3,000,000.00"},
        {label: "Repayment rate", value: "70%"},
        {label: "Tuition amount", value: "3,500,000.00"},
    ];

    const breakDown = [
        {title: "Tuition", amount: "200,000,000.00"},
        {title: "Device", amount: "600,000,000.00"},
        {title: "Accommodation", amount: "200,000,000.00"},
        {title: "Feeding", amount: "200,000.00"},
        {title: "Total", amount: "300,500,000.00"},
    ];
    const program1Options = [
        {name: 'Edit Cohort', id: '1'},
        {name: 'Delete Cohort', id: '3'},
    ];

    const tagButtonData = [
        {tagIcon: MdOutlineDateRange, tagCount: 4, tagButtonStyle: "bg-lightBlue100", tagText: "months"},
        {tagIcon: MdOutlinePeopleAlt, tagCount: 10, tagButtonStyle: "bg-warning80", tagText: "cohorts"},
        {tagIcon: MdPersonOutline, tagCount: 50, tagButtonStyle: "bg-warning50", tagText: "trainees"},
    ];


    const router = useRouter();
    const handleBackClick = () => {
        router.push('/cohort')
    }

    const handleDeleteClick = () => {

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
                    <Button className={'bg-meedlBlue w-[18.1875rem] h-[2.8125rem] text-meedlWhite hover:bg-meedlBlue shadow-none'}>Edit program</Button>

                </div>

                <div className={`md:w-6/12 h-[96%] md:pt-0 pt-0`}>
                    <DetailsTabContainer dataList={dataList} breakDown={breakDown}/>
                </div>
            </section>
        </main>
    );
}
export default ProgramDetails;