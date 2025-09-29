import { FC } from 'react';
import { UserOutlined, HomeOutlined, BankOutlined } from '@ant-design/icons';
import {
  PersonalInfoContainer,
  InfoSection,
  SectionHeader,
  SectionTitle,
  SectionIcon,
  InfoGrid,
  InfoField,
  FieldLabel,
  FieldValue,
} from '../index.styled';

const PersonalInfoTab: FC = () => {
  return (
    <PersonalInfoContainer>
      {/* Personal Details Section */}
      <InfoSection>
        <SectionHeader>
          <SectionIcon>
            <UserOutlined />
          </SectionIcon>
          <SectionTitle>Personal Details</SectionTitle>
        </SectionHeader>

        <InfoGrid>
          <InfoField>
            <FieldLabel>Full Name</FieldLabel>
            <FieldValue>Sarah Johnson</FieldValue>
          </InfoField>

          <InfoField>
            <FieldLabel>Date of Birth</FieldLabel>
            <FieldValue>6/15/1985</FieldValue>
          </InfoField>

          <InfoField>
            <FieldLabel>SSN</FieldLabel>
            <FieldValue>***-**-1234</FieldValue>
          </InfoField>

          <InfoField>
            <FieldLabel>Customer Since</FieldLabel>
            <FieldValue>3/15/2023</FieldValue>
          </InfoField>
        </InfoGrid>
      </InfoSection>

      {/* Address Information Section */}
      <InfoSection>
        <SectionHeader>
          <SectionIcon>
            <HomeOutlined />
          </SectionIcon>
          <SectionTitle>Address Information</SectionTitle>
        </SectionHeader>

        <InfoGrid>
          <InfoField>
            <FieldLabel>Address</FieldLabel>
            <FieldValue>
              123 Main Street, Apt 4B
              <br />
              New York, NY 10001
              <br />
              USA
            </FieldValue>
          </InfoField>
        </InfoGrid>
      </InfoSection>

      {/* Employment Information Section */}
      <InfoSection>
        <SectionHeader>
          <SectionIcon>
            <BankOutlined />
          </SectionIcon>
          <SectionTitle>Employment Information</SectionTitle>
        </SectionHeader>

        <InfoGrid>
          <InfoField>
            <FieldLabel>Employer</FieldLabel>
            <FieldValue>SmartOSC</FieldValue>
          </InfoField>

          <InfoField>
            <FieldLabel>Position</FieldLabel>
            <FieldValue>Senior Software Engineer</FieldValue>
          </InfoField>

          <InfoField>
            <FieldLabel>Annual Income</FieldLabel>
            <FieldValue>$120,000.00</FieldValue>
          </InfoField>
        </InfoGrid>
      </InfoSection>
    </PersonalInfoContainer>
  );
};

export default PersonalInfoTab;
