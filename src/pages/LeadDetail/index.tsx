import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm, FormProvider } from 'react-hook-form';
import { Box, CircularProgress } from '@mui/material';
import {
  PageHeaderOrganism,
  SupplierInfoForm,
  SupplierSitesForm,
} from '@src/components/organisms';
import { useGetSupplierById } from '@src/hooks';
import { StyledTabs, StyledTab, StyledContentContainer } from './index.styled';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`lead-tabpanel-${index}`}
      aria-labelledby={`lead-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const LeadDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);

  const { data: supplierData, isLoading } = useGetSupplierById(id || '');

  const formMethods = useForm({
    defaultValues: {
      information: {},
      sites: [],
    },
  });

  useEffect(() => {
    if (supplierData) {
      formMethods.reset({
        information: supplierData.information || {},
        sites: supplierData.sites || [],
      });
    }
  }, [supplierData, formMethods]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <PageHeaderOrganism title={t('lead:leadDetails')} />

      <StyledContentContainer>
        <StyledTabs value={activeTab} onChange={handleTabChange}>
          <StyledTab
            label={t('common:registration.steps.companyInformation')}
          />
          <StyledTab label={t('common:registration.steps.sitesInformation')} />
        </StyledTabs>

        <FormProvider {...formMethods}>
          <fieldset disabled style={{ border: 'none', padding: 0, margin: 0 }}>
            {/* Tab 1: Company Information */}
            <TabPanel value={activeTab} index={0}>
              <SupplierInfoForm readOnly />
            </TabPanel>

            {/* Tab 2: Sites Information */}
            <TabPanel value={activeTab} index={1}>
              <SupplierSitesForm readOnly />
            </TabPanel>
          </fieldset>
        </FormProvider>
      </StyledContentContainer>
    </Box>
  );
};

export default LeadDetail;
