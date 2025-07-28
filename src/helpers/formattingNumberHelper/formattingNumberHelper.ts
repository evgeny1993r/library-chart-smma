export const formattingNumberHelper = (value: number): string => {
  const result = value.toLocaleString('ru-RU', {
    maximumFractionDigits: 10,
    minimumFractionDigits: 0,
  });

  return result;
};
