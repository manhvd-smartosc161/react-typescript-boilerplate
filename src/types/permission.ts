export interface ActionItem {
  id: string;
  action: string;
  description: string;
}
export interface PermissionItem {
  name: string;
  resource: string;
  actions: ActionItem[];
}
