import { Box } from '@mui/material';
import { ButtonAtom, InputLabelAtom, SwitchAtom } from '@src/components/atoms';
import {
  ControlledCheckBoxField,
  ControlledDropdownField,
  ControlledTextField,
} from '@src/components/molecules';
import { ModalDialog } from '@src/components/molecules';
import { UpdateUserRoleData, UserRolesItem } from '@src/types';
import { Controller, FormProvider, useForm } from 'react-hook-form';
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
  const formMethods = useForm<UpdateUserRoleData>({
    defaultValues: {
      status: data?.status,
      role: data?.role,
      displayName: data?.displayName,
      sendEmail: false,
    },
    mode: 'onSubmit',
  });
  const { handleSubmit, control } = formMethods;
  const handleSubmitEditUser = (form: UpdateUserRoleData) => {
    alert(JSON.stringify(form));
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
        Update
      </ButtonAtom>
      <ButtonAtom
        variant="secondary"
        color="inherit"
        onClick={onClose}
        sx={{ textTransform: 'none' }}
      >
        Cancel
      </ButtonAtom>
    </>
  );
  return (
    <ModalDialog
      open={open}
      onClose={onClose}
      title="Edit User"
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
              <InputLabelAtom>Status</InputLabelAtom>
              <Controller
                name="status"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <SwitchAtom
                    checked={Boolean(value)}
                    onChange={(e) => onChange(e.target.checked)}
                  />
                )}
              />
            </Box>
            <ControlledDropdownField
              control={control}
              name="role"
              label="Role"
              size="medium"
              options={[
                {
                  value: 'QA',
                  label: 'QA',
                },
                {
                  value: 'SUPPERADMIN',
                  label: 'SUPPERADMIN',
                },
                {
                  value: 'ADMIN',
                  label: 'ADMIN',
                },
              ]}
            />
            <ControlledTextField
              control={control}
              name="displayName"
              label="Display Name"
            />
            <ControlledCheckBoxField
              control={control}
              name="sendEmail"
              label="Send email notification"
              single
            />
          </Box>
        </form>
      </FormProvider>
    </ModalDialog>
  );
};

export default EditUserModal;
