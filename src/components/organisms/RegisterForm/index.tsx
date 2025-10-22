import { FC, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Person, Lock, Email } from '@mui/icons-material';
import { Box, Typography, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ButtonAtom, TextAtom, TextLinkAtom } from '@src/components/atoms';
import {
  ControlledTextField,
  ControlledPasswordField,
  ControlledCheckBoxField,
} from '@src/components/molecules';
import { useRegisterMutation } from '@src/hooks';
import { registerSchema } from '@src/schemas/authSchema';
import { RegisterFormData } from '@src/types';
import { getErrorMessage } from '@src/errors';
import { MESSAGES } from '@src/constants';
import ROUTES from '@src/routes/route';
import { StyledRegisterForm } from './index.styled';

const RegisterForm: FC = () => {
  const { t } = useTranslation();
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
      agreedTerms: false,
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
      const message = getErrorMessage(registerMutation.error);
      setErrorMessage(message);
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
      agreedTerms: data.agreedTerms,
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
          {t('auth:signUp')}
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
            {MESSAGES.MSG_012}
          </Alert>
        )}



        <Box>
          <ControlledTextField
            name="email"
            control={control}
            label={t('auth:email')}
            placeholder={t('auth:emailPlaceholder')}
            type="email"
            required
          />
        </Box>

        <Box>
          <ControlledPasswordField
            name="password"
            control={control}
            label={t('auth:password')}
            placeholder={t('auth:passwordPlaceholder')}
            required
          />
        </Box>

        <Box>
          <ControlledPasswordField
            name="confirmPassword"
            control={control}
            label={t('auth:confirmPassword')}
            placeholder={t('auth:confirmPasswordPlaceholder')}
            required
          />
        </Box>
        <Box>
          <ControlledTextField
            name="name"
            control={control}
            label={t('auth:name')}
            placeholder={t('auth:namePlaceholder')}
            required
          />
        </Box>

        <Box>
          <ControlledTextField
            name="surname"
            control={control}
            label={t('auth:surname')}
            placeholder={t('auth:surnamePlaceholder')}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <ControlledCheckBoxField
            name="agreedTerms"
            control={control}
            label={t('auth:agreeTerms')}
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
            background: '#0071CD',
          }}
        >
          {t('auth:signUp')}
        </ButtonAtom>

        <Box sx={{ textAlign: 'center', mt: 1 }}>
          <TextAtom variant="body2" sx={{ color: 'text.secondary' }}>
            {t('auth:alreadyHaveAccount')}{' '}
            <TextLinkAtom variant="body2" to={ROUTES.LOGIN}>
              {t('auth:signIn')}
            </TextLinkAtom>
          </TextAtom>
        </Box>
      </StyledRegisterForm>
    </>
  );
};

export default RegisterForm;
