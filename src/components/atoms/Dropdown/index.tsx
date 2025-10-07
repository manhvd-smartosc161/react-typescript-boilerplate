import { FC, ReactNode } from 'react';
import {
  MenuItem,
  InputLabel,
  SelectProps,
  FormHelperText,
} from '@mui/material';
import { StyledDropdown, StyledFormControl } from './index.styled';

export interface DropdownOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface DropdownProps extends Omit<SelectProps, 'variant'> {
  label?: string;
  placeholder?: string;
  options: DropdownOption[];
  helperText?: string;
  error?: boolean;
  success?: boolean;
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  variant?: 'standard' | 'outlined' | 'filled';
}

const DropdownAtom: FC<DropdownProps> = ({
  label,
  placeholder = 'Select an option',
  options,
  helperText,
  error = false,
  success = false,
  fullWidth = true,
  startIcon,
  endIcon,
  variant = 'outlined',
  ...props
}) => {
  const errorMessage = typeof error === 'string' ? error : '';
  const showError = Boolean(error);

  return (
    <StyledFormControl
      fullWidth={fullWidth}
      error={showError}
      $success={success && !showError}
    >
      {label && <InputLabel variant={variant}>{label}</InputLabel>}
      <StyledDropdown
        displayEmpty
        label={label}
        $success={success && !showError}
        variant={variant}
        startAdornment={
          startIcon ? (
            <div
              style={{ marginRight: 4, display: 'flex', alignItems: 'center' }}
            >
              {startIcon}
            </div>
          ) : undefined
        }
        endAdornment={
          endIcon ? (
            <div
              style={{ marginLeft: 4, display: 'flex', alignItems: 'center' }}
            >
              {endIcon}
            </div>
          ) : undefined
        }
        {...props}
      >
        {placeholder && (
          <MenuItem value="" disabled>
            <em>{placeholder}</em>
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </MenuItem>
        ))}
      </StyledDropdown>
      {(errorMessage || helperText) && (
        <FormHelperText>{errorMessage || helperText}</FormHelperText>
      )}
    </StyledFormControl>
  );
};

export default DropdownAtom;
