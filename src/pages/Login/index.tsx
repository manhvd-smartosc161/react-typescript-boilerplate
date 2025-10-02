import { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, FormControlLabel, Checkbox } from '@mui/material';
import { Person, Lock } from '@mui/icons-material';
import { ButtonAtom, TextAtom } from '@src/components/atoms';
import { useLoginMutation } from '@src/hooks';
import { loginSchema, LoginFormData } from '@src/schemas/authSchema';
import { StyledLoginForm, StyledLoginTip } from './index.styled';

const LoginPage: FC = () => {
  const loginMutation = useLoginMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    loginMutation.mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <>
      <StyledLoginForm component="form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Email"
              variant="outlined"
              placeholder="Enter your email"
              error={!!errors.email}
              helperText={errors.email?.message}
              InputProps={{
                startAdornment: (
                  <Person sx={{ mr: 1, color: 'text.secondary' }} />
                ),
              }}
              size="medium"
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              placeholder="Enter your password"
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                startAdornment: (
                  <Lock sx={{ mr: 1, color: 'text.secondary' }} />
                ),
              }}
              size="medium"
            />
          )}
        />

        <Controller
          name="remember"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Remember me"
            />
          )}
        />

        <ButtonAtom
          variant="primary"
          type="submit"
          loading={isSubmitting || loginMutation.isPending}
          fullWidth
          size="large"
          sx={{ mt: 1 }}
        >
          Login
        </ButtonAtom>

        <StyledLoginTip>
          <TextAtom variant="caption" color="secondary">
            💡 Tip: Valid email and password minimum 6 characters
          </TextAtom>
        </StyledLoginTip>
      </StyledLoginForm>
    </>
  );
};

export default LoginPage;
