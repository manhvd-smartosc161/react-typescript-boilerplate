import React, { HTMLAttributes } from 'react';
import { Stack, Paper, Button } from '@mui/material';
import { UploadFileOutlined as UploadIcon } from '@mui/icons-material';

const AddFileButton = React.forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <Stack
      {...props}
      ref={ref}
      direction="row"
      spacing={1.5}
      alignItems="center"
      sx={{ cursor: 'pointer', display: 'inline-flex' }}
    >
      <Paper
        variant="outlined"
        sx={{
          width: 80,
          height: 80,
          borderStyle: 'dashed',
          borderColor: 'grey.400',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <UploadIcon sx={{ fontSize: 40, color: 'grey.600' }} />
      </Paper>
      <Button variant="text" component="span">
        + Add
      </Button>
    </Stack>
  );
});

export default AddFileButton;
