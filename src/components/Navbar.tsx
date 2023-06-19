import { useReducer } from "react";

import styled from "@emotion/styled";

import { MenuBackground } from "./MenuBackground";
import { MenuButton } from "./MenuButton";
import Logo from "./Logo";

const Nav = styled.nav`
    display: flex;
    background-color: ${(props) => props.theme.backgroundColors.charcoal};
    padding-left: ${(props) => props.theme.spacing.large};
    padding-right: ${(props) => props.theme.spacing.large};
    align-items: center;
    justify-content: space-between;
    height: 10vh;

    position: sticky;
    top: 0;
    z-index: 1;

    > svg {
        z-index: 100;
    }
`;

const MenuWrapper = styled.div`
    position: fixed;
    z-index: -1;
    top: 0;
    right: 0;

    width: 200%;
    height: 200%;

    transform: translate(100%, -100%);

    border-radius: 9999px;

    transition: transform 1s linear;

    &[data-open="true"] {
        transform: translate(50%, -50%);
    }
`;

const MenuAreas = styled.div`
    display: flex;
    flex-wrap: wrap;

    width: 100%;
    height: 100%;
`;

const Quadrant = styled.div`
    position: relative;

    flex: 1 1 50%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const empty = {};
const inert = { tabIndex: -1, inert: "" };

const NavbarItems = ({ isOpen }: { isOpen: boolean }) => {
    const props = isOpen ? empty : inert;
    return (
        <ul>
            <li>
                <a href="/about" {...props}>
                    About
                </a>
            </li>
            <li>
                <a href="/employees" {...props}>
                    Employees
                </a>
            </li>
            <li>
                <a href="/career" {...props}>
                    Career
                </a>
            </li>
            <li>
                <a href="/contact" {...props}>
                    Contact
                </a>
            </li>
        </ul>
    );
};

function Navbar() {
    const [isMenuOpen, toggle] = useReducer((x) => !x, false);

    return (
        <Nav>
            <Logo></Logo>

            <MenuButton isOpen={isMenuOpen} toggle={toggle} />

            <MenuWrapper data-open={isMenuOpen}>
                <MenuAreas>
                    <Quadrant />
                    <Quadrant />
                    <Quadrant>
                        <NavbarItems isOpen={isMenuOpen} />

                        <MenuBackground isOpen={isMenuOpen} />
                    </Quadrant>
                    <Quadrant />
                </MenuAreas>
            </MenuWrapper>
        </Nav>
    );
}

export default Navbar;
