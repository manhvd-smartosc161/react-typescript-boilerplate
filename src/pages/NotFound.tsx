import { FC } from 'react';
import { Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Button } from '@src/atoms';

const NotFound: FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist or an error occurred."
        extra={
          <div
            style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}
          >
            <Button variant="primary" onClick={() => navigate('/')}>
              Back Home
            </Button>
            <Button
              variant="secondary"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default NotFound;
