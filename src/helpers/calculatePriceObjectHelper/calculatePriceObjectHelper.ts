import { formattingNumberHelper } from 'src/helpers/formattingNumberHelper';

export const calculatePriceObjectHelper = (value: number, decimal: number) => {
  const formattedValue = Number(value.toFixed(decimal));

  return {
    text: formattingNumberHelper(formattedValue),
    value: formattedValue,
  };
};
