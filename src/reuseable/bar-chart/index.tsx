'use client'
import React from 'react';
import { Bar, BarChart , XAxis, } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent  } from "@/components/ui/chart"

interface Props {
    componentId?: string;
    maxWidth: string;
    maxHeight: string;
    chartData: {month: string, value: number}[];
    dataKey: string;
    // chartConfig: {}
}

const MeedlBarChart = ({componentId, dataKey,chartData, maxHeight, maxWidth}: Props) => {



    const chartConfig = {
        desktop: {
            label: "Desktop",
            color: "#142854",
        },
    } satisfies ChartConfig
    return (
            <div id={componentId}
                 data-testid={componentId}
                 className={`  w-full h-fit   `}
            >

                <ChartContainer config={chartConfig} className={ ` mr-auto  ml-auto min-h-[200px] h-[300px] w-[70vw] md:w-[${maxWidth}] max-h-[${maxHeight ? maxHeight : '100%'}]  `}>
                    <BarChart accessibilityLayer  data={chartData}>
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                            className={` text-[10px] text-[#757575] `}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar  dataKey={dataKey} fill="var(--color-desktop)" radius={0} />
                    </BarChart>
                </ChartContainer>
            </div>
    );
};

export default MeedlBarChart;