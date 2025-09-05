"use client"

import { Pie, PieChart } from "recharts"
import {
    ChartConfig,
    ChartContainer,
} from "@/components/ui/chart"
import {cabinetGroteskMediumBold, inter, inter500} from "@/app/fonts";
import styles from './index.module.css'

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
        const visitorsArray : number[] = []
        chartData?.forEach(item => {
            visitorsArray.push(item.visitors);
        })
        return visitorsArray?.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    }

    const totalPercentage = getTotalPercentage()
    const chartConfig = generateChartConfig(chartData) satisfies  ChartConfig;


    console.log('total percentage', totalPercentage);

    return (
       <div className={`grid border max-h-fit h-full overflow-y-hidden py-3 px-2 rounded-md  border-[#D7D7D7] bg-white w-full `}>
               <div className={` w-full rounded-md overflow-y-hidden py-2 px-2  bg-[#F9F9F9] `}>
                   <div id={'chartDescription'} data-testid={'chartDescription'} className={`  py-3  md:text-[24px] text-black ${cabinetGroteskMediumBold.className} `}>{title}</div>
                   <div className={` ${styles.pieChartContainer}  flex  justify-between py-6  ${totalPercentage === 0 || !totalPercentage ? ' h-fit  md:h-fit   ' : 'h-fit '}  w-full    `}>
                       {totalPercentage === 0 || !totalPercentage  || isLoading ?
                            <div className={` ${styles.pieChartChart}  mr-2    aspect-square `}>
                                <div
                                    id={'emptyStateCircle'}
                                    data-testid={'emptyStateCircle'}
                                    className={` bg-[#ECECEC] ${isLoading ? 'animate-pulse' : ''}  h-full w-full   rounded-full    `}
                                >
                                </div>
                             </div>
                           :
                           <ChartContainer
                               config={chartConfig}
                               className="mx-auto flex justify-start w-full h-full  aspect-square "
                           >
                               <PieChart id={'pieChart'} data-testid={'pieChart'} >
                                   <Pie data={chartData} dataKey="visitors" nameKey="browser" />
                               </PieChart>
                           </ChartContainer>

                       }
                       <div id={'chartDataDescription'} data-testid={'chartDataDescription'} className={` ${styles.pieChartChart}  grid gap-2 self-end   mt-auto mb-auto `}>
                           {chartData?.map((item, index) => (
                               <div className={`  w-full   flex justify-between `} key={'key'+index}>
                                   {isLoading ?
                                   <div className={` w-full h-[2rem] rounded-md bg-blue550  animate-pulse  `}>
                                   </div>
                                   :
                                       <div className={` w-full  flex justify-between  `}>
                                           <div className={` flex w-fit gap-1 `}>
                                               <div
                                                   style={{backgroundColor: item?.fill}}
                                                   className={` aspect-square rounded-full  mt-auto mb-auto w-2 h-2  md:w-2.5 md:h-2.5  `}></div>
                                               <p id={'chartItem' + item?.browser} data-testid={'chartItem' + item?.browser} className={` text-[12px]  text-[#6A6B6A]  ${inter.className} `}>{item?.browser}</p>
                                           </div>
                                           <span id={'chartPercentage' + item?.browser} data-testid={'chartPercentage' + item?.browser} className={` text-black w-fit text-[12px] ${inter500.className}`}>{item?.visitors} %</span>
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