import { FC } from 'react';
import {
  Breadcrumb as AntBreadcrumb,
  BreadcrumbProps as AntBreadcrumbProps,
} from 'antd';
import { StyledBreadcrumb } from './index.styled';

export interface BreadcrumbProps {
  items: AntBreadcrumbProps['items'];
  separator?: string | React.ReactNode;
}

const Breadcrumb: FC<BreadcrumbProps> = ({ items, separator = '>' }) => {
  return (
    <StyledBreadcrumb>
      <AntBreadcrumb separator={separator} items={items} />
    </StyledBreadcrumb>
  );
};

export default Breadcrumb;
