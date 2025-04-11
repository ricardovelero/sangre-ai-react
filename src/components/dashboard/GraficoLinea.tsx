import { TrendingUp } from "lucide-react";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  {
    año: "2014",
    "colesterol no hdl": 181,
    "colesterol total": 212,
    ldl: 127.2,
  },
  { año: "2018", "colesterol no hdl": 168, "colesterol total": 210, ldl: 143 },
  { año: "2021", "colesterol no hdl": 149, "colesterol total": 193, ldl: 132 },
  { año: "2022", "colesterol no hdl": 175, "colesterol total": 214, ldl: 149 },
  { año: "2024", "colesterol no hdl": 175, "colesterol total": 217, ldl: 148 },
  { año: "2025", "colesterol no hdl": 204, "colesterol total": 241, ldl: 170 },
];

const chartConfig = {
  noHdl: {
    color: "var(--chart-1)",
  },
  ldl: {
    color: "var(--chart-2)",
  },
  total: {
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export default function GraficoLinea() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart - Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='año'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 4)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='line' />}
            />
            <Line
              dataKey='colesterol no hdl'
              type='natural'
              stroke='var(--color-noHdl)'
              strokeWidth={2}
              dot={{
                fill: "var(--color-noHdl)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position='top'
                offset={12}
                className='fill-foreground'
                fontSize={12}
              />
            </Line>
            <Line
              dataKey='colesterol total'
              type='natural'
              stroke='var(--color-total)'
              strokeWidth={2}
              dot={{
                fill: "var(--color-total)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position='top'
                offset={12}
                className='fill-foreground'
                fontSize={12}
              />
            </Line>
            <Line
              dataKey='ldl'
              type='natural'
              stroke='var(--color-ldl)'
              strokeWidth={2}
              dot={{
                fill: "var(--color-ldl)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position='top'
                offset={12}
                className='fill-foreground'
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col items-start gap-2 text-sm'>
        <div className='flex gap-2 font-medium leading-none'>
          Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
        </div>
        <div className='leading-none text-muted-foreground'>
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
