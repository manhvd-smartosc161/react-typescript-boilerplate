import styled from 'styled-components';

export const StyledLayout = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const StyledContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 12px;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;
