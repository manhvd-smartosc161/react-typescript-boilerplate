import * as React from 'react';
import {
  Button,
  Menu,
  MenuItem,
  ListItemText,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useTranslation } from 'react-i18next';

export type BulkActionItem = {
  key: string;
  label: string;
  onClick: () => Promise<void> | void;
  disabled?: boolean;
  disabledReason?: string;
};

export type BulkActionMenuProps = {
  actions: BulkActionItem[];
  disabled?: boolean;
};

const BulkActionMenu: React.FC<BulkActionMenuProps> = ({
  actions,
  disabled = false,
}) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [runningKey, setRunningKey] = React.useState<string | null>(null);

  const open = Boolean(anchorEl);

  const openMenu = (e: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  const runAction = async (item: BulkActionItem) => {
    try {
      setRunningKey(item.key);
      await item.onClick();
    } finally {
      setRunningKey(null);
    }
  };

  const handleItemClick = (item: BulkActionItem) => {
    closeMenu();
    void runAction(item);
  };

  return (
    <>
      <Tooltip
        title={disabled ? 'Select at least 1 item' : ''}
        disableHoverListener={!disabled}
      >
        <span>
          <Button
            variant="outlined"
            size="large"
            color="secondary"
            onClick={openMenu}
            disabled={disabled}
            endIcon={<ArrowDropDownIcon />}
          >
            {t('common:action')}
          </Button>
        </span>
      </Tooltip>

      <Menu anchorEl={anchorEl} open={open} onClose={closeMenu}>
        {actions.map((a) => {
          const content = (
            <MenuItem
              key={a.key}
              onClick={() => handleItemClick(a)}
              disabled={!!a.disabled || runningKey !== null}
            >
              <ListItemText primary={a.label} />
              {runningKey === a.key && <CircularProgress size={16} />}
            </MenuItem>
          );
          return a.disabled && a.disabledReason ? (
            <Tooltip key={a.key} title={a.disabledReason}>
              <span>{content}</span>
            </Tooltip>
          ) : (
            content
          );
        })}
      </Menu>
    </>
  );
};

export default BulkActionMenu;
