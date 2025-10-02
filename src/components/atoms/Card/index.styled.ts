import { styled } from '@mui/material/styles';
import { Card as MuiCard } from '@mui/material';

interface StyledCardProps {
  $variant?: 'default' | 'outlined' | 'elevated';
}

export const StyledCard = styled(MuiCard)<StyledCardProps>(({
  theme,
  $variant = 'default',
}) => {
  const getElevation = () => {
    switch ($variant) {
      case 'elevated':
        return 4;
      case 'default':
        return 1;
      default:
        return 0;
    }
  };

  return {
    padding: theme.spacing(2),
    elevation: getElevation(),
  };
});
