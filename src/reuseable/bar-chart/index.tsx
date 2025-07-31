'use client'
import React from 'react';
import { Bar, BarChart , XAxis, } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent  } from "@/components/ui/chart"

interface Props {
    componentId?: string;
    chartData: {month: string, value: number}[];
    dataKey: string;
    // chartConfig: {}
}

const MeedlBarChart = ({componentId, dataKey,chartData}: Props) => {



    const chartConfig = {
        desktop: {
            label: "Desktop",
            color: "#142854",
        },
    } satisfies ChartConfig
    return (
            <div id={componentId}
                 data-testid={componentId}
                 className={`  w-full h-fit md:w-full   `}
            >

        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
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