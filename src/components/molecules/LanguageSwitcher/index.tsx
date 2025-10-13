import { FC, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { LANGUAGE_CODES } from '@src/constants';
import { useLocalStorage } from '@src/hooks/common/useLocalStorage';
import { useUpdateProfileMutation } from '@src/hooks/auth/useUpdateProfileMutation';
import { currentUserState } from '@src/stores';
import { Box, Typography } from '@mui/material';
import {
  StyledLanguageSwitcherWrapper,
  StyledLanguageToggle,
  StyledLanguageOption,
} from './index.styled';

const LanguageSwitcher: FC = () => {
  const { i18n } = useTranslation();
  const currentUser = useRecoilValue(currentUserState);
  const updateProfileMutation = useUpdateProfileMutation();
  const [lang, setLang] = useLocalStorage<string>('i18nextLng', i18n.language);

  // Initialize language from user profile on mount
  useEffect(() => {
    if (currentUser?.language) {
      const userLanguage = currentUser.language;
      void i18n.changeLanguage(userLanguage);
      setLang(userLanguage);
    }
  }, [currentUser?.language, i18n]);

  const currentLang = useMemo(() => {
    if (lang?.startsWith(LANGUAGE_CODES.TH)) return LANGUAGE_CODES.TH;
    return LANGUAGE_CODES.EN;
  }, [lang]);

  const handleChange = (nextLang: string) => {
    // Update i18n language immediately
    void i18n.changeLanguage(nextLang);
    setLang(nextLang);

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

  return (
    <StyledLanguageSwitcherWrapper>
      <StyledLanguageToggle>
        <StyledLanguageOption
          onClick={() => handleChange(LANGUAGE_CODES.TH)}
          isActive={currentLang === LANGUAGE_CODES.TH}
        >
          <Typography variant="body2" fontWeight={600}>
            {LANGUAGE_CODES.TH.toUpperCase()}
          </Typography>
        </StyledLanguageOption>

        <Box sx={{ color: '#666', mx: 0.25 }}>
          <Typography variant="body2">|</Typography>
        </Box>

        <StyledLanguageOption
          onClick={() => handleChange(LANGUAGE_CODES.EN)}
          isActive={currentLang === LANGUAGE_CODES.EN}
        >
          <Typography variant="body2" fontWeight={600}>
            {LANGUAGE_CODES.EN.toUpperCase()}
          </Typography>
        </StyledLanguageOption>
      </StyledLanguageToggle>
    </StyledLanguageSwitcherWrapper>
  );
};

export default LanguageSwitcher;
