import { CHART } from 'src/constants';

import type { IPrices, ITypeChart } from 'src/interfaces';

interface IParameters {
  typeChart?: ITypeChart;
  ctx: CanvasRenderingContext2D;
  prices: IPrices;
  min: number;
  range: number;
  paddingVertical: number;
}

export const renderingPricesHelper = ({
  typeChart, ctx, prices, min, range, paddingVertical,
}: IParameters) => {
  ctx.save();

  const { width, height } = ctx.canvas;

  const font = typeChart === 'big' ? CHART.FONT_TEXT_BIG : CHART.FONT_TEXT_SMALL;

  const availableHeight = height - paddingVertical * 2;

  ctx.clearRect(0, 0, width, height);

  prices.forEach(({ text, value }) => {
    const x = width / 2;
    const y = availableHeight - (((value - min) / range) * availableHeight) + paddingVertical;

    ctx.font = font;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillStyle = CHART.BLUE_COLOR;
    ctx.fillText(text, x, y);
  });

  ctx.restore();
};
