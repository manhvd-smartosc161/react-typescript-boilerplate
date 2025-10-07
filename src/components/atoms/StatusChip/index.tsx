import React from 'react';
import { StyledStatusChip } from './index.styled';

interface StatusChipProps {
  status: string;
  size?: 'small' | 'medium';
}

const StatusChipAtom: React.FC<StatusChipProps> = ({
  status,
  size = 'small',
}) => {
  return <StyledStatusChip label={status} status={status} size={size} />;
};

export default StatusChipAtom;
