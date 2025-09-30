import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Alert,
  Snackbar,
} from '@mui/material';
import { Person, Lock } from '@mui/icons-material';
import { Button, Title, Text } from '@src/atoms';
import { useAuth } from '@src/hooks';
import styled from 'styled-components';

const LoginWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const LoginCard = styled.div`
  width: 100%;
  max-width: 450px;
  padding: 48px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Login: FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [alert, setAlert] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Use Recoil login - simplified, any credentials work
      const success = login(username, password);

      if (success) {
        setAlert({
          open: true,
          message: '✅ Login successful! Redirecting...',
          severity: 'success',
        });
        setTimeout(() => navigate('/'), 800);
      } else {
        setAlert({
          open: true,
          message: '❌ Please enter username and password!',
          severity: 'error',
        });
      }
    } catch (error) {
      setAlert({
        open: true,
        message: '❌ Login failed! Please try again.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginWrapper>
      <LoginCard>
        <Logo>
          <Title level={2}>Welcome!</Title>
          <Box mt={1}>
            <Text variant="caption" color="secondary">
              Powered by Recoil State Management
            </Text>
          </Box>
        </Logo>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
        >
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter your username"
            InputProps={{
              startAdornment: (
                <Person sx={{ mr: 1, color: 'text.secondary' }} />
              ),
            }}
            size="medium"
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
            InputProps={{
              startAdornment: <Lock sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
            size="medium"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
            }
            label="Remember me"
          />

          <Button
            variant="primary"
            type="submit"
            loading={loading}
            fullWidth
            size="large"
            sx={{ mt: 1 }}
          >
            Log in
          </Button>

          <Box
            mt={2}
            p={2}
            bgcolor="#f5f7fa"
            borderRadius="8px"
            textAlign="center"
          >
            <Text variant="caption" color="secondary">
              💡 Tip: Enter any username and password to login
            </Text>
          </Box>
        </Box>

        <Snackbar
          open={alert.open}
          autoHideDuration={3000}
          onClose={() => setAlert({ ...alert, open: false })}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            severity={alert.severity}
            onClose={() => setAlert({ ...alert, open: false })}
            sx={{ minWidth: '300px' }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      </LoginCard>
    </LoginWrapper>
  );
};

export default Login;
