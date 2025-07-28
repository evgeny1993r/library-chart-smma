import { Box, styled } from '@mui/material';
import { grey } from '@mui/material/colors';

export const CustomCard = styled(Box)({
  overflow: 'hidden',
  display: 'grid',
  width: 'auto',
  gridColumn: '1 / 2',
  borderTop: `1px solid ${grey[400]}`,
  borderRight: `1px solid ${grey[400]}`,
  borderBottom: `1px solid ${grey[400]}`,
  borderRadius: ' 0 0.25rem 0.25rem 0',
});
