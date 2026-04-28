import styled, { css } from 'styled-components';

interface BodyTextProps {
  $tone?: 'default' | 'muted' | 'dim';
  $size?: 'small' | 'default' | 'large';
}

const bodyTextTone = {
  default: 'text',
  muted: 'textBody',
  dim: 'textDim',
} as const;

const bodyTextSize = {
  small: 'bodySmall',
  default: 'body',
  large: 'bodyLarge',
} as const;

export const bodyTextStyles = css<BodyTextProps>`
  margin: 0;
  color: ${({ theme, $tone = 'muted' }) => theme.color[bodyTextTone[$tone]]};
  font-size: ${({ theme, $size = 'default' }) => theme.typography[bodyTextSize[$size]].fontSize};
  line-height: ${({ theme, $size = 'default' }) => theme.typography[bodyTextSize[$size]].lineHeight};
  font-weight: ${({ theme, $size = 'default' }) => theme.typography[bodyTextSize[$size]].fontWeight};
  letter-spacing: ${({ theme, $size = 'default' }) => theme.typography[bodyTextSize[$size]].letterSpacing};
`;

export const BodyText = styled.p<BodyTextProps>`
  ${bodyTextStyles}
`;
