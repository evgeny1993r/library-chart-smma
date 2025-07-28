import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from 'src/redux/store';

import type { ILastPrice } from 'src/interfaces';

interface InitialState {
  result?: ILastPrice;
}

const initialState: InitialState = {
  result: undefined,
};

const lastPriceSlice = createSlice({
  name: 'lastPrice',
  initialState,
  reducers: {
    setLastPrice: (state, { payload }: PayloadAction<ILastPrice>) => {
      state.result = payload;
    },
  },
});

export default lastPriceSlice.reducer;

export const linkLastPrice = (state: RootState) => state.lastPrice.result;

export const { setLastPrice } = lastPriceSlice.actions;
