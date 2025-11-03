import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
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
          title="General Information"
          subtitle="Company Details"
        >
          <Grid container spacing={isMobile ? 2 : 3}>
            <SupplierGeneralView data={information || {}} />
          </Grid>
        </FormSectionLayout>

        <Divider />

        <FormSectionLayout
          title="Representative"
          subtitle="Company Representative"
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
          title="Product"
          subtitle="Product & Business Details"
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

        <FormSectionLayout title="Financial" subtitle="Financial Details">
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

        <FormSectionLayout title="Documents" subtitle="Uploaded Documents">
          <Grid container spacing={isMobile ? 2 : 3}>
            <SupplierDocumentView data={{}} />
          </Grid>
        </FormSectionLayout>

        <Divider />

        <FormSectionLayout
          title="Addresses"
          subtitle={`${information?.addresses?.length} address(es)`}
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
                    {address.name || `Address ${index + 1}`}
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
          title="Contacts"
          subtitle={`${information?.contacts?.length} contact(s)`}
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
          title="Payments"
          subtitle={`${information?.payments?.length} payment(s)`}
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
                    {payment.accountName || `Payment ${index + 1}`}
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
            <FormSectionLayout title="Remarks" subtitle="Additional Notes">
              <TextAtom variant="body1">{information.remark}</TextAtom>
            </FormSectionLayout>
          </>
        )}
      </Box>

      {sites && sites.length > 0 && (
        <>
          <Divider sx={{ my: 2 }} />
          <FormSectionLayout
            title="Sites Information"
            subtitle={`${sites.length} site(s) registered`}
          >
            <Stack spacing={2}>
              {sites.map((site, index) => (
                <CollapsibleCard
                  key={site.id || index}
                  title={
                    <TextAtom weight="bold">
                      Site #{index + 1} - {site.name || 'Unnamed Site'}
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
              No sites information available
            </TextAtom>
          </Box>
        </>
      )}
    </Stack>
  );
};

export default ReviewStep;
