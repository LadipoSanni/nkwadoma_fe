"use client"
import {PieCharts} from "@/reuseable/pieChart/index";

export const description = "A pie chart with a legend"





export function ChartPieLegend() {
    const chartData = [
        { browser: "Male", visitors: 28.0, fill: "#D9EAFF" },
        { browser: "Female", visitors: 18.4, fill: "#FBE2B7" },
    ]


    return (
        // <Card className="flex flex-col">
        //     <CardHeader className="items-center pb-0">
        //         {/*<CardTitle>Pie Chart - Legend</CardTitle>*/}
        //         {/*<CardDescription>January - June 2024</CardDescription>*/}
        //         <span className={` text-[24px] ${cabinetGroteskMediumBold.className} md:text-[24px] `}>Gender breakdown </span>
        //     </CardHeader>
        //     <CardContent className="flex-1 pb-0">
        //         <ChartContainer
        //             config={chartConfig}
        //             className="mx-auto aspect-square max-h-[300px]"
        //         >
        //             <PieChart>
        //                 <Pie data={chartData} dataKey="visitors" />
        //             </PieChart>
        //         </ChartContainer>
        //     </CardContent>
        // </Card>

        <div>
            <PieCharts
                chartData={chartData}
                title={'Gender breakdown'}
                dataKey={'genderBreakdown'}
            />
        </div>
    )
}
