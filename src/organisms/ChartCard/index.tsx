import { FC, ReactNode, Suspense } from 'react';
import { CircularProgress, Box } from '@mui/material';
import { Card } from '@src/atoms';

export interface ChartCardProps {
  title?: string;
  children: ReactNode;
  loading?: boolean;
}

const ChartCard: FC<ChartCardProps> = ({
  title,
  children,
  loading = false,
}) => {
  return (
    <Card variant="elevated">
      {title && (
        <Box sx={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 2 }}>
          {title}
        </Box>
      )}
      <Suspense
        fallback={
          <Box
            sx={{
              textAlign: 'center',
              padding: '50px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        }
      >
        {loading ? <CircularProgress /> : children}
      </Suspense>
    </Card>
  );
};

export default ChartCard;
