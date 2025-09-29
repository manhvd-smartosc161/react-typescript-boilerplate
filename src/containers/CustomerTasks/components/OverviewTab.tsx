import { FC } from 'react';
import {
  OverviewGrid,
  InfoCard,
  InfoTitle,
  InfoValue,
  InfoSubtitle,
  StatusBadge,
} from '../index.styled';

const OverviewTab: FC = () => {
  return (
    <OverviewGrid>
      <InfoCard>
        <InfoTitle>Total Relationship</InfoTitle>
        <InfoValue>$245,000.00</InfoValue>
        <InfoSubtitle>Across all accounts</InfoSubtitle>
      </InfoCard>

      <InfoCard>
        <InfoTitle>Credit Score</InfoTitle>
        <InfoValue>750</InfoValue>
      </InfoCard>

      <InfoCard>
        <InfoTitle>KYC Status</InfoTitle>
        <StatusBadge>Verified</StatusBadge>
      </InfoCard>

      <InfoCard>
        <InfoTitle>Customer Since</InfoTitle>
        <InfoValue>2 Years</InfoValue>
        <InfoSubtitle>3/15/2022</InfoSubtitle>
      </InfoCard>

      <InfoCard>
        <InfoTitle>Email</InfoTitle>
        <InfoValue>sarah.johnson@email.com</InfoValue>
      </InfoCard>

      <InfoCard>
        <InfoTitle>Phone</InfoTitle>
        <InfoValue>+1 (555) 123-4567</InfoValue>
      </InfoCard>
    </OverviewGrid>
  );
};

export default OverviewTab;
