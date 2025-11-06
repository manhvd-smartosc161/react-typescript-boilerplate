import { ButtonAtom } from '@src/components/atoms';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

type ClearSearchButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

const ClearSearchButton: React.FC<ClearSearchButtonProps> = ({
  onClick,
  disabled,
}) => {
  const { t } = useTranslation();

  return (
    <ButtonAtom
      color="primary"
      onClick={onClick}
      disabled={disabled}
      size="large"
      sx={{ minWidth: '140px !important' }}
    >
      {t('common:clearSearch')}
    </ButtonAtom>
  );
};

export default ClearSearchButton;
