import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DataPair } from '@src/components/molecules';
import {
  BusinessRelationshipLabels,
  SupplierTypeLabels,
  SupplierTradingTypeLabels,
  SmeFlagLabels,
  CommunicationLanguageLabels,
  ConnectionTypeLabels,
  EBusinessRelationship,
  ESupplierType,
  ESupplierTradingType,
  EBooleanFlag,
  ECommunicationLanguage,
  EConnectionType,
} from '@src/constants';
import { SupplierInfo } from '@src/types';
import React from 'react';

interface SupplierGeneralViewProps {
  data: Partial<SupplierInfo>;
}

const SupplierGeneralView: React.FC<SupplierGeneralViewProps> = ({ data }) => {
  const { t } = useTranslation('supplier');

  return (
    <>
      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label={t('form.fields.companyNameThai')}
          value={data.nameTh}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label={t('form.fields.companyNameEnglish')}
          value={data.nameEn}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label={t('form.fields.businessRelationship')}
          value={
            data.businessRelationship
              ? BusinessRelationshipLabels[
                  data.businessRelationship as EBusinessRelationship
                ]
              : undefined
          }
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label={t('form.fields.supplierType')}
          value={
            data.supType
              ? SupplierTypeLabels[data.supType as ESupplierType]
              : undefined
          }
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label={t('form.fields.supplierTradingType')}
          value={
            data.supTradingType
              ? SupplierTradingTypeLabels[
                  data.supTradingType as ESupplierTradingType
                ]
              : undefined
          }
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label={t('form.fields.smeFlag')}
          value={
            data.smeFlag
              ? SmeFlagLabels[data.smeFlag as EBooleanFlag]
              : undefined
          }
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label={t('form.fields.numberOfEmployees')}
          value={data.numberOfEmp}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label={t('form.fields.businessUnits')}
          value={
            Array.isArray(data.businessUnits)
              ? data.businessUnits.join(', ')
              : data.businessUnits
          }
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label={t('form.fields.communicationLanguage')}
          value={
            data.commuLanguage
              ? CommunicationLanguageLabels[
                  data.commuLanguage as ECommunicationLanguage
                ]
              : undefined
          }
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label={t('form.fields.incorporationCountry')}
          value={data.incorporationCountry}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label={t('form.fields.businessCountry')}
          value={data.businessCountry}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label={t('form.fields.connectionType')}
          value={
            data.connectionType
              ? ConnectionTypeLabels[data.connectionType as EConnectionType]
              : undefined
          }
        />
      </Grid>
    </>
  );
};

export default SupplierGeneralView;
