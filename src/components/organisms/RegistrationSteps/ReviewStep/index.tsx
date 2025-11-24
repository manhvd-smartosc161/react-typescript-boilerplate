import React, { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Stack,
  Box,
  Divider,
  useMediaQuery,
  useTheme,
  Grid,
  Checkbox,
  FormControlLabel,
  Link,
} from '@mui/material';
import { FormSectionLayout, CollapsibleCard } from '@src/components/molecules';
import { TextAtom } from '@src/components/atoms';
import { SupplierRegistrationFormValues } from '@src/types/supplier';
import {
  SupplierGeneralView,
  SupplierRepresentativeView,
  // SupplierProductView,
  SupplierFinancialView,
  // SupplierDocumentView,
  SupplierAddressView,
  SupplierContactView,
  SupplierPaymentView,
  SupplierSiteView,
} from '../../SupplierView';

interface ReviewStepProps {
  onTermsAcceptedChange?: (accepted: boolean) => void;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ onTermsAcceptedChange }) => {
  const { t } = useTranslation('supplier');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { control } = useFormContext<SupplierRegistrationFormValues>();
  const [termsAccepted, setTermsAccepted] = useState(false);

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

  const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setTermsAccepted(checked);
    onTermsAcceptedChange?.(checked);
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

        {/* Product Section - Hidden for now */}
        {/* <Divider />
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
        </FormSectionLayout> */}

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
                // Map bank details from the first payment method if available
                bankName: information?.payments?.[0]?.bankName,
                bankAccountNo: information?.payments?.[0]?.accountNumber,
                bankAccountName: information?.payments?.[0]?.accountName,
                bankBranch: information?.payments?.[0]?.bankBranch,
              }}
            />
          </Grid>
        </FormSectionLayout>

        {/* Documents Section - Hidden for now */}
        {/* <Divider />
        <FormSectionLayout
          title={t('form.review.documents')}
          subtitle={t('form.review.uploadedDocuments')}
        >
          <Grid container spacing={isMobile ? 2 : 3}>
            <SupplierDocumentView data={{}} />
          </Grid>
        </FormSectionLayout> */}

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

      {/* Terms and Conditions Checkbox */}
      <Divider sx={{ my: 2 }} />
      <Box sx={{ py: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={termsAccepted}
              onChange={handleTermsChange}
              color="primary"
            />
          }
          label={
            <TextAtom variant="body2">
              {t('form.review.agreeToTerms')}{' '}
              <Link href="#" underline="always" color="primary">
                {t('form.review.termsAndConditions')}
              </Link>{' '}
              {t('form.review.and')}{' '}
              <Link href="#" underline="always" color="primary">
                {t('form.review.privacyPolicy')}
              </Link>
              .
            </TextAtom>
          }
        />
      </Box>
    </Stack>
  );
};

export default ReviewStep;
