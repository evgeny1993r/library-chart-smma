import {
  useState, useRef, useEffect, useCallback,
} from 'react';

import { useAppSelector, useAppDispatch } from 'src/redux/hooks';

import { linkDecimalPlaces } from 'src/redux/features/decimalPlaces';
import { linkKlines } from 'src/redux/features/klines';
import {
  setPrices,
} from 'src/redux/features/prices';
import {
  linkPaddingVertical,
  linkWidthKline,
  linkWidthShadow,
  linkGap,
  linkBullishShade,
  linkBearishShade,
  linkScrollStep,

  linkSMMALineWidthTop,
  linkSMMALineWidthBottom,
  linkSMMALineShadeTop,
  linkSMMALineShadeBottom,
} from 'src/redux/features/settingsChart';
import {
  linkMin,
  linkRange,
  linkStartIdx,
  linkMousePosition,

  setMin,
  setRange,
  setStartIdx,
  setMousePosition,
} from 'src/redux/features/visibleData';
import { setKlineInfo } from 'src/redux/features/klineInfo';
import { linkLastPrice } from 'src/redux/features/lastPrice';
import { linkSMMA } from 'src/redux/features/smma';

import {
  calculatePricesHelper,

  renderingKlinesHelper,
  renderingGuideLinesHelper,
  renderingLastPriceLineHelper,
  renderingSMMAHelper,
} from 'src/helpers';

import { CustomCard } from './styled';

