import styled from 'styled-components';
import { Input, Select, Button, Table } from 'antd';

export const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 24px;
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// Customer Header Section (Component B)
export const CustomerHeaderCard = styled.div`
  border: 1px solid #c0bebe;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const CustomerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CustomerName = styled.div`
  font-size: 20px;
  color: black;
  font-weight: 600;
`;

export const StatusContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const StatusBadge = styled.span<{ bgColor?: string }>`
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 400;
  width: fit-content;
  background: ${(props) => props.bgColor || '#56B677'};
  color: white;
`;

export const CustomerDetails = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: black;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
`;

export const ActionButton = styled(Button)<{ isFreeze?: boolean }>`
  border: 1px solid #c0bebe;
  border-radius: 8px;
  font-size: 14px;
  padding: 10px 16px;
  height: auto;
  display: flex;
  align-items: center;
  gap: 8px;

  ${(props) =>
    props.isFreeze &&
    `
    background: #FF2D55 !important;
    color: white !important;
    border-color: #FF2D55 !important;
    
    &:hover {
      background: #e02347 !important;
      border-color: #e02347 !important;
    }
    
    .anticon {
      color: white !important;
    }
  `}

  &:hover {
    border-color: #2f529f;
    color: #2f529f;
  }
`;

// Tabs Section (Component C)
export const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TabsHeader = styled.div`
  display: flex;
  gap: 17px;
  border-bottom: 1px solid #c0bebe;
  padding-bottom: 20px;
  margin-bottom: 20px;
`;

export const TabButton = styled(Button)<{ isActive?: boolean }>`
  font-size: 14px;
  border: 1px solid #c0bebe;
  color: black;
  border-radius: 8px;
  flex: 1;
  height: 40px;

  ${(props) =>
    props.isActive &&
    `
    background: #2f529f !important;
    color: white !important;
    border-color: #2f529f !important;
  `}

  &:hover {
    border-color: #2f529f;
    color: ${(props) => (props.isActive ? 'white' : '#2f529f')};
  }
`;

export const TabContent = styled.div`
  min-height: 400px;
`;

// Overview Content (Component D)
export const OverviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 20px;

  > div:nth-child(n + 4) {
    margin-top: 20px;
  }
`;

export const InfoCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const InfoTitle = styled.div`
  font-weight: bold;
  color: #2f529f;
  font-size: 16px;
`;

export const InfoValue = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: black;
`;

export const InfoSubtitle = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #6f6f6f;
`;

// Account Content (Component E)
export const AccountsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const AccountCard = styled.div`
  border-radius: 12px;
  border: 1px solid #c0bebe;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const AccountTypeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  .anticon {
    color: #2f529f;
  }
`;

export const AccountTypeTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #2f529f;
`;

export const AccountDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AccountDetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const AccountDetailTitle = styled.div`
  font-size: 12px;
  color: #6f6f6f;
  font-weight: 400;
`;

export const AccountDetailValue = styled.div<{
  isPositive?: boolean;
  isNegative?: boolean;
}>`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) =>
    props.isPositive ? '#56B677' : props.isNegative ? '#FF2D55' : 'black'};
`;

// Coming Soon Content
export const ComingSoonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #6f6f6f;
  font-size: 18px;
`;
export const PersonalInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 7fr 3fr;
  gap: 20px;
`;

export const InfoSection = styled.div`
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  padding: 24px;
  background: #fafafa;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

export const SectionIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2f529f;
  font-size: 20px;
`;

export const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #2f529f;
  margin: 0;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FieldLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #2f529f;
`;

export const FieldValue = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #333;
  line-height: 1.4;
`;
export const TransactionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TransactionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const TransactionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  background: white;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border-color: #d0d0d0;
  }
`;

export const TransactionLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
`;

export const TransactionIcon = styled.div<{ type: 'credit' | 'debit' }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  background: ${(props) => (props.type === 'credit' ? '#E8F5E8' : '#FFE8E8')};
  color: ${(props) => (props.type === 'credit' ? '#56B677' : '#FF6B6B')};
`;

export const TransactionInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

export const TransactionTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  line-height: 1.4;
`;

export const TransactionDetails = styled.div`
  font-size: 14px;
  color: #666;
  font-weight: 400;
`;

export const TransactionRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  min-width: 200px;
`;

export const TransactionAmount = styled.div<{ isPositive: boolean }>`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => (props.isPositive ? '#56B677' : '#FF2D55')};
`;

export const TransactionBalance = styled.div`
  font-size: 14px;
  color: #666;
  font-weight: 400;
`;

export const TransactionStatus = styled.span<{ status: string }>`
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  color: white;
  background: ${(props) =>
    props.status === 'Completed'
      ? '#2f529f'
      : props.status === 'Pending'
        ? '#FFB946'
        : props.status === 'Failed'
          ? '#FF2D55'
          : '#999'};
`;

export const TransactionTime = styled.div`
  font-size: 12px;
  color: #999;
  font-weight: 400;
`;
export const ActivityLogContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ActivityLogList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ActivityLogItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
  border: 1px solid #e8e8e8;
  border-radius: 16px;
  background: white;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    border-color: #d0d0d0;
  }
`;

export const ActivityLogIcon = styled.div<{ type: string }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
  background: ${(props) => {
    switch (props.type) {
      case 'access':
        return '#E3F2FD';
      case 'transaction':
        return '#E8F5E8';
      case 'security':
        return '#FFF3E0';
      case 'profile':
        return '#F3E5F5';
      case 'system':
        return '#F5F5F5';
      default:
        return '#F0F0F0';
    }
  }};
  color: ${(props) => {
    switch (props.type) {
      case 'access':
        return '#1976D2';
      case 'transaction':
        return '#56B677';
      case 'security':
        return '#FF9800';
      case 'profile':
        return '#9C27B0';
      case 'system':
        return '#757575';
      default:
        return '#666';
    }
  }};
`;

export const ActivityLogContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

export const ActivityLogTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  line-height: 1.4;
`;

export const ActivityLogDetails = styled.div`
  font-size: 14px;
  color: #666;
  font-weight: 400;
  line-height: 1.4;
`;
