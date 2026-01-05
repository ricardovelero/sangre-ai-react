export type MetabolicMetricKey =
  | "tgHdlRatio"
  | "glucose"
  | "hba1c"
  | "homaIr";

export type MetabolicMetricsInput = Partial<
  Record<MetabolicMetricKey, number>
>;

export type MetabolicStatusLevel = "healthy" | "watch" | "altered";

export type MetabolicStatusResult = {
  level: MetabolicStatusLevel;
  missingMetrics: MetabolicMetricKey[];
  outOfOptimalCount: number;
  alteredCount: number;
  partial: boolean;
};

type MetabolicMetricDefinition = {
  key: MetabolicMetricKey;
  optimalMax: number;
  alteredMin?: number;
};

const METABOLIC_METRICS: MetabolicMetricDefinition[] = [
  { key: "tgHdlRatio", optimalMax: 2, alteredMin: 3 },
  { key: "glucose", optimalMax: 100 },
  { key: "hba1c", optimalMax: 5.7, alteredMin: 6.5 },
  { key: "homaIr", optimalMax: 2, alteredMin: 2.5 },
];

export function evaluateMetabolicStatus(
  metrics: MetabolicMetricsInput
): MetabolicStatusResult {
  const missingMetrics: MetabolicMetricKey[] = [];
  let outOfOptimalCount = 0;
  let alteredCount = 0;

  METABOLIC_METRICS.forEach((metric) => {
    const value = metrics[metric.key];
    const hasValue = typeof value === "number" && Number.isFinite(value);

    if (!hasValue) {
      missingMetrics.push(metric.key);
      return;
    }

    if (value >= metric.optimalMax) {
      outOfOptimalCount += 1;
    }

    if (metric.alteredMin !== undefined && value >= metric.alteredMin) {
      alteredCount += 1;
    }
  });

  const missingCount = missingMetrics.length;
  let level: MetabolicStatusLevel;

  // "Multiple metrics altered" is treated as 3+ out of optimal to keep 1-2 as watch.
  if (alteredCount > 0 || outOfOptimalCount >= 3) {
    level = "altered";
  } else if (outOfOptimalCount >= 1) {
    level = "watch";
  } else if (missingCount <= 1) {
    level = "healthy";
  } else {
    level = "watch";
  }

  return {
    level,
    missingMetrics,
    outOfOptimalCount,
    alteredCount,
    partial: missingCount > 0,
  };
}
