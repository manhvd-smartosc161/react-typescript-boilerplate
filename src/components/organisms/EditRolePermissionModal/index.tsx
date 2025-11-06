import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PermissionItem } from '@src/types/permission';
import { ButtonAtom, CheckBoxAtom } from '@src/components/atoms';
import { permissionList } from '@src/mock/permission';
import TableOrganism from '../Table';
import { ModalDialog } from '@src/components/molecules';

interface EditRolePermissionModalProps {
  open: boolean;
  onClose: () => void;
}

const EditRolePermissionModal: FC<EditRolePermissionModalProps> = ({
  open,
  onClose,
}) => {
  const { t } = useTranslation('role');
  const [data, setData] = useState(permissionList);

  const handleChangeAccess = (key: string, updatedPermission: any) => {
    let updated = data.map((item) =>
      item.key === key
        ? {
            ...item,
            permissions: { ...item.permissions, ...updatedPermission },
          }
        : item,
    );
    setData(updated);
  };

  const columns = [
    {
      key: 'label' as keyof PermissionItem,
      label: t('permissionDetails'),
    },
    {
      key: 'permissions' as keyof PermissionItem,
      label: t('create'),
      render: (value: any, record: PermissionItem) => (
        <CheckBoxAtom
          checked={value.create}
          onChange={(e) =>
            handleChangeAccess(record.key, { create: e.target.checked })
          }
        />
      ),
    },
    {
      key: 'permissions' as keyof PermissionItem,
      label: t('read'),
      render: (value: any, record: PermissionItem) => (
        <CheckBoxAtom
          checked={value.read}
          onChange={(e) =>
            handleChangeAccess(record.key, { read: e.target.checked })
          }
        />
      ),
    },
    {
      key: 'permissions' as keyof PermissionItem,
      label: t('update'),
      render: (value: any, record: PermissionItem) => (
        <CheckBoxAtom
          checked={value.update}
          onChange={(e) =>
            handleChangeAccess(record.key, { update: e.target.checked })
          }
        />
      ),
    },
    {
      key: 'permissions' as keyof PermissionItem,
      label: t('delete'),
      render: (value: any, record: PermissionItem) => (
        <CheckBoxAtom
          checked={value.delete}
          onChange={(e) =>
            handleChangeAccess(record.key, { delete: e.target.checked })
          }
        />
      ),
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
        data={data}
        style={{ border: 'none' }}
      />
    </ModalDialog>
  );
};

export default EditRolePermissionModal;
