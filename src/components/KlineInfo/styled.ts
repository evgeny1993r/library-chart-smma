import { Box, styled } from '@mui/material';

export const CustomCard = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  columnGap: '1rem',
  alignItems: 'center',
});
