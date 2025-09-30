import styled from 'styled-components';
import { Layout } from 'antd';

const { Header: AntHeader } = Layout;

export const StyledHeader = styled(AntHeader)`
  background: #fff;
  padding: 0 24px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
