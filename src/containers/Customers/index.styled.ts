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

export const WrapSearchComp = styled.div`
  padding: 20px;
  padding-bottom: 20px;
  border: 1px solid #c0bebe;
  border-radius: 8px;
  background: white;
`;

export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;

  h3 {
    font-size: 20px;
    color: black;
    margin: 0;
    font-weight: 600;
  }
`;

export const SectionSubtitle = styled.p`
  font-size: 16px;
  color: black;
  margin: 0 0 20px 0;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

export const SearchInput = styled(Input)`
  width: 70%;
  height: 48px;
  font-size: 16px;
  font-weight: 400;

  .ant-input {
    font-size: 16px;

    &::placeholder {
      color: #6f6f6f;
      font-size: 16px;
      font-weight: 400;
    }
  }
`;

export const StatusSelect = styled(Select)`
  width: 200px;
  height: 48px;

  .ant-select-selector {
    height: 48px !important;
    display: flex;
    align-items: center;
  }
`;

export const SearchButton = styled(Button)`
  height: 48px;
  padding: 0 24px;
  background: #2f529f;
  border-color: #2f529f;

  &:hover {
    background: #40a9ff !important;
    border-color: #40a9ff !important;
  }
`;

export const WrapTableBox = styled.div`
  padding: 20px;
  padding-bottom: 20px;
  border: 1px solid #c0bebe;
  border-radius: 8px;
  position: relative;
  background: white;
`;

export const TableHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const TableTitle = styled.h3`
  font-size: 20px;
  color: black;
  margin: 0 0 4px 0;
  font-weight: 600;
`;

export const TableSubtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

export const CustomTable = styled(Table)`
  .ant-table-thead > tr > th {
    background: white;
    border-bottom: 2px solid #f0f0f0;
    font-weight: 600;
    color: #333;
    padding: 16px;
  }

  .ant-table-tbody > tr > td {
    border-bottom: none;
    padding: 16px;
  }

  .ant-table-tbody > tr:hover > td {
    background: #f8f9ff;
  }
`;

export const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  color: white;
  background: ${(props) =>
    props.status === 'Active'
      ? '#56B677'
      : props.status === 'Inactive'
        ? '#FF6B6B'
        : props.status === 'Pending'
          ? '#FFB946'
          : props.status === 'Suspended'
            ? '#FF8A65'
            : '#999'};
`;

export const CustomerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const CustomerAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #666;
`;

export const CustomerDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CustomerName = styled.div`
  font-weight: 600;
  color: #333;
  font-size: 14px;
`;

export const CustomerEmail = styled.div`
  color: #666;
  font-size: 12px;
`;

export const LoginInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LoginDate = styled.div`
  font-size: 14px;
  color: #333;
`;

export const LoginTime = styled.div`
  font-size: 12px;
  color: #666;
`;

export const PaginationWrapper = styled.div`
  .ant-pagination {
    display: flex;
    padding-top: 40px;
    justify-content: flex-end;

    .ant-pagination-item-active {
      background: #2f529f;
      border-color: #2f529f;

      a {
        color: white;
      }
    }

    .ant-pagination-item:hover {
      border-color: #2f529f;

      a {
        color: #2f529f;
      }
    }

    .ant-pagination-prev:hover .ant-pagination-item-link,
    .ant-pagination-next:hover .ant-pagination-item-link {
      color: #2f529f;
      border-color: #2f529f;
    }
  }
`;
