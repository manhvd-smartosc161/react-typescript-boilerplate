import { FC, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography, Alert } from '@mui/material';
import { ButtonAtom, TextAtom, TextLinkAtom } from '@src/components/atoms';
import { ControlledPasswordField } from '@src/components/molecules';
import {
  useResetPasswordMutation,
  useValidateResetTokenMutation,
} from '@src/hooks/auth';
import { resetPasswordSchema } from '@src/schemas/authSchema';
import { ResetPasswordFormData } from '@src/types';
import { getErrorMessage } from '@src/errors';
import ROUTES from '@src/routes/route';
import { StyledResetPasswordForm } from './index.styled';

const ResetPasswordForm: FC = () => {
  const resetPasswordMutation = useResetPasswordMutation();
  const validateTokenMutation = useValidateResetTokenMutation();
  const [showWarning, setShowWarning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(resetPasswordSchema),
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
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
      setIsTokenValid(false);
      return;
    }

    // Validate the token
    validateTokenMutation.mutate(
      { token },
      {
        onSuccess: (response) => {
          if (response.valid) {
            setIsTokenValid(true);
          } else {
            setErrorMessage(
              'This reset link is invalid or has expired. Please request a new password reset.',
            );
            setShowWarning(true);
            setIsTokenValid(false);
          }
        },
        onError: () => {
          setErrorMessage(
            'This reset link is invalid or has expired. Please request a new password reset.',
          );
          setShowWarning(true);
          setIsTokenValid(false);
        },
      },
    );
  }, []);

  useEffect(() => {
    if (resetPasswordMutation.isError && resetPasswordMutation.error) {
      const message = getErrorMessage(resetPasswordMutation.error);
      setErrorMessage(message);
      setShowWarning(true);
      setShowSuccess(false);
    }
  }, [resetPasswordMutation.isError]);

  useEffect(() => {
    if (resetPasswordMutation.isSuccess) {
      setShowSuccess(true);
      setShowWarning(false);
      setSuccessMessage(
        'Password has been reset successfully! Redirecting to login...',
      );
    }
  }, [resetPasswordMutation.isSuccess]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (resetPasswordMutation.isPending || !isTokenValid) {
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

    resetPasswordMutation.mutate({
      newPassword: data.newPassword,
      token,
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
          Reset Password
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Enter your new password below.
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
              label="New Password"
              placeholder="Enter new password"
              required
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <ControlledPasswordField
              name="confirmPassword"
              control={control}
              label="Confirm Password"
              placeholder="Confirm new password"
              required
            />
          </Box>

          {/* Password Policy Disclaimer */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', display: 'block', mb: 1 }}
            >
              Password must be 8-32 characters including uppercase, lowercase,
              alphanumeric and special characters.
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', display: 'block' }}
            >
              Password must not be identical with one of your most 3 recent used
              passwords.
            </Typography>
          </Box>

          <ButtonAtom
            variant="primary"
            type="submit"
            loading={
              isSubmitting ||
              resetPasswordMutation.isPending ||
              validateTokenMutation.isPending
            }
            disabled={
              showSuccess || !isTokenValid || validateTokenMutation.isPending
            }
            fullWidth
            size="large"
            sx={{ mb: 2 }}
          >
            {showSuccess ? 'Password Reset!' : 'Reset Password'}
          </ButtonAtom>

          <Box sx={{ textAlign: 'center', mt: 1 }}>
            <TextAtom variant="body2" sx={{ color: 'text.secondary' }}>
              Remember your password?{' '}
              <TextLinkAtom variant="body2" to={ROUTES.LOGIN}>
                Back to login
              </TextLinkAtom>
            </TextAtom>
          </Box>
        </StyledResetPasswordForm>
      </form>
    </>
  );
};

export default ResetPasswordForm;
