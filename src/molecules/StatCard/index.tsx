import { FC, ReactNode } from 'react';
import { Card, Box } from '@mui/material';
import { Icon, Text } from '@src/atoms';

export interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  prefix?: string;
  suffix?: string;
  loading?: boolean;
}

const StatCard: FC<StatCardProps> = ({
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

  return (
    <Card
      elevation={3}
      sx={{
        padding: 2,
        opacity: loading ? 0.6 : 1,
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        {icon && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              borderRadius: 1,
              backgroundColor: `${getColorValue()}15`,
              color: getColorValue(),
              fontSize: 24,
            }}
          >
            <Icon size="large">{icon}</Icon>
          </Box>
        )}
        <Box>
          <Box
            sx={{
              fontSize: 24,
              fontWeight: 600,
              color: getColorValue(),
              marginBottom: 0.5,
            }}
          >
            {prefix}
            {value}
            {suffix}
          </Box>
          <Text variant="body2" color="secondary">
            {title}
          </Text>
        </Box>
      </Box>
    </Card>
  );
};

export default StatCard;
