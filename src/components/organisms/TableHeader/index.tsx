import { IconAtom } from '@src/components/atoms';
import { IconName } from '@src/components/atoms/Icon';
import { StyledTableHeader } from './index.styled';
import { Typography } from '@mui/material';

interface TableHeaderProps {
  tableIcon?: IconName;
  tableTitle: string;
}

const TableHeader: React.FC<TableHeaderProps> = ({ tableIcon, tableTitle }) => {
  return (
    <StyledTableHeader>
      {tableIcon && <IconAtom name={tableIcon} size={20} />}
      <Typography variant="subtitle1" fontWeight={400}>
        {tableTitle}
      </Typography>
    </StyledTableHeader>
  );
};
export default TableHeader;
