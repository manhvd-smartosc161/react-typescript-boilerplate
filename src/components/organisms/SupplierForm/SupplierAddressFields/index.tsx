import { Box, Button, Grid, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ButtonAtom, IconAtom, TextAtom } from '@src/components/atoms';
import {
  CollapsibleCard,
  ControlledDropdownField,
  ControlledTextField,
  ControlledCheckBoxField,
} from '@src/components/molecules';
import { Control, useFieldArray, useFormContext } from 'react-hook-form';
import { Add as AddIcon } from '@mui/icons-material';
import {
  addressTypeOptions,
  addressStatusOptions,
  addressPurposeOptions,
  countryOptions,
} from '@src/constants';

interface SupplierAddressFieldsProps {
  control: Control<any>;
  sectionPrefix: string;
  readOnly?: boolean;
}

const SupplierAddressFields: React.FC<SupplierAddressFieldsProps> = ({
  control,
  sectionPrefix,
  readOnly = false,
}) => {
  const { t } = useTranslation('supplier');
  const { getValues } = useFormContext();
  const {
    fields: addressFields,
    append: appendAddress,
    remove: removeAddress,
  } = useFieldArray({
    control,
    name: `${sectionPrefix}.addresses`,
  });

  const duplicateAddress = (index: number) => {
    const currentAddress = getValues(`${sectionPrefix}.addresses.${index}`);
    if (currentAddress) {
      // Remove id to create a new address
      const addressData = { ...currentAddress };
      delete addressData.id;
      appendAddress(addressData);
    }
  };

  const addNewAddress = () => {
    appendAddress({
      type: 'BUSINESS',
      name: '',
      line1: '',
      line2: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'TH',
      phone: '',
      email: '',
      fax: '',
      purpose: [],
      shipToLocation: '',
      billToLocation: '',
      status: 'ACTIVE',
    });
  };

  const RenderAddressItem = (index: number) => {
    return (
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            required
            name={`${sectionPrefix}.addresses.${index}.type`}
            control={control}
            label={t('form.fields.addressType')}
            placeholder={t('form.fields.addressTypePlaceholder')}
            options={addressTypeOptions}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.addresses.${index}.name`}
            control={control}
            label={t('form.fields.addressName')}
            placeholder={t('form.fields.addressNamePlaceholder')}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.addresses.${index}.line1`}
            control={control}
            label={t('form.fields.addressLine1')}
            placeholder={t('form.fields.addressLine1Placeholder')}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <ControlledTextField
            variant="outlined"
            name={`${sectionPrefix}.addresses.${index}.line2`}
            control={control}
            label={t('form.fields.addressLine2')}
            placeholder={t('form.fields.addressLine2Placeholder')}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.addresses.${index}.city`}
            control={control}
            label={t('form.fields.city')}
            placeholder={t('form.fields.cityPlaceholder')}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.addresses.${index}.state`}
            control={control}
            label={t('form.fields.stateProvince')}
            placeholder={t('form.fields.stateProvincePlaceholder')}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.addresses.${index}.postalCode`}
            control={control}
            label={t('form.fields.postalCode')}
            placeholder={t('form.fields.postalCodePlaceholder')}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            required
            name={`${sectionPrefix}.addresses.${index}.country`}
            control={control}
            label={t('form.fields.country')}
            placeholder={t('form.fields.countryPlaceholder')}
            options={countryOptions}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            name={`${sectionPrefix}.addresses.${index}.phone`}
            control={control}
            label={t('form.fields.phone')}
            placeholder={t('form.fields.phonePlaceholder')}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            name={`${sectionPrefix}.addresses.${index}.email`}
            control={control}
            label={t('form.fields.email')}
            placeholder={t('form.fields.emailPlaceholder')}
            type="email"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            name={`${sectionPrefix}.addresses.${index}.fax`}
            control={control}
            label={t('form.fields.fax')}
            placeholder={t('form.fields.faxPlaceholder')}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <ControlledCheckBoxField
            control={control}
            name={`${sectionPrefix}.addresses.${index}.purpose`}
            label={t('form.fields.addressPurpose')}
            options={addressPurposeOptions.map((option) => ({
              ...option,
              label:
                t(`form.view.${option.value.toLowerCase()}`) || option.label,
            }))}
            columns={3}
            required
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            name={`${sectionPrefix}.addresses.${index}.shipToLocation`}
            control={control}
            label={t('form.fields.shipToLocation')}
            placeholder={t('form.fields.shipToLocationPlaceholder')}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            name={`${sectionPrefix}.addresses.${index}.billToLocation`}
            control={control}
            label={t('form.fields.billToLocation')}
            placeholder={t('form.fields.billToLocationPlaceholder')}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            required
            name={`${sectionPrefix}.addresses.${index}.status`}
            control={control}
            label={t('form.fields.status')}
            placeholder={t('form.fields.statusPlaceholder')}
            options={addressStatusOptions}
          />
        </Grid>
      </Grid>
    );
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
    >
      {addressFields.map((field, index) => (
        <CollapsibleCard
          key={field.id}
          actions={
            <>
              <ButtonAtom
                disableElevation
                variant="secondary"
                sx={{
                  backgroundColor: 'white',
                  color: 'black',
                  borderRadius: '8px',
                }}
                startIcon={<IconAtom name="edit" />}
                onClick={() => duplicateAddress(index)}
              >
                {t('form.fields.duplicateAddress')}
              </ButtonAtom>
              <IconButton
                sx={{
                  backgroundColor: 'white',
                  color: 'black',
                  borderRadius: '8px',
                }}
                onClick={() => removeAddress(index)}
              >
                <IconAtom name="delete" />
              </IconButton>
            </>
          }
          title={
            <TextAtom weight={'bold'}>
              {t('form.fields.addressNumber')}
              {index + 1}
            </TextAtom>
          }
        >
          {RenderAddressItem(index)}
        </CollapsibleCard>
      ))}

      {addressFields.length === 0 && (
        <TextAtom variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          {readOnly
            ? t('form.fields.noAddresses')
            : t('form.fields.noAddressesAdded')}
        </TextAtom>
      )}

      {!readOnly && (
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={addNewAddress}
          sx={{ mt: 2 }}
        >
          {t('form.fields.addAddress')}
        </Button>
      )}
    </Box>
  );
};

export default SupplierAddressFields;
