import { Link, useNavigate } from "react-router-dom";
import "./nav.scss";
import LinkToPage from "../../enums/LinkToPage";

function Menu() {
    const navigate = useNavigate();

    const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, link: string) => {
        if (!e) return;

        navigate(link);
    };

    return (
        <div className="container">
            <input id="toggle" type="checkbox" />

            <label className="toggle-container" htmlFor="toggle">
                <span className="button button-toggle"></span>
            </label>

            <nav className="nav">
                <a className="nav-item" href="" onClick={(e) => handleNavigation(e, LinkToPage.StartPage)}>
                    Home
                </a>

                <a className="nav-item" href="" onClick={(e) => handleNavigation(e, LinkToPage.SproutIsUs)}>
                    Sprout is us
                </a>

                <a className="nav-item" href="" onClick={(e) => handleNavigation(e, LinkToPage.TheVision)}>
                    Our vision
                </a>

                <a className="nav-item" href="" onClick={(e) => handleNavigation(e, LinkToPage.GetInTouch)}>
                    Contact
                </a>
            </nav>
        </div>
    );
}

export default Menu;
