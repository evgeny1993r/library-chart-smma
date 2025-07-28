import {
  useState, useRef, useEffect, useCallback,
} from 'react';

import { useAppSelector } from 'src/redux/hooks';

import { linkTypeChart } from 'src/redux/features/typeChart';
import { linkTimes } from 'src/redux/features/times';
import { linkWidthKline, linkGap } from 'src/redux/features/settingsChart';
import { linKlineInfo } from 'src/redux/features/klineInfo';
import { linkStartIdx, linkMousePosition } from 'src/redux/features/visibleData';

import {
  formattingDateHelper,
  renderingTimesHelper,
  renderingCurrentDateHelper,
} from 'src/helpers';

import { CustomCard } from './styled';

export default function Times() {
  const [sizes, setSizes] = useState({ width: 0, height: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const typeChart = useAppSelector(linkTypeChart);
  const times = useAppSelector(linkTimes);
  const widthKline = useAppSelector(linkWidthKline);
  const gap = useAppSelector(linkGap);
  const startIdx = useAppSelector(linkStartIdx);
  const klineInfo = useAppSelector(linKlineInfo);
  const mousePosition = useAppSelector(linkMousePosition);

  const renderingCanvas = useCallback(() => {
    const { width, height } = sizes;
    if (width === 0 || height === 0) return;

    const { current } = canvasRef;
    if (!current) return;

    const ctx = current.getContext('2d');
    if (!ctx) return;

    renderingTimesHelper({
      typeChart, ctx, times, startIdx, widthKline, gap,
    });

    if (klineInfo) {
      const { x } = mousePosition;
      if (!x) return;

      const { start } = klineInfo;

      const value = formattingDateHelper(start);

      renderingCurrentDateHelper({
        typeChart, ctx, value, x,
      });
    }
  }, [sizes, canvasRef, times, widthKline, gap, startIdx, klineInfo, mousePosition]);

  useEffect(() => {
    const { current } = containerRef;
    if (!current) return;

    const { width, height } = current.getBoundingClientRect();
    setSizes({ width, height });
  }, []);

  useEffect(() => {
    renderingCanvas();
  }, [renderingCanvas]);

  return (
    <CustomCard ref={containerRef}>
      <canvas ref={canvasRef} width={sizes.width} height={sizes.height} />
    </CustomCard>
  );
}
