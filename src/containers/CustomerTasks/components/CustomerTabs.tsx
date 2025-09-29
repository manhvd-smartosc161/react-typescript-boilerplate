import { FC, useState } from 'react';
import {
  TabsContainer,
  TabsHeader,
  TabButton,
  TabContent,
  ComingSoonContainer,
} from '../index.styled';
import OverviewTab from './OverviewTab';
import AccountTab from './AccountTab';
import PersonalInfoTab from './PersonalInfoTab';
import TransactionsTab from './TransactionsTab';
import ActivityLogTab from './ActivityLogTab'; // Import mới

const CustomerTabs: FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'account', label: 'Account' },
    { key: 'personal', label: 'Personal Info' },
    { key: 'transactions', label: 'Transactions' },
    { key: 'risk', label: 'Risk & Compliance' },
    { key: 'activity', label: 'Activity Log' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'account':
        return <AccountTab />;
      case 'personal':
        return <PersonalInfoTab />;
      case 'transactions':
        return <TransactionsTab />;
      case 'activity': // Thêm case mới
        return <ActivityLogTab />;
      case 'risk': // Chỉ còn Risk & Compliance là coming soon
        return (
          <ComingSoonContainer>
            Coming Soon - Risk & Compliance
          </ComingSoonContainer>
        );
      default:
        return (
          <ComingSoonContainer>
            Coming Soon - {tabs.find((tab) => tab.key === activeTab)?.label}
          </ComingSoonContainer>
        );
    }
  };

  return (
    <TabsContainer>
      <TabsHeader>
        {tabs.map((tab) => (
          <TabButton
            key={tab.key}
            isActive={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </TabButton>
        ))}
      </TabsHeader>

      <TabContent>{renderTabContent()}</TabContent>
    </TabsContainer>
  );
};

export default CustomerTabs;
