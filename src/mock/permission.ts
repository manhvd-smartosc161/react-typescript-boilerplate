import { PermissionItem } from '@src/types/permission';

export const permissionList: PermissionItem[] = [
  {
    key: 'supplier_registration_leads',
    label: 'Supplier Registration Leads',
    permissions: { create: true, read: true, update: true, delete: true },
  },
  {
    key: 'supplier_approval',
    label: 'Supplier Approval',
    permissions: { create: true, read: true, update: true, delete: true },
  },
  {
    key: 'supplier_contract',
    label: 'Supplier Contract',
    permissions: { create: true, read: true, update: false, delete: false },
  },
  {
    key: 'item_creation',
    label: 'Item Creation',
    permissions: { create: false, read: true, update: false, delete: false },
  },
];
