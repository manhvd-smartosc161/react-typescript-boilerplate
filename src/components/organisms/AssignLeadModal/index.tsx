import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box, FormControl, FormHelperText } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { ButtonAtom } from '@src/components/atoms';
import { AutocompleteOption } from '@src/components/atoms/Autocomplete';
import {
  ControlledAutocompleteField,
  ModalDialog,
} from '@src/components/molecules';
import { SupplierInfoItem } from '@src/types';
import { leadAsignmentSchema } from '@src/schemas';

interface AssignLeadModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: SupplierInfoItem) => void;
  data: SupplierInfoItem | null;
}

const LEAD_OWNER: AutocompleteOption[] = [
  {
    id: 'LEAD1',
    label: 'Buyer',
  },
  {
    id: 'LEAD2',
    label: 'John',
  },
  {
    id: 'LEAD3',
    label: 'Taylor',
  },
  {
    id: 'LEAD4',
    label: 'Edward',
  },
];

const AssignLeadModal: React.FC<AssignLeadModalProps> = ({
  data,
  open,
  onClose,
  onSubmit,
}) => {
  const { t } = useTranslation('lead');
  const formMethods = useForm({
    resolver: yupResolver(leadAsignmentSchema),
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
    defaultValues: {
      leadOwnerMakro: '',
      leadOwnerLotus: '',
    },
  });
  const { handleSubmit, control, formState } = formMethods;

  const handleSubmitAssign = () => {
    if (data) onSubmit(data);
    onClose();
  };

  const footer = (
    <>
      <ButtonAtom
        variant="primary"
        color="primary"
        sx={{ textTransform: 'none' }}
        type="submit"
        form="assign-lead-form"
      >
        {t('save')}
      </ButtonAtom>
      <ButtonAtom
        variant="secondary"
        color="inherit"
        onClick={onClose}
        sx={{ textTransform: 'none' }}
      >
        {t('cancel')}
      </ButtonAtom>
    </>
  );

  return (
    <ModalDialog
      open={open}
      onClose={onClose}
      title={t('leadAssignment')}
      footer={footer}
      showFooter
      fullWidth
      maxWidth="md"
    >
      <FormProvider {...formMethods}>
        <form
          id="assign-lead-form"
          onSubmit={handleSubmit(handleSubmitAssign)}
          noValidate
        >
          <Box display="flex" flexDirection="column" gap={3}>
            <ControlledAutocompleteField
              control={control}
              name="leadOwnerMakro"
              label={t('leadOwnerMakro')}
              size="medium"
              options={LEAD_OWNER}
              placeholder={t('select')}
            />
            <ControlledAutocompleteField
              control={control}
              name="leadOwnerLotus"
              label={t('leadOwnerLotus')}
              size="medium"
              options={LEAD_OWNER}
              placeholder={t('select')}
            />
            <FormControl error={!!formState?.errors}>
              {formState?.errors && (
                <FormHelperText>
                  {(formState?.errors as any)?.atLeastOneOwner?.message}
                </FormHelperText>
              )}
            </FormControl>
          </Box>
        </form>
      </FormProvider>
    </ModalDialog>
  );
};
export default AssignLeadModal;
