"use client";

import { TrendingDown } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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
  { month: "2020", desktop: 300, mobile: 300 },
  { month: "2021", desktop: 250, mobile: 250 },
  { month: "2022", desktop: 200, mobile: 190 },
  { month: "2023", desktop: 187, mobile: 180 },
  { month: "2024", desktop: 177, mobile: 170 },
  { month: "2025", desktop: 130, mobile: 130 },
];

const chartData2 = [
  { month: "2020", desktop: 3, mobile: 3.0 },
  { month: "2021", desktop: 2.5, mobile: 2.5 },
  { month: "2022", desktop: 2.0, mobile: 1.9 },
  { month: "2023", desktop: 1.87, mobile: 1.8 },
  { month: "2024", desktop: 1.77, mobile: 1.7 },
  { month: "2025", desktop: 13.0, mobile: 13.0 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function ChartEmpty() {
  return (
    <div>
      <p>
        No tienes analíticas en base de datos, sin embargo, te mostramos algunos
        gráficos que podrías empezar a visualizar al subir varias analíticas.
      </p>
      <Card>
        <CardHeader>
          <CardTitle>Colesterol</CardTitle>
          <CardDescription>
            Grafico de colesterol con tendencia basada en regresión lineal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='month'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey='desktop'
                type='natural'
                stroke='var(--color-desktop)'
                strokeWidth={2}
                dot={{
                  fill: "var(--color-desktop)",
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className='flex-col items-start gap-2 text-sm'>
          <div className='flex gap-2 font-medium leading-none'>
            Tendencia a la baja <TrendingDown className='h-4 w-4' />
          </div>
          <div className='leading-none text-muted-foreground'>
            Mostrando datos de las últimas 5 analíticas
          </div>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Leucotitos</CardTitle>
          <CardDescription>
            Los leucocitos son globulos blancos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData2}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='month'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey='desktop'
                type='natural'
                stroke='var(--color-desktop)'
                strokeWidth={2}
                dot={{
                  fill: "var(--color-desktop)",
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className='flex-col items-start gap-2 text-sm'>
          <div className='flex gap-2 font-medium leading-none'>
            Tendencia a la baja <TrendingDown className='h-4 w-4' />
          </div>
          <div className='leading-none text-muted-foreground'>
            Mostrando datos de las últimas 5 analíticas
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
