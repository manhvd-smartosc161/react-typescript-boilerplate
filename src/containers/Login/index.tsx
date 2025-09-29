import { FC, useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const { Title } = Typography;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
`;

const StyledTitle = styled(Title)`
  text-align: center;
  margin-bottom: 32px !important;
  color: #1890ff;
`;

interface LoginForm {
  username: string;
  password: string;
}

const Login: FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: LoginForm) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (values.username === 'admin' && values.password === 'admin') {
        message.success('Login successful!');
        navigate('/');
      } else {
        message.error('Invalid username or password!');
      }
    } catch (error) {
      message.error('An error occurred, please try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <StyledTitle level={2}>Login</StyledTitle>
        <Form
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please enter your username!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please enter your password!',
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              block
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', color: '#666' }}>
          <p>Demo: admin / admin</p>
        </div>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
