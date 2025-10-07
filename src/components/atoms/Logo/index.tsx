import React from 'react';
import { Typography } from '@mui/material';
import {
  StyledLogoContainer,
  StyledLogoIcon,
  StyledLogoText,
  StyledIconContainer,
  StyledChevron,
  StyledBlueShape1,
  StyledBlueShape2,
} from './index.styled';

interface LogoAtomProps {
  collapsed?: boolean;
}

const LogoAtom: React.FC<LogoAtomProps> = ({ collapsed = false }) => {
  return (
    <StyledLogoContainer collapsed={collapsed}>
      <StyledLogoIcon>
        <StyledIconContainer>
          <StyledChevron />
          <StyledBlueShape1 />
          <StyledBlueShape2 />
        </StyledIconContainer>
      </StyledLogoIcon>

      {!collapsed && (
        <StyledLogoText>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: '#000',
              fontSize: '18px',
              lineHeight: 1,
            }}
          >
            CP Axtra
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#666',
              fontSize: '12px',
              lineHeight: 1,
              marginTop: '2px',
            }}
          >
            Supplier Registration
          </Typography>
        </StyledLogoText>
      )}
    </StyledLogoContainer>
  );
};

export default LogoAtom;
