export function getXValueInRange(
  rangeStart: number,
  rangeEnd: number,
  maxDivisions: number,
  divisionIndex: number
) {
  const divisionSize = (rangeEnd - rangeStart) / maxDivisions;
  const x = rangeStart + divisionIndex * divisionSize + divisionSize / 2;
  return x;
}
