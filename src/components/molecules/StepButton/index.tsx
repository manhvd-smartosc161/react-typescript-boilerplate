import { StepButton as MuiStepButton } from '@mui/material';
import { StepIconAtom } from '@src/components/atoms';
import { StyledStepLabel } from './index.styled';

export interface IStepButtonProps {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  completed: boolean;
  disabled: boolean;
  onClick: () => void;
  size?: number;
}

const StepButton = ({
  label,
  icon,
  active,
  completed,
  disabled,
  onClick,
  size = 42,
}: IStepButtonProps) => {
  const renderStepIcon = () => (
    <StepIconAtom
      active={active}
      completed={completed}
      icon={icon}
      size={size}
    />
  );

  return (
    <MuiStepButton
      onClick={onClick}
      disabled={disabled}
      sx={{
        '&.Mui-disabled': {
          cursor: 'default',
        },
      }}
    >
      <StyledStepLabel
        StepIconComponent={renderStepIcon}
        StepIconProps={{
          completed,
          active,
          icon,
        }}
      >
        {label}
      </StyledStepLabel>
    </MuiStepButton>
  );
};

export default StepButton;
