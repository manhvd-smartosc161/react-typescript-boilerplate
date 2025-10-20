import { StepIconProps } from '@mui/material/StepIcon';
import { StatusIconFrameAtom, IconAtom } from '@src/components/atoms';
import { StepIconNumber } from './index.styled';

export interface IStepIconProps extends StepIconProps {
  size?: number;
}

const StepIcon = ({ active, completed, icon, size = 42 }: IStepIconProps) => {
  return (
    <StatusIconFrameAtom
      variant={completed ? 'completed' : active ? 'active' : 'pending'}
      size={size}
    >
      {completed ? (
        <IconAtom name="check" />
      ) : (
        <StepIconNumber>{icon}</StepIconNumber>
      )}
    </StatusIconFrameAtom>
  );
};

export default StepIcon;
