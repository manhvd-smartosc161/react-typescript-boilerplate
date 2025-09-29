import React from 'react';
import { BellOutlined, DownOutlined } from '@ant-design/icons';
import {
  LanguageBox,
  LanguageSelector,
  MainTitle,
  NotificationIcon,
  SubTitle,
  TitleWrapBox,
  TopWrapBox,
} from './index.styled';

const TitleDateTopSite = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <TopWrapBox>
      <TitleWrapBox>
        <MainTitle>{title}</MainTitle>
        <SubTitle>{subtitle}</SubTitle>
      </TitleWrapBox>

      <LanguageBox>
        <LanguageSelector>
          🇺🇸 English <DownOutlined style={{ fontSize: '12px' }} />
        </LanguageSelector>
        <NotificationIcon>
          <BellOutlined style={{ fontSize: '18px' }} />
        </NotificationIcon>
      </LanguageBox>
    </TopWrapBox>
  );
};
export default TitleDateTopSite;
