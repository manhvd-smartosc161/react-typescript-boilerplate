import { FC, ReactNode, useState } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MenuItem } from '@src/types/menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import { Sidebar, Header } from '@src/organisms';

export interface DashboardTemplateProps {
  children: ReactNode;
}

const DashboardTemplate: FC<DashboardTemplateProps> = ({ children }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  // Simple menu - only Dashboard and Settings
  const menuItems: MenuItem[] = [
    {
      key: '/',
      icon: <DashboardIcon />,
      label: 'Dashboard',
    },
    {
      key: '/settings',
      icon: <SettingsIcon />,
      label: 'Settings',
    },
  ];

  // Simple breadcrumb
  const getBreadcrumbItems = () => {
    return [
      {
        title: 'Employee Portal',
        onClick: () => navigate('/'),
      },
      {
        title: 'Dashboard',
      },
    ];
  };

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
      }}
    >
      <Sidebar collapsed={collapsed} menuItems={menuItems} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: '#F5F6FA',
          height: '100vh',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header
          collapsed={collapsed}
          onToggleCollapse={handleCollapse}
          breadcrumbItems={getBreadcrumbItems()}
        />
        <Box
          sx={{
            padding: 3,
            flexGrow: 1,
            overflow: 'auto',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardTemplate;
