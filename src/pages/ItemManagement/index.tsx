import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { useRecoilValue } from 'recoil';
import {
  IconAtom,
  PageHeaderOrganism,
  StatusChipAtom,
  TableOrganism,
} from '@src/components';
import { PaginatedResponse, ProductDetail } from '@src/types';
import { StyledActionIconButton } from '../Contracts/index.styled';
import { ESortDirection } from '@src/constants';
import { productList } from '@src/mock/itemData';
import { TableItemToolbarOrganism } from '@src/components/organisms';
import { currentUserState } from '@src/stores';

const ItemManagement: FC = () => {
  const { t } = useTranslation('item');
  const currentUser = useRecoilValue(currentUserState);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState<ESortDirection>(ESortDirection.ASC);
  const [orderBy, setOrderBy] = useState<keyof ProductDetail>('productNameEn');
  const [selectedRows, setSelectedRows] = useState<Array<string | number>>([]);
  const [keyword, setKeyword] = useState('');
  const [filter, setFilter] = useState({
    area: '',
    status: '',
  });
  const [data, setData] = useState<PaginatedResponse<ProductDetail>>({
    items: productList.slice(0, rowsPerPage),
    pagination: {
      currentPage,
      from: 0,
      to: rowsPerPage,
      hasMore: true,
      pagesCount: Math.ceil(productList.length / rowsPerPage),
      perPage: rowsPerPage,
      total: productList.length,
    },
  });
  const sortLocal = (
    list: ProductDetail[],
    prop: keyof ProductDetail,
    orderDirection: 'asc' | 'desc',
  ) => {
    return [...list].sort((a, b) => {
      const valueA = a[prop];
      const valueB = b[prop];

      if (valueA == null) return 1;
      if (valueB == null) return -1;

      if (orderDirection === 'asc') {
        return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
      } else {
        return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
      }
    });
  };
  useEffect(() => {
    if (currentUser?.email === 'test_supplier_lotuss@yopmail.com') {
      const sorted = sortLocal(productList, orderBy, order);
      const items = sorted.filter(
        (el: ProductDetail) =>
          (el.area === filter.area || filter.area === '') &&
          (el.status === filter.status || filter.status === '') &&
          (el.productNameEn.includes(keyword) ||
            el.productNameTh.includes(keyword) ||
            keyword === ''),
      );
      setData({
        items: items.slice(
          (currentPage - 1) * rowsPerPage,
          rowsPerPage * currentPage,
        ),
        pagination: {
          currentPage,
          from: (currentPage - 1) * rowsPerPage + 1,
          to: rowsPerPage * currentPage,
          hasMore: true,
          pagesCount: Math.ceil(items.length / rowsPerPage),
          perPage: rowsPerPage,
          total: items.length,
        },
      });
    } else {
      setData({
        items: [],
        pagination: {
          currentPage: 1,
          from: 0,
          to: 0,
          hasMore: false,
          pagesCount: 0,
          perPage: rowsPerPage,
          total: 0,
        },
      });
    }
  }, [currentPage, rowsPerPage, filter, keyword, order, orderBy]);

  const handleChangeFilter = (key: keyof ProductDetail, value: string) => {
    setFilter({ ...filter, [key]: value });
    setCurrentPage(1);
  };

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof ProductDetail,
  ) => {
    const isAsc = orderBy === property && order === ESortDirection.ASC;
    setOrder(isAsc ? ESortDirection.DESC : ESortDirection.ASC);
    setOrderBy(property);
  };

  const handleBulkAction = (action: string) => {
    const status = action === 'enable' ? 'ACTIVATED' : 'REJECTED';
    setData({
      ...data,
      items: data.items.map((el) =>
        selectedRows.includes(el.id) ? { ...el, status } : el,
      ),
    });
    setSelectedRows([]);
  };
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
      isSortable: true,
    },
    {
      key: 'productNameEn' as keyof ProductDetail,
      label: t('productNameEn'),
      isSortable: true,
    },
    {
      key: 'productNameTh' as keyof ProductDetail,
      label: t('productNameTh'),
      isSortable: true,
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
      isSortable: true,
    },
    {
      key: 'orders' as keyof ProductDetail,
      label: t('orders'),
    },
    {
      key: 'addedDate' as keyof ProductDetail,
      label: t('addedDate'),
      isSortable: true,
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
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      render: (_value: string) => (
        <StyledActionIconButton>
          <IconAtom
            name="edit"
            size={20}
            onClick={() => alert('The feature will be launched soon')}
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
          onRequestSort={handleRequestSort}
          toolbar={
            <TableItemToolbarOrganism
              keyword={keyword}
              onClearSearch={() => setKeyword('')}
              onKeywordChange={(key) => {
                setKeyword(key);
              }}
              onChangeFilter={handleChangeFilter}
              selectedCount={selectedRows.length}
              searchPlaceholder={t('common:searchKeyword')}
              actions={[
                {
                  key: 'enable',
                  label: t('enable'),
                  onClick: () => handleBulkAction('enable'),
                },
                {
                  key: 'disable',
                  label: t('disable'),
                  onClick: () => handleBulkAction('disable'),
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
