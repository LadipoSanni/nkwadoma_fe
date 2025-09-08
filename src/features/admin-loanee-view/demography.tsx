"use client"
import {PieCharts} from "@/reuseable/pieChart/index";
import {useViewLoaneeDemographyQuery} from "@/service/users/Loanee_query";






export function ChartPieLegend() {

    const {data, isLoading, isFetching} = useViewLoaneeDemographyQuery({})

    const genderChartData = [
        { browser: "Male", visitors: data?.data?.malePercentage ? data?.data?.malePercentage : 0, fill: "#D9EAFF" },
        { browser: "Female", visitors: data?.data?.femalePercentage ? data?.data?.femalePercentage : 0, fill: "#FBE2B7" },
    ]
    const ageChartData = [
        { browser: "17-25 years", visitors: data?.data?.age17To25Percentage ? data?.data?.age17To25Percentage : 0, fill: "#FBE2B7" },
        { browser: "25-35 years", visitors: data?.data?.age26To35Percentage ? data?.data?.age26To35Percentage : 0, fill: "#D9EAFF" },
        { browser: "35-45 years", visitors: data?.data?.age35To45Percentage ? data?.data?.age35To45Percentage : 0, fill: "#B5DFC3" },

    ]
    const geographyChartData = [
        { browser: "South-east", visitors: data?.data?.southEastPercentage ? data?.data?.southEastPercentage : 0, fill: "#FBE2B7" },
        { browser: "South-west", visitors: data?.data?.southWestPercentage ? data?.data?.southWestPercentage : 0, fill: "#D9EAFF" },
        { browser: "South-south", visitors: data?.data?.southSouthPercentage ? data?.data?.southSouthPercentage : 0, fill: "#FFB0B0" },
        { browser: "North-east", visitors: data?.data?.northEastPercentage ? data?.data?.northEastPercentage : 0, fill: "#B5DFC3" },
        { browser: "North-west", visitors: data?.data?.northWestPercentage ? data?.data?.northWestPercentage : 0, fill: "#FDE2D2" },
        { browser: "North-central", visitors: data?.data?.northCenterPercentage ? data?.data?.northCenterPercentage : 0, fill: "#CB30E033" },

    ]
    const educationChartData = [
        { browser: "O’Level", visitors: data?.data?.olevelPercentage ? data?.data?.olevelPercentage : 0, fill: "#B5DFC3" },
        { browser: "Tertiary", visitors: data?.data?.tertiaryPercentage ? data?.data?.tertiaryPercentage : 0, fill: "#FFB0B0" },

    ]



    return (
        <div className={` grid md:grid-cols-2 gap-5  pb-4  w-full h-full  `}>
            <PieCharts
                chartData={genderChartData}
                title={'Gender breakdown'}
                dataKey={'genderBreakdown'}
                isLoading={isLoading || isFetching}
            />
            <PieCharts
                chartData={ageChartData}
                title={'Age breakdown'}
                dataKey={'ageBreakdown'}
                isLoading={isLoading || isFetching}

            />
            <PieCharts
                chartData={geographyChartData}
                title={'Geography breakdown'}
                dataKey={'geographyBreakdown'}
                isLoading={isLoading || isFetching}

            />
            <PieCharts
                chartData={educationChartData}
                title={'Education breakdown'}
                dataKey={'educationBreakdown'}
                isLoading={isLoading || isFetching}

            />
        </div>
    )
}
