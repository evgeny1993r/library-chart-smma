import { IInterval } from 'src/interfaces';

export const calculateTimeStepHelper = (interval: IInterval): number => {
  const intervalsInMilliseconds = {
    1: 1 * 60 * 60 * 1000, // 1 hour
    3: 3 * 60 * 60 * 1000, // 3 hours
    5: 5 * 60 * 60 * 1000, // 5 hours
    15: 15 * 60 * 60 * 1000, // 15 minutes
    30: 30 * 60 * 60 * 1000, // 30 minutes
    60: 60 * 60 * 60 * 1000, // 1 hour
    120: 120 * 60 * 60 * 1000, // 2 hours
    240: 240 * 60 * 60 * 1000, // 4 hours
    360: 360 * 60 * 60 * 1000, // 6 hours
    720: 720 * 60 * 60 * 1000, // 12 hours
    D: 1440 * 60 * 60 * 1000, // 1 day
    W: 1440 * 7 * 60 * 60 * 1000, // 1 week
    M: 1440 * 30 * 60 * 60 * 1000, // 1 month (approximation)
  };

  return intervalsInMilliseconds[interval];
};
