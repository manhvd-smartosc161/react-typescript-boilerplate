import { Paper, styled } from '@mui/material';

export const FileItemRoot = styled(Paper)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1.5),
  alignItems: 'flex-start',
  padding: theme.spacing(3, 4),
  borderRadius: 4,
  backgroundColor: theme.palette.common.white,
  boxShadow: '0 6px 24px rgba(0,0,0,0.10), 0 0 4px rgba(0,0,0,0.08)',
  maxWidth: 470,
  width: '100%',
}));

export const HeaderRow = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: theme.spacing(1),
}));

export const NameAndStatus = styled('div')({
  minWidth: 0,
  display: 'grid',
  gridTemplateRows: 'auto auto',
  rowGap: 2,
});

export const StatusRow = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
});

export const ActionsRow = styled('div')(({ theme }) => ({
  marginTop: 2,
  display: 'flex',
  alignItems: 'center',
  '& a': {
    fontWeight: 500,
  },
  '& a + a': {
    marginLeft: theme.spacing(1),
  },
}));
