import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { referenceValues } from "@/lib/referenceValues";
import { cn } from "@/lib/utils";

type BloodTestHeatmapProps = {
  data: any[];
  loading: boolean;
  error: string | null;
};

const BloodTestHeatmap = ({ data, loading, error }: BloodTestHeatmapProps) => {
  const [parameters, setParameters] = useState<string[]>([]);
  const [variationData, setVariationData] = useState<Record<string, any>>({});

  useEffect(() => {
    if (!data || data.length < 2) return;

    // Get the last two blood tests
    const lastTest = data[data.length - 1]?.valores || {};
    const previousTest = data[data.length - 2]?.valores || {};

    // Extract all parameters that are in both tests
    const paramKeys = Object.keys(lastTest).filter(
      (key) =>
        key in previousTest &&
        key in referenceValues &&
        lastTest[key] !== null &&
        previousTest[key] !== null
    );

    // Calculate variations for each parameter
    const variations: Record<string, any> = {};

    paramKeys.forEach((param) => {
      const current = Number(lastTest[param]);
      const previous = Number(previousTest[param]);
      const refValue = referenceValues[param];

      // Calculate percentage change
      const change = current - previous;
      const percentChange =
        previous !== 0 ? (change / Math.abs(previous)) * 100 : 0;

      // Determine if the change is good, bad, or neutral
      let status: "good" | "bad" | "neutral" = "neutral";

      if (Math.abs(percentChange) < 1) {
        status = "neutral"; // Very small change, consider it neutral
      } else if (refValue) {
        if (refValue.type === "max") {
          // For max values, decreasing is good, increasing is bad
          status = percentChange < 0 ? "good" : "bad";
        } else if (refValue.type === "min") {
          // For min values, increasing is good, decreasing is bad
          status = percentChange > 0 ? "good" : "bad";
        } else if (refValue.type === "range") {
          // For range values, we need to check if we're moving toward or away from the range
          const wasBelowRange = previous < (refValue.min || 0);
          const wasAboveRange = previous > (refValue.max || Infinity);
          const isNowBelowRange = current < (refValue.min || 0);
          const isNowAboveRange = current > (refValue.max || Infinity);

          if (wasBelowRange) {
            status = percentChange > 0 ? "good" : "bad"; // Moving up toward range is good
          } else if (wasAboveRange) {
            status = percentChange < 0 ? "good" : "bad"; // Moving down toward range is good
          } else if (!isNowBelowRange && !isNowAboveRange) {
            status = "good"; // Staying in range is good
          } else {
            status = "bad"; // Moving outside range is bad
          }
        }
      }

      variations[param] = {
        previous,
        current,
        change,
        percentChange: Number(percentChange.toFixed(1)),
        status,
        unit: refValue?.unit || "",
      };
    });

    setParameters(
      paramKeys.sort((a, b) => {
        // Sort by category based on keys in referenceValues
        const categories = [
          /^(colesterol|LDL|HDL|trigliceridos)/, // Lípidos
          /^(leucocitos|neutrofilos|linfocitos|monocitos|eosinofilos|basofilos)/, // Serie Blanca
          /^(hematies|hemoglobina|hematocrito|VCM|HCM|CHCM)/, // Serie Roja
          /^(plaquetas|VPM)/, // Serie Plaquetar
          /^(VSG)/, // Eritrosedimentación
          /^(glucosa|hemoglobina_glicosilada|creatinina|urea|acido_urico)/, // Bioquímica
          /^(TGO|TGP|GGT|fosfatasa_alcalina)/, // Transaminasas
          /^(proteinas_totales|albumina)/, // Proteínas
          /^(proteina_c_reactiva|factor_reumatoide|anticuerpos_antinucleares|antiCCP)/, // Reumáticas
          /^(TSH|T3|T4|FSH|LH|testosterona|estradiol|progesterona|prolactina|vitamina_d3)/, // Hormonas
          /^(PSA|CEA|AFP|CA_125|CA_19_9)/, // Marcadores Tumorales
        ];

        const getCategoryIndex = (param: string) => {
          return categories.findIndex((regex) => regex.test(param));
        };

        const catIndexA = getCategoryIndex(a);
        const catIndexB = getCategoryIndex(b);

        if (catIndexA !== catIndexB) return catIndexA - catIndexB;
        return a.localeCompare(b);
      })
    );
    setVariationData(variations);
  }, [data]);

  // Color mappings based on status
  const getStatusColor = (status: string, percentChange: number) => {
    const absChange = Math.abs(percentChange);

    if (status === "good") {
      if (absChange > 10) return "bg-green-600 text-white";
      return "bg-green-200 text-green-800";
    } else if (status === "bad") {
      if (absChange > 10) return "bg-red-600 text-white";
      return "bg-red-200 text-red-800";
    }
    return "bg-gray-100 text-gray-800";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Heatmap de Variaciones</CardTitle>
        <CardDescription>
          Cambios entre las dos últimas analíticas
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className='w-full h-96' />
        ) : error ? (
          <div className='text-red-500 p-4'>{error}</div>
        ) : parameters.length === 0 ? (
          <div className='text-gray-500 p-4'>
            Se necesitan al menos dos analíticas para mostrar variaciones
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
            {parameters.map((param) => {
              const variation = variationData[param];
              return (
                <div
                  key={param}
                  className={cn(
                    "p-3 rounded-md transition-colors",
                    getStatusColor(variation.status, variation.percentChange)
                  )}
                >
                  <div className='font-medium'>{param}</div>
                  <div className='flex justify-between text-sm'>
                    <span>
                      {variation.current} {variation.unit}
                    </span>
                    <span className='flex items-center'>
                      {variation.percentChange > 0 ? "+" : ""}
                      {variation.percentChange}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BloodTestHeatmap;
