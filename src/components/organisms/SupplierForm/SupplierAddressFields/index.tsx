import { Box, Button, Grid, IconButton } from '@mui/material';
import { ButtonAtom, IconAtom, TextAtom } from '@src/components/atoms';
import {
  CollapsibleCard,
  ControlledDropdownField,
  ControlledTextField,
  ControlledCheckBoxField,
} from '@src/components/molecules';
import { Control, useFieldArray } from 'react-hook-form';
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
}

const SupplierAddressFields: React.FC<SupplierAddressFieldsProps> = ({
  control,
  sectionPrefix,
}) => {
  const {
    fields: addressFields,
    append: appendAddress,
    remove: removeAddress,
  } = useFieldArray({
    control,
    name: `${sectionPrefix}.addresses`,
  });

  const duplicateAddress = (index: number) => {
    const newAddress = addressFields[index];
    appendAddress(newAddress);
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
            label="Address Type"
            placeholder="Select address type"
            options={addressTypeOptions}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.addresses.${index}.name`}
            control={control}
            label="Address Name"
            placeholder="Enter address name (e.g., Main Office)"
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.addresses.${index}.line1`}
            control={control}
            label="Address Line 1"
            placeholder="Enter street address"
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <ControlledTextField
            variant="outlined"
            name={`${sectionPrefix}.addresses.${index}.line2`}
            control={control}
            label="Address Line 2"
            placeholder="Enter building/floor details (optional)"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.addresses.${index}.city`}
            control={control}
            label="City"
            placeholder="Enter city"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.addresses.${index}.state`}
            control={control}
            label="State/Province"
            placeholder="Enter state/province"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.addresses.${index}.postalCode`}
            control={control}
            label="Postal Code"
            placeholder="Enter postal code"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            required
            name={`${sectionPrefix}.addresses.${index}.country`}
            control={control}
            label="Country"
            placeholder="Select country"
            options={countryOptions}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            name={`${sectionPrefix}.addresses.${index}.phone`}
            control={control}
            label="Phone"
            placeholder="Enter phone number"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            name={`${sectionPrefix}.addresses.${index}.email`}
            control={control}
            label="Email"
            placeholder="Enter email address"
            type="email"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            name={`${sectionPrefix}.addresses.${index}.fax`}
            control={control}
            label="Fax"
            placeholder="Enter fax number"
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <ControlledCheckBoxField
            control={control}
            name={`${sectionPrefix}.addresses.${index}.purpose`}
            label="Address Purpose"
            options={addressPurposeOptions}
            columns={3}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            name={`${sectionPrefix}.addresses.${index}.shipToLocation`}
            control={control}
            label="Ship To Location"
            placeholder="Enter ship to location code"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            name={`${sectionPrefix}.addresses.${index}.billToLocation`}
            control={control}
            label="Bill To Location"
            placeholder="Enter bill to location code"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            required
            name={`${sectionPrefix}.addresses.${index}.status`}
            control={control}
            label="Status"
            placeholder="Select status"
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
                Duplicate Address
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
          title={<TextAtom weight={'bold'}>Address #{index + 1}</TextAtom>}
        >
          {RenderAddressItem(index)}
        </CollapsibleCard>
      ))}

      {addressFields.length === 0 && (
        <TextAtom variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          No addresses added yet. Click "Add Address" to get started.
        </TextAtom>
      )}

      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={addNewAddress}
        sx={{ mt: 2 }}
      >
        Add Address
      </Button>
    </Box>
  );
};

export default SupplierAddressFields;
