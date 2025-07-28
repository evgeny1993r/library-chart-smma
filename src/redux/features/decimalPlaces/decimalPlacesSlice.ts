import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from 'src/redux/store';

interface InitialState {
  result: number;
}

const initialState: InitialState = {
  result: 0,
};

const decimalPlacesSlice = createSlice({
  name: 'decimalPlaces',
  initialState,
  reducers: {
    setDecimalPlaces: (state, { payload }: PayloadAction<number>) => {
      state.result = payload;
    },
  },
});

export default decimalPlacesSlice.reducer;

export const linkDecimalPlaces = (state: RootState) => state.decimalPlaces.result;

export const { setDecimalPlaces } = decimalPlacesSlice.actions;
