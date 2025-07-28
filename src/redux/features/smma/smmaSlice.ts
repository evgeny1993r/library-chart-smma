import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { ISMMA } from 'src/interfaces';

import { RootState } from 'src/redux/store';

interface InitialState {
  result: ISMMA;
}

const initialState: InitialState = {
  result: {
    top: [],
    bottom: [],
  },
};

const smmaSlice = createSlice({
  name: 'smma',
  initialState,
  reducers: {
    setSMMA: (state, { payload }: PayloadAction<ISMMA>) => {
      state.result = payload;
    },
  },
});

export default smmaSlice.reducer;
export const linkSMMA = (state: RootState) => state.smma.result;
export const { setSMMA } = smmaSlice.actions;
