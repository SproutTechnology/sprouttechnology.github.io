import { describe, expect, it } from 'vitest';
import { BodyText, bodyTextStyles } from './body-text/body-text';
import { BodyText as BodyTextFromBarrel, bodyTextStyles as bodyTextStylesFromBarrel } from './body-text/index';
import { BrandText } from './brand-text/brand-text';
import { BrandText as BrandTextFromBarrel } from './brand-text/index';
import { buttonTextStyles } from './button-text/button-text';
import { buttonTextStyles as buttonTextStylesFromBarrel } from './button-text/index';
import { CaptionText, captionTextStyles } from './caption-text/caption-text';
import { CaptionText as CaptionTextFromBarrel, captionTextStyles as captionTextStylesFromBarrel } from './caption-text/index';
import { EyebrowText, eyebrowTextStyles } from './eyebrow-text/eyebrow-text';
import { EyebrowText as EyebrowTextFromBarrel, eyebrowTextStyles as eyebrowTextStylesFromBarrel } from './eyebrow-text/index';
import { Heading1, heading1Styles } from './heading-1/heading-1';
import { Heading1 as Heading1FromBarrel, heading1Styles as heading1StylesFromBarrel } from './heading-1/index';
import { Heading2, heading2Styles } from './heading-2/heading-2';
import { Heading2 as Heading2FromBarrel, heading2Styles as heading2StylesFromBarrel } from './heading-2/index';
import { Heading3, heading3Styles } from './heading-3/heading-3';
import { Heading3 as Heading3FromBarrel, heading3Styles as heading3StylesFromBarrel } from './heading-3/index';
import { LabelText, labelTextStyles } from './label-text/label-text';
import { LabelText as LabelTextFromBarrel, labelTextStyles as labelTextStylesFromBarrel } from './label-text/index';
import {
  Eyebrow,
  FullWidthContainer,
  Page,
  SectionDescription,
  SectionHeader,
  SectionLabel,
  SectionNumber,
  SectionTitle,
  pageWidth,
  sectionBase,
} from './layout-primitives/layout-primitives';
import {
  Eyebrow as EyebrowFromBarrel,
  FullWidthContainer as FullWidthContainerFromBarrel,
  Page as PageFromBarrel,
  SectionDescription as SectionDescriptionFromBarrel,
  SectionHeader as SectionHeaderFromBarrel,
  SectionLabel as SectionLabelFromBarrel,
  SectionNumber as SectionNumberFromBarrel,
  SectionTitle as SectionTitleFromBarrel,
  pageWidth as pageWidthFromBarrel,
  sectionBase as sectionBaseFromBarrel,
} from './layout-primitives/index';

describe('atoms barrel exports', () => {
  it('re-exports the atom modules from their barrel files', () => {
    expect(BodyTextFromBarrel).toBe(BodyText);
    expect(bodyTextStylesFromBarrel).toBe(bodyTextStyles);
    expect(BrandTextFromBarrel).toBe(BrandText);
    expect(buttonTextStylesFromBarrel).toBe(buttonTextStyles);
    expect(CaptionTextFromBarrel).toBe(CaptionText);
    expect(captionTextStylesFromBarrel).toBe(captionTextStyles);
    expect(EyebrowTextFromBarrel).toBe(EyebrowText);
    expect(eyebrowTextStylesFromBarrel).toBe(eyebrowTextStyles);
    expect(Heading1FromBarrel).toBe(Heading1);
    expect(heading1StylesFromBarrel).toBe(heading1Styles);
    expect(Heading2FromBarrel).toBe(Heading2);
    expect(heading2StylesFromBarrel).toBe(heading2Styles);
    expect(Heading3FromBarrel).toBe(Heading3);
    expect(heading3StylesFromBarrel).toBe(heading3Styles);
    expect(LabelTextFromBarrel).toBe(LabelText);
    expect(labelTextStylesFromBarrel).toBe(labelTextStyles);
    expect(EyebrowFromBarrel).toBe(Eyebrow);
    expect(FullWidthContainerFromBarrel).toBe(FullWidthContainer);
    expect(PageFromBarrel).toBe(Page);
    expect(SectionDescriptionFromBarrel).toBe(SectionDescription);
    expect(SectionHeaderFromBarrel).toBe(SectionHeader);
    expect(SectionLabelFromBarrel).toBe(SectionLabel);
    expect(SectionNumberFromBarrel).toBe(SectionNumber);
    expect(SectionTitleFromBarrel).toBe(SectionTitle);
    expect(pageWidthFromBarrel).toBe(pageWidth);
    expect(sectionBaseFromBarrel).toBe(sectionBase);
  });
});
