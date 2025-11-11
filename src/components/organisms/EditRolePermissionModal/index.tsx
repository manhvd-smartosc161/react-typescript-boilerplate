import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActionItem, PermissionItem } from '@src/types/permission';
import { ButtonAtom, CheckBoxAtom } from '@src/components/atoms';
import TableOrganism from '../Table';
import { ModalDialog } from '@src/components/molecules';
import { useGetAllPermissions, useUpdateRoleMutation } from '@src/hooks';

interface EditRolePermissionModalProps {
  roleId: string;
  open: boolean;
  activePermission: string[];
  onClose: () => void;
}

const EditRolePermissionModal: FC<EditRolePermissionModalProps> = ({
  roleId,
  open,
  activePermission,
  onClose,
}) => {
  const { t } = useTranslation('role');
  const { data: permissions } = useGetAllPermissions();
  const [accessList, setAccessList] = useState<string[]>(activePermission);
  const updateRoleMutation = useUpdateRoleMutation().mutateAsync;
  const handleChangeAccess = (id: string, checked: boolean) => {
    if (checked && !accessList.includes(id)) {
      setAccessList([...accessList, id]);
    } else {
      setAccessList(accessList.filter((el) => el !== id));
    }
  };

  const handleSubmit = async () => {
    await updateRoleMutation({
      id: roleId,
      data: {
        permissionIds: accessList,
      },
    });
    onClose();
  };

  const renderCheckBoxAction = (type: string, actions: ActionItem[]) => {
    const action = actions.filter((el) => el.action === type)?.[0];
    return (
      <CheckBoxAtom
        checked={action && accessList.includes(action.id)}
        disabled={!action}
        onChange={(e) => handleChangeAccess(action.id, e.target.checked)}
      />
    );
  };

  const columns = [
    {
      key: 'name' as keyof PermissionItem,
      label: t('permissionDetails'),
    },
    {
      key: 'actions' as keyof PermissionItem,
      label: t('create'),
      render: (actions: ActionItem[]) => renderCheckBoxAction('post', actions),
    },
    {
      key: 'actions' as keyof PermissionItem,
      label: t('read'),
      render: (actions: ActionItem[]) => renderCheckBoxAction('get', actions),
    },
    {
      key: 'actions' as keyof PermissionItem,
      label: t('update'),
      render: (actions: ActionItem[]) => renderCheckBoxAction('put', actions),
    },
    {
      key: 'actions' as keyof PermissionItem,
      label: t('delete'),
      render: (actions: ActionItem[]) =>
        renderCheckBoxAction('delete', actions),
    },
  ];

  const footer = (
    <>
      <ButtonAtom
        variant="primary"
        color="primary"
        sx={{ textTransform: 'none' }}
        type="submit"
        form="edit-role-form"
        onClick={() => handleSubmit()}
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
      title={t('editRolePermission')}
      footer={footer}
      showFooter
      fullWidth
      maxWidth="md"
    >
      <TableOrganism<PermissionItem>
        columns={columns}
        data={permissions || []}
        style={{ border: 'none' }}
      />
    </ModalDialog>
  );
};

export default EditRolePermissionModal;
