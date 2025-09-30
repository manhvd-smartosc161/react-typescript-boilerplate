import styled from 'styled-components';
import { Layout } from 'antd';

const { Sider } = Layout;

interface StyledSidebarProps {
  collapsed?: boolean;
}

export const StyledSidebar = styled(Sider)<StyledSidebarProps>`
  background: #fff !important;
  border-right: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
`;

export const LogoWrapper = styled.div`
  border-bottom: 1px solid #f0f0f0;
  flex-shrink: 0;
`;

export const MenuWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  }
`;

export const UserProfileSection = styled.div`
  flex-shrink: 0;
  border-top: 1px solid #f0f0f0;
`;

export const ExportButton = styled.div`
  padding: 12px 16px;
`;
