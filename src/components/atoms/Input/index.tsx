import { FC, ReactNode } from 'react';
import { TextFieldProps } from '@mui/material';
import { StyledInput } from './index.styled';

export interface InputProps extends Omit<TextFieldProps, 'variant' | 'error'> {
  placeholder?: string;
  helperText?: string;
  error?: boolean | string;
  success?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  fullWidth?: boolean;
}

const InputAtom: FC<InputProps> = ({
  placeholder,
  helperText,
  error,
  success = false,
  startIcon,
  endIcon,
  fullWidth = true,
  ...props
}) => {
  const errorMessage = typeof error === 'string' ? error : '';
  const showError = Boolean(error);

  return (
    <StyledInput
      fullWidth={fullWidth}
      placeholder={placeholder}
      helperText={errorMessage || helperText}
      error={showError}
      $success={success && !showError}
      InputProps={{
        startAdornment: startIcon ? (
          <div
            style={{ marginRight: 8, display: 'flex', alignItems: 'center' }}
          >
            {startIcon}
          </div>
        ) : undefined,
        endAdornment: endIcon ? (
          <div style={{ marginLeft: 8, display: 'flex', alignItems: 'center' }}>
            {endIcon}
          </div>
        ) : undefined,
      }}
      {...props}
    />
  );
};

export default InputAtom;
