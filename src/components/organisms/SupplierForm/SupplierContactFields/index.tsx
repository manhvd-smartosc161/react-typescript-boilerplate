import { Box, Button, Grid, IconButton } from '@mui/material';
import { ButtonAtom, IconAtom, TextAtom } from '@src/components/atoms';
import {
  CollapsibleCard,
  ControlledDropdownField,
  ControlledTextField,
  ControlledAutocompleteField,
} from '@src/components/molecules';
import { Control, useFieldArray, useWatch } from 'react-hook-form';
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
    const newContact = contactFields[index];
    appendContact(newContact);
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
            label="Associated Addresses"
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
            label="Department"
            placeholder="Enter department"
          />
        </Grid>

        {/* Salutation */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            required
            name={`${sectionPrefix}.contacts.${index}.salutation`}
            control={control}
            label="Salutation"
            placeholder="Select salutation"
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
            label="First Name"
            placeholder="Enter first name"
          />
        </Grid>

        {/* Middle Name */}
        <Grid size={{ xs: 12, md: 4 }}>
          <ControlledTextField
            variant="outlined"
            name={`${sectionPrefix}.contacts.${index}.middleName`}
            control={control}
            label="Middle Name"
            placeholder="Enter middle name (optional)"
          />
        </Grid>

        {/* Last Name */}
        <Grid size={{ xs: 12, md: 4 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.contacts.${index}.lastName`}
            control={control}
            label="Last Name"
            placeholder="Enter last name"
          />
        </Grid>

        {/* Job Title */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.contacts.${index}.jobTitle`}
            control={control}
            label="Job Title"
            placeholder="Enter job title"
          />
        </Grid>

        {/* Role */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            required
            name={`${sectionPrefix}.contacts.${index}.role`}
            control={control}
            label="Role"
            placeholder="Select role"
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
            label="Phone"
            placeholder="Enter phone number"
          />
        </Grid>

        {/* Email */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.contacts.${index}.email`}
            control={control}
            label="Email"
            placeholder="Enter email address"
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
            label="Is Primary Contact"
            placeholder="Select if primary"
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
            label="Status"
            placeholder="Select status"
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
            label="Receive PO by Email"
            placeholder="Select preference"
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
            label="Receive Remittance"
            placeholder="Select preference"
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
                Duplicate Contact
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
          title={<TextAtom weight={'bold'}>Contact #{index + 1}</TextAtom>}
        >
          {RenderContactItem(index)}
        </CollapsibleCard>
      ))}

      {contactFields.length === 0 && (
        <TextAtom variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          No contacts added yet. Click "Add Contact" to get started.
        </TextAtom>
      )}

      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={addNewContact}
        sx={{ mt: 2 }}
      >
        Add Contact
      </Button>
    </Box>
  );
};

export default SupplierContactFields;
