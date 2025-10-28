import DropdownAtom, { DropdownOption } from '@src/components/atoms/Dropdown';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { FormControl, FormHelperText } from '@mui/material';
import { InputLabelAtom } from '@src/components/atoms';

export interface ControlledDropdownFieldProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  placeholder?: string;
  helperText?: string;
  options: DropdownOption[];
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  size?: 'small' | 'medium';
  variant?: 'standard' | 'outlined' | 'filled';
  multiple?: boolean;
  loading?: boolean;
}

const ControlledDropdownField = <
  TFieldValues extends FieldValues = FieldValues,
>({
  name,
  control,
  label,
  placeholder,
  options,
  helperText,
  required = false,
  disabled = false,
  fullWidth = true,
  startIcon,
  endIcon,
  size = 'medium',
  variant = 'outlined',
  multiple = false,
  ...selectProps
}: ControlledDropdownFieldProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const selectValue =
          field.value !== undefined ? field.value : multiple ? [] : '';

        return (
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
            <DropdownAtom
              {...field}
              {...selectProps}
              id={field.name}
              variant={variant}
              placeholder={placeholder}
              options={options}
              required={required}
              disabled={disabled}
              startIcon={startIcon}
              endIcon={endIcon}
              size={size}
              multiple={multiple}
              error={!!fieldState.error}
              value={selectValue}
            />
            {(fieldState.error?.message || helperText) && (
              <FormHelperText>
                {fieldState.error?.message || helperText}
              </FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
};

export default ControlledDropdownField;
