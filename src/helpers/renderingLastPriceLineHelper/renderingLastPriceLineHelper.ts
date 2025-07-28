import { CHART } from 'src/constants';

import type { ILastPrice } from 'src/interfaces';

interface IParameters {
  ctx: CanvasRenderingContext2D;
  lastPrice: ILastPrice;
  min: number;
  range: number;
  paddingVertical: number;
}

export const renderingLastPriceLineHelper = ({
  ctx, lastPrice, min, range, paddingVertical,
}: IParameters) => {
  ctx.save();

  const { value, type } = lastPrice;
  const { width, height } = ctx.canvas;

  const availableHeight = height - paddingVertical * 2;
  const y = availableHeight - (((value - min) / range) * availableHeight) + paddingVertical;

  const color = type === 'BULLISH' ? CHART.GREY_COLOR : CHART.RED_COLOR;

  ctx.setLineDash(CHART.LINE_DASH);
  ctx.strokeStyle = color;
  ctx.lineWidth = CHART.LINE_WIDTH;

  ctx.beginPath();
  ctx.moveTo(0, y);
  ctx.lineTo(width, y);
  ctx.stroke();

  ctx.restore();
};
