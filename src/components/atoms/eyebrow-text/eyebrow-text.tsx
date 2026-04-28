import styled, { css } from 'styled-components';

interface EyebrowTextProps {
  $tone?: 'accent' | 'dim';
}

const eyebrowTextTone = {
  accent: 'primary',
  dim: 'textDim',
} as const;

export const eyebrowTextStyles = css<EyebrowTextProps>`
  font-size: ${({ theme }) => theme.typography.eyebrow.fontSize};
  line-height: ${({ theme }) => theme.typography.eyebrow.lineHeight};
  font-weight: ${({ theme }) => theme.typography.eyebrow.fontWeight};
  letter-spacing: ${({ theme }) => theme.typography.eyebrow.letterSpacing};
  text-transform: ${({ theme }) => theme.typography.eyebrow.textTransform};
  color: ${({ theme, $tone = 'accent' }) => theme.color[eyebrowTextTone[$tone]]};
`;

export const EyebrowText = styled.span<EyebrowTextProps>`
  ${eyebrowTextStyles}
`;
