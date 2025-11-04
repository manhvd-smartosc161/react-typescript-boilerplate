import * as React from 'react';
import { Stack, Box, Grid } from '@mui/material';
import BulkActionMenu, { BulkActionItem } from './BulkActionMenu';
import SearchInput from './SearchInput';
import ClearSearchButton from './ClearSearchButton';
import { StyledToolbarRow } from './index.styled';

export type TableToolbarProps = {
  total?: number;
  keyword: string;
  onKeywordChange: (next: string) => void;
  onClearSearch: () => void;
  selectedCount: number;
  actions: BulkActionItem[];
  rightExtras?: React.ReactNode;
  hideTotal?: boolean;
  searchPlaceholder?: string;
  searchDebounceMs?: number;
};

const TableToolbar: React.FC<TableToolbarProps> = ({
  keyword,
  onKeywordChange,
  onClearSearch,
  selectedCount,
  actions,
  rightExtras,
  searchPlaceholder = 'Search keyword',
  searchDebounceMs = 500,
}) => {
  return (
    <Grid container>
      <Grid size={{ sm: 12, md: 6 }}>
        <Box sx={{ padding: 2 }}>
          <StyledToolbarRow>
            <Stack
              direction="row"
              spacing={1.25}
              alignItems="center"
              flexShrink={0}
            >
              <BulkActionMenu
                actions={actions}
                disabled={selectedCount === 0}
              />
            </Stack>

            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={1}
              alignItems={{ xs: 'stretch', md: 'center' }}
              justifyContent="flex-end"
              flex={1}
            >
              {rightExtras /* optional filters (role/status...) */}
              <Box
                sx={{ flex: { xs: '0 0 auto', md: 1 }, minWidth: { md: 280 } }}
              >
                <SearchInput
                  value={keyword}
                  onChange={onKeywordChange}
                  placeholder={searchPlaceholder}
                  debounceMs={searchDebounceMs}
                />
              </Box>

              <Box sx={{ width: { xs: '100%', md: 'auto' } }}>
                <ClearSearchButton
                  onClick={onClearSearch}
                  disabled={!keyword}
                />
              </Box>
            </Stack>
          </StyledToolbarRow>
        </Box>
      </Grid>
    </Grid>
  );
};

export default TableToolbar;
