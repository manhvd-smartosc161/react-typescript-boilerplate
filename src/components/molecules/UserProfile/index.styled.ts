import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

interface StyledUserProfileProps {
  $collapsed?: boolean;
}

export const StyledUserProfile = styled(Box)<StyledUserProfileProps>(
  ({ theme, $collapsed = false }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    padding: theme.spacing(2),
    borderTop: '1px solid',
    borderColor: theme.palette.divider,
    backgroundColor: theme.palette.background.paper,
    justifyContent: $collapsed ? 'center' : 'flex-start',
  }),
);

export const StyledUserInfo = styled(Box)(() => ({
  flex: 1,
  minWidth: 0,
}));
