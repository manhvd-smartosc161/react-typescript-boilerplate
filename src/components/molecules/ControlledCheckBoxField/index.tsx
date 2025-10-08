import { Controller, FieldPath, FieldValues, Control } from 'react-hook-form';
import {
  FormGroup,
  FormControlLabel,
  Grid,
  FormHelperText,
  Typography,
  Box,
} from '@mui/material';
import { CheckBoxAtom, InputLabelAtom } from '@src/components/atoms';

export interface CheckBoxOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface ControlledCheckBoxFieldProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  name: FieldPath<TFieldValues>;
  label?: string;
  options?: CheckBoxOption[];
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'default';
  single?: boolean;
  size?: 'small' | 'medium';
  control: Control<TFieldValues>;
  /** The number of columns to display the checkboxes in. Defaults to 1. */
  columns?: number;
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
  size = 'medium',
  columns = 1,
  ...checkboxProps
}: ControlledCheckBoxFieldProps<TFieldValues>) => {
  if (single) {
    // Single checkbox mode
    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          return (
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
                    mt: -1,
                    mb: 1,
                    color: fieldState.error?.message
                      ? 'error.main'
                      : 'text.secondary',
                  }}
                >
                  {fieldState.error?.message || helperText}
                </Typography>
              )}
            </Box>
          );
        }}
      />
    );
  }

  // Multiple checkbox mode
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const handleCheckboxChange = (value: string | number) => {
          const currentValues = (field.value as (string | number)[]) || [];
          const newValues = currentValues.includes(value)
            ? currentValues.filter((item: string | number) => item !== value)
            : [...currentValues, value];
          field.onChange(newValues);
        };

        return (
          <>
            {label && (
              <InputLabelAtom required={required} sx={{ mb: 1 }}>
                {label}
              </InputLabelAtom>
            )}

            <FormGroup>
              <Grid container>
                {options.map((option) => (
                  <Grid size={{ xs: 12, md: 12 / columns }} key={option.value}>
                    <FormControlLabel
                      control={
                        <CheckBoxAtom
                          {...checkboxProps}
                          checked={(
                            (field.value as (string | number)[]) || []
                          ).includes(option.value)}
                          onChange={() => handleCheckboxChange(option.value)}
                          color={color}
                          disabled={disabled || option.disabled}
                          size={size}
                        />
                      }
                      label={option.label}
                      disabled={disabled || option.disabled}
                      // TODO: Need Refactor, move to styled component
                      sx={{
                        '& .MuiFormControlLabel-label': {
                          fontSize: '1rem',
                          fontWeight: 400,
                        },
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </FormGroup>

            {(fieldState.error?.message || helperText) && (
              <FormHelperText error={!!fieldState.error?.message}>
                {fieldState.error?.message || helperText}
              </FormHelperText>
            )}
          </>
        );
      }}
    />
  );
};

export default ControlledCheckBoxField;
