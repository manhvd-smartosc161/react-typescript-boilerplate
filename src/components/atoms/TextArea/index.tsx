import { FC, ReactNode } from 'react';
import { TextFieldProps } from '@mui/material';
import { StyledTextArea } from './index.styled';

export interface TextAreaProps
  extends Omit<TextFieldProps, 'error' | 'multiline'> {
  placeholder?: string;
  helperText?: string;
  error?: boolean | string;
  success?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  fullWidth?: boolean;
  rows?: number;
  maxRows?: number;
  minRows?: number;
}

const TextAreaAtom: FC<TextAreaProps> = ({
  placeholder,
  helperText,
  error,
  success = false,
  startIcon,
  endIcon,
  fullWidth = true,
  rows,
  maxRows,
  minRows,
  ...props
}) => {
  const errorMessage = typeof error === 'string' ? error : '';
  const showError = Boolean(error);

  return (
    <StyledTextArea
      fullWidth={fullWidth}
      placeholder={placeholder}
      helperText={errorMessage || helperText}
      error={showError}
      $success={success && !showError}
      multiline
      rows={rows}
      maxRows={maxRows}
      minRows={minRows}
      InputProps={{
        startAdornment: startIcon ? (
          <div
            style={{ marginRight: 3, display: 'flex', alignItems: 'center' }}
          >
            {startIcon}
          </div>
        ) : undefined,
        endAdornment: endIcon ? (
          <div style={{ marginLeft: 4, display: 'flex', alignItems: 'center' }}>
            {endIcon}
          </div>
        ) : undefined,
      }}
      {...props}
    />
  );
};

export default TextAreaAtom;
