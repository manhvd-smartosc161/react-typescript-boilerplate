import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { FormControl, FormHelperText } from '@mui/material';
import { TextAreaAtom } from '@src/components/atoms';
import { InputLabelAtom } from '@src/components/atoms';

export interface ControlledTextAreaFieldProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  placeholder?: string;
  helperText?: string;
  type?: 'text' | 'email' | 'tel' | 'url' | 'search';
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  size?: 'small' | 'medium';
  variant?: 'standard' | 'outlined' | 'filled';
  rows?: number;
  maxRows?: number;
  minRows?: number;
  maxLength?: number;
}

const ControlledTextAreaField = <
  TFieldValues extends FieldValues = FieldValues,
>({
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
  rows,
  maxRows,
  minRows,
  maxLength,
  ...inputProps
}: ControlledTextAreaFieldProps<TFieldValues>) => {
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
        >
          {label && (
            <InputLabelAtom htmlFor={field.name}>{label}</InputLabelAtom>
          )}
          <TextAreaAtom
            {...field}
            {...inputProps}
            id={field.name}
            variant={variant}
            placeholder={placeholder}
            type={type}
            size={size}
            rows={rows}
            maxRows={maxRows}
            minRows={minRows}
            startIcon={startIcon}
            endIcon={endIcon}
            error={!!fieldState.error}
            inputProps={{
              maxLength,
            }}
          />
          {(fieldState.error?.message || helperText) && (
            <FormHelperText>
              {fieldState.error?.message || helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

export default ControlledTextAreaField;
