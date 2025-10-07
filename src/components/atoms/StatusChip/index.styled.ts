import { Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledStatusChip = styled(Chip)<{ status: string }>(({
  status,
}) => {
  const getStatusColor = (statusValue: string) => {
    switch (statusValue.toLowerCase()) {
      case 'new':
        return { bg: '#e3f2fd', color: '#1976d2' };
      case 'in-progress':
        return { bg: '#fff3e0', color: '#f57c00' };
      case 'completed':
        return { bg: '#e8f5e8', color: '#2e7d32' };
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
  };
});
