import { Grid } from '@mui/material';
import { ControlledTextField } from '@src/components/molecules';
import { Control } from 'react-hook-form';

interface CompanyRepresentativeProps {
  control: Control<any>;
  sectionPrefix: string;
}

const CompanyRepresentativeFields: React.FC<CompanyRepresentativeProps> = ({
  control,
  sectionPrefix,
}) => {
  return (
    <>
      <Grid size={{ xs: 12, md: 4 }}>
        <ControlledTextField
          variant="outlined"
          required
          name={`${sectionPrefix}.contactPersonName`}
          control={control}
          label="Contact Person Name"
          placeholder="Enter contact person name"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <ControlledTextField
          variant="outlined"
          required
          name={`${sectionPrefix}.contactPersonEmail`}
          control={control}
          label="Contact Person Email"
          placeholder="contact@example.com"
          type="email"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <ControlledTextField
          variant="outlined"
          required
          name={`${sectionPrefix}.contactPersonPhone`}
          control={control}
          label="Contact Person Phone"
          placeholder="Enter phone number"
        />
      </Grid>
    </>
  );
};

export default CompanyRepresentativeFields;
