import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Paper,
  Typography,
  Grid,
  IconButton,
  Stack,
  Checkbox,
  FormControlLabel,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { RegistrationFormValues } from '@src/types/registration';
import {
  ControlledDropdownField,
  ControlledTextField,
} from '@src/components/molecules';
import { SingleImageUploader } from '@src/components/molecules';

interface Props {
  index: number;
  onRemove: () => void;
  canRemove: boolean;
}

const ProductLineEntry: React.FC<Props> = ({ index, onRemove, canRemove }) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<RegistrationFormValues>();
  const fieldPrefix = `productInfo.productLines.${index}` as const;
  const soldAtError = (errors.productInfo?.productLines?.[index] as any)?.soldAt
    ?.message;

  return (
    <Paper variant="outlined" sx={{ p: 2.5 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Stack direction="row" spacing={3} alignItems="center">
          <Typography variant="h6">Product Line #{index + 1}</Typography>
          <FormControlLabel
            control={<Checkbox {...register(`${fieldPrefix}.soldAt.makro`)} />}
            label="Sale at Makro"
          />
          <FormControlLabel
            control={<Checkbox {...register(`${fieldPrefix}.soldAt.lotus`)} />}
            label="Sale at Lotus's"
          />
          {soldAtError && (
            <Typography variant="caption" color="error">
              {soldAtError}
            </Typography>
          )}
        </Stack>
        {canRemove && (
          <IconButton onClick={onRemove} color="error">
            <DeleteIcon />
          </IconButton>
        )}
      </Stack>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            control={control}
            name={`${fieldPrefix}.brandNameTh`}
            label="Product/Brand Name (Th) *"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            control={control}
            name={`${fieldPrefix}.brandNameEn`}
            label="Product/Brand Name (En) *"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            control={control}
            name={`${fieldPrefix}.productCategory`}
            label="Product Category *"
            options={[]}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            control={control}
            name={`${fieldPrefix}.productSubcategory`}
            label="Product subcategory *"
            options={[]}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            control={control}
            name={`${fieldPrefix}.skuCount`}
            label="SKU Count *"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            control={control}
            name={`${fieldPrefix}.offerExclusivity`}
            label="Willingness to Offer Exclusivity *"
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ]}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            control={control}
            name={`${fieldPrefix}.targetCustomerType`}
            label="Target Customer Type"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            control={control}
            name={`${fieldPrefix}.availableChannels`}
            label="Available Channels"
            options={[]}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            control={control}
            name={`${fieldPrefix}.usp`}
            label="USP / Differentiators"
            multiline
            rows={3}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            control={control}
            name={`${fieldPrefix}.currentlySoldIn`}
            label="Currently Sold In"
            multiline
            rows={3}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
            Product Image Upload (Range Level)
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6, md: 3 }}>
              <SingleImageUploader
                name={`${fieldPrefix}.images.packagingFront`}
                label="Packaging image"
                required
              />
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <SingleImageUploader
                name={`${fieldPrefix}.images.packagingBehind`}
                label="Behind"
                required
              />
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <SingleImageUploader
                name={`${fieldPrefix}.images.packagingSide`}
                label="Side"
                required
              />
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <SingleImageUploader
                name={`${fieldPrefix}.images.otherAspects`}
                label="Other aspects"
                required
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProductLineEntry;
