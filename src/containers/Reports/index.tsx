import { FC } from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import {
  UserOutlined,
  DollarOutlined,
  CalendarOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { PageTitle } from './index.styled';

const ReportsContainer: FC = () => {
  const stats = [
    {
      title: 'Total Reports',
      value: 45,
      icon: <UserOutlined />,
      color: '#1890ff',
    },
    {
      title: 'This Month',
      value: 12,
      icon: <CalendarOutlined />,
      color: '#52c41a',
    },
    {
      title: 'Approved',
      value: 38,
      icon: <TrophyOutlined />,
      color: '#faad14',
    },
    {
      title: 'Pending',
      value: 7,
      icon: <DollarOutlined />,
      color: '#f5222d',
    },
  ];

  return (
    <div>
      <PageTitle>Reports</PageTitle>

      <Row gutter={[16, 16]}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.icon}
                valueStyle={{ color: stat.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Card style={{ marginTop: 24 }}>
        <h3>Detailed Reports</h3>
        <p>Reports page is under development...</p>
      </Card>
    </div>
  );
};

export default ReportsContainer;
