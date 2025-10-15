import { FC, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Email } from '@mui/icons-material';
import { Box, Typography, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ButtonAtom, TextAtom, TextLinkAtom } from '@src/components/atoms';
import { ControlledTextField } from '@src/components/molecules';
import { useForgotPasswordMutation } from '@src/hooks';
import { forgotPasswordSchema } from '@src/schemas/authSchema';
import { ForgotPasswordFormData } from '@src/types';
import { getErrorMessage } from '@src/errors';
import ROUTES from '@src/routes/route';
import { StyledForgotPasswordForm, StyledResendButton } from './index.styled';

const ForgotPasswordForm: FC = () => {
  const { t } = useTranslation();
  const forgotPasswordMutation = useForgotPasswordMutation();
  const [showWarning, setShowWarning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotPasswordSchema),
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
    defaultValues: {
      email: '',
    },
  });

  const emailValue = watch('email');

  // Reset success state when user changes email
  useEffect(() => {
    if (showSuccess) {
      setShowSuccess(false);
      setShowWarning(false);
      setErrorMessage('');
      setSuccessMessage('');
    }
  }, [emailValue]);

  useEffect(() => {
    if (forgotPasswordMutation.isError && forgotPasswordMutation.error) {
      const message = getErrorMessage(forgotPasswordMutation.error);
      setErrorMessage(message);
      setShowWarning(true);
      setShowSuccess(false);
    }
  }, [forgotPasswordMutation.isError]);

  useEffect(() => {
    if (forgotPasswordMutation.isSuccess) {
      setShowSuccess(true);
      setShowWarning(false);
      setSuccessMessage(t('auth:emailSentMessage'));
    }
  }, [forgotPasswordMutation.isSuccess, t]);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    if (forgotPasswordMutation.isPending) {
      return;
    }

    setErrorMessage('');
    setSuccessMessage('');
    setShowWarning(false);
    setShowSuccess(false);

    forgotPasswordMutation.mutate({
      email: data.email,
    });
  };

  const handleResendEmail = () => {
    if (forgotPasswordMutation.isPending) {
      return;
    }

    if (emailValue) {
      setShowWarning(false);
      setErrorMessage('');

      forgotPasswordMutation.mutate({
        email: emailValue,
      });
    }
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
          {t('auth:forgotPassword')}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {t('auth:forgotPasswordSubtitle')}
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <StyledForgotPasswordForm>
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
            <ControlledTextField
              name="email"
              control={control}
              label={t('auth:email')}
              placeholder={t('auth:emailPlaceholder')}
              type="email"
              startIcon={<Email />}
              required
              disabled={showSuccess}
            />
          </Box>

          <ButtonAtom
            variant="primary"
            type="submit"
            loading={isSubmitting || forgotPasswordMutation.isPending}
            disabled={showSuccess}
            fullWidth
            size="large"
            sx={{
              mb: 2,
              background: showSuccess
                ? '#ccc'
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: showSuccess ? '#666' : 'white',
              '&:hover': {
                background: showSuccess
                  ? '#ccc'
                  : 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
              },
            }}
          >
            {showSuccess ? t('auth:emailSent') : t('auth:sendPasswordReset')}
          </ButtonAtom>

          {showSuccess && (
            <StyledResendButton
              variant="contained"
              onClick={handleResendEmail}
              disabled={forgotPasswordMutation.isPending}
              fullWidth
              size="large"
            >
              {forgotPasswordMutation.isPending
                ? t('auth:sending')
                : t('auth:resendEmail')}
            </StyledResendButton>
          )}

          <Box sx={{ textAlign: 'center', mt: 1 }}>
            <TextAtom variant="body2" sx={{ color: 'text.secondary' }}>
              {t('auth:rememberPassword')}{' '}
              <TextLinkAtom variant="body2" to={ROUTES.LOGIN}>
                {t('auth:backToLogin')}
              </TextLinkAtom>
            </TextAtom>
          </Box>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <TextAtom variant="body2" sx={{ color: 'text.secondary' }}>
              {t('auth:dontHaveAccount')}{' '}
              <TextLinkAtom variant="body2" to={ROUTES.SIGNUP}>
                {t('auth:signUp')}
              </TextLinkAtom>
            </TextAtom>
          </Box>
        </StyledForgotPasswordForm>
      </form>
    </>
  );
};

export default ForgotPasswordForm;
