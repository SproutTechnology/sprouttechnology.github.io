import styled, { css } from 'styled-components';

interface LabelTextProps {
  $tone?: 'accent' | 'dim' | 'muted' | 'default';
  $size?: 'small' | 'default' | 'large';
}

const labelTone = {
  accent: 'primary',
  dim: 'textMuted',
  muted: 'textBody',
  default: 'text',
} as const;

const labelTextSize = {
  small: 'labelSmall',
  default: 'label',
  large: 'labelLarge',
} as const;

export const labelTextStyles = css<LabelTextProps>`
  font-size: ${({ theme, $size = 'default' }) => theme.typography[labelTextSize[$size]].fontSize};
  line-height: ${({ theme, $size = 'default' }) => theme.typography[labelTextSize[$size]].lineHeight};
  font-weight: ${({ theme, $size = 'default' }) => theme.typography[labelTextSize[$size]].fontWeight};
  letter-spacing: ${({ theme, $size = 'default' }) => theme.typography[labelTextSize[$size]].letterSpacing};
  text-transform: ${({ theme, $size = 'default' }) => theme.typography[labelTextSize[$size]].textTransform};
  color: ${({ theme, $tone = 'dim' }) => theme.color[labelTone[$tone]]};
`;

export const LabelText = styled.span<LabelTextProps>`
  ${labelTextStyles}
`;
