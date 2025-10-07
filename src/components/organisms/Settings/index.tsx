import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Divider } from '@mui/material';
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
import { ButtonAtom, TextAtom } from '@src/components/atoms';
import ProfileForm from '../ProfileForm';
import ChangePasswordForm from '../ChangePasswordForm';
import NotificationForm from '../NotificationForm';

const SettingsOrganism = () => {
  const profileForm = useForm<ProfileFormData>({
    resolver: yupResolver(profileFormSchema),
    defaultValues: {
      email: '',
      name: '',
    },
  });

  const passwordForm = useForm<ChangePasswordFormData>({
    resolver: yupResolver(changePasswordFormSchema),
    defaultValues: {
      currentPassword: null,
      newPassword: null,
      confirmPassword: null,
    },
  });

  const notificationForm = useForm<NotificationFormData>({
    resolver: yupResolver(notificationFormSchema),
    defaultValues: {
      emailNotification: true,
      marketingNotification: false,
    },
  });

  const onSubmitProfile = (data: any) => {
    console.log('Profile Data Saved:', data);
  };

  const onSubmitPassword = (data: any) => {
    console.log('Password Data Saved:', data);
  };

  const onSubmitNotification = (data: any) => {
    console.log('Notification Data Saved:', data);
  };

  const handleSaveAll = () => {
    profileForm.handleSubmit(onSubmitProfile)();

    passwordForm.handleSubmit(onSubmitPassword)();

    notificationForm.handleSubmit(onSubmitNotification)();
  };

  return (
    <>
      <ProfileForm profileForm={profileForm} />
      <ChangePasswordForm passwordForm={passwordForm} />
      <NotificationForm notificationForm={notificationForm} />
      <Divider sx={{ my: 4, borderColor: 'grey.600' }} />
      <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <ButtonAtom
          sx={{ textTransform: 'capitalize', backgroundColor: '#4b43ea' }}
          onClick={handleSaveAll}
        >
          <TextAtom sx={{ color: 'white', fontWeight: 'bold', padding: 0.5 }}>
            Save Changes
          </TextAtom>
        </ButtonAtom>
      </Box>
    </>
  );
};

export default SettingsOrganism;
