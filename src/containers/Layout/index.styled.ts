import styled from 'styled-components';
import { Layout as AntLayout, Button } from 'antd';

const { Header, Content, Sider } = AntLayout;

export const StyledLayout = styled(AntLayout)`
  min-height: 100vh;
`;

export const StyledSider = styled(Sider)`
  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
  }

  .ant-menu {
    border-right: none;
    padding: 0;
  }

  .section-title {
    padding: 16px 24px 8px;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.5px;
    font-size: 12px;
    color: #666;
  }

  .section-divider {
    height: 1px;
    background-color: #f0f0f0;
    margin: 8px 16px 8px;
  }

  .ant-menu-submenu-title {
    height: 48px;
    line-height: 48px;
    border-radius: 8px;
    margin: 4px 8px;
  }

  .ant-menu-item {
    border-radius: 8px;
    height: 42px;
    line-height: 42px;
    margin: 4px 8px;

    &:hover {
      background-color: #f0f8ff;
    }

    &.ant-menu-item-selected {
      background-color: #2f529f;
      color: white;

      &:hover {
        background-color: #40a9ff;
      }
    }
  }

  .ant-menu-submenu-open .ant-menu-sub.ant-menu-inline {
    position: relative;

    &:before {
      content: '';
      position: absolute;
      left: 24px;
      top: 0;
      bottom: 0;
      width: 2px;
      background-color: #e6e6e6;
      border-radius: 1px;
    }
  }

  .ant-menu-sub.ant-menu-inline .ant-menu-item {
    padding-left: 38px !important;
  }

  /* Prevent responsive collapse */
  @media (max-width: 992px) {
    .ant-layout-sider {
      position: fixed !important;
      z-index: 1000;
    }
  }

  /* Disable touch events that might cause collapse */
  .ant-layout-sider-trigger {
    display: none !important;
  }
`;

export const StyledHeader = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 0 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  height: 64px;
  line-height: 64px;
`;

export const LogoWrapper = styled.div`
  padding: 16px 10px 8px 10px;
`;

export const Logo = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #1890ff;
  padding: 16px;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 16px;
`;

export const StyledContent = styled(Content)`
  margin: 24px;
  border-radius: 12px;
  min-height: calc(100vh - 112px);
`;
// box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
// padding: 24px;
// background: #fff;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const CustomMenu = styled.div`
  padding: 2px 0px;
  overflow-y: auto;
`;

export const UserProfileWrapper = styled.div`
  padding: 16px;
  border-top: 1px solid #f0f0f0;
`;

export const UserProfileCard = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  background-color: #f9f9f9;
  margin-bottom: 12px;
`;

export const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
`;

export const UserInfo = styled.div`
  flex: 1;
`;

export const UserName = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #333;
`;

export const UserRole = styled.div`
  font-size: 12px;
  color: #666;
`;

export const SettingsButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 4px;
  border-radius: 4px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const ExportButton = styled(Button)`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #f5f5f5;
  border-color: #d9d9d9;

  &:hover {
    background-color: #e6e6e6;
    border-color: #bfbfbf;
  }
`;
