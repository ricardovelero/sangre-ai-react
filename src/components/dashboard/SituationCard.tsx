import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { RiskResponse } from "@/lib/riksAssestment";
import type { KpiMissingInfo } from "@/lib/kpiMissing";

type SituationCardProps = {
  title: string;
  description: string;
  value?: number | string;
  unit: string;
  risk: RiskResponse;
  recomendation?: string;
  missingInfo?: KpiMissingInfo;
};

export default function SituationCard({
  title,
  description,
  value,
  unit,
  risk,
  recomendation,
  missingInfo,
}: SituationCardProps) {
  const isMissing = Boolean(missingInfo);
  const riskColorClass = {
    low: "text-green-500",
    medium: "text-yellow-500",
    high: "text-red-500",
    invalid: "text-gray-500",
  }[risk.nivel];
  return (
    <Card className='w-64'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex items-baseline justify-center gap-1'>
          <span
            className={cn(
              "text-5xl",
              isMissing && "text-muted-foreground/70"
            )}
          >
            {value}
          </span>
          <span
            className={cn("text-xs", isMissing && "text-muted-foreground/70")}
          >
            {unit}
          </span>
        </div>
        <div>
          {isMissing ? (
            // Missing state keeps a calm tone and a passive CTA.
            <p className='text-sm text-muted-foreground'>
              {missingInfo?.message}
            </p>
          ) : (
            <>
              <p className={cn("text-sm", riskColorClass)}>{risk.mensaje}</p>
              <p className='text-xs'>{recomendation}</p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
