import { FC, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ButtonAtom, TextAtom, TextLinkAtom } from '@src/components/atoms';
import {
  ControlledCheckBoxField,
  ControlledPasswordField,
} from '@src/components/molecules';
import { newPasswordSchema } from '@src/schemas/authSchema';
import { NewPasswordFormData } from '@src/types';
import { getErrorMessage } from '@src/errors';
import ROUTES from '@src/routes/route';
import { StyledResetPasswordForm } from './index.styled';
import { useNewPasswordMutation } from '@src/hooks/auth/useNewPasswordMutation';

const NewPasswordForm: FC = () => {
  const { t } = useTranslation('auth');
  const newPasswordMutation = useNewPasswordMutation();
  const [showWarning, setShowWarning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewPasswordFormData>({
    resolver: yupResolver(newPasswordSchema),
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
      agreedTerms: false,
    },
  });

  // Validate token on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (!token) {
      setErrorMessage(
        'Invalid reset link. Please request a new password reset.',
      );
      setShowWarning(true);
      return;
    }
  }, []);

  useEffect(() => {
    if (newPasswordMutation.isError && newPasswordMutation.error) {
      const message = getErrorMessage(newPasswordMutation.error);
      setErrorMessage(message);
      setShowWarning(true);
      setShowSuccess(false);
    }
  }, [newPasswordMutation.isError]);

  useEffect(() => {
    if (newPasswordMutation.isSuccess) {
      setShowSuccess(true);
      setShowWarning(false);
      setSuccessMessage(
        'Password has been reset successfully! Redirecting to login...',
      );
    }
  }, [newPasswordMutation.isSuccess]);

  const onSubmit = async (data: NewPasswordFormData) => {
    if (newPasswordMutation.isPending) {
      return;
    }

    setErrorMessage('');
    setSuccessMessage('');
    setShowWarning(false);
    setShowSuccess(false);

    // Get token from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (!token) {
      setErrorMessage(
        'Invalid reset link. Please request a new password reset.',
      );
      setShowWarning(true);
      return;
    }

    newPasswordMutation.mutate({
      newPassword: data.newPassword,
      token,
      agreedTerms: data.agreedTerms,
      confirmNewPassword: data.confirmPassword,
    });
  };

  return (
    <>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 600,
            color: '#333',
            mb: 0.5,
          }}
        >
          {t('setYourNewPassword')}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {t('wellcomeBackSupplier')}
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <StyledResetPasswordForm>
          {showWarning && (
            <Alert severity="warning" sx={{ mb: 3 }}>
              {errorMessage}
            </Alert>
          )}

          {showSuccess && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {successMessage}
            </Alert>
          )}

          <Box sx={{ mb: 2 }}>
            <ControlledPasswordField
              name="newPassword"
              control={control}
              label={t('newPassword')}
              placeholder={t('enterAtLeast8Characters')}
              required
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <ControlledPasswordField
              name="confirmPassword"
              control={control}
              label={t('confirmNewPassword')}
              placeholder={t('enterAtLeast8Characters')}
              required
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <ControlledCheckBoxField
              name="agreedTerms"
              control={control}
              label={
                <>
                  {t('bySigningUpYouAgreeToOur')}{' '}
                  <TextLinkAtom variant="body2" to={'/terms-of-use'}>
                    {t('termsOfUseAndPrivacyPolicy')}
                  </TextLinkAtom>
                </>
              }
              single={true}
              color="primary"
            />
          </Box>
          <ButtonAtom
            variant="primary"
            type="submit"
            loading={isSubmitting || newPasswordMutation.isPending}
            disabled={showSuccess}
            fullWidth
            size="large"
            sx={{ mb: 2, mt: 2 }}
          >
            {t('completeRegistration')}
          </ButtonAtom>

          <Box sx={{ textAlign: 'center', mt: 1 }}>
            <TextAtom variant="body2" sx={{ color: 'text.secondary' }}>
              {t('wantToRegisterForNewSupplierAccount')}{' '}
              <TextLinkAtom variant="body2" to={ROUTES.SIGNUP}>
                {t('signUpHere')}
              </TextLinkAtom>
            </TextAtom>
          </Box>
        </StyledResetPasswordForm>
      </form>
    </>
  );
};

export default NewPasswordForm;
