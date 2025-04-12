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
import { cn, toTitleCase } from "@/lib/utils";
import { SeriesResult } from "@/types/analitica.types";
import { format } from "date-fns";

type LineaChartProps = {
  title: string;
  description: string;
  parameters: string[];
  data: SeriesResult[];
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
  const referenceValue = referenceValues[selectedParam || ""];

  // Establece el primer parámetro como seleccionado por defecto
  useEffect(() => {
    setSelectedParam(parameters[0]);
  }, [parameters]);

  const valores = data.map((d) => {
    const resultadoObj = {
      fecha: format(d.fecha_toma_muestra, "dd-MM-yyyy"),
    };

    d.resultados.forEach((resultado) => {
      if (resultado.nombre_normalizado) {
        (resultadoObj as Record<string, number | string>)[
          resultado.nombre_normalizado
        ] = parseFloat(resultado.valor);
      }
    });

    return resultadoObj;
  });

  const trend = useTrendAnalysis(valores, selectedParam || "");

  // Format prediction with units if available
  const formatPrediction = (value: number, unit?: string) => {
    return `${value}${unit ? ` ${unit}` : ""}`;
  };

  // Establece el icono de la tendencia
  const TrendIcon =
    trend.direction === "up"
      ? TrendingUp
      : trend.direction === "down"
      ? TrendingDown
      : Minus;

  const trendColor = (() => {
    if (!referenceValue) return "text-muted-foreground"; // Si no hay referencia, usar color neutral

    if (trend.direction === "stable") return "text-muted-foreground";

    // Si el parámetro tiene un valor máximo recomendado (tipo "max"), es bueno que baje
    if (referenceValue.type === "max") {
      return trend.direction === "down" ? "text-green-500" : "text-red-700";
    }

    // Si el parámetro tiene un valor mínimo recomendado (tipo "min"), es bueno que suba
    if (referenceValue.type === "min") {
      return trend.direction === "up" ? "text-green-500" : "text-red-700";
    }

    return "text-muted-foreground"; // Default para "target" u otros casos
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
      color: "var(--chart-1)",
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
                {toTitleCase(parameter)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {loading ? (
          <Skeleton className='w-full h-[200px] mt-4' />
        ) : error ? (
          <div className='flex items-center justify-center h-[200px]'>
            <p className='text-destructive'>{error}</p>
          </div>
        ) : (
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={valores}
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
                tickFormatter={(value) => value.split("-").pop()}
                tickLine={false}
                tickMargin={10}
                axisLine={false}
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
                        position: "insideTopRight",
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
                        position: "insideTopRight",
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
                          position: "insideTopLeft",
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
                stroke='var(--primary)'
                strokeWidth={2}
                dot={({ payload, index, ...props }) => {
                  return (
                    <Dot
                      key={`dot-${index}-${payload[selectedParam]}`}
                      r={3}
                      cx={props.cx}
                      cy={props.cy}
                      fill='white'
                      stroke='var(--primary)'
                    />
                  );
                }}
                activeDot={({ ...props }) => (
                  <Dot
                    r={5}
                    cx={props.cx}
                    cy={props.cy}
                    fill='var(--chart-1)'
                    stroke='var(--chart-1)'
                  />
                )}
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
              Tendencia{" "}
              {trend.direction === "up" ? "ascendente" : "descendente"}
              <TrendIcon className='h-4 w-4' />
            </>
          )}
        </div>
        <div className='leading-none text-muted-foreground'>
          Predicción en 6 meses:{" "}
          {formatPrediction(trend.prediction, referenceValue?.unit)}
        </div>
        <div className='leading-none text-muted-foreground'>
          Basado en las últimas {trend.recentCount} analíticas
        </div>
      </CardFooter>
    </Card>
  );
};

export default LineaChart;
