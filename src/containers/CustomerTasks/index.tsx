import { FC } from 'react';
import { PageContainer } from './index.styled';
import TitleDateTopSite from '@src/components/TitleDateTopSite';
import CustomerHeader from './components/CustomerHeader';
import CustomerTabs from './components/CustomerTabs';

const CustomerTasksContainer: FC = () => {
  return (
    <div>
      <PageContainer>
        {/* Component A */}
        <TitleDateTopSite
          title="Customer Profile"
          subtitle="Process and manage customer details"
        />

        {/* Component B */}
        <CustomerHeader />

        {/* Component C */}
        <CustomerTabs />
      </PageContainer>
    </div>
  );
};

export default CustomerTasksContainer;
