import { FC, ReactNode } from 'react';
import { StepIconProps as MuiStepIconProps } from '@mui/material';
import { StyledStepIcon } from './index.styled';

export interface StepIconProps extends MuiStepIconProps {
  children?: ReactNode;
  size?: 'small' | 'medium' | 'large';
  completed?: boolean;
  error?: boolean;
  active?: boolean;
}

const StepIconAtom: FC<StepIconProps> = ({
  children,
  size = 'medium',
  completed = false,
  error = false,
  active = false,
  ...props
}) => {
  const getIconContent = () => {
    if (children) {
      return children;
    }

    if (error) {
      return '✕';
    }

    if (completed) {
      return '✓';
    }

    return props.icon;
  };

  return (
    <StyledStepIcon
      $size={size}
      $completed={completed}
      $error={error}
      $active={active}
      {...props}
    >
      {getIconContent()}
    </StyledStepIcon>
  );
};

export default StepIconAtom;
