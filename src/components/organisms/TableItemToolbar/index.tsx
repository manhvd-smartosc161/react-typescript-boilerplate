import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Stack, Box, Grid } from '@mui/material';
import BulkActionMenu, {
  BulkActionItem,
} from '../../molecules/TableToolbar/BulkActionMenu';
import { StyledToolbarRow } from '../../molecules/TableToolbar/index.styled';
import SearchInput from '../../molecules/TableToolbar/SearchInput';
import { StyledActionDropdown } from './styled.index';
import { ButtonAtom, IconAtom } from '@src/components/atoms';

export type TableItemToolbarProps = {
  total?: number;
  keyword: string;
  onKeywordChange: (next: string) => void;
  onClearSearch?: () => void;
  selectedCount: number;
  actions: BulkActionItem[];
  searchPlaceholder?: string;
  searchDebounceMs?: number;
};

const TableItemToolbar: React.FC<TableItemToolbarProps> = ({
  keyword,
  onKeywordChange,
  selectedCount,
  actions,
  searchPlaceholder = 'Search keyword',
  searchDebounceMs = 500,
}) => {
  const { t } = useTranslation('item');

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
            </Stack>
          </StyledToolbarRow>
        </Box>
      </Grid>
      <Grid size={{ sm: 12, md: 12 }}>
        <Stack
          direction="row"
          spacing={1.25}
          alignItems="center"
          flexShrink={0}
          justifyContent={'space-between'}
          padding={2}
        >
          <Stack
            direction="row"
            spacing={1.25}
            alignItems="center"
            flexShrink={0}
          >
            <StyledActionDropdown
              value={''}
              placeholder={t('orderBy')}
              size="small"
              fullWidth={false}
              options={[
                { value: 'ascending', label: t('ascending') },
                { value: 'descending', label: t('descending') },
              ]}
            />
            <StyledActionDropdown
              value={''}
              placeholder={t('area')}
              size="small"
              fullWidth={false}
              options={[
                { value: 'ascending', label: t('ascending') },
                { value: 'descending', label: t('descending') },
              ]}
            />
            <StyledActionDropdown
              value={''}
              placeholder={t('dateAdd')}
              size="small"
              fullWidth={false}
              options={[
                { value: 'ascending', label: t('ascending') },
                { value: 'descending', label: t('descending') },
              ]}
            />
            <StyledActionDropdown
              value={''}
              placeholder={t('status')}
              size="small"
              fullWidth={false}
              options={[
                { value: 'ascending', label: t('ascending') },
                { value: 'descending', label: t('descending') },
              ]}
            />
            <ButtonAtom
              icon={<IconAtom name="filter" />}
              size="large"
              variant="ghost"
              color="inherit"
            >
              {t('allFilters')}
            </ButtonAtom>
            <BulkActionMenu
              actions={[
                {
                  key: 'csvExport',
                  label: 'CSV',
                  onClick: () => alert('The feature will be launched soon'),
                },
                {
                  key: 'excelExport',
                  label: 'Excel',
                  onClick: () => alert('The feature will be launched soon'),
                },
              ]}
              label={t('exportData')}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={1.25}
            alignItems="center"
            flexShrink={0}
          >
            <ButtonAtom size="large" color="inherit" variant="ghost">
              {t('addNew')}
            </ButtonAtom>
            <ButtonAtom size="large" color="info" variant="primary">
              {t('importCSVFile')}
            </ButtonAtom>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default TableItemToolbar;
