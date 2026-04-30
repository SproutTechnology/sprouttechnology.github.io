import styled from 'styled-components';

export type SpacingSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';

export const Spacings: Record<SpacingSize, SpacingSize> = {
  xxs: 'xxs',
  xs:  'xs',
  sm:  'sm',
  md:  'md',
  lg:  'lg',
  xl:  'xl',
  '2xl': '2xl',
  '3xl': '3xl',
  '4xl': '4xl',
  '5xl': '5xl',
  '6xl': '6xl',
};

export interface SpacingProps {
  size: SpacingSize;
}

export const Spacing = styled.div<SpacingProps>`
  display: block;
  width: 100%;
  height: ${({ theme, size }) => theme.spacing[size]};
`;

export const Spacer = Spacing;
