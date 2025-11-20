import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import DropdownAtom from '@src/components/atoms/Dropdown';
import InputAtom from '@src/components/atoms/Input';

export const StyledContentContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

export const StyledFiltersContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  flexWrap: 'wrap',
  [theme.breakpoints.up('md')]: {
    flexWrap: 'nowrap',
  },
}));

export const StyledContractIdLink = styled('span')(({ theme }) => ({
  textDecoration: 'underline',
  cursor: 'pointer',
  color: theme.palette.primary.main,
  fontWeight: 500,
}));

export const StyledCompanyNameText = styled('span')(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

export const StyledActionContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(1),
}));

export const StyledActionIconButton = styled(Box)(() => ({
  cursor: 'pointer',
}));

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

export const StyledSearchInput = styled(InputAtom)(() => ({
  maxWidth: 400,
  flex: 1,
}));
