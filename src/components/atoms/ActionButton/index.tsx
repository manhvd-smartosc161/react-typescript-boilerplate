import React from 'react';
import {
  PrimaryButton,
  SuccessButton,
  ActionButton,
  ReportButton,
} from './index.styled';

export type ActionButtonVariant =
  | 'assign'
  | 'assigned'
  | 'details'
  | 'detail-report';

interface ActionButtonProps {
  variant: ActionButtonVariant;
  children: React.ReactNode;
  startIcon?: React.ReactNode;
  onClick?: () => void;
}

const ActionButtonAtom: React.FC<ActionButtonProps> = ({
  variant,
  children,
  startIcon,
  onClick,
}) => {
  const renderButton = () => {
    switch (variant) {
      case 'assign':
        return <PrimaryButton onClick={onClick}>{children}</PrimaryButton>;
      case 'assigned':
        return <SuccessButton startIcon={startIcon}>{children}</SuccessButton>;
      case 'details':
        return (
          <ActionButton startIcon={startIcon} onClick={onClick}>
            {children}
          </ActionButton>
        );
      case 'detail-report':
        return (
          <ReportButton startIcon={startIcon} onClick={onClick}>
            {children}
          </ReportButton>
        );
      default:
        return null;
    }
  };

  return renderButton();
};

export default ActionButtonAtom;
