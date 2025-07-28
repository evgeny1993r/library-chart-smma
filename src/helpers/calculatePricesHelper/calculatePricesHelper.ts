import { calculatePriceObjectHelper } from 'src/helpers/calculatePriceObjectHelper';

import type { IKlines, IPrices } from 'src/interfaces';

interface IParameters {
  klines: IKlines;
  decimalPlaces: number;
}

export const calculatePricesHelper = ({ klines, decimalPlaces }: IParameters): IPrices => {
  const max = Math.max(...klines.map(({ high }) => high));
  const min = Math.min(...klines.map(({ low }) => low));

  const result = [
    calculatePriceObjectHelper(max, decimalPlaces),
    calculatePriceObjectHelper(max - ((max - min) / 4), decimalPlaces),
    calculatePriceObjectHelper(max - ((max - min) / 2), decimalPlaces),
    calculatePriceObjectHelper(min + ((max - min) / 4), decimalPlaces),
    calculatePriceObjectHelper(min, decimalPlaces),
  ];

  return result;
};
