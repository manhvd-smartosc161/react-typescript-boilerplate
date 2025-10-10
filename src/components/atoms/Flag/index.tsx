import { FC } from 'react';
import { StyledFlag } from './index.styled';

interface FlagProps {
  country: 'th' | 'en';
  size?: number;
}

const Flag: FC<FlagProps> = ({ country, size = 24 }) => {
  const flagEmoji = country === 'th' ? '🇹🇭' : '🇬🇧';

  return <StyledFlag size={size}>{flagEmoji}</StyledFlag>;
};

export default Flag;
