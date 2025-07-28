import { calculatePriceObjectHelper } from 'src/helpers/calculatePriceObjectHelper';

import { CHART } from 'src/constants';
import { ITypeChart } from 'src/interfaces';

interface IParameters {
  typeChart?: ITypeChart;
  ctx: CanvasRenderingContext2D;
  y: number;
  min: number;
  range: number;
  paddingVertical: number;
  decimalPlaces: number;
}

export const renderingCurrentPriceHelper = ({
  typeChart, ctx, y, min, range, paddingVertical, decimalPlaces,
}: IParameters) => {
  ctx.save();

  const { width, height } = ctx.canvas;

  const font = typeChart === 'big' ? CHART.FONT_TEXT_BIG : CHART.FONT_TEXT_SMALL;

  const BACKGROUND_HEIGHT = 40;

  const availableHeight = height - paddingVertical * 2;

  const backgroundWidth = width;
  const backgroundX = 0;
  const backgroundY = y - (BACKGROUND_HEIGHT / 2);

  const value = min + ((availableHeight - (y - paddingVertical)) * range) / availableHeight;

  const textX = width / 2;

  const { text } = calculatePriceObjectHelper(value, decimalPlaces);

  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.fillStyle = CHART.BLUE_COLOR;
  ctx.fillRect(backgroundX, backgroundY, backgroundWidth, BACKGROUND_HEIGHT);

  ctx.fillStyle = CHART.WHITE_COLOR;
  ctx.fillText(text, textX, y);

  ctx.restore();
};
