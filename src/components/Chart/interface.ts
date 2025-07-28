import type {
  IKlines,
  IInterval,
  ITypeChart,
  ISMMA,
} from 'src/interfaces';

export interface IProps {
  type: ITypeChart;
  klines: IKlines;
  interval: IInterval;
  tickSize: string;
  smma: ISMMA;
}
