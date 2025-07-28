import { CHART } from 'src/constants';
import { ITypeChart } from 'src/interfaces';

interface IParameters {
  typeChart?: ITypeChart;
  ctx: CanvasRenderingContext2D;
  value: string;
  x: number;
}

export const renderingCurrentDateHelper = ({
  typeChart, ctx, value, x,
}: IParameters) => {
  ctx.save();

  const { height } = ctx.canvas;
  const { width: textWidth } = ctx.measureText(value);

  const font = typeChart === 'big' ? CHART.FONT_TEXT_BIG : CHART.FONT_TEXT_SMALL;

  const backgroundWidth = textWidth + CHART.PADDING_HORIZONTAL_TEXT * 4;
  const backgroundHeight = height;
  const backgroundX = x - backgroundWidth / 2;
  const backgroundY = 0;

  const textY = height / 2;

  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.fillStyle = CHART.BLUE_COLOR;
  ctx.fillRect(backgroundX, backgroundY, backgroundWidth, backgroundHeight);

  ctx.fillStyle = CHART.WHITE_COLOR;
  ctx.fillText(value, x, textY);

  ctx.restore();
};
