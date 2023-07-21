import { useCallback, useEffect, useState } from "react";

import styled from "@emotion/styled";

import { RemoveScroll } from "react-remove-scroll";
import ReactFocusLock from "react-focus-lock";

import { MenuBackground } from "./MenuBackground";
import { MenuButton } from "./MenuButton";
import Logo from "./Logo";
import Card, { CardWrapper, CardContent, CardText, CardHeading, CardParagraph } from "./Card";
import { css, useTheme } from "@emotion/react";
import CardSize from "../enums/CardSize";
import { AnchorButton } from "./Button";
import { Link } from "react-router-dom";
import LinkToPage from "../enums/LinkToPage";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes({
    "0%": { opacity: 0, bottom: "55%" },
    "100%": { opacity: 1, bottom: "50%" },
});

const fadeOut = keyframes({
    "0%": { opacity: 1, top: "50%" },
    "100%": { opacity: 0, top: "55%" },
});

interface Props {
    backgroundColor: string;
}

const Nav = styled.nav`
    display: flex;
    background-color: ${(props: Props) => props.backgroundColor};
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
    top: 50%;
    right: 50%;

    width: 100%;
    height: 100%;

    transform: translateX(200%) translateY(-200%);

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

    padding: 0.5rem;
`;

const empty = {};
const inert = { tabIndex: -1, inert: "" };

const NavbarMenuList = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;

    > li {
        margin: 0.5rem;
    }

    ${CardWrapper} {
        width: ${(props) => props.theme.cardSizes.width[CardSize.Small]};
        height: 100%;
    }

    ${CardParagraph} {
        display: none;
    }

    ${CardHeading} {
        font-size: 1.2rem;
    }

    @media (min-width: 1024px) {
        > li {
            margin: 0 1.5rem;
        }

        ${CardWrapper} {
            width: ${(props) => props.theme.cardSizes.width[CardSize.Medium]};
            height: 100%;
        }

        ${CardParagraph} {
            display: block;
        }

        ${CardHeading} {
            font-size: ${(props) => props.theme.fontSize.h2};
        }
    }
`;

const MenuCTA = styled(AnchorButton)`
    width: 100%;
    height: unset;
    padding: 1em;
    text-align: center;

    font-size: 0.75rem;
    white-space: nowrap;

    @media (min-width: 1024px) {
        font-size: ${(props) => props.theme.fontSize.button};
        white-space: nowrap;
    }
`;

const MenuItemWrapper = styled.div<{ isOpen: boolean }>(({ isOpen }) =>
    !isOpen
        ? [
              css`
                  display: none;
                  opacity: 0;
                  ${isOpen &&
                  css`
                      animation: ${fadeOut} 0.35s 0.5s cubic-bezier(0.36, 0, 0.09, 1) forwards;
                  `}
              `,
          ]
        : [
              css`
                  display: flex;
                  z-index: 2;
                  position: absolute;
                  justify-content: center;
                  margin-top: 100px;
                  opacity: 0;

                  margin-left: auto;
                  margin-right: auto;
                  left: 0;
                  right: 0;

                  ${isOpen &&
                  css`
                      animation: ${fadeIn} 0.35s 0.5s cubic-bezier(0.36, 0, 0.09, 1) forwards;
                  `}
              `,
          ],
);

const NavbarMenu = ({ isOpen }: { isOpen: boolean }) => {
    const props = isOpen ? empty : inert;
    const theme = useTheme();

    return (
        <NavbarMenuList>
            <li>
                {/* <CardWrapper as="article" size={CardSize.Medium} color={theme.cardColors.beige}>
                    <CardContent>
                        <CardText>
                            <CardHeading as="header">Sprout is us</CardHeading>
                            <CardParagraph>We've all been in the business for a few years. Colleagues have come and gone. </CardParagraph>
                        </CardText>

                        <MenuCTA as="a" href="/sprout-is-us" small {...props}>
                            Jump to
                        </MenuCTA>
                    </CardContent>
                </CardWrapper> */}
                <Card
                    key={1}
                    buttonText={"Jump to"}
                    initialWidth={CardSize.Medium}
                    color={theme.cardColors.beige}
                    title={"Sprout is us"}
                    text="We've all been in the business for a few years. Colleagues have come and gone."
                    linkTo={""}
                />
            </li>
            <li>
                <CardWrapper as="article" initialWidth={CardSize.Medium} color={theme.cardColors.green}>
                    <CardContent>
                        <CardText>
                            <CardHeading as="header">The vision</CardHeading>
                            <CardParagraph>We've all been in the business for a few years. Colleagues have come and gone. </CardParagraph>
                        </CardText>

                        <MenuCTA as="a" href="/the-vision" small {...props}>
                            Run to
                        </MenuCTA>
                    </CardContent>
                </CardWrapper>
            </li>
            <li>
                <CardWrapper as="article" initialWidth={CardSize.Medium} color={theme.cardColors.grey}>
                    <CardContent>
                        <CardText>
                            <CardHeading as="header">Get in touch</CardHeading>
                            <CardParagraph>We've all been in the business for a few years. Colleagues have come and gone. </CardParagraph>
                        </CardText>

                        <MenuCTA as="a" href="/" small {...props}>
                            Drive to
                        </MenuCTA>
                    </CardContent>
                </CardWrapper>
            </li>
        </NavbarMenuList>
    );
};

function Navbar({ backgroundColor }: Props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.code === "Escape") {
                setIsMenuOpen(false);
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const toggle = useCallback(() => setIsMenuOpen((x) => !x), []);

    return (
        <>
            <Nav backgroundColor={backgroundColor}>
                <Link aria-label="Navigate to start page" to={LinkToPage.StartPage}>
                    <Logo />
                </Link>

                <MenuButton isOpen={isMenuOpen} toggle={toggle} />
                <MenuWrapper data-open={isMenuOpen}>
                    <MenuAreas>
                        <Quadrant>
                            <MenuBackground isOpen={isMenuOpen} />
                        </Quadrant>
                    </MenuAreas>
                </MenuWrapper>
            </Nav>
            <MenuItemWrapper isOpen={isMenuOpen}>
                <ReactFocusLock disabled={!isMenuOpen} returnFocus>
                    <RemoveScroll enabled={isMenuOpen} removeScrollBar={false}>
                        <NavbarMenu isOpen={isMenuOpen} />
                    </RemoveScroll>
                </ReactFocusLock>
            </MenuItemWrapper>
        </>
    );
}

export default Navbar;
