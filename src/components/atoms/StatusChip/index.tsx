import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledStatusChip } from './index.styled';
import { ERegistrationStatus } from '@src/constants';

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
    switch (statusValue.toUpperCase()) {
      case ERegistrationStatus.NEW:
        return t('common:status.new');
      case ERegistrationStatus.WAITING:
        return t('common:status.waiting');
      case ERegistrationStatus.REJECTED:
        return t('common:status.rejected');
      case ERegistrationStatus.APPROVED:
        return t('common:status.approved');
      case ERegistrationStatus.ACTIVATED:
        return t('common:status.activated');
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
