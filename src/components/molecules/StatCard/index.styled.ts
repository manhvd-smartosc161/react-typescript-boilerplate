import { styled } from '@mui/material/styles';
import { Card, Box } from '@mui/material';

interface StyledStatCardProps {
  $color?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  $loading?: boolean;
}

export const StyledStatCard = styled(Card)<StyledStatCardProps>(
  ({ theme, $loading = false }) => ({
    padding: theme.spacing(2),
    opacity: $loading ? 0.6 : 1,
  }),
);

export const StyledStatCardContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

export const StyledStatCardIcon = styled(Box)<{ $colorValue: string }>(
  ({ theme, $colorValue }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: theme.spacing(1),
    backgroundColor: `${$colorValue}15`,
    color: $colorValue,
    fontSize: 24,
  }),
);

export const StyledStatCardValue = styled(Box)<{ $colorValue: string }>(
  ({ theme, $colorValue }) => ({
    fontSize: 24,
    fontWeight: 600,
    color: $colorValue,
    marginBottom: theme.spacing(0.5),
  }),
);
