import React from 'react';
import { Divider, Box } from '@mui/material';
import { IconAtom } from '@src/components/atoms';
import {
  StyledContentWrapper,
  StyledDialogContainer,
  StyledFooterWrapper,
  StyledHeaderWrapper,
  StyledTitleText,
} from './index.styled';

export interface ModalDialogProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  showFooter?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  fullWidth?: boolean;
  hideCloseButton?: boolean;
}

export const ModalDialog: React.FC<ModalDialogProps> = ({
  open,
  onClose,
  title,
  children,
  footer,
  showFooter = true,
  fullWidth = true,
  maxWidth = 'sm',
  hideCloseButton = false,
}) => {
  return (
    <StyledDialogContainer
      open={open}
      onClose={onClose}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
    >
      {/* Header */}

      <StyledHeaderWrapper>
        <Box sx={{ minWidth: 0 }}>
          {title ? <StyledTitleText>{title}</StyledTitleText> : null}
        </Box>

        {!hideCloseButton && <IconAtom name="close" onClick={onClose} />}
      </StyledHeaderWrapper>

      <Divider />

      {/* Body */}

      <StyledContentWrapper>{children}</StyledContentWrapper>

      {/* Footer */}

      {showFooter && <StyledFooterWrapper>{footer}</StyledFooterWrapper>}
    </StyledDialogContainer>
  );
};
