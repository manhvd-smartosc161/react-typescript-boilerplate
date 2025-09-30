// Define menu item type for MUI
export interface MenuItem {
  key?: string;
  icon?: React.ReactNode;
  label?: string;
  type?: string;
  children?: MenuItem[];
}
