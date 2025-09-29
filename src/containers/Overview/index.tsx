import { FC } from 'react';
import {
  SearchOutlined,
  HeartOutlined,
  TeamOutlined,
  CalendarOutlined,
  //   ShieldOutlined,
  WarningOutlined,
  SafetyOutlined,
  BugOutlined,
  EyeOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

import TitleDateTopSite from '@src/components/TitleDateTopSite';
import {
  OverviewContainerWrap,
  ComponentB,
  SectionTitle,
  SectionSubtitle,
  SearchContainer,
  SearchInput,
  SearchButton,
  ComponentC,
  StatsCard,
  CardTitle,
  CardSubtitle,
  MetricItem,
  MetricHeader,
  MetricTitle,
  MetricValue,
  MetricPercent,
  StatusBadge,
  CustomProgress,
  ViewAllLink,
  ActivityItem,
  ActivityLeft,
  ActivityAvatar,
  ActivityInfo,
  ActivityName,
  ActivityAction,
  ActivityTime,
  EventItem,
  EventLeft,
  EventIcon,
  EventInfo,
  EventTitle,
  EventSubtitle,
  EventStatus,
  ComponentD,
  NotificationItem,
  NotificationLeft,
  NotificationIcon,
  NotificationInfo,
  NotificationTitle,
  NotificationCategory,
  NotificationRight,
  NotificationStatus,
  NotificationTime,
  ViewAllButton,
} from './index.styled';

const OverviewContainer: FC = () => {
  // Mock data for system health
  const systemMetrics = [
    { title: 'CPU Usage', value: '68%', status: 'Healthy', progress: 68 },
    { title: 'Memory', value: '90%', status: 'Warning', progress: 90 },
    { title: 'Network', value: '60ms', status: 'Healthy', progress: 60 },
  ];

  // Mock data for staff activities
  const staffActivities = [
    {
      name: 'John Anderson',
      action: 'Approved wire transfer',
      time: '9:30:00 PM',
      avatar: 'JA',
    },
    {
      name: 'Sarah Mitchell',
      action: 'Updated customer profile',
      time: '8:45:15 PM',
      avatar: 'SM',
    },
    {
      name: 'Mike Johnson',
      action: 'Processed loan application',
      time: '7:22:30 PM',
      avatar: 'MJ',
    },
  ];

  // Mock data for scheduled events
  const scheduledEvents = [
    {
      title: 'System Maintenance',
      subtitle: 'Tonight at 2:00 AM EST',
      status: 'Upcoming',
      icon: <ClockCircleOutlined />,
    },
    {
      title: 'Monthly Report',
      subtitle: 'Due tomorrow at 5:00 PM',
      status: 'Pending',
      icon: <CalendarOutlined />,
    },
    {
      title: 'Security Audit',
      subtitle: 'Scheduled for Friday',
      status: 'Scheduled',
      icon: <CalendarOutlined />,
      //   icon: <ShieldOutlined />,
    },
  ];

  // Mock data for security alerts
  const securityAlerts = [
    {
      title: 'Multiple failed login attempts detected',
      category: 'Security',
      level: 'High',
      time: '9:30:00 PM',
      icon: <WarningOutlined />,
    },
    {
      title: 'Unusual transaction pattern identified',
      category: 'Fraud',
      level: 'Medium',
      time: '8:15:22 PM',
      icon: <BugOutlined />,
    },
    {
      title: 'Compliance report requires review',
      category: 'Compliance',
      level: 'Low',
      time: '6:45:11 PM',
      icon: <SafetyOutlined />,
    },
    {
      title: 'Password policy violation attempt',
      category: 'Security',
      level: 'Medium',
      time: '5:20:33 PM',
      icon: <CalendarOutlined />,
      //   icon: <ShieldOutlined />,
    },
  ];

  const handleSearch = () => {
    console.log('Search functionality');
  };

  return (
    <OverviewContainerWrap>
      {/* Component A */}
      <TitleDateTopSite
        title="Overview"
        subtitle="Welcome to the SecureBank administrative portal. Monitor key metrics and manage banking operations."
      />

      {/* Component B */}
      <ComponentB>
        <SectionTitle>
          <SearchOutlined style={{ fontSize: '20px', color: '#2f529f' }} />
          <h3>Customer Search</h3>
        </SectionTitle>

        <SectionSubtitle>
          Search for customers to view details and perform actions
        </SectionSubtitle>

        <SearchContainer>
          <SearchInput
            placeholder="Search by name, account number, or email..."
            prefix={<SearchOutlined style={{ color: '#6F6F6F' }} />}
          />

          <SearchButton
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearch}
          >
            Search
          </SearchButton>
        </SearchContainer>
      </ComponentB>

      {/* Component C */}
      <ComponentC>
        {/* C1 - System Health */}
        <StatsCard>
          <CardTitle>
            <HeartOutlined style={{ fontSize: '20px', color: '#2f529f' }} />
            <h4>System Health</h4>
          </CardTitle>
          <CardSubtitle>Real-time system performance metrics</CardSubtitle>

          {systemMetrics.map((metric, index) => (
            <MetricItem key={index}>
              <MetricHeader>
                <MetricTitle>{metric.title}</MetricTitle>
                <MetricValue>
                  <MetricPercent>{metric.value}</MetricPercent>
                  <StatusBadge status={metric.status}>
                    {metric.status}
                  </StatusBadge>
                </MetricValue>
              </MetricHeader>
              <CustomProgress
                percent={metric.progress}
                showInfo={false}
                strokeColor="#2f529f"
                trailColor="#f0f0f0"
                strokeWidth={8}
              />
            </MetricItem>
          ))}

          <ViewAllLink>View All</ViewAllLink>
        </StatsCard>

        {/* C2 - Staff Activity */}
        <StatsCard>
          <CardTitle>
            <TeamOutlined style={{ fontSize: '20px', color: '#2f529f' }} />
            <h4>Staff Activity</h4>
          </CardTitle>
          <CardSubtitle>Current administrative staff actions</CardSubtitle>

          {staffActivities.map((activity, index) => (
            <ActivityItem key={index}>
              <ActivityLeft>
                <ActivityAvatar>{activity.avatar}</ActivityAvatar>
                <ActivityInfo>
                  <ActivityName>{activity.name}</ActivityName>
                  <ActivityAction>{activity.action}</ActivityAction>
                </ActivityInfo>
              </ActivityLeft>
              <ActivityTime>{activity.time}</ActivityTime>
            </ActivityItem>
          ))}

          <ViewAllLink>View All</ViewAllLink>
        </StatsCard>

        {/* C3 - Scheduled Events */}
        <StatsCard>
          <CardTitle>
            <CalendarOutlined style={{ fontSize: '20px', color: '#2f529f' }} />
            <h4>Scheduled Events</h4>
          </CardTitle>
          <CardSubtitle>
            Upcoming maintenance, reports, and deadlines
          </CardSubtitle>

          {scheduledEvents.map((event, index) => (
            <EventItem key={index}>
              <EventLeft>
                <EventIcon>{event.icon}</EventIcon>
                <EventInfo>
                  <EventTitle>{event.title}</EventTitle>
                  <EventSubtitle>{event.subtitle}</EventSubtitle>
                </EventInfo>
              </EventLeft>
              <EventStatus>{event.status}</EventStatus>
            </EventItem>
          ))}

          <ViewAllLink>View All</ViewAllLink>
        </StatsCard>
      </ComponentC>

      {/* Component D */}
      <ComponentD>
        <SectionTitle>
          {/* ShieldOutlined */}
          <CalendarOutlined style={{ fontSize: '20px', color: '#2f529f' }} />
          <h3>Security Alerts</h3>
        </SectionTitle>

        <SectionSubtitle>
          Recent security and compliance notifications
        </SectionSubtitle>

        {securityAlerts.map((alert, index) => (
          <NotificationItem key={index}>
            <NotificationLeft>
              <NotificationIcon type={alert.category}>
                {alert.icon}
              </NotificationIcon>
              <NotificationInfo>
                <NotificationTitle>{alert.title}</NotificationTitle>
                <NotificationCategory>{alert.category}</NotificationCategory>
              </NotificationInfo>
            </NotificationLeft>
            <NotificationRight>
              <NotificationStatus level={alert.level}>
                {alert.level}
              </NotificationStatus>
              <NotificationTime>{alert.time}</NotificationTime>
            </NotificationRight>
          </NotificationItem>
        ))}

        <ViewAllButton>View All</ViewAllButton>
      </ComponentD>
    </OverviewContainerWrap>
  );
};

export default OverviewContainer;
