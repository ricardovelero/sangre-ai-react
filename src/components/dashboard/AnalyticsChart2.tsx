import { TrendingUp } from "lucide-react";
import { CartesianGrid, Dot, Line, LineChart } from "recharts";

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
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartData2 = [
  { date: "Ene", Colesterol: 190, Triglicéridos: 120 },
  { date: "Feb", Colesterol: 195, Triglicéridos: 130 },
  { date: "Mar", Colesterol: 185, Triglicéridos: 125 },
  { date: "Abr", Colesterol: 200, Triglicéridos: 140 },
  { date: "May", Colesterol: 210, Triglicéridos: 150 },
  { date: "Jun", Colesterol: 220, Triglicéridos: 160 },
];

const chartConfig = {
  Colesterol: {
    label: "Colesterol",
    color: "hsl(var(--chart-2))",
  },
  Triglicéridos: {
    label: "Triglicéridos",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function AnalyticsChart2() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Serie Lípidos</CardTitle>
        <CardDescription>
          Muestra tendencia para los diferentes valores y tipos de colesterol
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData2}
            margin={{
              top: 24,
              left: 24,
              right: 24,
            }}
          >
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator='line'
                  nameKey='Colesterol'
                  hideLabel
                />
              }
            />
            <Line
              dataKey='Colesterol'
              type='natural'
              stroke='var(--color-Colesterol)'
              strokeWidth={2}
              dot={({ payload, ...props }) => {
                return (
                  <Dot
                    key={payload.browser}
                    r={5}
                    cx={props.cx}
                    cy={props.cy}
                    fill={payload.fill}
                    stroke={payload.fill}
                  />
                );
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col items-start gap-2 text-sm'>
        <div className='flex gap-2 font-medium leading-none'>
          Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
        </div>
        <div className='leading-none text-muted-foreground'>
          Mostrando los datos de las última seis analíticas
        </div>
      </CardFooter>
    </Card>
  );
}
