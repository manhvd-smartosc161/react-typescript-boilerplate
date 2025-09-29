import { FC, ReactNode } from 'react';
import { StyledPageTitle } from './index.styled';

interface PageTitleProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

const PageTitle: FC<PageTitleProps> = ({
  children,
  level = 1,
  color = 'primary',
}) => {
  return (
    <StyledPageTitle as={`h${level}`} $color={color}>
      {children}
    </StyledPageTitle>
  );
};

export default PageTitle;
