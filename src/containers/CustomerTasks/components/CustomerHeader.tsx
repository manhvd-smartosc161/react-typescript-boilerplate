import { FC } from 'react';
import {
  //   FreezeOutlined,
  SwapOutlined,
  SettingOutlined,
  KeyOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import {
  CustomerHeaderCard,
  CustomerInfo,
  CustomerName,
  StatusContainer,
  StatusBadge,
  CustomerDetails,
  ActionButtons,
  ActionButton,
} from '../index.styled';

const CustomerHeader: FC = () => {
  return (
    <CustomerHeaderCard>
      <CustomerInfo>
        <CustomerName>Sarah Johnson</CustomerName>
        <StatusContainer>
          <StatusBadge>Active</StatusBadge>
          <StatusBadge>Low Risk</StatusBadge>
        </StatusContainer>
        <CustomerDetails>
          Customer ID: CUST001 • Total Relationship: $245,000.00
        </CustomerDetails>
      </CustomerInfo>

      <ActionButtons>
        {/* FreezeOutlined */}
        <ActionButton isFreeze icon={<SwapOutlined />}>
          Freeze Account
        </ActionButton>
        <ActionButton icon={<SwapOutlined />}>Transfer</ActionButton>
        <ActionButton icon={<SettingOutlined />}>Adjust Limits</ActionButton>
        <ActionButton icon={<KeyOutlined />}>Reset Password</ActionButton>
        <ActionButton icon={<PhoneOutlined />}>Contact</ActionButton>
      </ActionButtons>
    </CustomerHeaderCard>
  );
};

export default CustomerHeader;
