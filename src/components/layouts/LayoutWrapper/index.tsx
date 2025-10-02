import { FC, ReactNode } from 'react';
import MainLayout from '../MainLayout';
import AuthLayout from '../AuthLayout';

export type LayoutType = 'main' | 'auth' | 'none';

export interface LayoutWrapperProps {
  children: ReactNode;
  layout?: LayoutType;
}

const LayoutWrapper: FC<LayoutWrapperProps> = ({
  children,
  layout = 'main',
}) => {
  switch (layout) {
    case 'auth':
      return <AuthLayout>{children}</AuthLayout>;
    case 'main':
      return <MainLayout>{children}</MainLayout>;
    case 'none':
    default:
      return <>{children}</>;
  }
};

export default LayoutWrapper;
