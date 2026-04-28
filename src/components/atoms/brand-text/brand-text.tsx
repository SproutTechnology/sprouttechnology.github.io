import styled, { css, useTheme } from 'styled-components';

interface BrandTextProps {
  variant?: 'symbol' | 'wordmark';
}

const logoSizeByVariant = {
  symbol: css`
    width: 32px;
    height: 32px;
  `,
  wordmark: css`
    width: 120px;
    height: auto;
  `,
} as const;

const LogoImage = styled.img<{ $variant: 'symbol' | 'wordmark' }>`
  display: block;
  object-fit: contain;
  ${({ $variant }) => logoSizeByVariant[$variant]}
`;

export function BrandText({ variant = 'symbol' }: BrandTextProps): JSX.Element {
  const theme = useTheme();
  const isLightTheme = theme.mode === 'light';

  const logoSrcByVariant = {
    wordmark: isLightTheme ? '/sprout-black-name.svg' : '/sprout-white-name.svg',
    symbol: isLightTheme ? '/sprout-black-symbol.svg' : '/sprout-white-symbol.svg',
  } as const;

  return <LogoImage $variant={variant} src={logoSrcByVariant[variant]} alt="Sprout" />;
}
