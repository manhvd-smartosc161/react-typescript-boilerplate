import { FC } from 'react';
import { PageTemplate } from '@src/components/templates';
import { CardAtom, TextAtom } from '@src/components/atoms';

const Settings: FC = () => {
  return (
    <PageTemplate
      title="System Settings"
      subtitle="Manage your application preferences and configurations"
    >
      <CardAtom>
        <TextAtom variant="body1">
          System configuration and settings page.
        </TextAtom>
      </CardAtom>
    </PageTemplate>
  );
};

export default Settings;
