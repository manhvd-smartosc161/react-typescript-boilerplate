import { styled } from '@mui/material';
import { DropdownAtom } from '@src/components/atoms';

export const StyledActionDropdown = styled(DropdownAtom)(({ theme }) => ({
  minWidth: '100%',
  backgroundColor: 'white',
  '& .MuiSelect-select': {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
  },
  [theme.breakpoints.up('md')]: {
    minWidth: 150,
  },
}));
