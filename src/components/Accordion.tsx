import { ModernUiSprites } from '../icons/ModernUiSprites';

export default function Accordion() {
  const handleClick = (activePanel: HTMLDivElement) => {
    if (!activePanel) return;

    const buttons =
      activePanel.parentElement?.querySelectorAll('.accordion-trigger');
    const contents =
      activePanel.parentElement?.querySelectorAll('.accordion-content');

    buttons?.forEach((button) => {
      button.setAttribute('aria-expanded', 'false');
    });

    contents?.forEach((content) => {
      content.setAttribute('aria-hidden', 'true');
    });

    activePanel
      .querySelector('.accordion-trigger')
      ?.setAttribute('aria-expanded', 'true');
    activePanel
      .querySelector('.accordion-content')
      ?.setAttribute('aria-hidden', 'false');
  };

  return (
    <div className="wrapper">
      <div className="accordion">
        <div
          className="accordion-panel"
          onClick={(e) => handleClick(e.currentTarget)}
        >
          <h2 className="panel1-heading">
            <button
              className="accordion-trigger"
              aria-controls="panel1-content"
              aria-expanded="true"
            >
              <span className="accordion-title" id="panel1-title">
                Contact
              </span>
              <svg aria-hidden="true" className="accordion-icon">
                <use xlinkHref="#phone"></use>
              </svg>
            </button>
          </h2>

          <div
            className="accordion-content"
            id="panel1-content"
            aria-labelledby="panel1-heading"
            aria-hidden="false"
            role="region"
          >
            <p className="accordion-text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum
              quae dolor eius officia! Quisquam soluta fugit unde.
            </p>
            <img
              className="accordion-image"
              src="images/sara.jpeg"
              alt="Sara Ljungberg"
            />
          </div>
        </div>

        <div
          className="accordion-panel"
          onClick={(e) => handleClick(e.currentTarget)}
        >
          <h2 className="panel2-heading">
            <button
              className="accordion-trigger"
              aria-controls="panel2-content"
              aria-expanded="false"
            >
              <span className="accordion-title" id="panel2-title">
                Sales
              </span>
              <svg aria-hidden="true" className="accordion-icon">
                <use xlinkHref="#share"></use>
              </svg>
            </button>
          </h2>

          <div
            className="accordion-content"
            id="panel2-content"
            aria-labelledby="panel2-heading"
            aria-hidden="true"
            role="region"
          >
            <p className="accordion-text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum
              quae dolor eius officia! Quisquam soluta fugit unde.
            </p>
            <img
              className="accordion-image"
              src="images/oliver.jpeg"
              alt="Oliver Stanisic"
            />
          </div>
        </div>

        <div
          className="accordion-panel"
          onClick={(e) => handleClick(e.currentTarget)}
        >
          <h2 className="panel3-heading">
            <button
              className="accordion-trigger"
              aria-controls="panel3-content"
              aria-expanded="false"
            >
              <span className="accordion-title" id="panel3-title">
                Development
              </span>
              <svg aria-hidden="true" className="accordion-icon">
                <use xlinkHref="#java"></use>
              </svg>
            </button>
          </h2>

          <div
            className="accordion-content"
            id="panel3-content"
            aria-labelledby="panel3-heading"
            aria-hidden="true"
            role="region"
          >
            <p className="accordion-text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum
              quae dolor eius officia! Quisquam soluta fugit unde.
            </p>
            <img
              className="accordion-image"
              src="images/simon.jpeg"
              alt="Simon Arvidsson"
            />
          </div>
        </div>

        <div
          className="accordion-panel"
          onClick={(e) => handleClick(e.currentTarget)}
        >
          <h2 className="panel4-heading">
            <button
              className="accordion-trigger"
              aria-controls="panel4-content"
              aria-expanded="false"
            >
              <span className="accordion-title" id="panel4-title">
                Ideas
              </span>
              <svg aria-hidden="true" className="accordion-icon">
                <use xlinkHref="#lightbulb"></use>
              </svg>
            </button>
          </h2>

          <div
            className="accordion-content"
            id="panel4-content"
            aria-labelledby="panel4-heading"
            aria-hidden="true"
            role="region"
          >
            <p className="accordion-text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum
              quae dolor eius officia! Quisquam soluta fugit unde.
            </p>
            <img
              className="accordion-image"
              src="images/joseph.jpeg"
              alt="Joseph Chambochumbi"
            />
          </div>
        </div>

        <div
          className="accordion-panel"
          onClick={(e) => handleClick(e.currentTarget)}
        >
          <h2 className="panel5-heading">
            <button
              className="accordion-trigger"
              aria-controls="panel5-content"
              aria-expanded="false"
            >
              <span className="accordion-title" id="panel5-title">
                Consultancy
              </span>
              <svg aria-hidden="true" className="accordion-icon">
                <use xlinkHref="#csharp"></use>
              </svg>
            </button>
          </h2>

          <div
            className="accordion-content"
            id="panel5-content"
            aria-labelledby="panel5-heading"
            aria-hidden="true"
            role="region"
          >
            <p className="accordion-text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum
              quae dolor eius officia! Quisquam soluta fugit unde.
            </p>
            <img
              className="accordion-image"
              src="images/johan.jpeg"
              alt="Johan Gustafsson"
            />
          </div>
        </div>
      </div>

      <ModernUiSprites />
    </div>
  );
}
