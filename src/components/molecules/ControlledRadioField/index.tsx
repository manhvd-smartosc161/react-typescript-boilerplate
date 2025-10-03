import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { RadioGroup, FormControlLabel, FormLabel } from '@mui/material';
import { RadioAtom } from '@src/components/atoms';

export interface RadioOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface ControlledRadioFieldProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  options: RadioOption[];
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'default';
  row?: boolean;
  size?: 'small' | 'medium';
}

const ControlledRadioField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  options,
  helperText,
  required = false,
  disabled = false,
  color = 'primary',
  row = false,
  size = 'medium',
  ...radioGroupProps
}: ControlledRadioFieldProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div>
          {label && (
            <FormLabel component="legend" sx={{ mb: 1, display: 'block' }}>
              {label}
              {required && <span style={{ color: '#ff4d4f' }}> *</span>}
            </FormLabel>
          )}

          <RadioGroup
            {...field}
            {...radioGroupProps}
            row={row}
            value={field.value || ''}
          >
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={
                  <RadioAtom
                    color={color}
                    disabled={disabled || option.disabled}
                    size={size}
                  />
                }
                label={option.label}
                disabled={disabled || option.disabled}
              />
            ))}
          </RadioGroup>

          {(fieldState.error?.message || helperText) && (
            <div style={{ marginTop: 8, fontSize: '0.875rem' }}>
              {fieldState.error?.message && (
                <span style={{ color: '#d32f2f' }}>
                  {fieldState.error.message}
                </span>
              )}
              {!fieldState.error?.message && helperText && (
                <span style={{ color: '#666' }}>{helperText}</span>
              )}
            </div>
          )}
        </div>
      )}
    />
  );
};

export default ControlledRadioField;
