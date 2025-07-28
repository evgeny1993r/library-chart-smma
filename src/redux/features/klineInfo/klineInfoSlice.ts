import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { IKline } from 'src/interfaces';

import { RootState } from 'src/redux/store';

interface InitialState {
  result?: IKline;
}

const initialState: InitialState = {};

const klineInfoSlice = createSlice({
  name: 'klineInfo',
  initialState,
  reducers: {
    setKlineInfo: (state, { payload }: PayloadAction<IKline | undefined>) => {
      state.result = payload;
    },
  },
});

export default klineInfoSlice.reducer;
export const linKlineInfo = (state: RootState) => state.klineInfo.result;
export const { setKlineInfo } = klineInfoSlice.actions;
