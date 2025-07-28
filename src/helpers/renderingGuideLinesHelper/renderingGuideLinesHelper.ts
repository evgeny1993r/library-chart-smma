import { CHART } from 'src/constants';

interface IParameters {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
}

export const renderingGuideLinesHelper = ({ ctx, x, y }: IParameters) => {
  ctx.save();

  const { width, height } = ctx.canvas;

  ctx.setLineDash(CHART.LINE_DASH);
  ctx.strokeStyle = CHART.GREY_COLOR;
  ctx.lineWidth = CHART.LINE_WIDTH;

  ctx.beginPath();
  ctx.moveTo(x, 0);
  ctx.lineTo(x, height);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, y);
  ctx.lineTo(width, y);
  ctx.stroke();

  ctx.restore();
};
