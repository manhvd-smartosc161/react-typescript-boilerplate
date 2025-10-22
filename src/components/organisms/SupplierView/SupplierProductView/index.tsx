import { Grid } from '@mui/material';
import { DataPair } from '@src/components/molecules';
import { SupplierInfo } from '@src/types';
import React from 'react';

interface SupplierProductViewProps {
  data: Partial<Pick<SupplierInfo, 'productDivision' | 'productType'>> & {
    productCategory?: Array<{ id: string; label: string }>;
    productDescription?: string;
    brandNames?: string;
  };
}

const SupplierProductView: React.FC<SupplierProductViewProps> = ({ data }) => {
  return (
    <>
      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label="Product Category"
          value={data.productCategory?.map((cat) => cat.label).join(', ')}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label="Brand Names" value={data.brandNames} />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <DataPair label="Product Description" value={data.productDescription} />
      </Grid>
    </>
  );
};

export default SupplierProductView;
