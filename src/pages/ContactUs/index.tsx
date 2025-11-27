import * as React from 'react';
import { Box, CardContent, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  StyledInfoBar,
  StyledContainer,
  StyledPageHeader,
  StyledInfoBarItem,
  StyledInfoBarTextItem,
  StyledContactCard,
  StyledSectionTitle,
  StyledActions,
  StyledMapWrap,
} from './index.styled';
import {
  ButtonAtom,
  ControlledTextAreaField,
  ControlledTextField,
  IconAtom,
} from '@src/components';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useCreateInquiryMutation } from '@src/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { ContactUsFormData } from '@src/types/contactUs';
import { contactUsSchema } from '@src/schemas/contactUsSchema';

const ContactUs: React.FC = () => {
  const { t } = useTranslation();
  const createInquiryMutation = useCreateInquiryMutation();
  const { control, handleSubmit, reset } = useForm<ContactUsFormData>({
    resolver: yupResolver(contactUsSchema),
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
    defaultValues: {
      email: '',
      name: '',
      question: '',
    },
  });

  const onSubmit = async (data: ContactUsFormData) => {
    await createInquiryMutation.mutateAsync({
      name: data.name,
      email: data.email,
      message: data.question,
    });
    reset();
  };

  return (
    <StyledContainer>
      {/* Title */}
      <StyledPageHeader variant="h3">
        {t('contact-us:dropUsSupportQuery')}
      </StyledPageHeader>

      {/* Info bar (address / email / optional) */}
      <StyledInfoBar direction={{ lg: 'column', xl: 'row' }}>
        <StyledInfoBarItem>
          <IconAtom name="place" size={20} />
          <StyledInfoBarTextItem variant="body1">
            {t('contact-us:addressTitle')}
          </StyledInfoBarTextItem>
        </StyledInfoBarItem>
        <StyledInfoBarItem>
          <IconAtom name="place" size={20} />
          <StyledInfoBarTextItem variant="body1">
            {t('contact-us:emailAddress')}
          </StyledInfoBarTextItem>
        </StyledInfoBarItem>
        <StyledInfoBarItem>
          <IconAtom name="place" size={20} />
          <StyledInfoBarTextItem variant="body1">1432</StyledInfoBarTextItem>
        </StyledInfoBarItem>
      </StyledInfoBar>

      {/* Card: Form + Map */}
      <StyledContactCard>
        <CardContent>
          <Grid container spacing={3}>
            {/* Left: Form */}
            <Grid size={{ sm: 12, md: 12, lg: 6 }} sx={{ width: '100%' }}>
              <StyledSectionTitle variant="h2">
                {t('contact-us:contactUs')}
              </StyledSectionTitle>
              <Box
                component="form"
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Stack spacing={2}>
                  <Box>
                    <ControlledTextField
                      name="name"
                      control={control}
                      label={t('contact-us:name')}
                      placeholder={t('contact-us:enterYourName')}
                      required
                    />
                  </Box>
                  <Box>
                    <ControlledTextField
                      name="email"
                      control={control}
                      label={t('contact-us:email')}
                      placeholder="your@email.com"
                      type="email"
                      required
                    />
                  </Box>
                  <Box>
                    <ControlledTextAreaField
                      name="question"
                      control={control}
                      label={t('contact-us:question')}
                      rows={3}
                      required
                    />
                  </Box>

                  <StyledActions direction="row">
                    <ButtonAtom
                      variant="primary"
                      type="submit"
                      size="medium"
                      disabled={createInquiryMutation.isPending}
                    >
                      {createInquiryMutation.isPending
                        ? t('common:submitting') || 'Submitting...'
                        : t('contact-us:save')}
                    </ButtonAtom>
                    <ButtonAtom
                      variant="secondary"
                      type="button"
                      size="medium"
                      sx={{ bgcolor: '#E8E8E8', color: '#000000' }}
                      onClick={() => reset()}
                      disabled={createInquiryMutation.isPending}
                    >
                      {t('contact-us:cancel')}
                    </ButtonAtom>
                  </StyledActions>
                </Stack>
              </Box>
            </Grid>

            {/* Right: Map */}
            <Grid size={{ sm: 12, md: 12, lg: 6 }}>
              <StyledMapWrap>
                <iframe
                  title="Google Map"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  style={{ border: 0 }}
                  src={
                    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.529286089416!' +
                    '2d100.625!3d13.730!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!' +
                    '1s0x0%3A0x0!2zTGV0J3Vz!5e0!3m2!1sen!2sth!4v1680000000000'
                  }
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </StyledMapWrap>
            </Grid>
          </Grid>
        </CardContent>
      </StyledContactCard>
    </StyledContainer>
  );
};

export default ContactUs;
