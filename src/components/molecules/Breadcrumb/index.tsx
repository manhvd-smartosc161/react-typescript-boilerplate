import { FC } from 'react';
import { Breadcrumbs, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { StyledBreadcrumbLink } from './index.styled';

export interface BreadcrumbItem {
  title: string | React.ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items?: Array<{
    title: string | React.ReactNode;
    href?: string;
    onClick?: () => void;
  }>;
  separator?: string | React.ReactNode;
}

const BreadcrumbMolecule: FC<BreadcrumbProps> = ({ items = [], separator }) => {
  const separatorIcon = separator || <NavigateNextIcon fontSize="small" />;

  return (
    <Breadcrumbs separator={separatorIcon} aria-label="breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        if (isLast || !item.onClick) {
          return (
            <Typography key={index} color="text.primary">
              {item.title}
            </Typography>
          );
        }

        return (
          <StyledBreadcrumbLink
            key={index}
            component="button"
            variant="body2"
            onClick={item.onClick}
          >
            {item.title}
          </StyledBreadcrumbLink>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbMolecule;
