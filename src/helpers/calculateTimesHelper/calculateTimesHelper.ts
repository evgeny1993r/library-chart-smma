import type { IKlines, ITimes, IInterval } from 'src/interfaces';

import { calculateTimeStepHelper } from 'src/helpers/calculateTimeStepHelper';
import { formattingTimeHelper } from 'src/helpers/formattingTimeHelper';

interface IParameters {
  klines: IKlines;
  interval: IInterval ;
}

export const calculateTimesHelper = ({ klines, interval }: IParameters): ITimes => {
  const step = calculateTimeStepHelper(interval);

  const result = klines
    .filter(({ start }) => {
      const date = new Date(start);
      return date.getTime() % step === 0;
    })
    .map(({ start }) => ({
      value: formattingTimeHelper(new Date(start)),
      klineIndex: klines.findIndex((el) => el.start === start),
    }));

  return result;
};
