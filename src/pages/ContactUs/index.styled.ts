import { Card, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledContainer = styled('div')(({ theme }) => ({
  margin: theme.spacing('10px', 5),
}));

export const StyledPageHeader = styled(Typography)(() => ({
  fontWeight: 400,
  textAlign: 'center',
  fontSize: 48,
  margin: '20px 0px',
}));

export const StyledInfoBar = styled(Stack)(({ theme }) => ({
  justifyContent: 'flex-start',
  flexWrap: 'wrap',
  columnGap: theme.spacing(6),
  rowGap: theme.spacing(2),
  marginBottom: theme.spacing(4),
}));

export const StyledInfoBarItem = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'start',
  gap: theme.spacing(1),
  flex: '0 1 auto',
  [theme.breakpoints.down('lg')]: {
    flexBasis: '100%',
  },
  '& svg': {
    minWidth: 20,
  },
}));

export const StyledInfoBarTextItem = styled(Typography)(() => ({
  margin: 0,
  display: 'block',
  whiteSpace: 'normal',
  overflow: 'visible',
  lineHeight: 1.3,
  minWidth: 0,
}));

export const StyledContactCard = styled(Card)(() => ({
  borderRadius: 12,
  border: '1px solid #E0E0E0',
  backgroundColor: 'white',
}));

export const StyledSectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  margin: theme.spacing(2, 0, 5, 0),
}));

export const StyledActions = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(3),
  marginTop: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
}));

export const StyledMapWrap = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  [theme.breakpoints.down('lg')]: {
    height: 300,
  },
  [theme.breakpoints.down('md')]: {
    height: 240,
  },
}));
