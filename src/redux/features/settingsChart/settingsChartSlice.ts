import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from 'src/redux/store';

import { SETTINGS_CHART } from 'src/constants';

import type { IShade } from 'src/interfaces';

interface InitialState {
  paddingVertical: number;
  widthKline: number;
  widthShadow: number;
  gap: number;
  scrollStep: number;
  bullishShade: IShade;
  bearishShade: IShade;

  smmaLineWidthTop: number;
  smmaLineWidthBottom: number;
  smmaLineShadeTop: IShade;
  smmaLineShadeBottom: IShade;
}

const initialState: InitialState = {
  paddingVertical: SETTINGS_CHART.PADDING_VERTICAL,
  widthKline: SETTINGS_CHART.WIDTH_KLINE,
  widthShadow: SETTINGS_CHART.WIDTH_SHADOW,
  gap: SETTINGS_CHART.GAP,
  scrollStep: SETTINGS_CHART.SCROLL_STEP,
  bullishShade: SETTINGS_CHART.BULLISH_SHADE,
  bearishShade: SETTINGS_CHART.BEARISH_SHADE,

  smmaLineWidthTop: SETTINGS_CHART.SMMA_LINE_WIDTH_TOP,
  smmaLineWidthBottom: SETTINGS_CHART.SMMA_LINE_WIDTH_BOTTOM,
  smmaLineShadeTop: SETTINGS_CHART.SMMA_LINE_SHADE_TOP,
  smmaLineShadeBottom: SETTINGS_CHART.SMMA_LINE_SHADE_BOTTOM,
};

const settingsChartSlice = createSlice({
  name: 'settingsChart',
  initialState,
  reducers: {
    setPaddingVertical: (state, { payload }: PayloadAction<number>) => {
      state.paddingVertical = payload;
    },
    setWidthKline: (state, { payload }: PayloadAction<number>) => {
      state.widthKline = payload;
    },
    setWidthShadow: (state, { payload }: PayloadAction<number>) => {
      state.widthShadow = payload;
    },
    setGap: (state, { payload }: PayloadAction<number>) => {
      state.gap = payload;
    },
    setBullishShade: (state, { payload }: PayloadAction<IShade>) => {
      state.bullishShade = payload;
    },
    setBearishShade: (state, { payload }: PayloadAction<IShade>) => {
      state.bearishShade = payload;
    },
    setScrollStep: (state, { payload }: PayloadAction<number>) => {
      state.scrollStep = payload;
    },

    setSMMALineWidthTop: (state, { payload }: PayloadAction<number>) => {
      state.smmaLineWidthTop = payload;
    },
    setSMMALineWidthBottom: (state, { payload }: PayloadAction<number>) => {
      state.smmaLineWidthBottom = payload;
    },
    setSMMALineShadeTop: (state, { payload }: PayloadAction<IShade>) => {
      state.smmaLineShadeTop = payload;
    },
    setSMMALineShadeBottom: (state, { payload }: PayloadAction<IShade>) => {
      state.smmaLineShadeBottom = payload;
    },

    setDefaultSettings: (state) => {
      state.paddingVertical = SETTINGS_CHART.PADDING_VERTICAL;
      state.widthKline = SETTINGS_CHART.WIDTH_KLINE;
      state.widthShadow = SETTINGS_CHART.WIDTH_SHADOW;
      state.gap = SETTINGS_CHART.GAP;
      state.bullishShade = SETTINGS_CHART.BULLISH_SHADE;
      state.bearishShade = SETTINGS_CHART.BEARISH_SHADE;
      state.scrollStep = SETTINGS_CHART.SCROLL_STEP;

      state.smmaLineWidthTop = SETTINGS_CHART.SMMA_LINE_WIDTH_TOP;
      state.smmaLineWidthBottom = SETTINGS_CHART.SMMA_LINE_WIDTH_BOTTOM;
      state.smmaLineShadeTop = SETTINGS_CHART.SMMA_LINE_SHADE_TOP;
      state.smmaLineShadeBottom = SETTINGS_CHART.SMMA_LINE_SHADE_BOTTOM;
    },
  },
});

export default settingsChartSlice.reducer;

export const linkPaddingVertical = (state: RootState) => state.settingChart.paddingVertical;
export const linkWidthKline = (state: RootState) => state.settingChart.widthKline;
export const linkWidthShadow = (state: RootState) => state.settingChart.widthShadow;
export const linkGap = (state: RootState) => state.settingChart.gap;
export const linkBullishShade = (state: RootState) => state.settingChart.bullishShade;
export const linkBearishShade = (state: RootState) => state.settingChart.bearishShade;
export const linkScrollStep = (state: RootState) => state.settingChart.scrollStep;

export const linkSMMALineWidthTop = (state: RootState) => state.settingChart.smmaLineWidthTop;
export const linkSMMALineWidthBottom = (state: RootState) => state.settingChart.smmaLineWidthBottom;
export const linkSMMALineShadeTop = (state: RootState) => state.settingChart.smmaLineShadeTop;
export const linkSMMALineShadeBottom = (state: RootState) => state.settingChart.smmaLineShadeBottom;
export const {
  setPaddingVertical,
  setWidthKline,
  setWidthShadow,
  setGap,
  setBearishShade,
  setBullishShade,
  setScrollStep,

  setSMMALineWidthTop,
  setSMMALineWidthBottom,
  setSMMALineShadeTop,
  setSMMALineShadeBottom,

  setDefaultSettings,
} = settingsChartSlice.actions;
