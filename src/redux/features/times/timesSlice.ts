import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from 'src/redux/store';

import type { ITimes } from 'src/interfaces';

interface InitialState {
  result: ITimes;
}

const initialState: InitialState = {
  result: [],
};

const timesSlice = createSlice({
  name: 'times',
  initialState,
  reducers: {
    setTimes: (state, { payload }: PayloadAction<ITimes>) => {
      state.result = payload;
    },
  },
});

export default timesSlice.reducer;

export const linkTimes = (state: RootState) => state.times.result;

export const { setTimes } = timesSlice.actions;
