import React from 'react';
import { useFormContext, Path } from 'react-hook-form';
import { Box, Stack, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { RegistrationFormValues } from '@src/types/registration';
import { ControlledTextField } from '@src/components';

interface PICEntryFormProps {
  fieldPrefix: string;
  displayIndex: number;
  canRemove: boolean;
  onRemove: () => void;
}

export const PICEntryForm: React.FC<PICEntryFormProps> = ({
  fieldPrefix,
  displayIndex,
  canRemove,
  onRemove,
}) => {
  const { control } = useFormContext<RegistrationFormValues>();

  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <ControlledTextField
          control={control}
          name={`${fieldPrefix}.name` as Path<RegistrationFormValues>}
          label="Representative Name"
          size="small"
          required
        />
        <ControlledTextField
          control={control}
          name={`${fieldPrefix}.email` as Path<RegistrationFormValues>}
          label="Representative Email"
          size="small"
          required
        />
        <ControlledTextField
          control={control}
          name={`${fieldPrefix}.contact` as Path<RegistrationFormValues>}
          label="Representative Contact"
          size="small"
          required
        />
        <IconButton
          aria-label={`Remove Representative ${displayIndex}`}
          onClick={onRemove}
          disabled={!canRemove}
          color="error"
          sx={{ mt: '2px' }}
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};
