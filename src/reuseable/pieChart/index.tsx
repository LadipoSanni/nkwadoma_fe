"use client"

import { Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
} from "@/components/ui/chart"
import {cabinetGroteskMediumBold, inter, inter500} from "@/app/fonts";


interface PieChartProps {
    title: string,
    dataKey: string, // what is the chart demonstrating
    chartData: {browser: string, visitors: number, fill: string}[], // browser is the chat item, visitors is the percentage of the chart item, the fill is the chart item color.
}

export function PieCharts({title, chartData, dataKey}: PieChartProps) {



    function generateChartConfig (data: typeof chartData){
        const config: Record<string, { label: string; color: string }> = {};

        data.forEach(item => {
            const key = item.browser?.toLowerCase();
            config[key] = {
                label: item?.browser,
                color: item?.fill,
            };
        });

        return {
            [dataKey]:{label: dataKey},
            ...config,
        };
    }


    const chartConfig = generateChartConfig(chartData) satisfies  ChartConfig;
    console.log('chartConfig', chartConfig);

    return (
        <div className={`flex border py-2 px-2 rounded-md  border-[#D7D7D7] bg-white w-full justify-between `}>
            <div className={` flex rounded-md w-full h-full bg-[#F9F9F9]  `}>
                <Card
                    id={'pieChart'+ dataKey}
                    data-testid={'pieChart'+ dataKey}
                    className="flex bg-[#F9F9F9]  flex-col">
                    <CardHeader className="items-center pb-0">
                        <CardDescription id={'chartDescription'} data-testid={'chartDescription'} className={` md:text-[24px] text-black ${cabinetGroteskMediumBold.className} `}>{title}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex  items-center pb-0">
                        <ChartContainer
                            config={chartConfig}
                            className="mx-auto aspect-square   max-h-[300px] md:min-h-[300px]"
                        >
                            <PieChart id={'pieChart'} className={' '} data-testid={'pieChart'}>
                                <Pie data={chartData} dataKey="visitors" />
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <div id={'chartDataDescription'} data-testid={'chartDataDescription'} className={`  grid gap-2  w-full pr-4  mt-auto mb-auto `}>
                    {chartData?.map((item, index) => (
                        <div className={`  flex justify-between `} key={index}>
                            <div className={` flex  gap-2 `}>
                                <div
                                    style={{backgroundColor: item?.fill}}
                                    className={` aspect-square rounded-full mt-auto mb-auto w-2 h-2  md:w-2.5 md:h-2.5  `}></div>
                                <p className={` text-[12px] text-[#6A6B6A]  ${inter.className} `}>{item?.browser}</p>
                            </div>
                            <span className={`text-black text-[12px] ${inter500.className}`}>{item?.visitors} %</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}