import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from 'src/redux/store';

import type { IMousePosition } from 'src/interfaces';

interface InitialState {
  min: number;
  range: number;
  startIdx: number;
  mousePosition: IMousePosition;
}

const initialState: InitialState = {
  min: 0,
  range: 0,
  startIdx: -1,
  mousePosition: {
    x: undefined,
    y: undefined,
  },
};

const visibleDataSlice = createSlice({
  name: 'visibleData',
  initialState,
  reducers: {
    setMin: (state, { payload }: PayloadAction<number>) => {
      state.min = payload;
    },
    setRange: (state, { payload }: PayloadAction<number>) => {
      state.range = payload;
    },
    setStartIdx: (state, { payload }: PayloadAction<number>) => {
      state.startIdx = payload;
    },
    setMousePosition: (state, { payload }: PayloadAction<IMousePosition>) => {
      state.mousePosition.x = payload.x;
      state.mousePosition.y = payload.y;
    },
  },
});

export default visibleDataSlice.reducer;

export const linkMin = (state: RootState) => state.visibleData.min;
export const linkRange = (state: RootState) => state.visibleData.range;
export const linkStartIdx = (state: RootState) => state.visibleData.startIdx;
export const linkMousePosition = (state: RootState) => state.visibleData.mousePosition;

export const {
  setMin, setRange, setStartIdx, setMousePosition,
} = visibleDataSlice.actions;
