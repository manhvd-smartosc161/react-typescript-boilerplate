import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Stack, Box, Grid } from '@mui/material';
import BulkActionMenu, {
  BulkActionItem,
} from '../../molecules/TableToolbar/BulkActionMenu';
import { StyledToolbarRow } from '../../molecules/TableToolbar/index.styled';
import SearchInput from '../../molecules/TableToolbar/SearchInput';
import { StyledActionDropdown } from './styled.index';
import { ButtonAtom } from '@src/components/atoms';
import { ProductDetail } from '@src/types';
import { ImportCSVModalOrganism } from '..';

interface FiltersProperties {
  area: string;
  status: string;
}

export type TableItemToolbarProps = {
  total?: number;
  keyword: string;
  onKeywordChange: (next: string) => void;
  onClearSearch?: () => void;
  selectedCount: number;
  actions: BulkActionItem[];
  searchPlaceholder?: string;
  searchDebounceMs?: number;
  onChangeFilter: (key: keyof ProductDetail, value: string) => void;
};

const TableItemToolbar: FC<TableItemToolbarProps> = ({
  keyword,
  onKeywordChange,
  selectedCount,
  actions,
  searchPlaceholder = 'Search keyword',
  searchDebounceMs = 500,
  onChangeFilter,
}) => {
  const { t } = useTranslation('item');
  const [filterItem, setFilterItem] = useState<FiltersProperties>({
    area: '',
    status: '',
  });
  const [showImportModal, setShowImportModal] = useState(false);

  const handleChangeFilter = (key: string, value: string) => {
    setFilterItem({ ...filterItem, [key]: value === 'ALL' ? '' : value });
    onChangeFilter(key as keyof ProductDetail, value === 'ALL' ? '' : value);
  };

  return (
    <>
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
                  sx={{
                    flex: { xs: '0 0 auto', md: 1 },
                    minWidth: { md: 280 },
                  }}
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
              {/* <StyledActionDropdown
              value={''}
              placeholder={t('orderBy')}
              size="small"
              fullWidth={false}
              options={[
                { value: 'ascending', label: t('ascending') },
                { value: 'descending', label: t('descending') },
              ]}
            /> */}
              <StyledActionDropdown
                value={filterItem.area}
                name="area"
                placeholder={t('area')}
                size="small"
                fullWidth={false}
                options={[
                  { value: 'ALL', label: t('all') },
                  { value: 'APAC', label: 'APAC' },
                  { value: 'EMEA', label: 'EMEA' },
                  { value: 'AMERnAmericas', label: 'AMER / Americas' },
                  { value: 'LATAM', label: 'LATAM' },
                  { value: 'NA', label: 'NA' },
                  { value: 'SEA', label: 'SEA' },
                  { value: 'MEA', label: 'MEA' },
                ]}
                onChange={(e) =>
                  handleChangeFilter(e.target.name, e.target.value as string)
                }
              />
              {/* <StyledActionDropdown
              value={''}
              placeholder={t('dateAdd')}
              size="small"
              fullWidth={false}
              options={[
                { value: 'ascending', label: t('ascending') },
                { value: 'descending', label: t('descending') },
              ]}
            /> */}
              <StyledActionDropdown
                value={filterItem.status}
                name="status"
                placeholder={t('status')}
                size="small"
                fullWidth={false}
                options={[
                  { value: 'ALL', label: t('all') },
                  { value: 'ACTIVATED', label: t('common:status.activated') },
                  { value: 'REJECTED', label: t('common:status.rejected') },
                ]}
                onChange={(e) =>
                  handleChangeFilter(e.target.name, e.target.value as string)
                }
              />
              {/* <ButtonAtom
              icon={<IconAtom name="filter" />}
              size="large"
              variant="ghost"
              color="inherit"
            >
              {t('allFilters')}
            </ButtonAtom> */}
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
              <ButtonAtom
                size="large"
                color="inherit"
                variant="ghost"
                onClick={() => alert('The feature will be launched soon')}
              >
                {t('addNew')}
              </ButtonAtom>
              <ButtonAtom
                size="large"
                color="info"
                variant="primary"
                onClick={() => setShowImportModal(true)}
              >
                {t('importCSVFile')}
              </ButtonAtom>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      {showImportModal && (
        <ImportCSVModalOrganism
          open={showImportModal}
          onClose={() => setShowImportModal(false)}
        />
      )}
    </>
  );
};

export default TableItemToolbar;
