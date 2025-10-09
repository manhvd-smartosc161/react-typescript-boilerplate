import { UseFormReturn } from 'react-hook-form';
import { Box } from '@mui/material';
import { CardAtom, LabelAtom } from '@src/components/atoms';
import { ControlledPasswordField, Alert } from '@src/components/molecules';
import { StyledSubtitle } from '@src/components/templates/PageTemplate/index.styled';
import { ChangePasswordFormData } from '@src/types';
import { StyledChangePasswordForm } from './index.styled';

export interface ChangePasswordFormProps {
  passwordForm: UseFormReturn<
    ChangePasswordFormData,
    any,
    ChangePasswordFormData
  >;
  banner?: {
    type: 'success' | 'error' | null;
    message: string;
  };
}

const ChangePasswordForm = (props: ChangePasswordFormProps) => {
  const { passwordForm, banner } = props;

  return (
    <StyledChangePasswordForm
      component="form"
      onSubmit={(e) => e.preventDefault()}
    >
      <CardAtom sx={{ borderRadius: 2, marginTop: 4 }}>
        <LabelAtom sx={{ fontSize: 28, fontWeight: 'bold' }}>
          Password
        </LabelAtom>
        <StyledSubtitle sx={{ color: '#94a2b8' }}>
          Change your password. It's a good idea to use a strong password that
          you're not using elsewhere.
        </StyledSubtitle>
        {banner?.type && <Alert severity={banner.type}>{banner.message}</Alert>}
        <Box sx={{ marginTop: 4 }}>
          <Box sx={{ marginTop: 2 }}>
            <ControlledPasswordField
              name="currentPassword"
              control={passwordForm.control}
              label="Current Password"
            />
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <ControlledPasswordField
              name="newPassword"
              control={passwordForm.control}
              label="New Password"
            />
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <ControlledPasswordField
              name="confirmPassword"
              control={passwordForm.control}
              label="Confirm New Password"
            />
          </Box>
        </Box>
      </CardAtom>
    </StyledChangePasswordForm>
  );
};

export default ChangePasswordForm;
