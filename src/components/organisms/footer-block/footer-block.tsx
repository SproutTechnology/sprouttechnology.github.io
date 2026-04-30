import styled from 'styled-components';
import type { SiteContent } from '../../../i18n/site-content';
import { BrandText } from '../../atoms/brand-text/brand-text';
import { CaptionText, captionTextStyles } from '../../atoms/caption-text/caption-text';
import { pageWidth } from '../../atoms/layout-primitives/layout-primitives';

const Footer = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.color.border};
  padding: 40px 0;
`;

const FooterInner = styled.div`
  ${pageWidth}
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const BrandLink = styled.a`
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.color.text};
  font-size: ${({ theme }) => theme.typography.brand.fontSize};
  line-height: ${({ theme }) => theme.typography.brand.lineHeight};
  font-weight: ${({ theme }) => theme.typography.brand.fontWeight};
  letter-spacing: ${({ theme }) => theme.typography.brand.letterSpacing};
  text-decoration: none;
  text-transform: ${({ theme }) => theme.typography.brand.textTransform};
`;

const FooterCopy = styled(CaptionText)`
  ${captionTextStyles}
`;

const FooterLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
`;

const FooterLink = styled.a`
  color: ${({ theme }) => theme.color.textMuted};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.label.fontSize};
  line-height: ${({ theme }) => theme.typography.label.lineHeight};
  font-weight: ${({ theme }) => theme.typography.label.fontWeight};
  letter-spacing: 0.08em;
  text-transform: ${({ theme }) => theme.typography.label.textTransform};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.color.primary};
  }
`;

export function FooterBlock({ content }: { content: SiteContent }): JSX.Element {
  return (
    <Footer id="site-footer" data-section="footer">
      <FooterInner>
        <BrandLink href="#top">
          <BrandText variant="symbol" />
        </BrandLink>
        <FooterCopy>{content.footer.copy}</FooterCopy>
        <FooterLinks>
          {content.footer.links.map((link) => (
            <FooterLink
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
            >
              {link.label}
            </FooterLink>
          ))}
        </FooterLinks>
      </FooterInner>
    </Footer>
  );
}
