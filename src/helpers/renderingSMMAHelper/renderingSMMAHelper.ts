import { green, red } from '@mui/material/colors';

import type { ISMMA, IKlines, IShade } from 'src/interfaces';

import { calculateXCoordinateHelper } from '..';

interface IParameters {
  ctx: CanvasRenderingContext2D;
  smma: ISMMA;
  klines: IKlines;
  min: number;
  range: number;
  startIdx: number;
  paddingVertical: number;
  widthKline: number;
  gap: number;
  smmaLineWidthTop: number;
  smmaLineWidthBottom: number;
  smmaLineShadeTop: IShade;
  smmaLineShadeBottom: IShade;
}

export const renderingSMMAHelper = ({
  ctx,
  smma,
  klines,
  min,
  range,
  startIdx,
  paddingVertical,
  widthKline,
  gap,
  smmaLineWidthTop,
  smmaLineWidthBottom,
  smmaLineShadeTop,
  smmaLineShadeBottom,
}: IParameters): void => {
  const { height } = ctx.canvas;
  const { top, bottom } = smma;

  const availableHeight = height - paddingVertical * 2;

  const startToIndexMap = new Map<number, number>();

  klines.forEach((el, idx) => startToIndexMap.set(el.start, idx));

  const drawLine = (
    data: { start: number; value: number }[],
    lineWidth: number,
    color: string,
  ) => {
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;

    let moved = false;

    for (let i = 0; i < data.length; i += 1) {
      const { start, value } = data[i];
      const currentIdx = startToIndexMap.get(start);

      if (currentIdx === undefined) continue;

      const x = calculateXCoordinateHelper({
        idx: currentIdx,
        startIdx,
        widthKline,
        gap,
      }) + (gap / 2);

      const y = availableHeight - ((value - min) / range) * availableHeight + paddingVertical;

      if (!moved) {
        ctx.moveTo(x, y);
        moved = true;
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.stroke();
    ctx.restore();
  };

  drawLine(top, smmaLineWidthTop, green[smmaLineShadeTop]);
  drawLine(bottom, smmaLineWidthBottom, red[smmaLineShadeBottom]);
};
