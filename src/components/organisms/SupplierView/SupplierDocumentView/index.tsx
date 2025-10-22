import { Grid, Link } from '@mui/material';
import { DataPair } from '@src/components/molecules';
import React from 'react';

interface SupplierDocumentViewProps {
  data: {
    companyRegistration?: string;
    taxRegistration?: string;
    vatRegistration?: string;
    bankStatement?: string;
    productCatalog?: string;
    certification?: string;
  };
}

const SupplierDocumentView: React.FC<SupplierDocumentViewProps> = ({
  data,
}) => {
  const renderDocumentLink = (url?: string) => {
    if (!url) return undefined;
    return (
      <Link href={url} target="_blank" rel="noopener noreferrer">
        View Document
      </Link>
    );
  };

  return (
    <>
      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label="Company Registration"
          value={renderDocumentLink(data.companyRegistration)}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label="Tax Registration"
          value={renderDocumentLink(data.taxRegistration)}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label="VAT Registration"
          value={renderDocumentLink(data.vatRegistration)}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label="Bank Statement"
          value={renderDocumentLink(data.bankStatement)}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label="Product Catalog"
          value={renderDocumentLink(data.productCatalog)}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label="Certification"
          value={renderDocumentLink(data.certification)}
        />
      </Grid>
    </>
  );
};

export default SupplierDocumentView;
