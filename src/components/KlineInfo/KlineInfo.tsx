import { Box, Typography } from '@mui/material';
import { green, red } from '@mui/material/colors';

import { useAppSelector } from 'src/redux/hooks';

import { linkTypeChart } from 'src/redux/features/typeChart';
import { linKlineInfo } from 'src/redux/features/klineInfo';
import { linkBullishShade, linkBearishShade } from 'src/redux/features/settingsChart';

import {
  calculatePercentHelper,
  formattingNumberHelper,
} from 'src/helpers';

import { CHART } from 'src/constants';

import { CustomCard } from './styled';

export default function KlineInfo() {
  const typeChart = useAppSelector(linkTypeChart);
  const klineInfo = useAppSelector(linKlineInfo);
  const bullishShade = useAppSelector(linkBullishShade);
  const bearishShade = useAppSelector(linkBearishShade);

  if (!klineInfo) return <CustomCard />;

  const {
    open, high, low, close, turnover,
  } = klineInfo;

  const color = open > close ? red[bearishShade] : green[bullishShade];

  const infoList = typeChart === 'big' ? [
    { label: 'OPEN', value: formattingNumberHelper(open) },
    { label: 'HIGH', value: formattingNumberHelper(high) },
    { label: 'LOW', value: formattingNumberHelper(low) },
    { label: 'CLOSE', value: formattingNumberHelper(close) },
    { label: 'TURNOVER', value: formattingNumberHelper(turnover) },
    { label: 'CHANGE', value: calculatePercentHelper(open, close) },
    { label: 'RANGE', value: calculatePercentHelper(low, high) },
  ] : [
    { label: 'O', value: formattingNumberHelper(open) },
    { label: 'H', value: formattingNumberHelper(high) },
    { label: 'L', value: formattingNumberHelper(low) },
    { label: 'C', value: formattingNumberHelper(close) },
    { label: 'T', value: formattingNumberHelper(Number(turnover.toFixed())) },
    { label: 'C', value: calculatePercentHelper(open, close) },
    { label: 'R', value: calculatePercentHelper(low, high) },
  ];

  const font = typeChart === 'big' ? CHART.FONT_TEXT_BIG : CHART.FONT_TEXT_SMALL;

  return (
    <CustomCard>
      {infoList.map(({ label, value }) => (
        <Box key={label}>
          <Typography
            variant="body2"
            textAlign="center"
            sx={{ font }}
          >
            {label}
          </Typography>

          <Typography
            variant="body2"
            textAlign="center"
            color={color}
            sx={{ font }}
          >
            {value}
          </Typography>
        </Box>
      ))}
    </CustomCard>
  );
}
