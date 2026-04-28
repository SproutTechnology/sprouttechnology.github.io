import styled, { css } from 'styled-components';

interface CaptionTextProps {
  $tone?: 'dim' | 'muted' | 'default';
  $size?: 'small' | 'default' | 'large';
}

const captionTone = {
  dim: 'textMuted',
  muted: 'textBody',
  default: 'text',
} as const;

const captionTextSize = {
  small: 'captionSmall',
  default: 'caption',
  large: 'captionLarge',
} as const;

export const captionTextStyles = css<CaptionTextProps>`
  font-size: ${({ theme, $size = 'default' }) => theme.typography[captionTextSize[$size]].fontSize};
  line-height: ${({ theme, $size = 'default' }) => theme.typography[captionTextSize[$size]].lineHeight};
  font-weight: ${({ theme, $size = 'default' }) => theme.typography[captionTextSize[$size]].fontWeight};
  letter-spacing: ${({ theme, $size = 'default' }) => theme.typography[captionTextSize[$size]].letterSpacing};
  color: ${({ theme, $tone = 'dim' }) => theme.color[captionTone[$tone]]};
`;

export const CaptionText = styled.span<CaptionTextProps>`
  ${captionTextStyles}
`;
