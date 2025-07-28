import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from 'src/redux/store';

import type { ITypeChart } from 'src/interfaces';

interface InitialState {
  result?: ITypeChart;
}

const initialState: InitialState = {
  result: undefined,
};

const typeChartSlice = createSlice({
  name: 'typeChart',
  initialState,
  reducers: {
    setTypeChart: (state, { payload }: PayloadAction<ITypeChart>) => {
      state.result = payload;
    },
  },
});

export default typeChartSlice.reducer;

export const linkTypeChart = (state: RootState) => state.typeChart.result;

export const { setTypeChart } = typeChartSlice.actions;
