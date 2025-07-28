import { configureStore } from '@reduxjs/toolkit';

import typeChartReducer from './features/typeChart';
import settingChartReducer from './features/settingsChart';
import decimalPlacesReducer from './features/decimalPlaces';
import klinesReducer from './features/klines';
import timesReducer from './features/times';
import pricesReducer from './features/prices';
import visibleDataReducer from './features/visibleData';
import klineInfoReducer from './features/klineInfo';
import lastPriceReducer from './features/lastPrice';
import smmaReducer from './features/smma';

export function createStore() {
  return configureStore({
    reducer: {
      typeChart: typeChartReducer,
      settingChart: settingChartReducer,
      decimalPlaces: decimalPlacesReducer,
      klines: klinesReducer,
      times: timesReducer,
      prices: pricesReducer,
      visibleData: visibleDataReducer,
      klineInfo: klineInfoReducer,
      lastPrice: lastPriceReducer,
      smma: smmaReducer,
    },
  });
}

export type RootState = ReturnType<ReturnType<typeof createStore>['getState']>;
export type AppDispatch = ReturnType<typeof createStore>['dispatch'];
