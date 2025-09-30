import { FC, ReactNode } from 'react';
import { Typography } from 'antd';
import { StyledTitle } from './index.styled';

const { Title: AntTitle } = Typography;

export interface TitleProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5;
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'default';
  className?: string;
}

const Title: FC<TitleProps> = ({
  children,
  level = 1,
  color = 'default',
  className,
}) => {
  return (
    <StyledTitle $color={color} className={className}>
      <AntTitle level={level}>{children}</AntTitle>
    </StyledTitle>
  );
};

export default Title;
