import { FC } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { StyledSearchBar } from './index.styled';

export interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  onChange?: (value: string) => void;
  value?: string;
  size?: 'small' | 'middle' | 'large';
}

const SearchBar: FC<SearchBarProps> = ({
  placeholder = 'Search...',
  onSearch,
  onChange,
  value,
  size = 'middle',
}) => {
  return (
    <StyledSearchBar>
      <Input.Search
        placeholder={placeholder}
        onSearch={onSearch}
        onChange={(e) => onChange?.(e.target.value)}
        value={value}
        size={size}
        prefix={<SearchOutlined />}
        enterButton
      />
    </StyledSearchBar>
  );
};

export default SearchBar;
