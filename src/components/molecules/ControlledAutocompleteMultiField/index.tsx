import { Controller, FieldPath, Control, FieldValues } from 'react-hook-form';
import { FormHelperText } from '@mui/material';
import { AutocompleteProps } from '@mui/material/Autocomplete';
import { InputLabelAtom } from '@src/components/atoms';
import { StyledFormControl } from '@src/components/atoms/Autocomplete/index.styled';
import AutocompleteMultiAtom from '@src/components/atoms/AutocompleteMulti';
import { AutocompleteOption } from '@src/components/atoms/Autocomplete';

interface ControlledAutocompleteMultiFieldProps<
  TFieldValues extends FieldValues,
> extends Omit<
    AutocompleteProps<AutocompleteOption, true, false, false>,
    'value' | 'onChange' | 'renderInput' | 'multiple'
  > {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  options: AutocompleteOption[];
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  helperText?: string;
  variant?: 'outlined' | 'standard' | 'filled';
  size?: 'small' | 'medium';
}
const ControlledAutocompleteMultiField = <TFieldValues extends FieldValues>({
  name,
  control,
  options,
  label,
  placeholder,
  required = false,
  disabled = false,
  fullWidth = true,
  helperText,
  variant = 'outlined',
}: ControlledAutocompleteMultiFieldProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState, formState }) => {
        // Transform field.value (array of IDs) to array of AutocompleteOption objects
        const selectedOptions: AutocompleteOption[] =
          Array.isArray(field.value) && field.value.length > 0
            ? (field.value
                .map((id: string | number) =>
                  options.find(
                    (option: AutocompleteOption) => option.id === id,
                  ),
                )
                .filter(
                  (
                    option: AutocompleteOption | undefined,
                  ): option is AutocompleteOption => option !== undefined,
                ) as AutocompleteOption[])
            : [];

        return (
          <StyledFormControl
            fullWidth={fullWidth}
            error={!!fieldState.error?.message}
            disabled={disabled}
            required={required}
            variant={variant}
          >
            {label && (
              <InputLabelAtom htmlFor={field.name} required={required}>
                {label}
              </InputLabelAtom>
            )}

            <AutocompleteMultiAtom
              options={options}
              value={selectedOptions}
              onChange={(newValue: AutocompleteOption[]) => {
                // Always transform to array of IDs
                const ids = newValue.map((option) => option.id);
                field.onChange(ids);
              }}
              id={name}
              placeholder={placeholder}
              onBlur={field.onBlur}
            />

            {(fieldState.error?.message || helperText) &&
              (fieldState.isTouched || formState.isSubmitted) && (
                <FormHelperText>
                  {fieldState.error?.message || helperText}
                </FormHelperText>
              )}
          </StyledFormControl>
        );
      }}
    />
  );
};

export default ControlledAutocompleteMultiField;
