import { calculateXCoordinateHelper } from 'src/helpers';

import { CHART } from 'src/constants';

import type { ITimes, ITypeChart } from 'src/interfaces';

interface IParameters {
  typeChart?: ITypeChart;
  ctx: CanvasRenderingContext2D;
  times: ITimes;
  startIdx: number;
  widthKline: number;
  gap: number;
}

export const renderingTimesHelper = ({
  typeChart, ctx, times, startIdx, widthKline, gap,
}: IParameters) => {
  ctx.save();

  const { width, height } = ctx.canvas;

  const font = typeChart === 'big' ? CHART.FONT_TEXT_BIG : CHART.FONT_TEXT_SMALL;

  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.clearRect(0, 0, width, height);

  times.forEach(({ value, klineIndex }) => {
    const x = calculateXCoordinateHelper({
      idx: klineIndex,
      startIdx,
      widthKline,
      gap,
    });

    const xText = x + ((widthKline + gap) / 2);
    const y = height / 2;

    ctx.fillStyle = CHART.BLUE_COLOR;
    ctx.fillText(value, xText, y);
  });

  ctx.restore();
};
