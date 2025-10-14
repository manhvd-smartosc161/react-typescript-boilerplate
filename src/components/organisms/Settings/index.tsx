import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCurrentUser } from '@src/hooks';
import {
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useUpdateNotificationMutation,
} from '@src/hooks/auth';
import ROUTES from '@src/routes/route';
import { LANGUAGE_CODES, LANGUAGE_DISPLAY } from '@src/constants';
import {
  ChangePasswordFormData,
  NotificationFormData,
  ProfileFormData,
} from '@src/types';
import {
  changePasswordFormSchema,
  notificationFormSchema,
  profileFormSchema,
} from '@src/schemas/settingsSchema';
import { getErrorMessage } from '@src/errors';
import ProfileForm from '../ProfileForm';
import ChangePasswordForm from '../ChangePasswordForm';
import NotificationForm from '../NotificationForm';

type BannerState = {
  type: 'success' | 'error' | null;
  message: string;
};

const SettingsOrganism = forwardRef<{
  handleSaveAll: () => void;
  isAllValid: () => boolean;
  isLoading: () => boolean;
}>((props, ref) => {
  const { t } = useTranslation();
  const {
    data: currentUser,
    isLoading: isLoadingUser,
    error: userError,
  } = useCurrentUser();
  const navigate = useNavigate();

  const [profileBanner, setProfileBanner] = useState<BannerState>({
    type: null,
    message: '',
  });
  const [passwordBanner, setPasswordBanner] = useState<BannerState>({
    type: null,
    message: '',
  });
  const [notificationBanner, setNotificationBanner] = useState<BannerState>({
    type: null,
    message: '',
  });

  // React Query mutations
  const updateProfileMutation = useUpdateProfileMutation();
  const updatePasswordMutation = useUpdatePasswordMutation();
  const updateNotificationMutation = useUpdateNotificationMutation();

  const profileForm = useForm<ProfileFormData>({
    resolver: yupResolver(profileFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      interfaceLanguage: LANGUAGE_DISPLAY.THAI,
      language: LANGUAGE_CODES.TH,
      avatar: null,
    },
  });

  useEffect(() => {
    const subscription = profileForm.watch((value, { name }) => {
      if (name === 'interfaceLanguage' && value.interfaceLanguage) {
        let languageValue: string = LANGUAGE_CODES.TH;

        if (value.interfaceLanguage === LANGUAGE_DISPLAY.THAI) {
          languageValue = LANGUAGE_CODES.TH;
        } else if (value.interfaceLanguage === LANGUAGE_DISPLAY.ENGLISH) {
          languageValue = LANGUAGE_CODES.EN;
        }

        const currentLanguage = profileForm.getValues('language');
        if (currentLanguage !== languageValue) {
          profileForm.setValue('language', languageValue, {
            shouldDirty: true,
          });
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [profileForm]);

  useEffect(() => {
    if (!currentUser && !isLoadingUser && !userError) {
      navigate(ROUTES.LOGIN);
    }
  }, [currentUser, isLoadingUser, userError, navigate]);

  const passwordForm = useForm<ChangePasswordFormData>({
    resolver: yupResolver(changePasswordFormSchema),
    mode: 'onChange',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const notificationForm = useForm<NotificationFormData>({
    resolver: yupResolver(notificationFormSchema),
    mode: 'onChange',
    defaultValues: {
      emailNotifications: false,
      marketingNotifications: false,
    },
  });

  useEffect(() => {
    if (currentUser && !isLoadingUser) {
      let userLanguage: string = LANGUAGE_DISPLAY.THAI;

      if (currentUser.language) {
        if (currentUser.language === LANGUAGE_CODES.TH) {
          userLanguage = LANGUAGE_DISPLAY.THAI;
        } else if (currentUser.language === LANGUAGE_CODES.EN) {
          userLanguage = LANGUAGE_DISPLAY.ENGLISH;
        } else {
          userLanguage =
            currentUser.language === LANGUAGE_DISPLAY.THAI ||
            currentUser.language === LANGUAGE_DISPLAY.ENGLISH
              ? currentUser.language
              : LANGUAGE_DISPLAY.THAI;
        }
      }

      if (!profileForm.formState.isDirty) {
        profileForm.setValue('name', currentUser.name || '', {
          shouldDirty: false,
        });
        profileForm.setValue('interfaceLanguage', userLanguage, {
          shouldDirty: false,
        });
        profileForm.setValue(
          'language',
          currentUser.language || LANGUAGE_CODES.TH,
          {
            shouldDirty: false,
          },
        );
        profileForm.setValue('avatar', null, { shouldDirty: false });
      }

      if (!notificationForm.formState.isDirty) {
        notificationForm.setValue(
          'emailNotifications',
          currentUser.emailNotifications ?? false,
          {
            shouldDirty: false,
          },
        );
        notificationForm.setValue(
          'marketingNotifications',
          currentUser.marketingNotifications ?? false,
          {
            shouldDirty: false,
          },
        );
      }
    }
  }, [currentUser, isLoadingUser, profileForm, notificationForm]);

  const onSubmitProfile = async (data: ProfileFormData) => {
    setProfileBanner({ type: null, message: '' });

    const apiData = {
      name: data.name,
      surname: currentUser?.surname || '',
      language: data.language,
      avatar: data.avatar,
    };

    updateProfileMutation.mutate(apiData, {
      onSuccess: () => {
        setProfileBanner({
          type: 'success',
          message: t('user:profileUpdatedSuccess'),
        });
      },
      onError: (error: any) => {
        const message = getErrorMessage(error);
        setPasswordBanner({ type: 'error', message });
        setProfileBanner({ type: 'error', message });
      },
    });
  };

  const onSubmitPassword = async (data: ChangePasswordFormData) => {
    setPasswordBanner({ type: null, message: '' });

    updatePasswordMutation.mutate(
      {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      },
      {
        onSuccess: () => {
          passwordForm.reset();
          setPasswordBanner({
            type: 'success',
            message: t('user:passwordUpdatedSuccess'),
          });
        },
        onError: (error: any) => {
          const message = getErrorMessage(error);
          setPasswordBanner({ type: 'error', message });
        },
      },
    );
  };

  const onSubmitNotification = async (data: NotificationFormData) => {
    setNotificationBanner({ type: null, message: '' });

    updateNotificationMutation.mutate(
      {
        emailNotifications: data.emailNotifications,
        marketingNotifications: data.marketingNotifications,
      },
      {
        onSuccess: () => {
          setNotificationBanner({
            type: 'success',
            message: t('user:notificationUpdatedSuccess'),
          });
        },
        onError: (error: any) => {
          const message = getErrorMessage(error);
          setPasswordBanner({ type: 'error', message });
          setNotificationBanner({ type: 'error', message });
        },
      },
    );
  };

  const handleSaveAll = () => {
    const hasProfileChanges = profileForm.formState.isDirty;

    const passwordValues = passwordForm.getValues();
    const hasPasswordChanges =
      passwordValues.currentPassword?.trim() ||
      passwordValues.newPassword?.trim() ||
      passwordValues.confirmPassword?.trim();

    const notificationValues = notificationForm.getValues();

    const hasNotificationChanges =
      notificationValues.emailNotifications !==
        (currentUser?.emailNotifications ?? false) ||
      notificationValues.marketingNotifications !==
        (currentUser?.marketingNotifications ?? false);

    if (hasProfileChanges) {
      profileForm.handleSubmit(onSubmitProfile)();
    }
    if (hasPasswordChanges) {
      passwordForm.handleSubmit(onSubmitPassword)();
    }
    if (hasNotificationChanges) {
      notificationForm.handleSubmit(onSubmitNotification)();
    }

    if (!hasProfileChanges && !hasPasswordChanges && !hasNotificationChanges) {
    }
  };

  const isAllValid = () => {
    const hasProfileErrors =
      Object.keys(profileForm.formState.errors).length > 0;
    const hasPasswordErrors =
      Object.keys(passwordForm.formState.errors).length > 0;
    const hasNotificationErrors =
      Object.keys(notificationForm.formState.errors).length > 0;

    return !hasProfileErrors && !hasPasswordErrors && !hasNotificationErrors;
  };

  const isLoading = () => {
    return (
      updateProfileMutation.isPending ||
      updatePasswordMutation.isPending ||
      updateNotificationMutation.isPending
    );
  };

  useImperativeHandle(ref, () => ({
    handleSaveAll,
    isAllValid,
    isLoading,
  }));

  if (isLoadingUser) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        {t('user:loadingUserData')}
      </div>
    );
  }

  if (userError) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>
        {t('user:errorLoadingUser')}
        <br />
        <small>{t('user:errorPersists')}</small>
      </div>
    );
  }

  return (
    <>
      <ProfileForm
        profileForm={profileForm}
        avatarUrl={currentUser?.avatar}
        banner={profileBanner}
      />
      <ChangePasswordForm passwordForm={passwordForm} banner={passwordBanner} />
      <NotificationForm
        notificationForm={notificationForm}
        banner={notificationBanner}
      />
    </>
  );
});

SettingsOrganism.displayName = 'SettingsOrganism';

export default SettingsOrganism;
