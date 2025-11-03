import { styled } from '@mui/material/styles';
import {
  Autocomplete as MuiAutocomplete,
  FormControl,
  Chip,
} from '@mui/material';
import { AutocompleteOption } from '.';

interface StyledFormControlProps {
  $success?: boolean;
}

export const StyledAutocomplete = styled(
  MuiAutocomplete<AutocompleteOption, true, false, false>,
)(() => ({
  '& .MuiAutocomplete-inputRoot': {
    minHeight: '40px',
    padding: '4px 8px',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',

    '&.Mui-focused': {
      padding: '4px 8px',
    },

    '& .MuiChip-root': {
      margin: '2px 4px 2px 0',
    },

    '&[class*="MuiAutocomplete-hasClearIcon"] input': {
      padding: '4px 6px !important',
    },
  },

  '& .MuiAutocomplete-input': {
    padding: '6px !important',
    fontSize: '14px',
    lineHeight: '20px',
  },
}));

export const StyledFormControl = styled(FormControl)<StyledFormControlProps>(
  () => ({
    '& .MuiInputLabel-root': {},
  }),
);
export const TagChip = styled(Chip)(() => ({
  backgroundColor: '#F1F8FF',
  color: '#6B6B6B',
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: 400,
  padding: '6px 8px',
  border: '1px solid #E0E0E0',
  gap: '10px',
  '& .MuiChip-deleteIcon': {
    color: '#667085',
    fontSize: '16px',
    marginLeft: '4px',
    '&:hover': {
      color: '#000938',
    },
  },
}));
