import styled, { css } from 'styled-components';

export const heading2Styles = css`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.heading2.fontSize};
  line-height: ${({ theme }) => theme.typography.heading2.lineHeight};
  font-weight: ${({ theme }) => theme.typography.heading2.fontWeight};
  letter-spacing: ${({ theme }) => theme.typography.heading2.letterSpacing};
`;

export const Heading2 = styled.h2`
  ${heading2Styles}
`;
