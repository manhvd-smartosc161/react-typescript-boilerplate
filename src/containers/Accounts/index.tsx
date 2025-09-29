import { FC } from 'react';
import { Card } from 'antd';
import { PageTitle } from './index.styled';

const AccountsContainer: FC = () => {
  return (
    <div>
      <PageTitle>Accounts</PageTitle>
      <Card>
        <p>Account management and information page.</p>
      </Card>
    </div>
  );
};

export default AccountsContainer;
