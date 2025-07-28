import { calculatePriceObjectHelper } from 'src/helpers';

import type { IKline, ILastPrice } from 'src/interfaces';

export const calculateLastPriceHelper = (kline: IKline, decimalPlaces: number): ILastPrice => {
  const { open, close } = kline;

  const type = open > close ? 'BEARISH' : 'BULLISH';

  const { value, text } = calculatePriceObjectHelper(close, decimalPlaces);

  return {
    value,
    text,
    type,
  };
};
