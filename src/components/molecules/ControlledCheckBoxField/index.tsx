import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { FormControlLabel, Typography, Box } from '@mui/material';
import { CheckBoxAtom } from '@src/components/atoms';

export interface CheckBoxOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface ControlledCheckBoxFieldProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  options?: CheckBoxOption[];
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'default';
  single?: boolean; // If true, renders as single checkbox instead of checkbox group
  row?: boolean;
  size?: 'small' | 'medium';
}

const ControlledCheckBoxField = <
  TFieldValues extends FieldValues = FieldValues,
>({
  name,
  control,
  label,
  options = [],
  helperText,
  required = false,
  disabled = false,
  color = 'primary',
  single = false,
  row = false,
  size = 'medium',
  ...checkboxProps
}: ControlledCheckBoxFieldProps<TFieldValues>) => {
  if (single) {
    // Single checkbox mode
    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Box>
            <FormControlLabel
              control={
                <CheckBoxAtom
                  {...field}
                  {...checkboxProps}
                  checked={!!field.value}
                  color={color}
                  disabled={disabled}
                  size={size}
                />
              }
              label={
                <>
                  {label}
                  {required && <span style={{ color: '#ff4d4f' }}> *</span>}
                </>
              }
              disabled={disabled}
            />

            {(fieldState.error?.message || helperText) && (
              <Typography
                variant="body2"
                sx={{
                  mt: 1,
                  color: fieldState.error?.message
                    ? 'error.main'
                    : 'text.secondary',
                }}
              >
                {fieldState.error?.message || helperText}
              </Typography>
            )}
          </Box>
        )}
      />
    );
  }

  // Multiple checkbox mode
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Box>
          {label && (
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              {label}
              {required && <span style={{ color: '#ff4d4f' }}> *</span>}
            </Typography>
          )}

          <Box
            sx={{
              display: 'flex',
              flexDirection: row ? 'row' : 'column',
              gap: 1,
            }}
          >
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <CheckBoxAtom
                    {...checkboxProps}
                    checked={
                      Array.isArray(field.value) &&
                      field.value.includes(option.value)
                    }
                    onChange={(e) => {
                      const currentValues = Array.isArray(field.value)
                        ? field.value
                        : [];
                      if (e.target.checked) {
                        field.onChange([...currentValues, option.value]);
                      } else {
                        field.onChange(
                          currentValues.filter((val) => val !== option.value),
                        );
                      }
                    }}
                    color={color}
                    disabled={disabled || option.disabled}
                    size={size}
                  />
                }
                label={option.label}
                disabled={disabled || option.disabled}
              />
            ))}
          </Box>

          {(fieldState.error?.message || helperText) && (
            <Typography
              variant="body2"
              sx={{
                mt: 1,
                color: fieldState.error?.message
                  ? 'error.main'
                  : 'text.secondary',
              }}
            >
              {fieldState.error?.message || helperText}
            </Typography>
          )}
        </Box>
      )}
    />
  );
};

export default ControlledCheckBoxField;
