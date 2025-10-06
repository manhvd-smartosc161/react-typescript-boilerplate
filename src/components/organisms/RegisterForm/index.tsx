import { FC, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Person, Lock, Email } from '@mui/icons-material';
import { Box, Typography, Alert } from '@mui/material';
import { ButtonAtom, TextAtom, TextLinkAtom } from '@src/components/atoms';
import {
  ControlledTextField,
  ControlledPasswordField,
  ControlledCheckBoxField,
} from '@src/components/molecules';
import { useRegisterMutation } from '@src/hooks';
import { registerSchema } from '@src/schemas/authSchema';
import { RegisterFormData } from '@src/types';
import { AuthError } from '@src/api/services/authService';
import { getAuthMessage, REGISTER_ERROR_CODE } from '@src/constants/auth';
import ROUTES from '@src/routes/route';
import { StyledRegisterForm } from './index.styled';

const RegisterForm: FC = () => {
  const registerMutation = useRegisterMutation();
  const [showWarning, setShowWarning] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      surname: '',
      acceptTerms: false,
    },
  });

  useEffect(() => {
    if (registerMutation.isSuccess) {
      setShowSuccess(true);
      setShowWarning(false);
      setErrorMessage('');
    }
  }, [registerMutation.isSuccess]);

  useEffect(() => {
    if (registerMutation.isError && registerMutation.error) {
      const error = registerMutation.error;

      if (error instanceof AuthError) {
        const errorCode = error.code;

        switch (errorCode) {
          case REGISTER_ERROR_CODE.EMAIL_EXISTS_ACTIVE:
            setErrorMessage(getAuthMessage('MSG_010'));
            break;
          case REGISTER_ERROR_CODE.EMAIL_EXISTS_INACTIVE:
            setErrorMessage(getAuthMessage('MSG_011'));
            break;
          default:
            setErrorMessage('Registration failed! Please try again.');
            break;
        }
      } else {
        // Fallback for regular Error objects
        const fallbackMessage =
          error instanceof Error
            ? error.message
            : 'Registration failed! Please try again.';
        setErrorMessage(fallbackMessage);
      }

      setShowWarning(true);
      setShowSuccess(false);
    }
  }, [registerMutation.isError, registerMutation.error]);

  const onSubmit = async (data: RegisterFormData) => {
    setErrorMessage('');
    setShowWarning(false);
    setShowSuccess(false);

    registerMutation.mutate({
      email: data.email,
      password: data.password,
      name: data.name,
      surname: data.surname || undefined,
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
          Sign up
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
          Create your account to get started
        </Typography>
      </Box>

      <StyledRegisterForm
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {showWarning && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorMessage}
          </Alert>
        )}

        {showSuccess && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {getAuthMessage('MSG_012')}
          </Alert>
        )}

        <Box>
          <ControlledTextField
            name="name"
            control={control}
            label="Name"
            placeholder="Enter your name"
            startIcon={<Person />}
            required
          />
        </Box>

        <Box>
          <ControlledTextField
            name="surname"
            control={control}
            label="Surname"
            placeholder="Enter your surname"
            startIcon={<Person />}
          />
        </Box>

        <Box>
          <ControlledTextField
            name="email"
            control={control}
            label="Email"
            placeholder="example.email@gmail.com"
            type="email"
            startIcon={<Email />}
            required
          />
        </Box>

        <Box>
          <ControlledPasswordField
            name="password"
            control={control}
            label="Password"
            placeholder="Password"
            startIcon={<Lock />}
            required
          />
        </Box>

        <Box>
          <ControlledPasswordField
            name="confirmPassword"
            control={control}
            label="Confirm Password"
            placeholder="Confirm Password"
            startIcon={<Lock />}
            required
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <ControlledCheckBoxField
            name="acceptTerms"
            control={control}
            label="I agree to the Terms & Conditions"
            required
            single={true}
            color="primary"
          />
        </Box>

        <ButtonAtom
          variant="primary"
          type="submit"
          loading={isSubmitting || registerMutation.isPending}
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
          Create an account
        </ButtonAtom>

        <Box sx={{ textAlign: 'center', mt: 1 }}>
          <TextAtom variant="body2" sx={{ color: 'text.secondary' }}>
            Already have an account?{' '}
            <TextLinkAtom variant="body2" to={ROUTES.LOGIN}>
              Sign In
            </TextLinkAtom>
          </TextAtom>
        </Box>
      </StyledRegisterForm>
    </>
  );
};

export default RegisterForm;
