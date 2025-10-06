import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import {
  AvatarAtom,
  ButtonAtom,
  CardAtom,
  InputLabelAtom,
  TextAtom,
  ControlledPasswordField,
  ControlledTextField,
  PageTemplate,
  LabelAtom,
} from '@src/components';
import { StyledLoginForm } from '@src/components/organisms/LoginForm/index.styled';
import { StyledSubtitle } from '@src/components/templates/PageTemplate/index.styled';
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

const CustomSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        // backgroundColor: '#65C466',
        backgroundColor: '#4b43ea',
        opacity: 1,
        border: 0,
        ...theme.applyStyles('dark', {
          // backgroundColor: '#2ECA45',
          backgroundColor: '#4b43ea',
        }),
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
      ...theme.applyStyles('dark', {
        color: theme.palette.grey[600],
      }),
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
      ...theme.applyStyles('dark', {
        opacity: 0.3,
      }),
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: '#E9E9EA',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
    ...theme.applyStyles('dark', {
      backgroundColor: '#39393D',
    }),
  },
}));

const Settings: FC = () => {
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
    <PageTemplate
      title="Settings"
      subtitle="Manage your account settings and set e-email preferences"
    >
      <StyledLoginForm component="form" onSubmit={(e) => e.preventDefault()}>
        <CardAtom sx={{ borderRadius: 2 }}>
          <LabelAtom sx={{ fontSize: 28, fontWeight: 'bold' }}>
            Profile
          </LabelAtom>
          <StyledSubtitle sx={{ color: '#94a2b8' }}>
            This is how others will see you on the site.
          </StyledSubtitle>
          <Box sx={{ marginTop: 4 }}>
            <Box sx={{ marginTop: 2 }}>
              <ControlledTextField
                name="name"
                control={profileForm.control}
                label="Name"
                type="text"
              />
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <ControlledTextField
                name="email"
                control={profileForm.control}
                label="Email"
                type="text"
              />
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <InputLabelAtom htmlFor={'avatar'}>Avatar</InputLabelAtom>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AvatarAtom
                  sx={{
                    width: 56,
                    height: 56,
                    backgroundColor: '#ececfd',
                    color: '#4b43ea',
                  }}
                />
                <ButtonAtom
                  variant="ghost"
                  sx={{ textTransform: 'capitalize' }}
                >
                  <TextAtom variant="label">Change Avatar</TextAtom>
                </ButtonAtom>
              </Box>
            </Box>
          </Box>
        </CardAtom>
      </StyledLoginForm>

      <StyledLoginForm component="form" onSubmit={(e) => e.preventDefault()}>
        <CardAtom sx={{ borderRadius: 2, marginTop: 4 }}>
          <LabelAtom sx={{ fontSize: 28, fontWeight: 'bold' }}>
            Password
          </LabelAtom>
          <StyledSubtitle sx={{ color: '#94a2b8' }}>
            Change your password. It's a good idea to use a strong password that
            you're not using elsewhere.
          </StyledSubtitle>
          <Box sx={{ marginTop: 4 }}>
            <Box sx={{ marginTop: 2 }}>
              <ControlledPasswordField
                name="currentPassword"
                control={passwordForm.control}
                label="Current Password"
              />
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <ControlledPasswordField
                name="newPassword"
                control={passwordForm.control}
                label="New Password"
              />
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <ControlledPasswordField
                name="confirmPassword"
                control={passwordForm.control}
                label="Confirm New Password"
              />
            </Box>
          </Box>
        </CardAtom>
      </StyledLoginForm>

      <StyledLoginForm component="form" onSubmit={(e) => e.preventDefault()}>
        <CardAtom sx={{ borderRadius: 2, marginTop: 4 }}>
          <LabelAtom sx={{ fontSize: 28, fontWeight: 'bold' }}>
            Notifications
          </LabelAtom>
          <StyledSubtitle sx={{ color: '#94a2b8' }}>
            Choose how you want to be notified.
          </StyledSubtitle>
          <CardAtom
            sx={{
              borderRadius: 2,
              marginTop: 4,
              border: '1px solid #e1e7f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <LabelAtom sx={{ fontSize: 22, fontWeight: 'bold' }}>
                Email Notifications
              </LabelAtom>
              <StyledSubtitle sx={{ color: '#94a2b8' }}>
                Receive important updates about your account and new leads
              </StyledSubtitle>
            </Box>

            <Controller
              name="emailNotification"
              control={notificationForm.control}
              render={({ field }) => (
                <CustomSwitch
                  sx={{ m: 1 }}
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              )}
            />
          </CardAtom>
          <CardAtom
            sx={{
              borderRadius: 2,
              marginTop: 4,
              border: '1px solid #e1e7f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <LabelAtom sx={{ fontSize: 22, fontWeight: 'bold' }}>
                Marketing Communications
              </LabelAtom>
              <StyledSubtitle sx={{ color: '#94a2b8' }}>
                Receive news, offers, and promotions from CP Axtra.
              </StyledSubtitle>
            </Box>

            <Controller
              name="marketingNotification"
              control={notificationForm.control}
              render={({ field }) => (
                <CustomSwitch
                  sx={{ m: 1 }}
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              )}
            />
          </CardAtom>
        </CardAtom>
      </StyledLoginForm>

      <Box sx={{ marginTop: 4 }}>
        <hr />
      </Box>

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
    </PageTemplate>
  );
};

export default Settings;
