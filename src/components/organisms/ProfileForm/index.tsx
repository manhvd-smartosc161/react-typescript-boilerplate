import { UseFormReturn } from 'react-hook-form';
import { Box } from '@mui/material';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { CardAtom, InputLabelAtom, TextAtom } from '@src/components/atoms';
import {
  ControlledTextField,
  ControlledDropdownField,
  Alert,
} from '@src/components/molecules';
import { ProfileFormData } from '@src/types';
import { LANGUAGE_DISPLAY } from '@src/constants';
import {
  StyledProfileForm,
  DeleteButton,
  AvatarContainer,
  AvatarImage,
  ChangeAvatarButton,
  DefaultAvatar,
  ProfileSubtitle,
  ProfileTitle,
} from './index.styled';

export interface ProfileFormProps {
  profileForm: UseFormReturn<ProfileFormData, any, ProfileFormData>;
  avatarUrl?: string;
  banner?: {
    type: 'success' | 'error' | null;
    message: string;
  };
}

const ProfileForm = (props: ProfileFormProps) => {
  const { profileForm, avatarUrl, banner } = props;
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert(t('user:fileSizeError'));
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert(t('user:fileTypeError'));
        return;
      }
      profileForm.setValue('avatar', file, { shouldDirty: true });
    }
  };

  const avatarValue = profileForm.watch('avatar');

  const renderAvatarSection = () => {
    if (avatarValue) {
      return (
        <AvatarContainer>
          <AvatarImage
            src={URL.createObjectURL(avatarValue)}
            alt="Avatar preview"
          />
          <DeleteButton
            variant="text"
            size="small"
            onClick={() =>
              profileForm.setValue('avatar', null, {
                shouldDirty: true,
              })
            }
          >
            ×
          </DeleteButton>
        </AvatarContainer>
      );
    }

    if (avatarUrl) {
      return (
        <AvatarContainer>
          <AvatarImage src={avatarUrl} alt="Current avatar" />
        </AvatarContainer>
      );
    }

    return <DefaultAvatar />;
  };

  const getButtonText = () => {
    if (avatarValue || avatarUrl) {
      return t('user:changeAvatar');
    }
    return t('user:uploadAvatar');
  };

  return (
    <StyledProfileForm component="form" onSubmit={(e) => e.preventDefault()}>
      <CardAtom sx={{ borderRadius: 2 }}>
        <ProfileTitle>{t('user:profile')}</ProfileTitle>
        <ProfileSubtitle>{t('user:profileSubtitle')}</ProfileSubtitle>
        {banner?.type && <Alert severity={banner.type}>{banner.message}</Alert>}
        <Box sx={{ marginTop: 4 }}>
          <Box sx={{ marginTop: 2 }}>
            <ControlledTextField
              name="name"
              control={profileForm.control}
              label={t('user:name')}
              type="text"
            />
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <ControlledDropdownField
              key={`interfaceLanguage-${profileForm.watch('interfaceLanguage')}`}
              name="interfaceLanguage"
              control={profileForm.control}
              label={t('user:interfaceLanguage')}
              placeholder={t('user:selectLanguage')}
              options={[
                { value: LANGUAGE_DISPLAY.THAI, label: 'Thai' },
                { value: LANGUAGE_DISPLAY.ENGLISH, label: 'English' },
              ]}
            />
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <InputLabelAtom htmlFor={'avatar'}>
              {t('user:avatar')}
            </InputLabelAtom>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {renderAvatarSection()}
              <ChangeAvatarButton variant="ghost" onClick={handleAvatarChange}>
                <TextAtom variant="label">{getButtonText()}</TextAtom>
              </ChangeAvatarButton>
            </Box>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </Box>
        </Box>
      </CardAtom>
    </StyledProfileForm>
  );
};

export default ProfileForm;
