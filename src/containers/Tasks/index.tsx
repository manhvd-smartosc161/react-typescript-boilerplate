import { FC } from 'react';
import { Card } from 'antd';
import { PageTitle } from './index.styled';

const TasksContainer: FC = () => {
  return (
    <div>
      <PageTitle>Tasks</PageTitle>
      <Card>
        <p>Task management and assignment page.</p>
      </Card>
    </div>
  );
};

export default TasksContainer;
