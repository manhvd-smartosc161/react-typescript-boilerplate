import { FC, ReactNode } from 'react';
import { Card, Icon, Text } from '@src/atoms';
import { CardContent, IconWrapper, StatValue } from './index.styled';

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
  return (
    <Card loading={loading} variant="elevated">
      <CardContent>
        {icon && (
          <IconWrapper $color={color}>
            <Icon size="large">{icon}</Icon>
          </IconWrapper>
        )}
        <div>
          <StatValue $color={color}>
            {prefix}
            {value}
            {suffix}
          </StatValue>
          <Text variant="body2" color="secondary">
            {title}
          </Text>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
