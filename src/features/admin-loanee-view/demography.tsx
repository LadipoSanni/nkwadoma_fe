"use client"
import {PieCharts} from "@/reuseable/pieChart/index";
import styles from '@/features/Overview/index.module.css';

export const description = "A pie chart with a legend"





export function ChartPieLegend() {
    const genderChartData = [
        { browser: "Male", visitors: 28.0, fill: "#D9EAFF" },
        { browser: "Female", visitors: 18.4, fill: "#FBE2B7" },
    ]
    const ageChartData = [
        { browser: "17-25 years", visitors: 35, fill: "#FBE2B7" },
        { browser: "25-35 years", visitors: 20, fill: "#D9EAFF" },
        { browser: "35-45 years", visitors: 10, fill: "#B5DFC3" },

    ]
    const geographyChartData = [
        { browser: "South-east", visitors: 35, fill: "#FBE2B7" },
        { browser: "South-west", visitors: 20, fill: "#D9EAFF" },
        { browser: "South-south", visitors: 10, fill: "#FFB0B0" },
        { browser: "North-east", visitors: 10, fill: "#B5DFC3" },
        { browser: "North-west", visitors: 10, fill: "#FDE2D2" },
        { browser: "North-central", visitors: 10, fill: "#CB30E033" },

    ]
    const educationChartData = [
        { browser: "O’Level", visitors: 10, fill: "#B5DFC3" },
        { browser: "Tertiary", visitors: 18.5, fill: "#FFB0B0" },

    ]



    return (
        <div className={` grid grid-cols-2 gap-5  w-full h-full  `}>
            <PieCharts
                chartData={genderChartData}
                title={'Gender breakdown'}
                dataKey={'genderBreakdown'}
            />
            <PieCharts
                chartData={ageChartData}
                title={'Age breakdown'}
                dataKey={'ageBreakdown'}
            />
            <PieCharts
                chartData={geographyChartData}
                title={'Geography breakdown'}
                dataKey={'geographyBreakdown'}
            />
            <PieCharts
                chartData={educationChartData}
                title={'Education breakdown'}
                dataKey={'educationBreakdown'}
            />
        </div>
    )
}
