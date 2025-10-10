import { FC, useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { LANGUAGE_CODES } from '@src/constants';
import { useLocalStorage } from '@src/hooks/common/useLocalStorage';
import { useUpdateProfileMutation } from '@src/hooks/auth/useUpdateProfileMutation';
import { currentUserState } from '@src/stores';
import { Stack, Typography } from '@mui/material';
import { FlagAtom } from '@src/components/atoms';
import LanguageIcon from '@mui/icons-material/Language';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  StyledLanguageSwitcherWrapper,
  StyledLanguageButton,
  StyledLanguageMenu,
  StyledLanguageMenuItem,
} from './index.styled';

const LanguageSwitcher: FC = () => {
  const { i18n } = useTranslation();
  const currentUser = useRecoilValue(currentUserState);
  const updateProfileMutation = useUpdateProfileMutation();
  const [lang, setLang] = useLocalStorage<string>('i18nextLng', i18n.language);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Initialize language from user profile on mount
  useEffect(() => {
    if (currentUser?.language) {
      const userLanguage = currentUser.language;
      void i18n.changeLanguage(userLanguage);
      setLang(userLanguage);
    }
  }, [currentUser?.language, i18n, setLang]);

  const currentLang = useMemo(() => {
    if (lang?.startsWith(LANGUAGE_CODES.TH)) return LANGUAGE_CODES.TH;
    return LANGUAGE_CODES.EN;
  }, [lang]);

  const handleChange = (nextLang: string) => {
    // Update i18n language immediately
    void i18n.changeLanguage(nextLang);
    setLang(nextLang);
    setAnchorEl(null);

    // Update user profile with new language in background
    if (currentUser) {
      updateProfileMutation.mutate({
        name: currentUser.name,
        surname: currentUser.surname,
        language: nextLang,
        avatar: null, // Keep existing avatar
      });
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const languages = [
    {
      code: LANGUAGE_CODES.EN,
      label: 'English',
    },
    {
      code: LANGUAGE_CODES.TH,
      label: 'ไทย',
    },
  ];

  const currentLanguage = languages.find((l) => l.code === currentLang);

  return (
    <StyledLanguageSwitcherWrapper>
      <StyledLanguageButton
        onClick={handleClick}
        variant="text"
        startIcon={
          currentLanguage ? (
            <Stack direction="row" spacing={0.5} alignItems="center">
              <FlagAtom
                country={currentLanguage.code as 'en' | 'th'}
                size={20}
              />
              <Typography variant="body2" fontSize="12px" fontWeight="600">
                {currentLanguage.code.toUpperCase()}
              </Typography>
            </Stack>
          ) : (
            <LanguageIcon />
          )
        }
        endIcon={<KeyboardArrowDownIcon sx={{ fontSize: 16, ml: -0.5 }} />}
      />
      <StyledLanguageMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {languages.map((language) => (
          <StyledLanguageMenuItem
            key={language.code}
            onClick={() => handleChange(language.code)}
            selected={currentLang === language.code}
            isPending={false}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <FlagAtom country={language.code as 'en' | 'th'} size={20} />
              <Typography variant="body2">{language.label}</Typography>
            </Stack>
          </StyledLanguageMenuItem>
        ))}
      </StyledLanguageMenu>
    </StyledLanguageSwitcherWrapper>
  );
};

export default LanguageSwitcher;
