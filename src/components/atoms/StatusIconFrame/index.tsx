import { StatusIconFrameProps, StyledFrame } from './index.styled';

const StatusIconFrame = ({
  children,
  variant = 'completed',
  size = 24,
}: StatusIconFrameProps) => {
  return (
    <StyledFrame variant={variant} size={size}>
      {children}
    </StyledFrame>
  );
};
export default StatusIconFrame;
