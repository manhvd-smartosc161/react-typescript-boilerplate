import React, { useMemo } from 'react';
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
  mockStats,
  mockLatestItems,
  mockItemByCategoryChartOptions,
  mockItemStatusByCategoryChartOptions,
  mockItemLeadTimesChartOptions,
} from '@src/mock/dashboardData';
import {
  StyledPaper,
  StyledChartSection,
  StyledTableSection,
} from './index.styled';

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
  const stats = useMemo(
    () =>
      mockStats.map((stat) => ({
        ...stat,
        icon: <stat.icon />,
      })),
    [],
  );

  const latestItems = useMemo(() => mockLatestItems, []);

  const itemByCategoryChart = useMemo(() => mockItemByCategoryChartOptions, []);
  const itemStatusChart = useMemo(
    () => mockItemStatusByCategoryChartOptions,
    [],
  );
  const leadTimesChart = useMemo(() => mockItemLeadTimesChartOptions, []);

  const columns = useMemo(
    () => [
      {
        key: 'name' as keyof ItemData,
        label: 'Item Name',
        render: (value: string) => (
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            {value}
          </Typography>
        ),
      },
      {
        key: 'category' as keyof ItemData,
        label: 'Category',
      },
      {
        key: 'status' as keyof ItemData,
        label: 'Status',
        render: (value: string) => (
          <Chip
            label={value}
            color={value === 'Active' ? 'success' : 'warning'}
            size="small"
          />
        ),
      },
      {
        key: 'stock' as keyof ItemData,
        label: 'Stock',
        align: 'right' as const,
      },
      {
        key: 'orders' as keyof ItemData,
        label: 'Orders',
        align: 'right' as const,
      },
      {
        key: 'addedDate' as keyof ItemData,
        label: 'Added Date',
      },
    ],
    [],
  );

  return (
    <StyledPaper>
      <PageHeaderOrganism
        title="Item Dashboard"
        leading={<DashboardIcon sx={{ color: '#1976d2', fontSize: 28 }} />}
      />

      <Box sx={{ mt: 3 }}>
        <StatsGridOrganism stats={stats} />

        <StyledChartSection>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <ChartCardOrganism>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={itemByCategoryChart}
                />
              </ChartCardOrganism>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <ChartCardOrganism>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={itemStatusChart}
                />
              </ChartCardOrganism>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <ChartCardOrganism>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={leadTimesChart}
                />
              </ChartCardOrganism>
            </Grid>
          </Grid>
        </StyledChartSection>

        <StyledTableSection>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Item List (Latest)
          </Typography>
          <TableOrganism<ItemData>
            columns={columns}
            data={latestItems}
            rowKey="id"
          />
        </StyledTableSection>
      </Box>
    </StyledPaper>
  );
};

export default Home;
