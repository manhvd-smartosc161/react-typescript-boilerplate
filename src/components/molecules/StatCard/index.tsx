import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';
import { TextAtom } from '@src/components/atoms';
import {
  StyledStatCard,
  StyledStatCardContent,
  StyledStatCardIcon,
  StyledStatCardValue,
} from './index.styled';

export interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  prefix?: string;
  suffix?: string;
  loading?: boolean;
}

const StatCardMolecule: FC<StatCardProps> = ({
  title,
  value,
  icon,
  color = 'primary',
  prefix,
  suffix,
  loading = false,
}) => {
  const getColorValue = () => {
    switch (color) {
      case 'primary':
        return '#1890ff';
      case 'success':
        return '#52c41a';
      case 'warning':
        return '#faad14';
      case 'danger':
        return '#ff4d4f';
      case 'info':
        return '#13c2c2';
      default:
        return '#1890ff';
    }
  };

  const colorValue = getColorValue();

  return (
    <StyledStatCard elevation={3} $color={color} $loading={loading}>
      <StyledStatCardContent>
        {icon && (
          <StyledStatCardIcon $colorValue={colorValue}>
            {icon}
          </StyledStatCardIcon>
        )}
        <Box>
          <StyledStatCardValue $colorValue={colorValue}>
            {prefix}
            {value}
            {suffix}
          </StyledStatCardValue>
          <TextAtom variant="body2" color="secondary">
            {title}
          </TextAtom>
        </Box>
      </StyledStatCardContent>
    </StyledStatCard>
  );
};

export default StatCardMolecule;
