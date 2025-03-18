import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  Dot,
  XAxis,
  ReferenceLine,
} from "recharts";
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
  CardFooter,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import { useTrendAnalysis } from "@/hooks/useTrendAnalysis";
import { referenceValues } from "@/lib/referenceValues";
import { cn } from "@/lib/utils";

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
  const [selectedParam, setSelectedParam] = useState(parameters[0] || "");
  const trend = useTrendAnalysis(data, selectedParam);
  const referenceValue = referenceValues[selectedParam];

  // Establece el primer parámetro como seleccionado por defecto
  useEffect(() => {
    setSelectedParam(parameters[0]);
  }, [parameters]);

  const TrendIcon =
    trend.direction === "up"
      ? TrendingUp
      : trend.direction === "down"
      ? TrendingDown
      : Minus;

  const trendColor = (() => {
    if (!referenceValue) return "text-gray-500"; // Si no hay referencia, usar color neutral

    if (trend.direction === "stable") return "text-gray-500";

    // Si el parámetro tiene un valor máximo recomendado (tipo "max"), es bueno que baje
    if (referenceValue.type === "max") {
      return trend.direction === "down" ? "text-green-500" : "text-red-500";
    }

    // Si el parámetro tiene un valor mínimo recomendado (tipo "min"), es bueno que suba
    if (referenceValue.type === "min") {
      return trend.direction === "up" ? "text-green-500" : "text-red-500";
    }

    return "text-gray-500"; // Default para "target" u otros casos
  })();

  const getReferenceLineColor = (type: "max" | "min" | "target") => {
    switch (type) {
      case "max":
        return "var(--destructive)";
      case "min":
        return "var(--destructive)";
      case "target":
        return "var(--primary)";
      default:
        return "var(--muted)";
    }
  };

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
        <Select
          value={selectedParam}
          onValueChange={(value) => setSelectedParam(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder='Selecciona una categoría' />
          </SelectTrigger>
          <SelectContent>
            {parameters.map((parameter) => (
              <SelectItem key={parameter} value={parameter}>
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
              data={data.map((item) => item.valores)}
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
                    nameKey={selectedParam}
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
              {referenceValue && (
                <>
                  {/* Línea de referencia para el valor mínimo (si aplica) */}
                  {referenceValue.min !== undefined && (
                    <ReferenceLine
                      y={referenceValue.min}
                      stroke={getReferenceLineColor("min")}
                      strokeDasharray='3 3'
                      label={{
                        value: `Mín: ${referenceValue.min}`,
                        position: "right",
                        fill: getReferenceLineColor("min"),
                        fontSize: 10,
                      }}
                    />
                  )}

                  {/* Línea de referencia para el valor máximo (si aplica) */}
                  {referenceValue.max !== undefined && (
                    <ReferenceLine
                      y={referenceValue.max}
                      stroke={getReferenceLineColor("max")}
                      strokeDasharray='3 3'
                      label={{
                        value: `Máx: ${referenceValue.max}`,
                        position: "right",
                        fill: getReferenceLineColor("max"),
                        fontSize: 10,
                      }}
                    />
                  )}

                  {/* Línea de referencia para valores objetivo (si aplica) */}
                  {referenceValue.max !== undefined &&
                    referenceValue.type === "target" && (
                      <ReferenceLine
                        y={referenceValue.max}
                        stroke={getReferenceLineColor("target")}
                        strokeDasharray='3 3'
                        label={{
                          value: referenceValue.label,
                          position: "right",
                          fill: getReferenceLineColor("target"),
                          fontSize: 10,
                        }}
                      />
                    )}
                </>
              )}
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
      <CardFooter className='flex-col items-start gap-2 text-sm'>
        <div className={cn("flex gap-2 font-medium leading-none", trendColor)}>
          {trend.direction === "stable" ? (
            "Sin cambios significativos"
          ) : (
            <>
              {trend.direction === "up" ? "Subió" : "Bajó"} un{" "}
              {trend.percentage}%
              <TrendIcon className='h-4 w-4' />
            </>
          )}
        </div>
        <div className='leading-none text-muted-foreground'>
          Mostrando las últimas {trend.recentCount} analíticas
        </div>
      </CardFooter>
    </Card>
  );
};

export default LineaChart;
