import type { ReactNode } from 'react';
import { Spacer } from '../../atoms/spacing/spacing';
import {
  SectionDescription,
  SectionHeader,
  SectionHeaderBottom,
  SectionHeaderTop,
  SectionLabel,
  SectionNumber,
  SectionTitle,
} from '../../atoms/layout-primitives/layout-primitives';

interface SectionIntroProps {
  number: string;
  label: string;
  title: string;
  description?: string;
  titleContent?: ReactNode;
  descriptionContent?: ReactNode;
}

export function SectionIntro({
  number,
  label,
  title,
  description,
  titleContent,
  descriptionContent,
}: SectionIntroProps): JSX.Element {
  return (
    <>
      <SectionHeader>
        <SectionHeaderTop>
          <SectionNumber>{number}</SectionNumber>
          <SectionTitle>{titleContent ?? title}</SectionTitle>
        </SectionHeaderTop>

        <SectionHeaderBottom>
          <SectionLabel>{label}</SectionLabel>
          {descriptionContent ?? (description ? <SectionDescription>{description}</SectionDescription> : null)}
        </SectionHeaderBottom>
      </SectionHeader>
      <Spacer size="6xl" />
    </>
  );
}
