import { Box, Button, Grid, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ButtonAtom, IconAtom, TextAtom } from '@src/components/atoms';
import {
  CollapsibleCard,
  ControlledDropdownField,
  ControlledTextField,
  ControlledAutocompleteField,
} from '@src/components/molecules';
import {
  Control,
  useFieldArray,
  useWatch,
  useFormContext,
} from 'react-hook-form';
import { Add as AddIcon } from '@mui/icons-material';
import {
  salutationOptions,
  contactRoleOptions,
  yesNoOptions,
  contactStatusOptions,
} from '@src/constants';

interface SupplierContactFieldsProps {
  control: Control<any>;
  sectionPrefix: string;
}

const SupplierContactFields: React.FC<SupplierContactFieldsProps> = ({
  control,
  sectionPrefix,
}) => {
  const { t } = useTranslation('supplier');
  const { getValues } = useFormContext();
  const {
    fields: contactFields,
    append: appendContact,
    remove: removeContact,
  } = useFieldArray({
    control,
    name: `${sectionPrefix}.contacts`,
  });

  // Watch addresses to provide options for address_ids
  const addresses = useWatch({
    control,
    name: `${sectionPrefix}.addresses`,
  });

  const addressOptions =
    addresses?.map((address: any) => ({
      label: `${address.name}`,
      value: address.id,
    })) || [];

  const duplicateContact = (index: number) => {
    const currentContact = getValues(`${sectionPrefix}.contacts.${index}`);
    if (currentContact) {
      // Remove id to create a new contact
      const contactData = { ...currentContact };
      delete contactData.id;
      appendContact(contactData);
    }
  };

  const addNewContact = () => {
    appendContact({
      department: '',
      salutation: 'Mr.',
      firstName: '',
      middleName: '',
      lastName: '',
      jobTitle: '',
      phone: '',
      email: '',
      role: 'PRIMARY_CONTACT',
      isPrimary: 'N',
      receivePoByEmail: 'N',
      receiveRemittance: 'N',
      status: 'ACTIVE',
      addressIds: [],
    });
  };

  const RenderContactItem = (index: number) => {
    return (
      <Grid key={index} container spacing={3}>
        {/* Address Selection */}
        <Grid size={{ xs: 12 }}>
          <ControlledAutocompleteField
            control={control}
            name={`${sectionPrefix}.contacts.${index}.addressIds`}
            label={t('form.fields.associatedAddresses')}
            options={addressOptions}
          />
        </Grid>

        {/* Department */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.contacts.${index}.department`}
            control={control}
            label={t('form.fields.department')}
            placeholder={t('form.fields.departmentPlaceholder')}
          />
        </Grid>

        {/* Salutation */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            required
            name={`${sectionPrefix}.contacts.${index}.salutation`}
            control={control}
            label={t('form.fields.salutation')}
            placeholder={t('form.fields.salutationPlaceholder')}
            options={salutationOptions}
          />
        </Grid>

        {/* First Name */}
        <Grid size={{ xs: 12, md: 4 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.contacts.${index}.firstName`}
            control={control}
            label={t('form.fields.firstName')}
            placeholder={t('form.fields.firstNamePlaceholder')}
          />
        </Grid>

        {/* Middle Name */}
        <Grid size={{ xs: 12, md: 4 }}>
          <ControlledTextField
            variant="outlined"
            name={`${sectionPrefix}.contacts.${index}.middleName`}
            control={control}
            label={t('form.fields.middleName')}
            placeholder={t('form.fields.middleNamePlaceholder')}
          />
        </Grid>

        {/* Last Name */}
        <Grid size={{ xs: 12, md: 4 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.contacts.${index}.lastName`}
            control={control}
            label={t('form.fields.lastName')}
            placeholder={t('form.fields.lastNamePlaceholder')}
          />
        </Grid>

        {/* Job Title */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.contacts.${index}.jobTitle`}
            control={control}
            label={t('form.fields.jobTitle')}
            placeholder={t('form.fields.jobTitlePlaceholder')}
          />
        </Grid>

        {/* Role */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            required
            name={`${sectionPrefix}.contacts.${index}.role`}
            control={control}
            label={t('form.fields.role')}
            placeholder={t('form.fields.rolePlaceholder')}
            options={contactRoleOptions}
          />
        </Grid>

        {/* Phone */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.contacts.${index}.phone`}
            control={control}
            label={t('form.fields.phone')}
            placeholder={t('form.fields.phonePlaceholder')}
          />
        </Grid>

        {/* Email */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.contacts.${index}.email`}
            control={control}
            label={t('form.fields.email')}
            placeholder={t('form.fields.emailPlaceholder')}
            type="email"
          />
        </Grid>

        {/* Is Primary */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            required
            name={`${sectionPrefix}.contacts.${index}.isPrimary`}
            control={control}
            label={t('form.fields.isPrimaryContact')}
            placeholder={t('form.fields.isPrimaryContactPlaceholder')}
            options={yesNoOptions}
          />
        </Grid>

        {/* Status */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            required
            name={`${sectionPrefix}.contacts.${index}.status`}
            control={control}
            label={t('form.fields.status')}
            placeholder={t('form.fields.statusPlaceholder')}
            options={contactStatusOptions}
          />
        </Grid>

        {/* Receive PO by Email */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            required
            name={`${sectionPrefix}.contacts.${index}.receivePoByEmail`}
            control={control}
            label={t('form.fields.receivePoByEmail')}
            placeholder={t('form.fields.receivePoByEmailPlaceholder')}
            options={yesNoOptions}
          />
        </Grid>

        {/* Receive Remittance */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            required
            name={`${sectionPrefix}.contacts.${index}.receiveRemittance`}
            control={control}
            label={t('form.fields.receiveRemittance')}
            placeholder={t('form.fields.receiveRemittancePlaceholder')}
            options={yesNoOptions}
          />
        </Grid>
      </Grid>
    );
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
    >
      {contactFields.map((field, index) => (
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
                onClick={() => duplicateContact(index)}
              >
                {t('form.fields.duplicateContact')}
              </ButtonAtom>
              <IconButton
                sx={{
                  backgroundColor: 'white',
                  color: 'black',
                  borderRadius: '8px',
                }}
                onClick={() => removeContact(index)}
              >
                <IconAtom name="delete" />
              </IconButton>
            </>
          }
          title={
            <TextAtom weight={'bold'}>
              {t('form.fields.contactNumber')}
              {index + 1}
            </TextAtom>
          }
        >
          {RenderContactItem(index)}
        </CollapsibleCard>
      ))}

      {contactFields.length === 0 && (
        <TextAtom variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          {t('form.fields.noContactsAdded')}
        </TextAtom>
      )}

      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={addNewContact}
        sx={{ mt: 2 }}
      >
        {t('form.fields.addContact')}
      </Button>
    </Box>
  );
};

export default SupplierContactFields;
