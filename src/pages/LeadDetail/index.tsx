import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm, FormProvider } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, CircularProgress } from '@mui/material';
import {
  PageHeaderOrganism,
  SupplierInfoForm,
  SupplierSitesForm,
} from '@src/components/organisms';
import { useGetSupplierById } from '@src/hooks';
import { StyledTabs, StyledTab, StyledContentContainer } from './index.styled';
import { ButtonAtom } from '@src/components';
import { SupplierRegistrationFormValues } from '@src/types';
import { registrationMasterSchema } from '@src/schemas';
import { scrollToFirstError } from '@src/components/organisms/MultiStepForm/formErrorScroll';
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

  const formMethods = useForm<SupplierRegistrationFormValues>({
    resolver: yupResolver(registrationMasterSchema) as any,
    defaultValues: {
      information: {},
      sites: [],
    },
    mode: 'onChange',
  });
  const { handleSubmit, formState, setFocus } = formMethods;

  useEffect(() => {
    if (supplierData) {
      formMethods.reset({
        information: supplierData.information || {},
        sites: supplierData.sites || [],
      });
    }
  }, [supplierData, formMethods]);

  useEffect(() => {
    if (formState.errors && typeof formState.errors === 'object') {
      const fieldErrors = Object.keys(formState.errors).filter(
        (key) =>
          key !== 'addresses' && key !== 'payments' && key !== 'contacts',
      );
      const firstField = `${activeTab === 0 ? 'information' : 'sites'}.${fieldErrors[0]}`;
      const hasInfoError = !!formState.errors.information;
      const hasSitesError = !!formState.errors.sites;

      if (fieldErrors.length > 0) {
        scrollToFirstError(firstField);
        setFocus(firstField as any);
      }
      if (activeTab === 0 && hasSitesError && !hasInfoError) {
        setActiveTab(1);
      }
      if (activeTab === 1 && hasInfoError && !hasSitesError) {
        setActiveTab(0);
      }
    }
  }, [formState.errors]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleSave = () => {
    toast.success('Save successfully!');
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
      <PageHeaderOrganism
        title={t('lead:leadDetails')}
        trailing={
          <ButtonAtom type="submit" form="detail-lead">
            Save
          </ButtonAtom>
        }
      />

      <StyledContentContainer>
        <StyledTabs value={activeTab} onChange={handleTabChange}>
          <StyledTab
            label={t('common:registration.steps.companyInformation')}
          />
          <StyledTab label={t('common:registration.steps.sitesInformation')} />
        </StyledTabs>

        <FormProvider {...formMethods}>
          <form id="detail-lead" onSubmit={handleSubmit(handleSave)} noValidate>
            {/* Tab 1: Company Information */}
            <TabPanel value={activeTab} index={0}>
              <SupplierInfoForm />
            </TabPanel>

            {/* Tab 2: Sites Information */}
            <TabPanel value={activeTab} index={1}>
              <SupplierSitesForm />
            </TabPanel>
          </form>
        </FormProvider>
      </StyledContentContainer>
    </Box>
  );
};

export default LeadDetail;
