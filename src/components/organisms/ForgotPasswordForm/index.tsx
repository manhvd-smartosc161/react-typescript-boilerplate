import { FC, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Email } from '@mui/icons-material';
import { Box, Typography, Alert } from '@mui/material';
import { ButtonAtom, TextAtom, TextLinkAtom } from '@src/components/atoms';
import { ControlledTextField } from '@src/components/molecules';
import { useForgotPasswordMutation } from '@src/hooks';
import { forgotPasswordSchema } from '@src/schemas/authSchema';
import { ForgotPasswordFormData } from '@src/types';
import { ERROR_CODE_MESSAGE_MAPPING, MESSAGES } from '@src/constants';
import { AuthError } from '@src/api/services/authService';
import ROUTES from '@src/routes/route';
import { StyledForgotPasswordForm, StyledResendButton } from './index.styled';

const ForgotPasswordForm: FC = () => {
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
      const error = forgotPasswordMutation.error;

      if (error instanceof AuthError) {
        const errorCode = error.code;

        setErrorMessage(
          MESSAGES[
            ERROR_CODE_MESSAGE_MAPPING[
              errorCode as keyof typeof ERROR_CODE_MESSAGE_MAPPING
            ] as keyof typeof MESSAGES
          ],
        );
      } else {
        const fallbackMessage =
          error && typeof error === 'object' && 'message' in error
            ? (error as Error).message
            : 'Failed to send reset email! Please try again.';
        setErrorMessage(fallbackMessage);
      }

      setShowWarning(true);
      setShowSuccess(false);
    }
  }, [forgotPasswordMutation.isError]);

  useEffect(() => {
    if (forgotPasswordMutation.isSuccess) {
      setShowSuccess(true);
      setShowWarning(false);
      setSuccessMessage(
        "Check Your Inbox: We've sent you an email with instructions to reset your password. Please check your Spam inbox if you don't receive it shortly.",
      );
    }
  }, [forgotPasswordMutation.isSuccess]);

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
          Forgot Password
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Enter your email address and we'll send you a link to reset your
          password.
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
              label="Email"
              placeholder="example.email@gmail.com"
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
            {showSuccess ? 'Email Sent!' : 'Send password reset link'}
          </ButtonAtom>

          {showSuccess && (
            <StyledResendButton
              variant="contained"
              onClick={handleResendEmail}
              disabled={forgotPasswordMutation.isPending}
              fullWidth
              size="large"
            >
              {forgotPasswordMutation.isPending ? 'Sending...' : 'Resend Email'}
            </StyledResendButton>
          )}

          <Box sx={{ textAlign: 'center', mt: 1 }}>
            <TextAtom variant="body2" sx={{ color: 'text.secondary' }}>
              Remember your password?{' '}
              <TextLinkAtom variant="body2" to={ROUTES.LOGIN}>
                Back to login
              </TextLinkAtom>
            </TextAtom>
          </Box>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <TextAtom variant="body2" sx={{ color: 'text.secondary' }}>
              Don't have an account?{' '}
              <TextLinkAtom variant="body2" to={ROUTES.SIGNUP}>
                Sign up
              </TextLinkAtom>
            </TextAtom>
          </Box>
        </StyledForgotPasswordForm>
      </form>
    </>
  );
};

export default ForgotPasswordForm;
