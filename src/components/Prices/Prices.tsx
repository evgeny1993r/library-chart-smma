import {
  useState, useRef, useEffect, useCallback,
} from 'react';

import { useAppSelector } from 'src/redux/hooks';

import { linkTypeChart } from 'src/redux/features/typeChart';
import { linkDecimalPlaces } from 'src/redux/features/decimalPlaces';
import { linkPrices } from 'src/redux/features/prices';
import { linkLastPrice } from 'src/redux/features/lastPrice';
import { linkMin, linkRange, linkMousePosition } from 'src/redux/features/visibleData';
import { linkPaddingVertical } from 'src/redux/features/settingsChart';

import {
  renderingPricesHelper,
  renderingCurrentPriceHelper,
  renderingLastPriceHelper,
} from 'src/helpers';

import { CustomCard } from './styled';

export default function Prices() {
  const [sizes, setSizes] = useState({ width: 0, height: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const typeChart = useAppSelector(linkTypeChart);
  const decimalPlaces = useAppSelector(linkDecimalPlaces);
  const prices = useAppSelector(linkPrices);
  const lastPrice = useAppSelector(linkLastPrice);
  const min = useAppSelector(linkMin);
  const range = useAppSelector(linkRange);
  const mousePosition = useAppSelector(linkMousePosition);
  const paddingVertical = useAppSelector(linkPaddingVertical);

  const renderingCanvas = useCallback(() => {
    const { width, height } = sizes;
    if (width === 0 || height === 0) return;

    const { current } = canvasRef;
    if (!current) return;

    const ctx = current.getContext('2d');
    if (!ctx) return;

    renderingPricesHelper({
      typeChart, ctx, prices, min, range, paddingVertical,
    });

    if (lastPrice) {
      renderingLastPriceHelper({
        typeChart, ctx, lastPrice, min, range, paddingVertical,
      });
    }

    const { y } = mousePosition;
    if (y) {
      renderingCurrentPriceHelper({
        typeChart, ctx, y, min, range, paddingVertical, decimalPlaces,
      });
    }
  }, [sizes, canvasRef, prices, min, range, mousePosition, paddingVertical]);

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
