import React from 'react';
import { HeadingAtom } from '@src/components/atoms';
import { StyledRoot, StyledLeftGroup } from './index.styled';

interface PageHeaderProps {
  title: string;
  titleSuffix?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}

const PageHeader = ({
  title,
  titleSuffix,
  leading,
  trailing,
}: PageHeaderProps) => {
  return (
    <StyledRoot>
      <StyledLeftGroup direction="row" alignItems="center" spacing={2}>
        {leading}
        <HeadingAtom level={4}>{title}</HeadingAtom>
        {titleSuffix}
      </StyledLeftGroup>

      {trailing}
    </StyledRoot>
  );
};

export default PageHeader;
