export interface PermissionItem {
  key: string;
  label: string;
  permissions: {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
  };
}
