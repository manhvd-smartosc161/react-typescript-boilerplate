import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Chip, Grid } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {
  StatsGridOrganism,
  ChartCardOrganism,
  TableOrganism,
} from '@src/components';
import { PageHeaderOrganism } from '@src/components/organisms';
import {
  getMockStats,
  mockLatestItems,
  getMockItemByCategoryChartOptions,
  getMockItemStatusByCategoryChartOptions,
  getMockItemLeadTimesChartOptions,
} from '@src/mock/dashboardData';
import {
  StyledPaper,
  StyledChartSection,
  StyledTableSection,
} from './index.styled';
import { useRecoilValue } from 'recoil';
import { currentUserState } from '@src/stores';
import { EUserRole } from '@src/constants/auth';

interface ItemData {
  id: string;
  name: string;
  category: string;
  status: string;
  stock: number;
  orders: number;
  addedDate: string;
}

const Home: React.FC = () => {
  const { t } = useTranslation('item');
  const { t: tCommon } = useTranslation('common');
  const currentUser = useRecoilValue(currentUserState);

  const stats = useMemo(
    () =>
      getMockStats(t).map((stat) => ({
        ...stat,
        icon: <stat.icon />,
      })),
    [t],
  );

  const latestItems = useMemo(() => mockLatestItems, []);

  const itemByCategoryChart = useMemo(
    () => getMockItemByCategoryChartOptions(t),
    [t],
  );
  const itemStatusChart = useMemo(
    () => getMockItemStatusByCategoryChartOptions(t),
    [t],
  );
  const leadTimesChart = useMemo(
    () => getMockItemLeadTimesChartOptions(t),
    [t],
  );

  const columns = useMemo(
    () => [
      {
        key: 'name' as keyof ItemData,
        label: t('dashboard.itemName'),
        render: (value: string) => (
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            {value}
          </Typography>
        ),
      },
      {
        key: 'category' as keyof ItemData,
        label: t('dashboard.category'),
      },
      {
        key: 'status' as keyof ItemData,
        label: t('status'),
        render: (value: string) => {
          const isActive = value === 'Active';
          const statusKey = isActive ? 'status.active' : 'status.inactive';
          return (
            <Chip
              label={tCommon(statusKey)}
              color={isActive ? 'success' : 'warning'}
              size="small"
            />
          );
        },
      },
      {
        key: 'stock' as keyof ItemData,
        label: t('stock'),
        align: 'right' as const,
      },
      {
        key: 'orders' as keyof ItemData,
        label: t('orders'),
        align: 'right' as const,
      },
      {
        key: 'addedDate' as keyof ItemData,
        label: t('addedDate'),
      },
    ],
    [t, tCommon],
  );

  return (
    <StyledPaper>
      <PageHeaderOrganism
        title={t('dashboard.title')}
        leading={<DashboardIcon sx={{ color: '#1976d2', fontSize: 28 }} />}
      />

      <Box sx={{ mt: 3 }}>
        <StatsGridOrganism stats={stats} />

        <StyledChartSection>
          <Grid container spacing={2}>
            {currentUser?.role?.name === EUserRole.SUPPLIER && (
              <Grid size={{ xs: 12 }}>
                <ChartCardOrganism>
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={itemByCategoryChart}
                  />
                </ChartCardOrganism>
              </Grid>
            )}
            {currentUser?.role?.name === EUserRole.BUYER && (
              <Grid size={{ xs: 12 }}>
                <ChartCardOrganism>
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={itemStatusChart}
                  />
                </ChartCardOrganism>
              </Grid>
            )}
            {currentUser?.role?.name === EUserRole.BUYER && (
              <Grid size={{ xs: 12 }}>
                <ChartCardOrganism>
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={leadTimesChart}
                  />
                </ChartCardOrganism>
              </Grid>
            )}
          </Grid>
        </StyledChartSection>
        {currentUser?.role?.name === EUserRole.SUPPLIER && (
          <StyledTableSection>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              {t('dashboard.itemListLatest')}
            </Typography>
            <TableOrganism<ItemData>
              columns={columns}
              data={latestItems}
              rowKey="id"
            />
          </StyledTableSection>
        )}
      </Box>
    </StyledPaper>
  );
};

export default Home;
