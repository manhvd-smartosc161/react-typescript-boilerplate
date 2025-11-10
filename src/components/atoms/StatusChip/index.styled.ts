import { Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ERegistrationStatus } from '@src/constants';

export const StyledStatusChip = styled(Chip)<{ status: string }>(({
  status,
}) => {
  const getStatusColor = (statusValue: string) => {
    switch (statusValue) {
      case ERegistrationStatus.NEW:
        return { bg: '#D8EAFB', color: '#424242' };
      case ERegistrationStatus.WAITING:
        return { bg: '#EDEDED', color: '#424242' };
      case ERegistrationStatus.REJECTED:
        return { bg: '#FEDFDE', color: '#424242' };
      case ERegistrationStatus.APPROVED:
        return { bg: '#96e0acff', color: '#424242' };
      case ERegistrationStatus.ACTIVATED:
        return { bg: '#BCDCFC', color: '#163E70' };
      default:
        return { bg: '#f5f5f5', color: '#757575' };
    }
  };

  const colors = getStatusColor(status);
  return {
    backgroundColor: colors.bg,
    color: colors.color,
    fontWeight: 'bold',
    borderRadius: '8px',
    padding: '4px 12px',
    width: 130,
  };
});
