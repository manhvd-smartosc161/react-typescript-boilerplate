import { FC } from 'react';
import { Input as AntInput, InputProps as AntInputProps } from 'antd';
import { StyledInput } from './index.styled';

export interface InputProps extends Omit<AntInputProps, 'variant'> {
  variant?: 'default' | 'filled' | 'borderless';
}

const Input: FC<InputProps> = ({ variant = 'default', ...props }) => {
  return (
    <StyledInput $variant={variant}>
      <AntInput {...props} />
    </StyledInput>
  );
};

export default Input;
