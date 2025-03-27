'use client'
import React from 'react';
import { Bar, BarChart , XAxis, } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent  } from "@/components/ui/chart"

interface Props {
    componentId?: string;
    maxWidth: string;
    maxHeight: string;
}

const Index = ({componentId, maxHeight, maxWidth}: Props) => {


    const chartData = [
        { month: "Jan", desktop: 186, },
        { month: "Feb", desktop: 305,  },
        { month: "March", desktop: 237, },
        { month: "April", desktop: 73, },
        { month: "May", desktop: 209,  },
        { month: "June", desktop: 214,  },
    ]

    const chartConfig = {
        desktop: {
            label: "Desktop",
            color: "#142854",
        },
        // mobile: {
        //     label: "Mobile",
        //     color: "#60a5fa",
        // },
    } satisfies ChartConfig
    return (
            <div id={componentId}
                 data-testid={componentId}
                 className={`  w-fit h-full  `}
            >
                <ChartContainer config={chartConfig} className={ ` min-h-[200px] h-[300px] w-30 max-h-[${maxHeight ? maxHeight : '100%'}]  max-w-[${maxWidth}] `}>
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
                        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={0} />
                        {/*<Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />*/}
                    </BarChart>
                </ChartContainer>
            </div>
    );
};

export default Index;