export default function Klines() {
  const [sizes, setSizes] = useState({ width: 0, height: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Redux state
  const decimalPlaces = useAppSelector(linkDecimalPlaces);
  const klines = useAppSelector(linkKlines);
  const paddingVertical = useAppSelector(linkPaddingVertical);
  const widthKline = useAppSelector(linkWidthKline);
  const widthShadow = useAppSelector(linkWidthShadow);
  const gap = useAppSelector(linkGap);
  const bullishShade = useAppSelector(linkBullishShade);
  const bearishShade = useAppSelector(linkBearishShade);
  const scrollStep = useAppSelector(linkScrollStep);

  const smmaLineWidthTop = useAppSelector(linkSMMALineWidthTop);
  const smmaLineWidthBottom = useAppSelector(linkSMMALineWidthBottom);
  const smmaLineShadeTop = useAppSelector(linkSMMALineShadeTop);
  const smmaLineShadeBottom = useAppSelector(linkSMMALineShadeBottom);

  const min = useAppSelector(linkMin);
  const range = useAppSelector(linkRange);
  const startIdx = useAppSelector(linkStartIdx);
  const mousePosition = useAppSelector(linkMousePosition);
  const lastPrice = useAppSelector(linkLastPrice);

  const smma = useAppSelector(linkSMMA);

  const dispatch = useAppDispatch();

  // Рендеринг канваса
  const renderingCanvas = useCallback(() => {
    const { current } = canvasRef;
    const { width, height } = sizes;
    if (!current || klines.length === 0 || width === 0 || height === 0 || min === 0 || range === 0) return;

    const ctx = current.getContext('2d');
    if (!ctx) return;

    renderingKlinesHelper({
      ctx,
      klines,
      min,
      range,
      startIdx,
      paddingVertical,
      widthKline,
      widthShadow,
      gap,
      bearishShade,
      bullishShade,
    });

    renderingSMMAHelper({
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
    });

    const { x, y } = mousePosition;
    if (!!x && !!y) {
      renderingGuideLinesHelper({ ctx, x, y });
    }

    if (lastPrice) {
      renderingLastPriceLineHelper({
        ctx, lastPrice, min, range, paddingVertical,
      });
    }
  }, [
    klines,
    smma,
    sizes,
    min,
    range,
    startIdx,
    mousePosition,
    paddingVertical,
    widthKline,
    widthShadow,
    gap,
    bearishShade,
    bullishShade,
    smmaLineWidthTop,
    smmaLineWidthBottom,
    smmaLineShadeTop,
    smmaLineShadeBottom,
  ]);

  // Обработка движения мыши
  const handleCanvasMouseMove = useCallback(
    ({ clientX, clientY }: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      const { current } = canvasRef;
      if (!current) return;

      const { top, left } = current.getBoundingClientRect();

      const x = clientX - left;
      const y = clientY - top;

      const idxKline = Math.floor(x / (widthKline + gap)) + startIdx;

      if ((idxKline < 0 || idxKline >= klines.length)) {
        dispatch(setMousePosition({ x: undefined, y: undefined }));
        dispatch(setKlineInfo(undefined));

        return;
      }

      const newX = ((idxKline - startIdx) * (widthKline + gap)) + ((widthKline / 2) + (gap / 2));
      const selectedKlineInfo = klines[idxKline];

      dispatch(setMousePosition({ x: newX, y }));
      dispatch(setKlineInfo(selectedKlineInfo));
    },
    [canvasRef, klines, startIdx, widthKline, gap, dispatch],
  );

  // Сбрасываем положение мыши
  const handleCanvasMouseLeave = useCallback(() => {
    dispatch(setMousePosition({ x: undefined, y: undefined }));
    dispatch(setKlineInfo(undefined));
  }, [dispatch]);

  // Устанавливаем размеры контейнера
  useEffect(() => {
    const { current } = containerRef;
    if (!current) return;

    const { width, height } = current.getBoundingClientRect();
    setSizes({ width, height });
  }, []);

  // Обновляем `min` и `range` при изменении размеров или данных
  useEffect(() => {
    const { width, height } = sizes;
    if (width === 0 || height === 0) return;

    const visibleValue = Math.floor(width / (widthKline + gap));
    const newStartIdx = startIdx < 0 ? klines.length - visibleValue : startIdx;
    const visibleKlines = klines.slice(newStartIdx, newStartIdx + visibleValue);
    const newPrices = calculatePricesHelper({ klines: visibleKlines, decimalPlaces });

    const newMax = Math.max(...visibleKlines.map(({ high }) => high));
    const newMin = Math.min(...visibleKlines.map(({ low }) => low));
    const newRange = newMax - newMin;

    if (startIdx < 0) dispatch(setStartIdx(newStartIdx));
    dispatch(setPrices(newPrices));
    dispatch(setMin(newMin));
    dispatch(setRange(newRange));
  }, [sizes, klines, widthKline, gap, startIdx, dispatch]);

  // Рендеринг канваса при изменении зависимостей
  useEffect(() => {
    renderingCanvas();
  }, [renderingCanvas]);

  // Обновляем klineInfo при изменении startIdx, если мышь находится над графиком
  useEffect(() => {
    const { x } = mousePosition;
    if (x) {
      const idx = Math.floor(x / (widthKline + gap)) + startIdx;
      if (idx >= 0 && idx < klines.length) {
        dispatch(setKlineInfo(klines[idx]));
      }
    }
  }, [startIdx, mousePosition.x, klines, widthKline, gap, dispatch]);

  // Прокрутка канваса
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      const direction = event.deltaY > 0 ? scrollStep : -scrollStep;
      const newStartIdx = Math.max(0, Math.min(klines.length - 1, startIdx + direction));

      if (newStartIdx !== startIdx) {
        dispatch(setStartIdx(newStartIdx));
      }
    };

    canvas.addEventListener('wheel', handleWheel);

    return () => canvas.removeEventListener('wheel', handleWheel);
  }, [startIdx, klines, scrollStep, dispatch]);

  return (
    <CustomCard ref={containerRef}>
      <canvas
        ref={canvasRef}
        width={sizes.width}
        height={sizes.height}
        onMouseMove={handleCanvasMouseMove}
        onMouseLeave={handleCanvasMouseLeave}
        style={{ cursor: 'crosshair' }}
      />
    </CustomCard>
  );
}
