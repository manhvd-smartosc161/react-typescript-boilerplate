import React from 'react';
import { useFieldArray, useFormContext, FieldPath } from 'react-hook-form';
import { Box, Typography, Button, Stack } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { RegistrationFormValues } from '@src/types/registration';
import { TitleAtom } from '@src/components/atoms';
import PICEntryForm from '@src/components/molecules/PICEntryForm';

const MAX_ENTRIES = 5;
const MIN_ENTRIES = 1;

interface PICSectionProps {
  name: FieldPath<RegistrationFormValues>;
}

const PICSection: React.FC<PICSectionProps> = ({ name }) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const handleAddPerson = () => {
    if (fields.length < MAX_ENTRIES) {
      append({ name: '', email: '', contact: '' });
    }
  };

  // TODO: Refactor required — relocate the "PIC" label to the parent component to enhance reusability and maintainability across different sections.
  return (
    <Box>
      <TitleAtom variant="subtitle1" fontWeight={'bold'}>
        PIC
      </TitleAtom>

      <Stack spacing={2}>
        {fields.map((field, index) => (
          <PICEntryForm
            key={field.id}
            fieldPrefix={`${name}.${index}`}
            displayIndex={index + 1}
            onRemove={() => remove(index)}
            canRemove={fields.length > MIN_ENTRIES}
          />
        ))}
      </Stack>

      <Button
        startIcon={<AddIcon />}
        onClick={handleAddPerson}
        disabled={fields.length >= MAX_ENTRIES}
        sx={{ mt: 2 }}
      >
        Add Person
      </Button>
      {fields.length >= MAX_ENTRIES && (
        <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
          Maximum of 5 PICs can be added.
        </Typography>
      )}
    </Box>
  );
};

export default PICSection;
