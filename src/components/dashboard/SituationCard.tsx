import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import type { KpiMissingInfo } from "@/lib/kpiMissing";
import { KPI_STATUS_STYLES, type KPIStatusTone } from "@/lib/kpiStatus";

type SituationCardProps = {
  title: string;
  description: string;
  value?: number | string;
  unit: string;
  recomendation?: string;
  missingInfo?: KpiMissingInfo;
  statusLabel: string;
  statusTone: KPIStatusTone;
};

export default function SituationCard({
  title,
  description,
  value,
  unit,
  recomendation,
  missingInfo,
  statusLabel,
  statusTone,
}: SituationCardProps) {
  const isMissing = Boolean(missingInfo);
  const statusClass = KPI_STATUS_STYLES[statusTone];
  return (
    <Card className='w-64'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col items-center gap-1'>
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
              className={cn(
                "text-xs",
                isMissing && "text-muted-foreground/70"
              )}
            >
              {unit}
            </span>
          </div>
          <p className={cn("text-xs font-semibold", statusClass)}>
            {statusLabel}
          </p>
        </div>
        <div>
          {isMissing ? (
            // Keep missing microcopy calm and secondary to the KPI value.
            <p className='text-sm text-muted-foreground'>
              {missingInfo?.message}
            </p>
          ) : (
            <p className='text-xs text-muted-foreground'>{recomendation}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
