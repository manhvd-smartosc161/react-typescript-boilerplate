import { Grid, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('supplier');

  const renderDocumentLink = (url?: string) => {
    if (!url) return undefined;
    return (
      <Link href={url} target="_blank" rel="noopener noreferrer">
        {t('form.view.viewDocument')}
      </Link>
    );
  };

  return (
    <>
      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label={t('form.view.companyRegistration')}
          value={renderDocumentLink(data.companyRegistration)}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label={t('form.view.taxRegistration')}
          value={renderDocumentLink(data.taxRegistration)}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label={t('form.view.vatRegistration')}
          value={renderDocumentLink(data.vatRegistration)}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label={t('form.view.bankStatement')}
          value={renderDocumentLink(data.bankStatement)}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label={t('form.view.productCatalog')}
          value={renderDocumentLink(data.productCatalog)}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label={t('form.view.certification')}
          value={renderDocumentLink(data.certification)}
        />
      </Grid>
    </>
  );
};

export default SupplierDocumentView;
