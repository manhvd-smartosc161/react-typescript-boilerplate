import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledLogoContainer = styled(Box)<{ collapsed?: boolean }>(
  ({ collapsed = false, theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: collapsed ? '0' : '12px',
    padding: collapsed ? '8px' : '0px 16px',
    justifyContent: collapsed ? 'center' : 'flex-start',
    marginRight: '16px',
    borderRight: '1px solid #E8E8E8',
     [theme.breakpoints.down('sm')]: {
        borderRight: 'none',
        height: '64px',
        marginRight: 0,
      },
  }),
);

export const StyledBrandLogo = styled('img')<{ collapsed?: boolean }>(() => ({
  height: 24,
  objectFit: 'contain',
}))