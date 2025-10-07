import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';

export const StyledContainer = styled(Stack)({
  width: '100%',
});

export const StyledFileList = styled('ul')(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: 0,
  listStyle: 'none',
}));
