import { useEffect } from 'react';

import { useAppDispatch } from 'src/redux/hooks';

import { setTypeChart } from 'src/redux/features/typeChart';
import { setDecimalPlaces } from 'src/redux/features/decimalPlaces';
import { setKlines } from 'src/redux/features/klines';
import { setTimes } from 'src/redux/features/times';
import { setLastPrice } from 'src/redux/features/lastPrice';
import { setSMMA } from 'src/redux/features/smma';

import {
  calculateDecimalPlacesHelper,
  calculateTimesHelper,
  calculateLastPriceHelper,
} from 'src/helpers';

import KlineInfo from '../KlineInfo';
import Klines from '../Klines';
import Prices from '../Prices';
import Times from '../Times';
import SettingsChart from '../SettingsChart';

import type { IProps } from './interface';

import { Container } from './styled';

import 'src/styles/index.css';

export default function Chart({
  type, klines, tickSize, interval, smma,
}: IProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (klines.length === 0) return;

    const decimalPlaces = calculateDecimalPlacesHelper(tickSize);
    const times = calculateTimesHelper({ klines, interval });
    const lastPrice = calculateLastPriceHelper(klines[klines.length - 1], decimalPlaces);

    dispatch(setTypeChart(type));
    dispatch(setDecimalPlaces(decimalPlaces));
    dispatch(setKlines(klines));
    dispatch(setTimes(times));
    dispatch(setLastPrice(lastPrice));
    dispatch(setSMMA(smma));
  }, [klines]);

  return (
    <Container>
      <KlineInfo />
      <Klines />
      <Prices />
      <Times />
      <SettingsChart />
    </Container>
  );
}
