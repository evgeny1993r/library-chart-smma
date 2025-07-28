import {
  Box, MenuItem, MenuItemProps, styled,
} from '@mui/material';
import { green, red, blue } from '@mui/material/colors';

import type { IShade } from 'src/interfaces';

interface CustomMenuItemProps extends MenuItemProps {
  type: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  shade: IShade;
}

const getColorByType = (type: CustomMenuItemProps['type'], shade: IShade): string => {
  switch (type) {
    case 'BULLISH':
      return green[shade];
    case 'BEARISH':
      return red[shade];
    case 'NEUTRAL':
      return blue[shade];
    default:
      return '#ccc';
  }
};

export const MainContainer = styled(Box)({
  display: 'grid',
  alignContent: 'center',
  justifyContent: 'center',
});

export const InputsContainer = styled(Box)({
  width: '25rem',
  display: 'grid',
  rowGap: '1rem',
});

export const CustomMenuItem = styled(MenuItem)<CustomMenuItemProps>(({ type, shade }) => {
  const color = getColorByType(type, shade);

  return {
    backgroundColor: color,
    '&.Mui-selected': {
      backgroundColor: color,
      paddingLeft: '3rem',
      fontWeight: 'bold',
      color: 'white',
    },
    '&.Mui-selected:hover': {
      backgroundColor: color,
    },
    '&:hover': {
      backgroundColor: color,
      color: 'white',
    },
  };
});
