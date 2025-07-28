import { useMemo } from 'react';
import { Provider } from 'react-redux';

import { createStore } from 'src/redux/store';

import Chart from '../Chart';

import type { IProps } from './interface';

export default function App({
  type, klines, tickSize, interval, smma,
}: IProps) {
  const store = useMemo(() => createStore(), []);

  return (
    <Provider store={store}>
      <Chart
        type={type}
        klines={klines}
        tickSize={tickSize}
        interval={interval}
        smma={smma}
      />
    </Provider>
  );
}
