import { useState } from "react";
import { LineChart, Line, CartesianGrid, ReferenceLine, Dot } from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

type DataPoint = {
  date: string;
  [key: string]: number | string;
};

type MockData = {
  Lípidos: DataPoint[];
  Hematología: DataPoint[];
};

const mockData = {
  Lípidos: [
    { date: "Ene", Colesterol: 190, Triglicéridos: 120 },
    { date: "Feb", Colesterol: 195, Triglicéridos: 130 },
    { date: "Mar", Colesterol: 185, Triglicéridos: 125 },
    { date: "Abr", Colesterol: 200, Triglicéridos: 140 },
    { date: "May", Colesterol: 210, Triglicéridos: 150 },
    { date: "Jun", Colesterol: 220, Triglicéridos: 160 },
  ],
  Hematología: [
    { date: "Ene", Hemoglobina: 14, GlóbulosBlancos: 5.5 },
    { date: "Feb", Hemoglobina: 13.8, GlóbulosBlancos: 5.7 },
    { date: "Mar", Hemoglobina: 14.2, GlóbulosBlancos: 5.3 },
    { date: "Abr", Hemoglobina: 13.5, GlóbulosBlancos: 5.1 },
    { date: "May", Hemoglobina: 14.1, GlóbulosBlancos: 5.6 },
    { date: "Jun", Hemoglobina: 14.3, GlóbulosBlancos: 5.9 },
  ],
};

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

const categories = Object.keys(mockData) as (keyof MockData)[];

const AnalyticsChart = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const data = mockData[selectedCategory];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Serie Hematocitos</CardTitle>
        <CardDescription>Tendencia de {selectedCategory}</CardDescription>
      </CardHeader>
      <CardContent>
        <Select onValueChange={(value: any) => setSelectedCategory(value)}>
          <SelectTrigger>
            <SelectValue placeholder='Selecciona una categoría' />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category, index) => (
              <SelectItem key={index} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{ top: 24, right: 24, left: 0, bottom: 0 }}
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
            {Object.keys(data[0])
              .filter((key) => key !== "date")
              .map((key, index) => (
                <Line
                  key={index}
                  dataKey={key}
                  type='natural'
                  stroke='#8884d8'
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
              ))}
            {selectedCategory === "Lípidos" && (
              <ReferenceLine y={200} stroke='red' label='Límite' />
            )}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AnalyticsChart;
