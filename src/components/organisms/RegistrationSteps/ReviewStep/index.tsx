import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Stack,
  Box,
  Divider,
  useMediaQuery,
  useTheme,
  Grid,
} from '@mui/material';
import { FormSectionLayout, CollapsibleCard } from '@src/components/molecules';
import { TextAtom } from '@src/components/atoms';
import { SupplierRegistrationFormValues } from '@src/types/supplier';
import {
  SupplierGeneralView,
  SupplierRepresentativeView,
  SupplierProductView,
  SupplierFinancialView,
  SupplierDocumentView,
  SupplierAddressView,
  SupplierContactView,
  SupplierPaymentView,
  SupplierSiteView,
} from '../../SupplierView';

const ReviewStep: React.FC = () => {
  const { t } = useTranslation('supplier');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { control } = useFormContext<SupplierRegistrationFormValues>();

  const information = useWatch({ control, name: 'information' });
  const sites = useWatch({ control, name: 'sites' });

  const getAddressLabel = (addressId?: string) => {
    const address = information?.addresses?.find(
      (addr) => addr.id === addressId,
    );
    return address?.name || addressId;
  };

  const getPaymentOptions = () => {
    return (information?.payments || []).map((payment) => ({
      label: `${payment.method} (${payment.accountName})`,
      value: payment.id || '',
    }));
  };

  return (
    <Stack spacing={isMobile ? 3 : 4}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormSectionLayout
          title={t('form.review.generalInformation')}
          subtitle={t('form.review.companyDetails')}
        >
          <Grid container spacing={isMobile ? 2 : 3}>
            <SupplierGeneralView data={information || {}} />
          </Grid>
        </FormSectionLayout>

        <Divider />

        <FormSectionLayout
          title={t('form.review.representative')}
          subtitle={t('form.review.companyRepresentative')}
        >
          <Grid container spacing={isMobile ? 2 : 3}>
            <SupplierRepresentativeView
              data={{
                contactPersonName: information?.contactPersonName,
                contactPersonEmail: information?.contactPersonEmail,
                contactPersonPhone: information?.contactPersonPhone,
              }}
            />
          </Grid>
        </FormSectionLayout>

        <Divider />

        <FormSectionLayout
          title={t('form.review.product')}
          subtitle={t('form.review.productBusinessDetails')}
        >
          <Grid container spacing={isMobile ? 2 : 3}>
            <SupplierProductView
              data={{
                productDivision: information?.productDivision,
                productType: information?.productType,
              }}
            />
          </Grid>
        </FormSectionLayout>

        <Divider />

        <FormSectionLayout
          title={t('form.review.financial')}
          subtitle={t('form.review.financialDetails')}
        >
          <Grid container spacing={isMobile ? 2 : 3}>
            <SupplierFinancialView
              data={{
                taxId: information?.taxId,
                taxType: information?.taxType,
                taxCountry: information?.taxCountry,
              }}
            />
          </Grid>
        </FormSectionLayout>

        <Divider />

        <FormSectionLayout
          title={t('form.review.documents')}
          subtitle={t('form.review.uploadedDocuments')}
        >
          <Grid container spacing={isMobile ? 2 : 3}>
            <SupplierDocumentView data={{}} />
          </Grid>
        </FormSectionLayout>

        <Divider />

        <FormSectionLayout
          title={t('form.review.addresses')}
          subtitle={`${information?.addresses?.length || 0} ${t('form.review.addressesCount')}`}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: '100%',
            }}
          >
            {information?.addresses?.map((address, index) => (
              <CollapsibleCard
                key={address.id || index}
                title={
                  <TextAtom weight="bold" sx={{ mb: 2 }}>
                    {address.name ||
                      `${t('form.fields.addressNumber')}${index + 1}`}
                  </TextAtom>
                }
              >
                <Grid container spacing={2}>
                  <SupplierAddressView data={address} />
                </Grid>
              </CollapsibleCard>
            ))}
          </Box>
        </FormSectionLayout>

        <Divider />

        <FormSectionLayout
          title={t('form.review.contacts')}
          subtitle={`${information?.contacts?.length || 0} ${t('form.review.contactsCount')}`}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: '100%',
            }}
          >
            {information?.contacts?.map((contact, index) => (
              <CollapsibleCard
                key={contact.id || index}
                title={
                  <TextAtom weight="bold" sx={{ mb: 2 }}>
                    {contact.firstName} {contact.lastName}
                  </TextAtom>
                }
              >
                <Grid container spacing={2}>
                  <SupplierContactView data={contact} />
                </Grid>
              </CollapsibleCard>
            ))}
          </Box>
        </FormSectionLayout>

        <FormSectionLayout
          title={t('form.review.payments')}
          subtitle={`${information?.payments?.length || 0} ${t('form.review.paymentsCount')}`}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: '100%',
            }}
          >
            {information?.payments?.map((payment, index) => (
              <CollapsibleCard
                key={payment.id || index}
                title={
                  <TextAtom weight="bold" sx={{ mb: 2 }}>
                    {payment.accountName ||
                      `${t('form.fields.paymentNumber')}${index + 1}`}
                  </TextAtom>
                }
              >
                <Grid container spacing={2}>
                  <SupplierPaymentView data={payment} />
                </Grid>
              </CollapsibleCard>
            ))}
          </Box>
        </FormSectionLayout>

        {information?.remark && (
          <>
            <Divider />
            <FormSectionLayout
              title={t('form.review.remarks')}
              subtitle={t('form.review.additionalNotes')}
            >
              <TextAtom variant="body1">{information.remark}</TextAtom>
            </FormSectionLayout>
          </>
        )}
      </Box>

      {sites && sites.length > 0 && (
        <>
          <Divider sx={{ my: 2 }} />
          <FormSectionLayout
            title={t('form.review.sitesInformation')}
            subtitle={`${sites.length} ${t('form.review.sitesRegistered')}`}
          >
            <Stack spacing={2}>
              {sites.map((site, index) => (
                <CollapsibleCard
                  key={site.id || index}
                  title={
                    <TextAtom weight="bold">
                      {t('form.fields.siteNumber')}
                      {index + 1} - {site.name || t('form.review.unnamedSite')}
                    </TextAtom>
                  }
                  defaultExpanded={index === 0}
                >
                  <SupplierSiteView
                    data={site}
                    addressLabel={getAddressLabel(site.addressId)}
                    paymentOptions={getPaymentOptions()}
                  />
                </CollapsibleCard>
              ))}
            </Stack>
          </FormSectionLayout>
        </>
      )}

      {(!sites || sites.length === 0) && (
        <>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ py: 3, textAlign: 'center' }}>
            <TextAtom variant="body2" sx={{ color: 'text.secondary' }}>
              {t('form.review.noSitesInformationAvailable')}
            </TextAtom>
          </Box>
        </>
      )}
    </Stack>
  );
};

export default ReviewStep;
