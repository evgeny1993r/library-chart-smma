import App from './components/App';

import type {
  IKlines,
  IInterval,
  ITypeChart,
  ISMMA,
} from './interfaces';

interface IProps {
  type: ITypeChart;
  klines: IKlines;
  interval: IInterval;
  tickSize: string;
  smma: ISMMA;
}

export default function LibraryChartSMMA({
  type, klines, tickSize, interval, smma,
}: IProps) {
  return (
    <App
      type={type}
      klines={klines}
      interval={interval}
      tickSize={tickSize}
      smma={smma}
    />
  );
}
