interface Props {
  id: string;
  title?: string;
  content?: string | JSX.Element;
  imageSrc: string;
  imageAlt: string;
  isExpanded: boolean;
  svgSpritesIconId: string;
  onPanelClick: (panel: HTMLDivElement) => void;
}

export function AccordionPanel({
  id,
  title,
  content,
  imageSrc,
  imageAlt,
  isExpanded,
  svgSpritesIconId,
  onPanelClick,
}: Props) {
  return (
    <div
      className="accordion-panel"
      onClick={(e) => onPanelClick(e.currentTarget)}
    >
      <h2 className={`${id}-heading`}>
        <button
          className="accordion-trigger"
          aria-controls={`${id}-content`}
          aria-expanded={isExpanded}
        >
          <span className="accordion-title" id={`${id}-title`}>
            {title}
          </span>
          <svg aria-hidden="true" className="accordion-icon">
            <use xlinkHref={`#${svgSpritesIconId}`}></use>
          </svg>
        </button>
      </h2>

      <div
        className="accordion-content"
        id={`${id}-content`}
        aria-labelledby={`${id}-heading`}
        aria-hidden={!isExpanded}
        role="region"
      >
        <div className="accordion-text">{content}</div>
        <img className="accordion-image" src={imageSrc} alt={imageAlt} />
      </div>
    </div>
  );
}
