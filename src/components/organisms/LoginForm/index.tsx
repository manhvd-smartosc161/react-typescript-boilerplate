import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Person, Lock } from '@mui/icons-material';
import { ButtonAtom } from '@src/components/atoms';
import {
  ControlledTextField,
  ControlledPasswordField,
  ControlledCheckBoxField,
} from '@src/components/molecules';
import { useLoginMutation } from '@src/hooks';
import { loginSchema, LoginFormData } from '@src/schemas/authSchema';
import { StyledLoginForm } from './index.styled';

const LoginForm: FC = () => {
  const loginMutation = useLoginMutation();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
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
        <ControlledTextField
          name="email"
          control={control}
          label="Email"
          placeholder="Enter your email"
          type="email"
          startIcon={<Person />}
          required
        />

        <ControlledPasswordField
          name="password"
          control={control}
          label="Password"
          placeholder="Enter your password"
          startIcon={<Lock />}
          required
        />

        <ControlledCheckBoxField
          name="remember"
          control={control}
          label="Remember me"
          single
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
      </StyledLoginForm>
    </>
  );
};

export default LoginForm;
