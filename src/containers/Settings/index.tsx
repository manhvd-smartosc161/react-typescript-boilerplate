import { FC } from 'react';
import { Card, Form, Switch, Input, Button, Select, Divider } from 'antd';
import {
  SaveOutlined,
  UserOutlined,
  BellOutlined,
  SecurityScanOutlined,
} from '@ant-design/icons';
import { PageTitle } from './index.styled';

const { Option } = Select;

const SettingsContainer: FC = () => {
  const [form] = Form.useForm();

  const handleSave = () => {
    // Handle save logic here
    // You can implement API call or state management here
  };

  return (
    <div>
      <PageTitle>Settings</PageTitle>

      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          initialValues={{
            notifications: true,
            emailNotifications: true,
            darkMode: false,
            language: 'en',
          }}
        >
          <h3>
            <UserOutlined /> Personal Information
          </h3>
          <Form.Item name="name" label="Display Name">
            <Input placeholder="Enter display name" />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input placeholder="Enter email" />
          </Form.Item>

          <Divider />

          <h3>
            <BellOutlined /> Notifications
          </h3>
          <Form.Item
            name="notifications"
            label="Enable Notifications"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            name="emailNotifications"
            label="Email Notifications"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Divider />

          <h3>
            <SecurityScanOutlined /> Interface
          </h3>
          <Form.Item name="darkMode" label="Dark Mode" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item name="language" label="Language">
            <Select>
              <Option value="en">English</Option>
              <Option value="vi">Tiếng Việt</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
              Save Settings
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SettingsContainer;
