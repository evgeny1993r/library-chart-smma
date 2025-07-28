export const calculateDecimalPlacesHelper = (tickSize: string): number => {
  const parts = tickSize.split('.');

  return parts.length === 1 ? 0 : parts[1].length;
};
