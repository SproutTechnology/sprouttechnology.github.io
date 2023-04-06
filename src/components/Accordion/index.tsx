import { AccordionPanel } from './AccordionPanel';

import './accordion.css';

interface PanelItem {
  title?: string;
  content?: string | JSX.Element;
  imageSrc: string;
  imageAlt: string;
  svgSpritesIconId: string;
}

interface Props {
  panels: PanelItem[];
  svgSprites: JSX.Element;
}

export default function Accordion({ panels, svgSprites }: Props) {
  const handlePanelClick = (panel: HTMLDivElement) => {
    if (!panel) return;

    const buttons = panel.parentElement?.querySelectorAll('.accordion-trigger');
    const contents =
      panel.parentElement?.querySelectorAll('.accordion-content');

    buttons?.forEach((button) => {
      button.setAttribute('aria-expanded', 'false');
    });

    contents?.forEach((content) => {
      content.setAttribute('aria-hidden', 'true');
    });

    panel
      .querySelector('.accordion-trigger')
      ?.setAttribute('aria-expanded', 'true');
    panel
      .querySelector('.accordion-content')
      ?.setAttribute('aria-hidden', 'false');
  };

  return (
    <>
      <div className="accordion">
        {panels.map((panel, index) => (
          <AccordionPanel
            key={`panel-${index}`}
            id={`panel-${index}`}
            isExpanded={index === 0}
            title={panel.title}
            content={panel.content}
            imageSrc={panel.imageSrc}
            imageAlt={panel.imageAlt}
            svgSpritesIconId={panel.svgSpritesIconId}
            onPanelClick={handlePanelClick}
          />
        ))}
      </div>

      {svgSprites}
    </>
  );
}
