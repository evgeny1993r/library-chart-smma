import { CHART } from 'src/constants';

import { formattingTimeHelper } from 'src/helpers/formattingTimeHelper';

export const formattingDateHelper = (value: number): string => {
  const date = new Date(value);

  const dayOfWeek = CHART.DAYS_OF_WEEK[date.getDay()];
  const day = date.getDate();
  const month = CHART.MONTHS[date.getMonth()];
  const year = date.getFullYear();
  const time = formattingTimeHelper(date);

  return `${dayOfWeek} ${day} ${month} ${year} ${time}`;
};
