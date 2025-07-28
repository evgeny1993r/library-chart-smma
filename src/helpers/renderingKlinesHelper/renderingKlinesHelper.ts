import { green, red } from '@mui/material/colors';

import type { IKlines, IShade } from 'src/interfaces';

import { calculateXCoordinateHelper } from 'src/helpers/calculateXCoordinateHelper';
import { calculateKlineHeightHelper } from 'src/helpers/calculateKlineHeightHelper';

interface IParameters {
  ctx: CanvasRenderingContext2D;
  klines: IKlines;
  min: number;
  range: number;
  startIdx: number;
  paddingVertical: number;
  widthKline: number;
  widthShadow: number;
  gap: number;
  bullishShade: IShade;
  bearishShade: IShade;
}

export const renderingKlinesHelper = ({
  ctx,
  klines,
  min,
  range,
  startIdx,
  paddingVertical,
  widthKline,
  widthShadow,
  gap,
  bullishShade,
  bearishShade,
}: IParameters): void => {
  ctx.save();

  const { width, height } = ctx.canvas;

  const availableHeight = height - paddingVertical * 2;

  ctx.clearRect(0, 0, width, height);

  klines.forEach(({
    open, close, high, low,
  }, idx) => {
    const color = open > close ? red[bearishShade] : green[bullishShade];

    const xBody = calculateXCoordinateHelper({
      idx, startIdx, widthKline, gap,
    }) + (gap / 2);

    const yBody = open > close
      ? availableHeight - (((open - min) / range) * availableHeight) + paddingVertical
      : availableHeight - (((close - min) / range) * availableHeight) + paddingVertical;

    const heightBody = calculateKlineHeightHelper(
      open > close
        ? ((open - close) / range) * availableHeight
        : ((close - open) / range) * availableHeight,
    );

    const xShadow = xBody + (widthKline / 2) - (widthShadow / 2);
    const yShadow = availableHeight - (((high - min) / range) * availableHeight) + paddingVertical;
    const heightShadow = ((high - low) / range) * availableHeight;

    ctx.fillStyle = color;
    ctx.fillRect(xBody, yBody, widthKline, heightBody);
    ctx.fillRect(xShadow, yShadow, widthShadow, heightShadow);
  });

  ctx.restore();
};
