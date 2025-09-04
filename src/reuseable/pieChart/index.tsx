"use client"

import { Pie, PieChart } from "recharts"
import {
    ChartConfig,
    ChartContainer,
} from "@/components/ui/chart"
import {cabinetGroteskMediumBold, inter, inter500} from "@/app/fonts";


interface PieChartProps {
    title: string,
    dataKey: string, // what is the chart demonstrating
    chartData: {browser: string, visitors: number, fill: string}[], // browser is the chat item, visitors is the percentage of the chart item, the fill is the chart item color.
    isLoading?: boolean,
}

export function PieCharts({title, chartData, dataKey, isLoading}: PieChartProps) {



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

    const getTotalPercentage = () => {
        const tt : number[] = []
        chartData?.forEach(item => {
            tt.push(item.visitors);
        })
        return tt?.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    }

    const tooalll = getTotalPercentage()
    const chartConfig = generateChartConfig(chartData) satisfies  ChartConfig;



    return (
       <div className={`grid border max-h-fit h-full overflow-y-hidden py-3 px-2 rounded-md  border-[#D7D7D7] bg-white w-full `}>
               <div className={` w-full rounded-md overflow-y-hidden py-2 px-2  bg-[#F9F9F9] `}>
                   <div id={'chartDescription'} data-testid={'chartDescription'} className={`  py-3  md:text-[24px] text-black ${cabinetGroteskMediumBold.className} `}>{title}</div>
                   <div className={` flex justify-between py-6  ${tooalll === 0 || !tooalll ? ' h-[15rem] md:h-full  ' : 'h-full'}  w-full    `}>
                       {tooalll === 0 || !tooalll  || isLoading ?
                            <div className={` bg-red-200    aspect-square `}>
                                <div
                                    className={` bg-blue550 ${isLoading ? 'animate-pulse' : ''}  aspect-square rounded-full   max-h-[300px] md:max-h-[300px]  `}
                                >
                                </div>
                            </div>
                           :
                           <ChartContainer
                               config={chartConfig}
                               className="mx-auto aspect-square flex justify-start w-fit    max-h-[300px] md:max-h-[300px]"
                           >
                               <PieChart id={'pieChart'} className={' self-start  '} data-testid={'pieChart'}>
                                   <Pie data={chartData} dataKey="visitors" />
                               </PieChart>
                           </ChartContainer>

                       }
                       <div id={'chartDataDescription'} data-testid={'chartDataDescription'} className={`   grid gap-2 self-end w-[50%]  mt-auto mb-auto `}>
                           {chartData?.map((item, index) => (
                               <div className={`  w-full   flex justify-between `} key={'key'+index}>
                                   {isLoading ?
                                   <div className={` w-full h-[2rem] rounded-md bg-blue550  animate-pulse  `}>
                                   </div>
                                   :
                                       <div className={` w-full  flex justify-between  `}>
                                           <div className={` flex w-fit gap-2 `}>
                                               <div
                                                   style={{backgroundColor: item?.fill}}
                                                   className={` aspect-square rounded-full  mt-auto mb-auto w-2 h-2  md:w-2.5 md:h-2.5  `}></div>
                                               <p className={` text-[12px]  text-[#6A6B6A]  ${inter.className} `}>{item?.browser}</p>
                                           </div>
                                           <span className={` text-black w-fit text-[12px] ${inter500.className}`}>{item?.visitors} %</span>
                                       </div>
                                    }
                               </div>
                           ))}
                       </div>
                   </div>
               </div>
       </div>

    )
}