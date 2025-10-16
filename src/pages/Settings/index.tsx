import React, { useRef, useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '@src/components/organisms';
import { ActionButtonAtom } from '@src/components/atoms';
import SettingsIcon from '@mui/icons-material/Settings';
import SaveIcon from '@mui/icons-material/Save';
import { SettingsOrganism } from '@src/components/organisms';
import { StyledContainer, StyledPaper } from './index.styled';

const Settings: React.FC = () => {
  const { t } = useTranslation();
  const settingsRef = useRef<{
    handleSaveAll: () => void;
    isAllValid: () => boolean;
    isLoading: () => boolean;
  }>(null);
  const [isFormValid, setIsFormValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (settingsRef.current) {
        const isValid = settingsRef.current.isAllValid();
        const loading = settingsRef.current.isLoading();
        setIsFormValid(isValid);
        setIsLoading(loading);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleSaveAll = () => {
    if (settingsRef.current) {
      settingsRef.current.handleSaveAll();
    }
  };

  return (
    <StyledContainer>
      <StyledPaper>
        <PageHeader
          title={t('common:settings')}
          leading={<SettingsIcon sx={{ color: '#1976d2', fontSize: 28 }} />}
          trailing={
            <ActionButtonAtom
              variant="detail-report"
              startIcon={<SaveIcon />}
              onClick={handleSaveAll}
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? t('supplier:saving') : t('supplier:saveAll')}
            </ActionButtonAtom>
          }
          keepHorizontalOnMobile={true}
        />

        <Box sx={{ mt: 3 }}>
          <SettingsOrganism ref={settingsRef} />
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
};

export default Settings;
