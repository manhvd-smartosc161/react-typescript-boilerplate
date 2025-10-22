import { Grid } from '@mui/material';
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
  return (
    <>
      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label="Company Name (Thai)" value={data.nameTh} />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label="Company Name (English)" value={data.nameEn} />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label="Business Relationship"
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
          label="Supplier Type"
          value={
            data.supType
              ? SupplierTypeLabels[data.supType as ESupplierType]
              : undefined
          }
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label="Supplier Trading Type"
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
          label="SME Flag"
          value={
            data.smeFlag
              ? SmeFlagLabels[data.smeFlag as EBooleanFlag]
              : undefined
          }
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label="Number of Employees" value={data.numberOfEmp} />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label="Business Units"
          value={
            Array.isArray(data.businessUnits)
              ? data.businessUnits.join(', ')
              : data.businessUnits
          }
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label="Communication Language"
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
          label="Incorporation Country"
          value={data.incorporationCountry}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label="Business Country" value={data.businessCountry} />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label="Connection Type"
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
