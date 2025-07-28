export const calculatePercentHelper = (one: number, two: number) => {
  const result = `${(((two - one) / one) * 100).toFixed(2)}%`;

  return result;
};
