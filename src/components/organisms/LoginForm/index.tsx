import { FC, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Person, Lock } from '@mui/icons-material';
import { Box, Typography, Alert } from '@mui/material';
import { ButtonAtom, TextAtom, TextLinkAtom } from '@src/components/atoms';
import {
  ControlledTextField,
  ControlledPasswordField,
} from '@src/components/molecules';
import { useLoginMutation } from '@src/hooks';
import { loginSchema } from '@src/schemas/authSchema';
import { LoginFormData } from '@src/types';
import { getErrorMessage } from '@src/errors';
import ROUTES from '@src/routes/route';
import { StyledLoginForm } from './index.styled';

const LoginForm: FC = () => {
  const loginMutation = useLoginMutation();
  const [showWarning, setShowWarning] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (loginMutation.isError && loginMutation.error) {
      const message = getErrorMessage(loginMutation.error);
      setErrorMessage(message);
      setShowWarning(true);
    }
  }, [loginMutation.isError, loginMutation.error]);

  const onSubmit = async (data: LoginFormData) => {
    setErrorMessage('');
    setShowWarning(false);

    loginMutation.mutate({
      email: data.email,
      password: data.password,
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
          Sign in
        </Typography>
      </Box>

      <StyledLoginForm
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {showWarning && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            {errorMessage}
          </Alert>
        )}

        <Box sx={{ mb: 2 }}>
          <ControlledTextField
            name="email"
            control={control}
            label="Email"
            placeholder="example.email@gmail.com"
            type="email"
            startIcon={<Person />}
            required
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <ControlledPasswordField
            name="password"
            control={control}
            label="Password"
            placeholder="Password"
            startIcon={<Lock />}
            required
          />
        </Box>

        <Box sx={{ textAlign: 'right', mb: 3 }}>
          <TextAtom variant="body2" sx={{ color: 'text.secondary' }}>
            Forgot Password?{' '}
            <TextLinkAtom variant="body2" to={ROUTES.FORGOT_PASSWORD}>
              Click here
            </TextLinkAtom>
          </TextAtom>
        </Box>

        <ButtonAtom
          variant="primary"
          type="submit"
          loading={isSubmitting || loginMutation.isPending}
          fullWidth
          size="large"
          sx={{
            mb: 2,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
            },
          }}
        >
          Sign in
        </ButtonAtom>

        <Box sx={{ textAlign: 'center', mt: 1 }}>
          <TextAtom variant="body2" sx={{ color: 'text.secondary' }}>
            Create an account?{' '}
            <TextLinkAtom variant="body2" to={ROUTES.SIGNUP}>
              Sign Up
            </TextLinkAtom>
          </TextAtom>
        </Box>
      </StyledLoginForm>
    </>
  );
};

export default LoginForm;
