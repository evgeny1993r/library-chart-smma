import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from 'src/redux/store';

import type { IPrices } from 'src/interfaces';

interface InitialState {
  result: IPrices;
}

const initialState: InitialState = {
  result: [],
};

const pricesSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {
    setPrices: (state, { payload }: PayloadAction<IPrices>) => {
      state.result = payload;
    },
  },
});

export default pricesSlice.reducer;

export const linkPrices = (state: RootState) => state.prices.result;

export const { setPrices } = pricesSlice.actions;
