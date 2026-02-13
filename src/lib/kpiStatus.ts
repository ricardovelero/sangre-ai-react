import type { KpiKey } from "@/lib/kpiTypes";

export type KPIStatus = "optimal" | "attention" | "outOfRange";
export type KPIStatusTone = KPIStatus | "missing";

export const KPI_STATUS_LABELS: Record<KPIStatus, string> = {
  optimal: "Optimal",
  attention: "Needs attention",
  outOfRange: "Out of range",
};

export const KPI_STATUS_STYLES: Record<KPIStatusTone, string> = {
  optimal: "text-emerald-600",
  attention: "text-amber-600",
  outOfRange: "text-rose-600",
  missing: "text-muted-foreground",
};

export const MISSING_STATUS_LABEL = "Sin datos";

type KpiStatusRule = {
  status: KPIStatus;
  min?: number;
  max?: number;
};

const KPI_STATUS_RULES: Record<KpiKey, KpiStatusRule[]> = {
  nonHdl: [
    { status: "optimal", max: 130 },
    { status: "attention", min: 130, max: 160 },
    { status: "outOfRange", min: 160 },
  ],
  triglycerides: [
    { status: "optimal", max: 80 },
    { status: "attention", min: 80, max: 100 },
    { status: "outOfRange", min: 100 },
  ],
  hdl: [
    { status: "outOfRange", max: 40 },
    { status: "optimal", min: 40, max: 80 },
    { status: "outOfRange", min: 80 },
  ],
  ldl: [
    { status: "optimal", max: 100 },
    { status: "attention", min: 100, max: 160 },
    { status: "outOfRange", min: 160 },
  ],
  glucose: [
    { status: "outOfRange", max: 70 },
    { status: "optimal", min: 70, max: 100 },
    { status: "attention", min: 100, max: 126 },
    { status: "outOfRange", min: 126 },
  ],
  hba1c: [
    { status: "optimal", max: 5.7 },
    { status: "attention", min: 5.7, max: 6.5 },
    { status: "outOfRange", min: 6.5 },
  ],
  homaIr: [
    { status: "optimal", max: 2 },
    { status: "attention", min: 2, max: 2.5 },
    { status: "outOfRange", min: 2.5 },
  ],
  tgHdlRatio: [
    { status: "optimal", max: 2 },
    { status: "attention", min: 2, max: 4 },
    { status: "outOfRange", min: 4 },
  ],
};

const isWithinRange = (value: number, rule: KpiStatusRule) => {
  const meetsMin = rule.min === undefined || value >= rule.min;
  const meetsMax = rule.max === undefined || value < rule.max;
  return meetsMin && meetsMax;
};

export function evaluateKpiStatus(
  key: KpiKey,
  value: number
): KPIStatus {
  const rules = KPI_STATUS_RULES[key];
  const match = rules.find((rule) => isWithinRange(value, rule));

  // Fall back to the most conservative state if no rule matches.
  return match?.status ?? "outOfRange";
}
