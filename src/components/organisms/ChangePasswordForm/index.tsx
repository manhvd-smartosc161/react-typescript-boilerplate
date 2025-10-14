import { UseFormReturn } from 'react-hook-form';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  return (
    <StyledChangePasswordForm
      component="form"
      onSubmit={(e) => e.preventDefault()}
    >
      <CardAtom sx={{ borderRadius: 2, marginTop: 4 }}>
        <LabelAtom sx={{ fontSize: 28, fontWeight: 'bold' }}>
          {t('user:password')}
        </LabelAtom>
        <StyledSubtitle sx={{ color: '#94a2b8' }}>
          {t('user:passwordSubtitle')}
        </StyledSubtitle>
        {banner?.type && <Alert severity={banner.type}>{banner.message}</Alert>}
        <Box sx={{ marginTop: 4 }}>
          <Box sx={{ marginTop: 2 }}>
            <ControlledPasswordField
              name="currentPassword"
              control={passwordForm.control}
              label={t('user:currentPassword')}
            />
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <ControlledPasswordField
              name="newPassword"
              control={passwordForm.control}
              label={t('user:newPassword')}
            />
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <ControlledPasswordField
              name="confirmPassword"
              control={passwordForm.control}
              label={t('user:confirmNewPassword')}
            />
          </Box>
        </Box>
      </CardAtom>
    </StyledChangePasswordForm>
  );
};

export default ChangePasswordForm;
