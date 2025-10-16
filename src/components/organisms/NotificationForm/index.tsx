import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CardAtom, LabelAtom, SwitchAtom } from '@src/components/atoms';
import { StyledSubtitle } from '@src/components/templates/PageTemplate/index.styled';
import { Controller, UseFormReturn } from 'react-hook-form';
import { StyledNotificationForm } from './index.styled';
import { Alert } from '@src/components/molecules';
import { NotificationFormData } from '@src/types';

export interface NotificationFormProps {
  notificationForm: UseFormReturn<
    NotificationFormData,
    any,
    NotificationFormData
  >;
  banner?: {
    type: 'success' | 'error' | null;
    message: string;
  };
}

const NotificationForm = (props: NotificationFormProps) => {
  const { notificationForm, banner } = props;
  const { t } = useTranslation();

  return (
    <StyledNotificationForm
      component="form"
      onSubmit={(e) => e.preventDefault()}
    >
      <CardAtom sx={{ borderRadius: 2, marginTop: 6 }}>
        <LabelAtom sx={{ fontSize: 18, fontWeight: 'bold' }}>
          {t('user:notifications')}
        </LabelAtom>
        <StyledSubtitle sx={{ color: '#94a2b8' }}>
          {t('user:notificationsSubtitle')}
        </StyledSubtitle>
        {banner?.type && <Alert severity={banner.type}>{banner.message}</Alert>}
        <Box
          marginTop={{ xs: 4, md: 0 }}
          display={{ xs: 'flex', md: 'block' }}
          flexDirection="column"
          gap={2}
        >
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
              <LabelAtom sx={{ fontSize: 14, fontWeight: 'bold' }}>
                {t('user:emailNotifications')}
              </LabelAtom>
              <StyledSubtitle sx={{ color: '#94a2b8' }}>
                {t('user:emailNotificationsDescription')}
              </StyledSubtitle>
            </Box>

            <Controller
              name="emailNotifications"
              control={notificationForm.control}
              render={({ field }) => (
                <SwitchAtom
                  sx={{ m: 1 }}
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  activeColor="#4b43ea"
                  inactiveColor="#ccc"
                  thumbColor="#fff"
                  customSize="medium"
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
              <LabelAtom sx={{ fontSize: 14, fontWeight: 'bold' }}>
                {t('user:marketingCommunications')}
              </LabelAtom>
              <StyledSubtitle sx={{ color: '#94a2b8' }}>
                {t('user:marketingCommunicationsDescription')}
              </StyledSubtitle>
            </Box>

            <Controller
              name="marketingNotifications"
              control={notificationForm.control}
              render={({ field }) => (
                <SwitchAtom
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  activeColor="#4b43ea"
                  inactiveColor="#ccc"
                  thumbColor="#fff"
                  customSize="medium"
                />
              )}
            />
          </CardAtom>
        </Box>
      </CardAtom>
    </StyledNotificationForm>
  );
};

export default NotificationForm;
