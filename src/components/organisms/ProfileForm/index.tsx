import { UseFormReturn } from 'react-hook-form';
import { Box } from '@mui/material';
import {
  CardAtom,
  LabelAtom,
  InputLabelAtom,
  AvatarAtom,
  ButtonAtom,
  TextAtom,
} from '@src/components/atoms';
import { ControlledTextField } from '@src/components/molecules';
import { StyledSubtitle } from '@src/components/templates/PageTemplate/index.styled';
import { ProfileFormData } from '@src/types';
import { StyledProfileForm } from './index.styled';

export interface ProfileFormProps {
  profileForm: UseFormReturn<ProfileFormData, any, ProfileFormData>;
}

const ProfileForm = (props: ProfileFormProps) => {
  const { profileForm } = props;

  return (
    <StyledProfileForm component="form" onSubmit={(e) => e.preventDefault()}>
      <CardAtom sx={{ borderRadius: 2 }}>
        <LabelAtom sx={{ fontSize: 28, fontWeight: 'bold' }}>Profile</LabelAtom>
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
              <ButtonAtom variant="ghost" sx={{ textTransform: 'capitalize' }}>
                <TextAtom variant="label">Change Avatar</TextAtom>
              </ButtonAtom>
            </Box>
          </Box>
        </Box>
      </CardAtom>
    </StyledProfileForm>
  );
};

export default ProfileForm;
