import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from 'src/redux/store';

import type { IKlines } from 'src/interfaces';

interface InitialState {
  result: IKlines;
}

const initialState: InitialState = {
  result: [],
};

const klinesSlice = createSlice({
  name: 'klines',
  initialState,
  reducers: {
    setKlines: (state, { payload }: PayloadAction<IKlines>) => {
      state.result = payload;
    },
  },
});

export default klinesSlice.reducer;

export const linkKlines = (state: RootState) => state.klines.result;

export const { setKlines } = klinesSlice.actions;
