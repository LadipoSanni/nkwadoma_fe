"use client"

import { Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart"

export const description = "A pie chart with a legend"

const chartData = [
    { browser: "chrome", visitors: 275, fill: "#0E1C3C" },
    { browser: "safari", visitors: 200, fill: "#57595D" },
    { browser: "firefox", visitors: 187, fill: '#FCF992' },
    { browser: "edge", visitors: 173, fill: "#C81A14" },
    { browser: "other", visitors: 90, fill: "#C81A14" },
]

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    chrome: {
        label: "Chrome",
        color: "#0E1C3C",
    },
    safari: {
        label: "Safari",
        color: "#FCF992",
    },
    firefox: {
        label: "Firefox",
        color: "#57595D",
    },
    edge: {
        label: "Edge",
        color: "#05501E",
    },
    other: {
        label: "Other",
        color: "#C81A14",
    },
} satisfies ChartConfig

export function ChartPieLegend() {
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Pie Chart - Legend</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[300px]"
                >
                    <PieChart>
                        <Pie data={chartData} dataKey="visitors" />
                        <ChartLegend
                            content={<ChartLegendContent nameKey="browser" />}
                            className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
