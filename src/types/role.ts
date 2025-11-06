import { AutocompleteOption } from '@src/components/atoms/Autocomplete';
import { EStatusUpdate } from '@src/constants';

export interface RolePermissionItem {
  id: string;
  name: string;
  displayName: string;
  retailerType: string[];
  description: string;
  type: string;
  permissionIds: string[];
}

export interface RoleDetailData {
  retailerType: string[];
  displayName: string;
  description: string;
  name?: string;
}

export interface RoleFormData {
  retailerType: AutocompleteOption[];
  displayName: string;
  description: string;
}

export interface BulkUpdateRole {
  roleIds: string[];
  status: EStatusUpdate;
}
