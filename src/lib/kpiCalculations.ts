export function calculateNonHdl(
  totalCholesterol?: number,
  hdl?: number
): number | undefined {
  if (
    typeof totalCholesterol !== "number" ||
    !Number.isFinite(totalCholesterol) ||
    typeof hdl !== "number" ||
    !Number.isFinite(hdl)
  ) {
    return undefined;
  }

  return totalCholesterol - hdl;
}
