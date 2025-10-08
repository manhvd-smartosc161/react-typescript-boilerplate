import React from 'react';
import {
  TextField,
  CircularProgress,
  AutocompleteProps as MuiAutocompleteProps,
} from '@mui/material';
import { StyledAutocomplete } from './index.styled';

export interface AutocompleteOption {
  id: string | number;
  label: string;
}
interface AutocompleteProps
  extends Omit<
    MuiAutocompleteProps<AutocompleteOption, false, false, false>,
    'options' | 'renderInput' | 'value' | 'onChange'
  > {
  options: AutocompleteOption[];
  value: AutocompleteOption | null;
  onChange: (value: AutocompleteOption | null) => void;
  loading?: boolean;
  error?: boolean;
  helperText?: React.ReactNode;
  variant?: 'outlined' | 'standard' | 'filled';
  label?: string;
  placeholder?: string;
  id?: string;
  size?: 'small' | 'medium';
}

const AutocompleteAtom: React.FC<AutocompleteProps> = ({
  options,
  value,
  onChange,
  loading = false,
  error = false,
  helperText,
  variant = 'outlined',
  label,
  placeholder,
  id,
  size = 'medium',
  ...rest
}) => {
  return (
    <StyledAutocomplete
      {...rest}
      id={id}
      value={value}
      options={options}
      loading={loading}
      onChange={(_, newValue) => {
        onChange(newValue);
      }}
      isOptionEqualToValue={(option, val) => option.id === val.id}
      getOptionLabel={(option) => option.label || ''}
      renderInput={(params) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          variant={variant}
          label={label}
          placeholder={placeholder}
          size={size}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default AutocompleteAtom;
