import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledStatusChip } from './index.styled';

interface StatusChipProps {
  status: string;
  size?: 'small' | 'medium';
}

const StatusChipAtom: React.FC<StatusChipProps> = ({
  status,
  size = 'small',
}) => {
  const { t } = useTranslation();

  const getTranslatedStatus = (statusValue: string) => {
    switch (statusValue.toLowerCase()) {
      case 'new':
        return t('common:status.new');
      case 'in-progress':
        return t('common:status.inProgress');
      case 'completed':
        return t('common:status.completed');
      default:
        return statusValue;
    }
  };

  return (
    <StyledStatusChip
      label={getTranslatedStatus(status)}
      status={status}
      size={size}
    />
  );
};

export default StatusChipAtom;
