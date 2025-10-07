import { Box } from '@mui/material';
import { CardAtom, LabelAtom, SwitchAtom } from '@src/components/atoms';
import { StyledSubtitle } from '@src/components/templates/PageTemplate/index.styled';
import { Controller, UseFormReturn } from 'react-hook-form';
import { StyledNotificationForm } from './index.styled';
import { NotificationFormData } from '@src/types';

export interface NotificationFormProps {
  notificationForm: UseFormReturn<
    NotificationFormData,
    any,
    NotificationFormData
  >;
}

const NotificationForm = (props: NotificationFormProps) => {
  const { notificationForm } = props;

  return (
    <StyledNotificationForm
      component="form"
      onSubmit={(e) => e.preventDefault()}
    >
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
      </CardAtom>
    </StyledNotificationForm>
  );
};

export default NotificationForm;
