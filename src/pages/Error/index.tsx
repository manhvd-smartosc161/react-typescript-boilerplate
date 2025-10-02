import { FC } from 'react';
import { Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ButtonAtom } from '@src/components/atoms';
import {
  StyledNotFoundContainer,
  StyledErrorCode,
  StyledActionButtons,
} from './index.styled';

const NotFound: FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <StyledNotFoundContainer>
        <StyledErrorCode variant="h1">404</StyledErrorCode>
        <Typography variant="h4" component="h2" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Sorry, the page you visited does not exist or an error occurred.
        </Typography>
        <StyledActionButtons>
          <ButtonAtom variant="primary" onClick={() => navigate('/')}>
            Back Home
          </ButtonAtom>
          <ButtonAtom
            variant="secondary"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </ButtonAtom>
        </StyledActionButtons>
      </StyledNotFoundContainer>
    </Container>
  );
};

export default NotFound;
