import React from 'react';
import { HeadingAtom } from '@src/components/atoms';
import { StyledRoot, StyledLeftGroup } from './index.styled';

interface PageHeaderProps {
  title: string;
  titleSuffix?: React.ReactNode;
  leadingAction?: React.ReactNode;
  trailingActions?: React.ReactNode;
}

const PageHeader = ({
  title,
  titleSuffix,
  leadingAction,
  trailingActions,
}: PageHeaderProps) => {
  return (
    <StyledRoot>
      <StyledLeftGroup direction="row" alignItems="center" spacing={2}>
        {leadingAction}
        <HeadingAtom level={4}>{title}</HeadingAtom>
        {titleSuffix}
      </StyledLeftGroup>

      {trailingActions}
    </StyledRoot>
  );
};

export default PageHeader;
