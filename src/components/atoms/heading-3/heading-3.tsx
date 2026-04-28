import styled, { css } from 'styled-components';

export const heading3Styles = css`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.heading3.fontSize};
  line-height: ${({ theme }) => theme.typography.heading3.lineHeight};
  font-weight: ${({ theme }) => theme.typography.heading3.fontWeight};
  letter-spacing: ${({ theme }) => theme.typography.heading3.letterSpacing};
`;

export const Heading3 = styled.h3`
  ${heading3Styles}
`;
