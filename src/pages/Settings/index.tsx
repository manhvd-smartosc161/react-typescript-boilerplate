import { FC } from 'react';
import { PageTemplate, SettingsOrganism } from '@src/components';

const Settings: FC = () => {
  return (
    <PageTemplate
      title="Settings"
      subtitle="Manage your account settings and set e-email preferences"
    >
      <SettingsOrganism />
    </PageTemplate>
  );
};

export default Settings;
