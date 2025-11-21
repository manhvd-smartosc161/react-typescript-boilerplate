import { Controller, FieldPath, Control } from 'react-hook-form';
import { FormHelperText } from '@mui/material';
import { AutocompleteAtom } from '@src/components/atoms';
import { InputLabelAtom } from '@src/components/atoms';
import { StyledFormControl } from '@src/components/atoms/Autocomplete/index.styled';
import { AutocompleteProps } from '@mui/material';
import { AutocompleteOption } from '@src/components/atoms/Autocomplete/index.styled';

interface ControlledAutocompleteFieldProps<
  TFieldValues extends Record<string, unknown>,
> extends Omit<
    AutocompleteProps<AutocompleteOption, false, false, false>,
    'value' | 'onChange' | 'error' | 'helperText' | 'label' | 'renderInput'
  > {
  name: FieldPath<TFieldValues>;
  options: AutocompleteOption[];
  control: Control<TFieldValues>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  helperText?: string;
  variant?: 'outlined' | 'standard' | 'filled';
  size?: 'small' | 'medium';
}

const ControlledAutocompleteField = <
  TFieldValues extends Record<string, unknown>,
>({
  name,
  options,
  control,
  label,
  placeholder,
  required = false,
  disabled = false,
  fullWidth = true,
  helperText,
  variant = 'outlined',
  size = 'medium',
  ...rest
}: ControlledAutocompleteFieldProps<TFieldValues>) => {
  const formState = control._formState;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const selectedObject =
          options.find((option) => option.id === field.value) || null;

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
            <AutocompleteAtom
              {...rest}
              options={options}
              value={selectedObject}
              onChange={(newValue) =>
                field.onChange(newValue ? newValue.id : null)
              }
              error={!!fieldState.error}
              variant={variant}
              placeholder={placeholder}
              id={field.name}
              size={size}
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

export default ControlledAutocompleteField;
