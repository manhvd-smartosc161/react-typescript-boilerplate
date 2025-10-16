import { Grid } from '@mui/material';
import { InputLabelAtom } from '@src/components/atoms';
import { ControlledDropdownField } from '@src/components/molecules';
import { Control } from 'react-hook-form';
import MultiUploader from '../../MultiUploader';

interface CompanyDocumentFieldsProps {
  control: Control<any>;
  sectionPrefix: string;
}
const CompanyDocumentFields: React.FC<CompanyDocumentFieldsProps> = ({
  control,
  sectionPrefix,
}) => {
  return (
    <>
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledDropdownField
          variant="outlined"
          required
          name={`${sectionPrefix}.documentQuality`}
          control={control}
          label="Document Quality"
          placeholder="Select document quality"
          options={[
            { label: 'Yes', value: 'Y' },
            { label: 'No', value: 'N' },
          ]}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledDropdownField
          variant="outlined"
          required
          name={`${sectionPrefix}.juristicType`}
          control={control}
          label="Juristic Type"
          placeholder="Select juristic type"
          options={[
            { label: 'Individual', value: 'INDIVIDUAL' },
            { label: 'Company', value: 'COMPANY' },
            { label: 'Partnership', value: 'PARTNERSHIP' },
          ]}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <InputLabelAtom color="default">
          Company Registration Documents
        </InputLabelAtom>

        <MultiUploader
          name={`${sectionPrefix}.companyRegistrationDocuments`}
          label="Company Registration Documents"
        />
      </Grid>
    </>
  );
};

export default CompanyDocumentFields;
