import { FC, ReactNode } from 'react';
import { Card } from 'antd';
import {
  StyledStatsCard,
  CardContent,
  IconWrapper,
  StatsValue,
  StatsTitle,
} from './index.styled';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  color?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  prefix?: string;
  suffix?: string;
  loading?: boolean;
}

const StatsCard: FC<StatsCardProps> = ({
  title,
  value,
  icon,
  color = 'primary',
  prefix,
  suffix,
  loading = false,
}) => {
  return (
    <StyledStatsCard>
      <Card loading={loading}>
        <CardContent>
          {icon && <IconWrapper $color={color}>{icon}</IconWrapper>}
          <div>
            <StatsValue>
              {prefix}
              {value}
              {suffix}
            </StatsValue>
            <StatsTitle>{title}</StatsTitle>
          </div>
        </CardContent>
      </Card>
    </StyledStatsCard>
  );
};

export default StatsCard;
