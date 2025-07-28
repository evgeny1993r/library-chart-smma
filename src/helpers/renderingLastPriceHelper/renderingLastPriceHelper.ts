import { CHART } from 'src/constants';

import type { ILastPrice, ITypeChart } from 'src/interfaces';

interface IParameters {
  typeChart?: ITypeChart;
  ctx: CanvasRenderingContext2D;
  lastPrice: ILastPrice;
  min: number;
  range: number;
  paddingVertical: number;
}

export const renderingLastPriceHelper = ({
  typeChart, ctx, lastPrice, min, range, paddingVertical,
}: IParameters) => {
  ctx.save();

  const { value, text, type } = lastPrice;
  const { width, height } = ctx.canvas;

  const font = typeChart === 'big' ? CHART.FONT_TEXT_BIG : CHART.FONT_TEXT_SMALL;

  const BACKGROUND_HEIGHT = 40;

  const availableHeight = height - paddingVertical * 2;

  const y = availableHeight - (((value - min) / range) * availableHeight) + paddingVertical;

  const backgroundColor = type === 'BULLISH' ? CHART.GREEN_COLOR : CHART.RED_COLOR;
  const backgroundWidth = width;
  const backgroundX = 0;
  const backgroundY = y - (BACKGROUND_HEIGHT / 2);

  const textX = width / 2;
  const textY = y;

  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(backgroundX, backgroundY, backgroundWidth, BACKGROUND_HEIGHT);

  ctx.fillStyle = CHART.WHITE_COLOR;
  ctx.fillText(text, textX, textY);

  ctx.restore();
};
