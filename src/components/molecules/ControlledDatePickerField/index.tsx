import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { FormControl, FormHelperText } from '@mui/material';
import { InputAtom, InputLabelAtom } from '@src/components/atoms';

export interface ControlledDatePickerFieldProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  size?: 'small' | 'medium';
  variant?: 'standard' | 'outlined' | 'filled';
  minDate?: string;
  maxDate?: string;
  showTime?: boolean;
}

const ControlledDatePickerField = <
  TFieldValues extends FieldValues = FieldValues,
>({
  name,
  control,
  label,
  placeholder,
  helperText,
  required = false,
  disabled = false,
  fullWidth = true,
  startIcon,
  endIcon,
  size = 'medium',
  variant = 'outlined',
  minDate,
  maxDate,
  showTime = false,
  ...inputProps
}: ControlledDatePickerFieldProps<TFieldValues>) => {
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
          variant={variant}
        >
          {label && (
            <InputLabelAtom htmlFor={field.name} required={required}>
              {label}
            </InputLabelAtom>
          )}
          <InputAtom
            {...field}
            {...inputProps}
            id={field.name}
            placeholder={placeholder}
            type={showTime ? 'datetime-local' : 'date'}
            size={size}
            startIcon={startIcon}
            endIcon={endIcon}
            error={!!fieldState.error}
            inputProps={{
              min: minDate,
              max: maxDate,
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

export default ControlledDatePickerField;
