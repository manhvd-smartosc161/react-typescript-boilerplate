import styled from 'styled-components';

export const TopWrapBox = styled.div`
  padding: 20px;
  padding-bottom: 20px;
  border: 1px solid #c0bebe;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: white;
`;

export const TitleWrapBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MainTitle = styled.h1`
  font-size: 36px;
  color: #2f529f;
  font-weight: 600;
  margin: 0 0 8px 0;
`;

export const SubTitle = styled.p`
  font-size: 16px;
  color: black;
  margin: 0;
`;

export const LanguageBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const LanguageSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  background: white;

  &:hover {
    border-color: #2f529f;
  }
`;

export const NotificationIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  background: white;

  &:hover {
    border-color: #2f529f;
  }
`;
