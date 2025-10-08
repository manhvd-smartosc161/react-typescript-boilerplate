import { styled } from '@mui/material/styles';
import { Autocomplete as MuiAutocomplete, FormControl } from '@mui/material';

export interface AutocompleteOption {
  id: string | number;
  label: string;
}

interface StyledAutocompleteProps {
  $success?: boolean;
}

interface StyledFormControlProps {
  $success?: boolean;
}

export const StyledAutocomplete = styled(
  MuiAutocomplete<AutocompleteOption, false, false, false>,
)<StyledAutocompleteProps>(() => ({
  '& .MuiAutocomplete-inputRoot': {
    padding: '12px 0px',
  },
  '& .MuiAutocomplete-input': {
    padding: '0 16px !important',
  },
}));

export const StyledFormControl = styled(FormControl)<StyledFormControlProps>(
  () => ({
    '& .MuiInputLabel-root': {},
  }),
);
