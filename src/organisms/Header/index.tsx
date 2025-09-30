import { FC } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { BreadcrumbProps as AntBreadcrumbProps } from 'antd';
import { Button } from '@src/atoms';
import { Breadcrumb } from '@src/molecules';
import { StyledHeader, HeaderLeft } from './index.styled';

export interface HeaderProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  breadcrumbItems: AntBreadcrumbProps['items'];
}

const Header: FC<HeaderProps> = ({
  collapsed,
  onToggleCollapse,
  breadcrumbItems,
}) => {
  return (
    <StyledHeader>
      <HeaderLeft>
        <Button
          variant="ghost"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggleCollapse}
        />
        <Breadcrumb items={breadcrumbItems} separator=" > " />
      </HeaderLeft>
    </StyledHeader>
  );
};

export default Header;
