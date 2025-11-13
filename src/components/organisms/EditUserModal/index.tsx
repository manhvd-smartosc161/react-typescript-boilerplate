import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { ButtonAtom, InputLabelAtom, SwitchAtom } from '@src/components/atoms';
import {
  ControlledCheckBoxField,
  ControlledDropdownField,
  ControlledTextField,
} from '@src/components/molecules';
import { ModalDialog } from '@src/components/molecules';
import { EUserStatus } from '@src/constants/user';
import { useGetAllRoles } from '@src/hooks';
import { useUpdateUserMutation } from '@src/hooks/user/useUpdateUserMutation';
import { userSchema } from '@src/schemas';
import { UserRoleFormData, UserRolesItem } from '@src/types';
export interface EditUserModalProps {
  data: UserRolesItem | null;
  open: boolean;
  onClose: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  data,
  open,
  onClose,
}) => {
  const { t } = useTranslation('user');
  const { data: allRoles } = useGetAllRoles();
  const updateUserMutation = useUpdateUserMutation().mutateAsync;
  const formMethods = useForm<UserRoleFormData>({
    resolver: yupResolver(userSchema),
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
    defaultValues: {
      id: data?.id,
      status: data?.status,
      roleId: data?.role?.id,
      name: data?.name,
      emailNotifications: data?.emailNotifications,
    },
  });
  const { handleSubmit, control } = formMethods;

  const handleSubmitEditUser = (form: UserRoleFormData) => {
    updateUserMutation(form);
    onClose();
  };

  const footer = (
    <>
      <ButtonAtom
        variant="primary"
        color="primary"
        sx={{ textTransform: 'none' }}
        type="submit"
        form="edit-user-form"
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
      title={t('editUser')}
      footer={footer}
      showFooter
      fullWidth
      maxWidth="md"
    >
      <FormProvider {...formMethods}>
        <form
          id="edit-user-form"
          onSubmit={handleSubmit(handleSubmitEditUser)}
          noValidate
        >
          <Box display="flex" flexDirection="column" gap={3}>
            <Box display="flex" gap={2}>
              <InputLabelAtom>{t('status')}</InputLabelAtom>
              <Controller
                name="status"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <SwitchAtom
                    checked={value === EUserStatus.ACTIVE}
                    onChange={(e) =>
                      onChange(
                        e.target.checked
                          ? EUserStatus.ACTIVE
                          : EUserStatus.INACTIVE,
                      )
                    }
                  />
                )}
              />
            </Box>
            <ControlledDropdownField
              control={control}
              name="roleId"
              label={t('role')}
              size="medium"
              options={
                allRoles?.map((el) => ({ value: el.id, label: el.name })) ?? []
              }
            />
            <ControlledTextField
              control={control}
              name="name"
              label={t('displayName')}
            />
            <ControlledCheckBoxField
              control={control}
              name="emailNotifications"
              label={t('sendEmailNotification')}
              single
            />
          </Box>
        </form>
      </FormProvider>
    </ModalDialog>
  );
};

export default EditUserModal;
