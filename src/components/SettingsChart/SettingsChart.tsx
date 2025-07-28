import { useState, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  FormControl,
  IconButton,
  InputLabel,
  Select,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { green, red } from '@mui/material/colors';
import SettingsIcon from '@mui/icons-material/Settings';

import { useAppSelector, useAppDispatch } from 'src/redux/hooks';

import {
  linkPaddingVertical,
  linkWidthKline,
  linkWidthShadow,
  linkGap,
  linkBullishShade,
  linkBearishShade,
  linkScrollStep,

  linkSMMALineWidthTop,
  linkSMMALineWidthBottom,
  linkSMMALineShadeTop,
  linkSMMALineShadeBottom,

  setPaddingVertical,
  setWidthKline,
  setWidthShadow,
  setGap,
  setBullishShade,
  setBearishShade,
  setScrollStep,

  setSMMALineWidthTop,
  setSMMALineWidthBottom,
  setSMMALineShadeTop,
  setSMMALineShadeBottom,

  setDefaultSettings,
} from 'src/redux/features/settingsChart';

import type { IShade, IShades } from 'src/interfaces';

import { MainContainer, InputsContainer, CustomMenuItem } from './styled';

export default function SettingsChart() {
  const [isOpen, setIsOpen] = useState(false);

  const paddingVertical = useAppSelector(linkPaddingVertical);
  const widthKline = useAppSelector(linkWidthKline);
  const widthShadow = useAppSelector(linkWidthShadow);
  const gap = useAppSelector(linkGap);
  const bullishShade = useAppSelector(linkBullishShade);
  const bearishShade = useAppSelector(linkBearishShade);
  const scrollStep = useAppSelector(linkScrollStep);

  const smmaLineWidthTop = useAppSelector(linkSMMALineWidthTop);
  const smmaLineWidthBottom = useAppSelector(linkSMMALineWidthBottom);
  const smmaLineShadeTop = useAppSelector(linkSMMALineShadeTop);
  const smmaLineShadeBottom = useAppSelector(linkSMMALineShadeBottom);

  const dispatch = useAppDispatch();

  const inputsMain = useMemo(() => [
    {
      id: 1,
      label: 'Вертикальный отступ:',
      min: 0,
      max: 96,
      value: paddingVertical,
      setValue: (value: number) => dispatch(setPaddingVertical(value)),
    },
    {
      id: 2,
      label: 'Ширина свечи:',
      min: 1,
      max: 96,
      value: widthKline,
      setValue: (value: number) => dispatch(setWidthKline(value)),
    },
    {
      id: 3,
      label: 'Ширина тени:',
      min: 1,
      max: 96,
      value: widthShadow,
      setValue: (value: number) => dispatch(setWidthShadow(value)),
    },
    {
      id: 4,
      label: 'Отступ между свечами:',
      min: 0,
      max: 96,
      value: gap,
      setValue: (value: number) => dispatch(setGap(value)),
    },
    {
      id: 5,
      label: 'Чувствительность прокрутки свечей:',
      min: 1,
      max: 30,
      value: scrollStep,
      setValue: (value: number) => dispatch(setScrollStep(value)),
    },
  ], [
    paddingVertical,
    widthKline,
    widthShadow,
    gap,
    scrollStep,
  ]);

  const inputsSMMA = useMemo(() => [
    {
      id: 11,
      label: 'Ширина верхней линии SMMA:',
      min: 1,
      max: 5,
      value: smmaLineWidthTop,
      setValue: (value: number) => dispatch(setSMMALineWidthTop(value)),
    },
    {
      id: 13,
      label: 'Ширина нижней линии SMMA:',
      min: 1,
      max: 5,
      value: smmaLineWidthBottom,
      setValue: (value: number) => dispatch(setSMMALineWidthBottom(value)),
    },
  ], [
    smmaLineWidthTop,
    smmaLineWidthBottom,
  ]);

  const selectsMain = useMemo(() => [
    {
      id: 31,
      type: 'BULLISH' as 'BULLISH' | 'BEARISH' | 'NEUTRAL',
      label: 'Цвет бычей свечи:',
      shades: Object.keys(green) as IShades,
      value: bullishShade,
      setValue: (value: IShade) => dispatch(setBullishShade(value)),
    },
    {
      id: 32,
      type: 'BEARISH' as 'BULLISH' | 'BEARISH' | 'NEUTRAL',
      label: 'Цвет медвежей свечи:',
      shades: Object.keys(red) as IShades,
      value: bearishShade,
      setValue: (value: IShade) => dispatch(setBearishShade(value)),
    },
  ], [
    bullishShade,
    bearishShade,
  ]);

  const selectsSMMA = useMemo(() => [
    {
      id: 41,
      type: 'BULLISH' as 'BULLISH' | 'BEARISH' | 'NEUTRAL',
      label: 'Цвет верхней границы SMMA:',
      shades: Object.keys(green) as IShades,
      value: smmaLineShadeTop,
      setValue: (value: IShade) => dispatch(setSMMALineShadeTop(value)),
    },
    {
      id: 43,
      type: 'BEARISH' as 'BULLISH' | 'BEARISH' | 'NEUTRAL',
      label: 'Цвет нижней границы SMMA:',
      shades: Object.keys(red) as IShades,
      value: smmaLineShadeBottom,
      setValue: (value: IShade) => dispatch(setSMMALineShadeBottom(value)),
    },
  ], [
    smmaLineShadeTop,
    smmaLineShadeBottom,
  ]);

  const toggleIsOpen = () => setIsOpen((value) => !value);

  const handleBtnDefaultClick = () => {
    dispatch(setDefaultSettings());

    toggleIsOpen();
  };

  const handleBtnCloseClick = () => toggleIsOpen();

  return (
    <MainContainer>
      <IconButton
        size="small"
        color="default"
        onClick={toggleIsOpen}
      >
        <SettingsIcon fontSize="small" />
      </IconButton>

      <Dialog open={isOpen} onClose={toggleIsOpen}>
        <DialogContent>
          <InputsContainer>
            <Typography variant="h6">Основные настройки:</Typography>

            {inputsMain.map(({
              id, label, min, max, value, setValue,
            }) => (
              <TextField
                fullWidth
                size="small"
                type="number"
                variant="standard"
                key={id}
                label={label}
                slotProps={{ input: { inputProps: { min, max } } }}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
              />
            ))}

            {selectsMain.map(({
              id, type, label, shades, value, setValue,
            }) => (
              <FormControl key={id} fullWidth>
                <InputLabel>{label}</InputLabel>
                <Select
                  size="small"
                  label={label}
                  value={value}
                  onChange={(e) => setValue(e.target.value as IShade)}
                >
                  {shades.map((shade) => (
                    <CustomMenuItem
                      type={type}
                      key={shade}
                      value={shade}
                      shade={shade}
                    >
                      {shade}
                    </CustomMenuItem>
                  ))}
                </Select>
              </FormControl>
            ))}

            <Typography variant="h6">Настройки SMMA:</Typography>

            {inputsSMMA.map(({
              id, label, min, max, value, setValue,
            }) => (
              <TextField
                fullWidth
                size="small"
                type="number"
                variant="standard"
                key={id}
                label={label}
                slotProps={{ input: { inputProps: { min, max } } }}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
              />
            ))}

            {selectsSMMA.map(({
              id, type, label, shades, value, setValue,
            }) => (
              <FormControl key={id} fullWidth>
                <InputLabel>{label}</InputLabel>
                <Select
                  size="small"
                  label={label}
                  value={value}
                  onChange={(e) => setValue(e.target.value as IShade)}
                >
                  {shades.map((shade) => (
                    <CustomMenuItem
                      type={type}
                      key={shade}
                      value={shade}
                      shade={shade}
                    >
                      {shade}
                    </CustomMenuItem>
                  ))}
                </Select>
              </FormControl>
            ))}

          </InputsContainer>

          <DialogActions>
            <Button onClick={handleBtnDefaultClick}>
              по умолчанию
            </Button>

            <Button variant="contained" onClick={handleBtnCloseClick}>
              OK
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </MainContainer>
  );
}
