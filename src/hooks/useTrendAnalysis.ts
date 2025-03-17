interface TrendAnalysisResult {
  percentage: number;
  direction: "up" | "down" | "stable";
  recentCount: number;
}

export const useTrendAnalysis = (
  data: any[],
  parameter: string,
  sampleSize = 6
): TrendAnalysisResult => {
  if (!data || data.length < 2) {
    return {
      percentage: 0,
      direction: "stable",
      recentCount: 0,
    };
  }

  // Get the most recent samples
  const recentSamples = data
    .slice(-sampleSize)
    .filter((item) => item[parameter] !== null && item[parameter] !== undefined)
    .map((item) => Number(item[parameter]));

  if (recentSamples.length < 2) {
    return {
      percentage: 0,
      direction: "stable",
      recentCount: recentSamples.length,
    };
  }

  // Calculate the percentage change between the first and last value
  const oldestValue = recentSamples[0];
  const newestValue = recentSamples[recentSamples.length - 1];
  const change = newestValue - oldestValue;
  const percentageChange = (change / Math.abs(oldestValue)) * 100;

  return {
    percentage: Math.abs(Number(percentageChange.toFixed(1))),
    direction:
      percentageChange > 0 ? "up" : percentageChange < 0 ? "down" : "stable",
    recentCount: recentSamples.length,
  };
};
