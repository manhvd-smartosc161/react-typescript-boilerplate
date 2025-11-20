import { Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ERegistrationStatus } from '@src/constants';

export const StyledStatusChip = styled(Chip)<{ status: string }>(({
  status,
  theme,
}) => {
  const getStatusColor = (statusValue: string) => {
    switch (statusValue) {
      case ERegistrationStatus.NEW:
        return { bg: '#EDEDED', color: '#424242' };
      case ERegistrationStatus.WAITING:
        return { bg: '##FD965', color: '#424242' };
      case ERegistrationStatus.REJECTED:
        return { bg: '#FEDFDE', color: '#D50600' };
      case ERegistrationStatus.APPROVED:
        return { bg: '#B0EAE7', color: '#004F4C' };
      case ERegistrationStatus.ACTIVATED:
        return { bg: '#BCDCFC', color: '#163E70' };
      case ERegistrationStatus.ACTIVE:
        return {
          bg: theme.palette.success.light,
          color: theme.palette.success.dark,
        };
      case ERegistrationStatus.INACTIVE:
        return {
          bg: theme.palette.action.disabledBackground,
          color: theme.palette.text.secondary,
        };
      default:
        return { bg: '#f5f5f5', color: '#757575' };
    }
  };

  const colors = getStatusColor(status);
  return {
    backgroundColor: colors.bg,
    color: colors.color,
    fontWeight: 'bold',
    borderRadius: '16px',
    padding: '4px 12px',
    fontSize: '0.75rem',
  };
});
