import React, { useRef } from 'react';
import { Box } from '@mui/material';
import { PageHeader } from '@src/components/organisms';
import { ActionButtonAtom } from '@src/components/atoms';
import SettingsIcon from '@mui/icons-material/Settings';
import SaveIcon from '@mui/icons-material/Save';
import { SettingsOrganism } from '@src/components/organisms';
import { StyledContainer, StyledPaper } from './index.styled';

const Settings: React.FC = () => {
  const settingsRef = useRef<{ handleSaveAll: () => void }>(null);

  const handleSaveAll = () => {
    if (settingsRef.current) {
      settingsRef.current.handleSaveAll();
    }
  };

  return (
    <StyledContainer>
      <StyledPaper>
        <PageHeader
          title="Settings"
          leading={<SettingsIcon sx={{ color: '#6f42c1', fontSize: 28 }} />}
          trailing={
            <ActionButtonAtom
              variant="detail-report"
              startIcon={<SaveIcon />}
              onClick={handleSaveAll}
            >
              Save All
            </ActionButtonAtom>
          }
        />

        <Box sx={{ mt: 3 }}>
          <SettingsOrganism ref={settingsRef} />
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
};

export default Settings;
