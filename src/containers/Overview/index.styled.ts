import styled from 'styled-components';
import { Input, Button, Progress } from 'antd';

export const OverviewContainerWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// Component B Styles
export const ComponentB = styled.div`
  border: 1px solid #c0bebe;
  border-radius: 24px;
  padding: 20px;
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
  gap: 14px;
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

// Component C Styles
export const ComponentC = styled.div`
  display: flex;
  gap: 30px;
`;

export const StatsCard = styled.div`
  flex: 1;
  border: 1px solid #c0bebe;
  border-radius: 24px;
  padding: 20px;
`;

export const CardTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;

  h4 {
    font-size: 20px;
    color: black;
    margin: 0;
    font-weight: 600;
  }
`;

export const CardSubtitle = styled.p`
  font-size: 16px;
  color: black;
  margin: 0 0 20px 0;
`;

export const MetricItem = styled.div`
  margin-bottom: 16px;
`;

export const MetricHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const MetricTitle = styled.span`
  font-size: 14px;
  color: #333;
  font-weight: 500;
`;

export const MetricValue = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const MetricPercent = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

export const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  color: white;
  background: ${(props) =>
    props.status === 'Healthy'
      ? '#56B677'
      : props.status === 'Warning'
        ? '#FF2D55'
        : props.status === 'Critical'
          ? '#FF2D55'
          : '#999'};
`;

export const CustomProgress = styled(Progress)`
  .ant-progress-bg {
    background: #2f529f !important;
  }

  .ant-progress-inner {
    height: 8px !important;
    border-radius: 4px !important;
    background: #f0f0f0;
  }
`;

export const ViewAllLink = styled.div`
  text-align: center;
  margin-top: 16px;
  font-size: 14px;
  font-weight: 400;
  color: #2f529f;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

// Activity Item Styles
export const ActivityItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #c0bebe;
  border-radius: 12px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ActivityLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ActivityAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #666;
  font-size: 12px;
`;

export const ActivityInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ActivityName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

export const ActivityAction = styled.div`
  font-size: 12px;
  color: #666;
`;

export const ActivityTime = styled.div`
  font-size: 12px;
  color: #666;
`;

// Event Item Styles
export const EventItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #c0bebe;
  border-radius: 12px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const EventLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const EventIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #2f529f4d;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2f529f;
`;

export const EventInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EventTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

export const EventSubtitle = styled.div`
  font-size: 12px;
  color: #666;
`;

export const EventStatus = styled.div`
  padding: 5px 8px;
  border: 1px solid #c0bebe;
  border-radius: 8px;
  font-size: 12px;
  color: #666;
`;

// Component D Styles
export const ComponentD = styled.div`
  border: 1px solid #c0bebe;
  border-radius: 24px;
  padding: 20px;
`;

export const NotificationItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #c0bebe;
  border-radius: 12px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const NotificationLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const NotificationIcon = styled.div<{ type: string }>`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.type === 'Security'
      ? '#FF2D5520'
      : props.type === 'Compliance'
        ? '#2f529f20'
        : props.type === 'Fraud'
          ? '#FF2D5520'
          : '#f0f0f0'};
  color: ${(props) =>
    props.type === 'Security'
      ? '#FF2D55'
      : props.type === 'Compliance'
        ? '#2f529f'
        : props.type === 'Fraud'
          ? '#FF2D55'
          : '#666'};
`;

export const NotificationInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NotificationTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

export const NotificationCategory = styled.div`
  font-size: 12px;
  color: #666;
`;

export const NotificationRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

export const NotificationStatus = styled.span<{ level: string }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  color: white;
  background: ${(props) =>
    props.level === 'Low'
      ? '#56B677'
      : props.level === 'Medium'
        ? '#AD8CF4'
        : props.level === 'High'
          ? '#FF2D55'
          : '#999'};
`;

export const NotificationTime = styled.div`
  font-size: 11px;
  color: #666;
`;

export const ViewAllButton = styled(Button)`
  width: 100%;
  margin-top: 16px;
  height: 40px;
  background: transparent;
  border: 1px solid #2f529f;
  color: #2f529f;

  &:hover {
    background: #2f529f !important;
    color: white !important;
  }
`;
