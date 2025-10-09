import React from 'react';
import {
  PrimaryButton,
  SuccessButton,
  ActionButton,
  ReportButton,
  DangerButton,
} from './index.styled';

export type ActionButtonVariant =
  | 'assign'
  | 'assigned'
  | 'details'
  | 'detail-report'
  | 'danger';

interface ActionButtonProps {
  variant: ActionButtonVariant;
  children: React.ReactNode;
  startIcon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const BUTTON_COMPONENTS = {
  assign: PrimaryButton,
  assigned: SuccessButton,
  details: ActionButton,
  'detail-report': ReportButton,
  danger: DangerButton,
} as const;

const ActionButtonAtom: React.FC<ActionButtonProps> = ({
  variant,
  children,
  startIcon,
  onClick,
  disabled = false,
}) => {
  const ButtonComponent = BUTTON_COMPONENTS[variant];

  if (!ButtonComponent) return null;

  return (
    <ButtonComponent
      startIcon={startIcon}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </ButtonComponent>
  );
};

export default ActionButtonAtom;
