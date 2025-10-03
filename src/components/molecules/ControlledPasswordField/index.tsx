import { useState } from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import {
  IconButton,
  InputAdornment,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { InputAtom, InputLabelAtom } from '@src/components/atoms';

export interface ControlledPasswordFieldProps<
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
  size?: 'small' | 'medium';
  variant?: 'standard' | 'outlined' | 'filled';
  showToggleVisibility?: boolean;
  autoComplete?: 'current-password' | 'new-password';
}

const ControlledPasswordField = <
  TFieldValues extends FieldValues = FieldValues,
>({
  name,
  control,
  label = 'Password',
  placeholder = 'Enter your password',
  helperText,
  required = false,
  disabled = false,
  fullWidth = true,
  startIcon,
  size = 'medium',
  variant = 'outlined',
  showToggleVisibility = true,
  ...inputProps
}: ControlledPasswordFieldProps<TFieldValues>) => {
  const [showPassword, setShowPassword] = useState(false);
  const formState = control._formState;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
            type={showPassword ? 'text' : 'password'}
            size={size}
            autoComplete="off"
            startIcon={startIcon}
            error={!!fieldState.error}
            endIcon={
              showToggleVisibility ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                    edge="end"
                    size={size}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ) : undefined
            }
          />
          {(fieldState.error?.message || helperText) &&
            (fieldState.isTouched || formState.isSubmitted) && (
              <FormHelperText>
                {fieldState.error?.message || helperText}
              </FormHelperText>
            )}
        </FormControl>
      )}
    />
  );
};

export default ControlledPasswordField;
