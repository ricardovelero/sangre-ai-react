interface TrendAnalysisResult {
  prediction: number;
  direction: "up" | "down" | "stable";
  recentCount: number;
  slope: number;
}

/**
 * Hook that analyzes trend data using linear regression and predicts future values
 * @param data - Array of data points
 * @param parameter - The parameter to analyze
 * @param sampleSize - Number of recent samples to consider
 * @returns Trend analysis with direction and 6-month prediction
 */
export const useTrendAnalysis = (
  data: any[],
  parameter: string,
  sampleSize = 6
): TrendAnalysisResult => {
  if (!data || data.length < 2) {
    return {
      prediction: 0,
      direction: "stable",
      recentCount: 0,
      slope: 0,
    };
  }

  // Get the most recent samples with their indices (x values)
  const recentData = data
    .slice(-sampleSize)
    .filter(
      (item) =>
        item.valores &&
        item.valores[parameter] !== null &&
        item.valores[parameter] !== undefined
    );

  const recentSamples = recentData.map((item, index) => ({
    x: index,
    y: Number(item.valores[parameter]),
  }));

  if (recentSamples.length < 2) {
    return {
      prediction: 0,
      direction: "stable",
      recentCount: recentSamples.length,
      slope: 0,
    };
  }

  // Linear regression implementation
  // y = mx + b where m is slope and b is y-intercept
  const n = recentSamples.length;

  // Calculate means
  const sumX = recentSamples.reduce((sum, point) => sum + point.x, 0);
  const sumY = recentSamples.reduce((sum, point) => sum + point.y, 0);
  const meanX = sumX / n;
  const meanY = sumY / n;

  // Calculate slope (m) and y-intercept (b)
  const numerator = recentSamples.reduce(
    (sum, point) => sum + (point.x - meanX) * (point.y - meanY),
    0
  );
  const denominator = recentSamples.reduce(
    (sum, point) => sum + Math.pow(point.x - meanX, 2),
    0
  );

  // Avoid division by zero
  const slope = denominator !== 0 ? numerator / denominator : 0;
  const intercept = meanY - slope * meanX;

  // Determine direction based on slope
  const direction =
    Math.abs(slope) < 0.001 ? "stable" : slope > 0 ? "up" : "down";

  // Calculate prediction for 6 months in the future
  // Assuming each index step is a time unit, and we want to predict 6 steps ahead
  const predictionIndex = n - 1 + 6;
  const prediction = slope * predictionIndex + intercept;

  return {
    prediction: Number(prediction.toFixed(1)),
    direction,
    recentCount: recentSamples.length,
    slope: Number(slope.toFixed(4)),
  };
};
