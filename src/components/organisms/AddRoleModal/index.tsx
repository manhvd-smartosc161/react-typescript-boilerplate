import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { ButtonAtom } from '@src/components/atoms';
import {
  ControlledTextField,
  ModalDialog,
  ControlledAutocompleteMultiField,
} from '@src/components/molecules';
import { RETAILER_TYPE } from '@src/constants';
import { RoleDetailData, RoleFormData } from '@src/types';

export interface AddRoleModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: RoleDetailData) => void;
}

const AddRoleModal: React.FC<AddRoleModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const { t } = useTranslation('role');
  const formMethods = useForm<RoleFormData>({
    defaultValues: {
      retailerType: [],
      name: '',
      description: '',
    },
    mode: 'onSubmit',
  });
  const { handleSubmit, control } = formMethods;

  const handleSubmitNewRole = async (form: RoleFormData) => {
    const data = {
      name: form.name,
      description: form.description,
      retailerType: (form.retailerType as unknown as (string | number)[]).map(
        (id) => String(id),
      ),
    };
    onSubmit(data);
  };

  const footer = (
    <>
      <ButtonAtom
        variant="primary"
        color="primary"
        sx={{ textTransform: 'none' }}
        type="submit"
        form="edit-role-form"
      >
        {t('common:add')}
      </ButtonAtom>
      <ButtonAtom
        variant="secondary"
        color="inherit"
        onClick={onClose}
        sx={{ textTransform: 'none' }}
      >
        {t('common:cancel')}
      </ButtonAtom>
    </>
  );

  return (
    <ModalDialog
      open={open}
      onClose={onClose}
      title={t('addNewRole')}
      footer={footer}
      showFooter
      fullWidth
      maxWidth="md"
    >
      <FormProvider {...formMethods}>
        <form
          id="edit-role-form"
          onSubmit={handleSubmit(handleSubmitNewRole)}
          noValidate
        >
          <Box display="flex" flexDirection="column" gap={3}>
            <ControlledAutocompleteMultiField
              control={control}
              name="retailerType"
              label={t('retailerName')}
              size="medium"
              options={RETAILER_TYPE}
              placeholder={t('select')}
              required
            />
            <ControlledTextField
              control={control}
              name="name"
              label={t('roleName')}
              placeholder="John Doe"
              required
            />
            <ControlledTextField
              control={control}
              name="description"
              label={t('description')}
              placeholder={t('roleDescription')}
            />
          </Box>
        </form>
      </FormProvider>
    </ModalDialog>
  );
};

export default AddRoleModal;
