import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import {
  IconAtom,
  PageHeaderOrganism,
  StatusChipAtom,
  TableOrganism,
} from '@src/components';
import { ProductDetail } from '@src/types';
import { StyledActionIconButton } from '../Contracts/index.styled';
import { ESortDirection } from '@src/constants';
import { productList } from '@src/mock/itemData';
import { TableItemToolbarOrganism } from '@src/components/organisms';

const ItemManagement: FC = () => {
  const { t } = useTranslation('item');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order] = useState<ESortDirection>(ESortDirection.ASC);
  const [orderBy] = useState('productNameEn');
  const [selectedRows, setSelectedRows] = useState<Array<string | number>>([]);
  const data = productList;
  const columns = [
    {
      key: 'id' as keyof ProductDetail,
      label: t('id'),
    },
    {
      key: 'sku' as keyof ProductDetail,
      label: t('sku'),
    },
    {
      key: 'division' as keyof ProductDetail,
      label: t('division'),
    },
    {
      key: 'area' as keyof ProductDetail,
      label: t('area'),
    },
    {
      key: 'productNameEn' as keyof ProductDetail,
      label: t('productNameEn'),
    },
    {
      key: 'productNameTh' as keyof ProductDetail,
      label: t('productNameTh'),
    },
    {
      key: 'pack' as keyof ProductDetail,
      label: t('pack'),
    },
    {
      key: 'units' as keyof ProductDetail,
      label: t('units'),
    },
    {
      key: 'stock' as keyof ProductDetail,
      label: t('stock'),
    },
    {
      key: 'orders' as keyof ProductDetail,
      label: t('orders'),
    },
    {
      key: 'addedDate' as keyof ProductDetail,
      label: t('addedDate'),
    },
    {
      key: 'status' as keyof ProductDetail,
      label: t('status'),
      render: (value: string) => (
        <StyledActionIconButton>
          <StatusChipAtom status={value} />
        </StyledActionIconButton>
      ),
    },
    {
      key: 'id' as keyof ProductDetail,
      label: t('common:action'),
      width: '120px',
      align: 'center' as const,
      isSortable: false,
      render: (_value: string, record: ProductDetail) => (
        <StyledActionIconButton>
          <IconAtom
            name="edit"
            size={20}
            onClick={() => alert(JSON.stringify(record))}
          />
        </StyledActionIconButton>
      ),
    },
  ];

  return (
    <Box>
      <PageHeaderOrganism title={t('items')} />

      <Box sx={{ mt: 3 }}>
        <TableOrganism<ProductDetail>
          tableTitle={t('items')}
          columns={columns}
          data={data?.items || []}
          rowKey="id"
          order={order}
          orderBy={orderBy}
          pagination={{
            currentPage,
            rowsPerPage,
            total: data?.pagination?.total || 0,
            pagesCount: data?.pagination?.pagesCount || 0,
            hasMore: data?.pagination?.hasMore || false,
          }}
          onChangePage={(page) => setCurrentPage(page)}
          onChangeRowsPerPage={(size) => setRowsPerPage(size)}
          selectable
          selectedRows={selectedRows}
          onSelectedRowsChange={(newKeys) => {
            setSelectedRows(newKeys);
          }}
          toolbar={
            <TableItemToolbarOrganism
              keyword=""
              onClearSearch={() => {}}
              onKeywordChange={() => {}}
              selectedCount={selectedRows.length}
              searchPlaceholder={t('common:searchKeyword')}
              actions={[
                {
                  key: 'enable',
                  label: 'Enable',
                  onClick: () => alert('enabled'),
                },
                {
                  key: 'disable',
                  label: 'Disable',
                  onClick: () => alert('Disabled'),
                },
              ]}
            />
          }
        />
      </Box>
    </Box>
  );
};

export default ItemManagement;
