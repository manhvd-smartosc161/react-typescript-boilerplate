import { FC, ReactNode } from 'react';
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';

export interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'ghost'
    | 'text'
    | 'link';
  children?: ReactNode;
  icon?: ReactNode;
  block?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
  loading?: boolean;
}

const StyledButton = styled(MuiButton)<{ $variant?: string }>(({
  theme,
  $variant,
}) => {
  const getStyles = () => {
    switch ($variant) {
      case 'primary':
        return {
          backgroundColor: theme.palette.primary.main,
          color: '#fff',
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
        };
      case 'secondary':
        return {
          backgroundColor: theme.palette.grey[300],
          color: theme.palette.text.primary,
          '&:hover': {
            backgroundColor: theme.palette.grey[400],
          },
        };
      case 'success':
        return {
          backgroundColor: '#52c41a',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#73d13d',
          },
        };
      case 'warning':
        return {
          backgroundColor: '#faad14',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#ffc53d',
          },
        };
      case 'danger':
        return {
          backgroundColor: theme.palette.error.main,
          color: '#fff',
          '&:hover': {
            backgroundColor: theme.palette.error.dark,
          },
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          border: `1px solid ${theme.palette.divider}`,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        };
      case 'text':
        return {
          backgroundColor: 'transparent',
          color: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        };
      case 'link':
        return {
          backgroundColor: 'transparent',
          color: theme.palette.primary.main,
          textDecoration: 'underline',
          '&:hover': {
            backgroundColor: 'transparent',
            textDecoration: 'underline',
          },
        };
      default:
        return {};
    }
  };

  return getStyles();
});

const ButtonAtom: FC<ButtonProps> = ({
  variant = 'primary',
  children,
  icon,
  block,
  htmlType = 'button',
  loading,
  ...props
}) => {
  const muiVariant =
    variant === 'link' || variant === 'text' ? 'text' : 'contained';

  return (
    <StyledButton
      $variant={variant}
      variant={muiVariant}
      type={htmlType}
      disabled={loading || props.disabled}
      fullWidth={block}
      startIcon={icon}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </StyledButton>
  );
};

export default ButtonAtom;
