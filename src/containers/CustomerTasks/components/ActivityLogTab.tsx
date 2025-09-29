import { FC } from 'react';
import {
  MobileOutlined,
  DollarCircleOutlined,
  KeyOutlined,
  LoginOutlined,
  SafetyOutlined,
  EditOutlined,
} from '@ant-design/icons';
import {
  ActivityLogContainer,
  ActivityLogList,
  ActivityLogItem,
  ActivityLogIcon,
  ActivityLogContent,
  ActivityLogTitle,
  ActivityLogDetails,
} from '../index.styled';

interface ActivityLog {
  id: string;
  title: string;
  details: string;
  icon: JSX.Element;
  type: 'access' | 'transaction' | 'security' | 'profile' | 'system';
}

const ActivityLogTab: FC = () => {
  const activityLogs: ActivityLog[] = [
    {
      id: '1',
      title: 'Account accessed via mobile app',
      details: '1/15/2024, 9:30:00 PM • IP: 192.168.1.1',
      icon: <MobileOutlined />,
      type: 'access',
    },
    {
      id: '2',
      title: 'Large transaction executed',
      details: 'Jan 15, 2024 10:30 AM • Amount: $5,250.00',
      icon: <DollarCircleOutlined />,
      type: 'transaction',
    },
    {
      id: '3',
      title: 'Password reset requested',
      details: 'Jan 14, 2024 2:15 PM • Via email verification',
      icon: <KeyOutlined />,
      type: 'security',
    },
    {
      id: '4',
      title: 'Login attempt from new device',
      details: 'Jan 13, 2024 8:45 AM • Device: iPhone 15 Pro',
      icon: <LoginOutlined />,
      type: 'access',
    },
    {
      id: '5',
      title: 'Profile information updated',
      details: 'Jan 12, 2024 3:20 PM • Phone number changed',
      icon: <EditOutlined />,
      type: 'profile',
    },
    {
      id: '6',
      title: 'Security verification completed',
      details: 'Jan 11, 2024 11:00 AM • Two-factor authentication',
      icon: <SafetyOutlined />,
      type: 'security',
    },
    {
      id: '7',
      title: 'Account accessed via web portal',
      details: 'Jan 10, 2024 4:15 PM • IP: 192.168.1.5',
      icon: <MobileOutlined />,
      type: 'access',
    },
    {
      id: '8',
      title: 'Wire transfer initiated',
      details: 'Jan 9, 2024 1:30 PM • Amount: $2,800.00',
      icon: <DollarCircleOutlined />,
      type: 'transaction',
    },
  ];

  return (
    <ActivityLogContainer>
      <ActivityLogList>
        {activityLogs.map((log) => (
          <ActivityLogItem key={log.id}>
            <ActivityLogIcon type={log.type}>{log.icon}</ActivityLogIcon>
            <ActivityLogContent>
              <ActivityLogTitle>{log.title}</ActivityLogTitle>
              <ActivityLogDetails>{log.details}</ActivityLogDetails>
            </ActivityLogContent>
          </ActivityLogItem>
        ))}
      </ActivityLogList>
    </ActivityLogContainer>
  );
};

export default ActivityLogTab;
