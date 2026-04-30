import { css } from 'styled-components';

export const buttonTextStyles = css`
  font-size: ${({ theme }) => theme.typography.button.fontSize};
  line-height: ${({ theme }) => theme.typography.button.lineHeight};
  font-weight: ${({ theme }) => theme.typography.button.fontWeight};
  letter-spacing: ${({ theme }) => theme.typography.button.letterSpacing};
  text-transform: ${({ theme }) => theme.typography.button.textTransform};
`;
