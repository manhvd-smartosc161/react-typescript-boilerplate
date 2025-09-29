import { FC } from 'react';
import { Card } from 'antd';
import { PageTitle } from './index.styled';

const GeneralContainer: FC = () => {
  return (
    <div>
      <PageTitle>General</PageTitle>
      <Card>
        <p>General settings and configuration page.</p>
      </Card>
    </div>
  );
};

export default GeneralContainer;
