import styled, { css } from 'styled-components';

export const heading1Styles = css`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.heading1.fontSize};
  line-height: ${({ theme }) => theme.typography.heading1.lineHeight};
  font-weight: ${({ theme }) => theme.typography.heading1.fontWeight};
  letter-spacing: ${({ theme }) => theme.typography.heading1.letterSpacing};
`;

export const Heading1 = styled.h1`
  ${heading1Styles}
`;
