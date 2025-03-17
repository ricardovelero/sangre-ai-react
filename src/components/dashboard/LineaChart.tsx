import { useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid, Dot, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { Skeleton } from "../ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type LineaChartProps = {
  title: string;
  description: string;
  parameters: string[];
  data: any[];
  loading: boolean;
  error: string | null;
};

const LineaChart = ({
  title,
  description,
  parameters,
  data,
  loading,
  error,
}: LineaChartProps) => {
  const [selectedParam, setSelectedParam] = useState("");

  useEffect(() => {
    setSelectedParam(parameters[0]);
  }, [parameters]);

  const chartConfig = {
    [selectedParam]: {
      label: selectedParam,
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Select onValueChange={(value: any) => setSelectedParam(value)}>
          <SelectTrigger>
            <SelectValue placeholder={parameters[0]} />
          </SelectTrigger>
          <SelectContent>
            {parameters.map((parameter, index) => (
              <SelectItem key={index} value={parameter}>
                {parameter}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {loading ? (
          <Skeleton className='w-full h-[200px] mt-4' />
        ) : error ? (
          <div className='flex items-center justify-center h-[200px]'>
            <p className='text-red-500'>{error}</p>
          </div>
        ) : (
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={data}
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
              <XAxis
                dataKey='fecha'
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(6, 10)}
              />
              <Line
                dataKey={selectedParam}
                type='natural'
                stroke='hsl(var(--chart-3))'
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
        )}
      </CardContent>
    </Card>
  );
};

export default LineaChart;
