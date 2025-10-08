import React from 'react';
import { Box, Typography, Stack, Grid, SxProps, Theme } from '@mui/material';
import {
  RadioButtonUnchecked as RadioUncheckedIcon,
  RadioButtonChecked as RadioCheckedIcon,
  CheckBoxOutlineBlank as CheckboxUncheckedIcon,
  CheckBox as CheckboxCheckedIcon,
} from '@mui/icons-material';

interface Option {
  value: string;
  label: string;
}

export interface ReviewOptionListProps {
  label: string;
  type: 'radio' | 'checkbox';
  allOptions: Option[];
  selected: string | string[] | null | undefined;
  columns?: number;
  sx?: SxProps<Theme>;
}

const ReviewOptionList: React.FC<ReviewOptionListProps> = ({
  label,
  type,
  allOptions,
  selected,
  columns = 1,
  sx,
}) => {
  const isSelected = (optionValue: string): boolean => {
    if (!selected) return false;
    if (Array.isArray(selected)) {
      return selected.includes(optionValue);
    }
    return selected === optionValue;
  };

  const renderIcon = (optionValue: string) => {
    const selectedState = isSelected(optionValue);
    const iconProps = {
      color: selectedState ? ('primary' as const) : ('disabled' as const),
      sx: { fontSize: '1.5rem', mr: 0.5 }, // Match MUI's default size
    };

    if (type === 'radio') {
      return selectedState ? (
        <RadioCheckedIcon {...iconProps} />
      ) : (
        <RadioUncheckedIcon {...iconProps} />
      );
    }
    // type is 'checkbox'
    return selectedState ? (
      <CheckboxCheckedIcon {...iconProps} />
    ) : (
      <CheckboxUncheckedIcon {...iconProps} />
    );
  };

  return (
    <Box sx={sx}>
      <Typography
        variant="caption"
        color="text.secondary"
        component="div"
        sx={{ mb: 1 }}
      >
        {label}
      </Typography>
      <Grid container spacing={1}>
        {allOptions.map((option) => (
          <Grid key={option.value} size={{ xs: 12, md: 12 / columns }}>
            <Stack direction="row" alignItems="center">
              {renderIcon(option.value)}
              <Typography
                variant="body1"
                sx={{
                  color: isSelected(option.value)
                    ? 'text.primary'
                    : 'text.disabled',
                  fontWeight: isSelected(option.value) ? 500 : 400,
                }}
              >
                {option.label}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ReviewOptionList;
