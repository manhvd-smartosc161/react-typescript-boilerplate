import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  CircularProgress,
  Stack,
  useMediaQuery,
  useTheme,
  Typography,
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  PageHeaderOrganism,
  SupplierInfoForm,
  SupplierSitesForm,
} from '@src/components/organisms';
import {
  useGetSupplierById,
  useUpdateSitesMutation,
  useUpdateSupplierMutation,
} from '@src/hooks';
import { StyledTabs, StyledTab, StyledContentContainer } from './index.styled';
import { ActionButtonsGroup, ButtonAtom, TagAtom } from '@src/components';
import { SupplierRegistrationFormValues } from '@src/types';
import { registrationMasterSchema } from '@src/schemas';
import { scrollToFirstError } from '@src/components/organisms/MultiStepForm/formErrorScroll';
import { ModalDialog } from '@src/components/molecules';

import { getErrorMessage } from '@src/errors';
import { ERegistrationStatus } from '@src/constants';
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
  const { t } = useTranslation();
  const theme = useTheme();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState(0);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const { data: supplierData, isLoading } = useGetSupplierById(id || '');
  const updateSupplierMutation = useUpdateSupplierMutation();
  const updateSitesMutation = useUpdateSitesMutation();

  const formMethods = useForm<SupplierRegistrationFormValues>({
    resolver: yupResolver(registrationMasterSchema) as any,
    defaultValues: {
      information: {},
      sites: [],
    },
    mode: 'onChange',
  });
  const { formState, handleSubmit, setFocus, getValues } = formMethods;

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

  const handleSave = async () => {
    if (!id || id === '') return;
    const formData = getValues();
    try {
      await updateSupplierMutation.mutateAsync({
        id,
        data: formData,
      });
      await updateSitesMutation.mutateAsync({
        registrationId: id,
        sites: formData.sites || [],
      });
      queryClient.invalidateQueries({
        queryKey: ['supplier', id],
      });
      toast.success('Save successfully!');
    } catch (err) {
      toast.error(getErrorMessage(err) || 'Failed to save!');
    }
  };

  const handleBack = () => {
    const isDirty = formState.isDirty;
    const hasDirtyFields = Object.keys(formState.dirtyFields).length > 0;

    if (isDirty || hasDirtyFields) {
      setShowConfirmDialog(true);
    } else {
      navigate(-1);
    }
  };

  const handleConfirmLeave = () => {
    setShowConfirmDialog(false);
    navigate(-1);
  };

  const handleCancelLeave = () => {
    setShowConfirmDialog(false);
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
          supplierData?.status === ERegistrationStatus.DRAFT && (
            <TagAtom variant="filled" color="waiting">
              <strong>{t('common:status.draft')}</strong>
            </TagAtom>
          )
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
            <Stack
              direction={isMobile ? 'column' : 'row'}
              justifyContent="flex-end"
              spacing={isMobile ? 1 : 2}
              sx={{
                margin: `${theme.spacing(1)} -${theme.spacing(1)}`,
                ...(isMobile && {
                  position: 'sticky',
                  bottom: 0,
                  backgroundColor: theme.palette.background.paper,
                  padding: theme.spacing(2),
                  borderTop: `1px solid ${theme.palette.divider}`,
                }),
              }}
            >
              <ActionButtonsGroup>
                <ButtonAtom
                  variant="ghost"
                  color="inherit"
                  onClick={handleBack}
                  type="button"
                >
                  {t('common:back')}
                </ButtonAtom>
                <ButtonAtom type="submit" form="detail-lead">
                  {t('common:save')}
                </ButtonAtom>
              </ActionButtonsGroup>
            </Stack>
          </form>
        </FormProvider>
      </StyledContentContainer>

      {/* Confirmation Dialog */}
      <ModalDialog
        open={showConfirmDialog}
        onClose={handleCancelLeave}
        title={t('common:unsavedChanges')}
        maxWidth="sm"
        fullWidth
        footer={
          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
            width="100%"
          >
            <ButtonAtom
              onClick={handleCancelLeave}
              variant="ghost"
              color="inherit"
            >
              {t('common:stayOnPage')}
            </ButtonAtom>
            <ButtonAtom onClick={handleConfirmLeave} color="error" autoFocus>
              {t('common:leaveWithoutSaving')}
            </ButtonAtom>
          </Stack>
        }
        showFooter
      >
        <Box>
          <Typography variant="body1" color="text.secondary">
            {t('common:unsavedChangesMessage')}
          </Typography>
        </Box>
      </ModalDialog>
    </Box>
  );
};

export default LeadDetail;
