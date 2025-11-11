import { Box } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ButtonAtom } from '@src/components/atoms';
import {
  ControlledTextField,
  ControlledAutocompleteMultiField,
  ModalDialog,
} from '@src/components/molecules';
import { RETAILER_TYPE } from '@src/constants';
import { useUpdateRoleMutation } from '@src/hooks';
import { RolePermissionItem, RoleFormData } from '@src/types';

export interface EditRoleModalProps {
  data: RolePermissionItem | null;
  open: boolean;
  onClose: () => void;
}

const EditRoleModal: React.FC<EditRoleModalProps> = ({
  data,
  open,
  onClose,
}) => {
  const { t } = useTranslation('role');
  const updateRoleMutation = useUpdateRoleMutation().mutateAsync;
  const formMethods = useForm<RoleFormData>({
    defaultValues: {
      retailerType: RETAILER_TYPE.filter((el) =>
        data?.retailerType.includes(el.id as string),
      ),
      name: data?.name,
      description: data?.description,
    },
    mode: 'onSubmit',
  });
  const { handleSubmit, control } = formMethods;

  const handleSubmitEditRole = async (form: RoleFormData) => {
    if (data && form) {
      await updateRoleMutation({
        id: data.id,
        data: {
          ...form,
          retailerType: form.retailerType.map((el) => el.id as string),
        },
      });
      onClose();
    }
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
        {t('common:update')}
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
      title={t('editRole')}
      footer={footer}
      showFooter
      fullWidth
      maxWidth="md"
    >
      <FormProvider {...formMethods}>
        <form
          id="edit-role-form"
          onSubmit={handleSubmit(handleSubmitEditRole)}
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

export default EditRoleModal;
