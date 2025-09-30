import { FC, ReactNode } from 'react';
import { Typography } from 'antd';
import { StyledText } from './index.styled';

const { Text: AntText } = Typography;

export interface TextProps {
  children: ReactNode;
  variant?: 'body1' | 'body2' | 'caption' | 'label';
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'default';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const Text: FC<TextProps> = ({
  children,
  variant = 'body1',
  color = 'default',
  weight = 'normal',
  align = 'left',
  className,
}) => {
  return (
    <StyledText
      $variant={variant}
      $color={color}
      $weight={weight}
      $align={align}
      className={className}
    >
      <AntText>{children}</AntText>
    </StyledText>
  );
};

export default Text;
