import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { FormControl, FormHelperText } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { InputAtom, InputLabelAtom } from '@src/components/atoms';
import { getTranslatedValidationMessage } from '@src/utils';

export interface ControlledTextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  placeholder?: string;
  helperText?: string;
  type?: 'text' | 'email' | 'tel' | 'url' | 'search' | 'number';
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  size?: 'small' | 'medium';
  variant?: 'standard' | 'outlined' | 'filled';
  multiline?: boolean;
  rows?: number;
  maxRows?: number;
}

const ControlledTextField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  placeholder,
  helperText,
  type = 'text',
  required = false,
  disabled = false,
  fullWidth = true,
  startIcon,
  endIcon,
  size = 'medium',
  variant = 'outlined',
  multiline = false,
  rows,
  maxRows,
  ...inputProps
}: ControlledTextFieldProps<TFieldValues>) => {
  const { t } = useTranslation();
  const formState = control._formState;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl
          fullWidth={fullWidth}
          error={!!fieldState.error}
          disabled={disabled}
          required={required}
          variant={variant || 'outlined'}
        >
          {label && (
            <InputLabelAtom htmlFor={field.name}>{label}</InputLabelAtom>
          )}
          <InputAtom
            {...field}
            {...inputProps}
            id={field.name}
            variant={variant}
            placeholder={placeholder}
            type={type}
            size={size}
            multiline={multiline}
            rows={rows}
            maxRows={maxRows}
            startIcon={startIcon}
            endIcon={endIcon}
            error={!!fieldState.error}
            autoComplete="off"
          />
          {(fieldState.error?.message || helperText) &&
            (fieldState.isTouched ||
              formState.isSubmitted ||
              fieldState.error) && (
              <FormHelperText>
                {fieldState.error?.message
                  ? getTranslatedValidationMessage(fieldState.error.message, t)
                  : helperText}
              </FormHelperText>
            )}
        </FormControl>
      )}
    />
  );
};

export default ControlledTextField;
