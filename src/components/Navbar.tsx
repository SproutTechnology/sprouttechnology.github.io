import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import Menu from "./Menu";
import HamburgerMenu from "./HamburgerMenu";
import { mq } from "../theme";
import NavLink from "./NavLink";

interface Props {
    showMenu: boolean;
}

function Navbar({ showMenu }: Props) {
    function handleOpen(open: boolean) {
        if (open) {
            document.documentElement.classList.add("fullscreen-modal");
        } else {
            document.documentElement.classList.remove("fullscreen-modal");
        }
        setOpen(open);
    }

    const [fixed, setFixed] = useState(false);
    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        type ScrollDirection = "up" | "down";

        const scrollOffset = 50;
        const visibleOffset = -100;
        const fixedOffset = 0;

        let prevScrollPos = window.scrollY;
        let totalScrollDiff = 0;
        let prevScrollDirection: ScrollDirection = "down";

        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            const scrollDirection = prevScrollPos > currentScrollPos ? "up" : "down";
            let alwaysVisible = false;

            // Handle fixed/static menu
            const homeRect = document.getElementById("Home")?.getBoundingClientRect();
            if (homeRect) {
                if (homeRect.top > visibleOffset) {
                    alwaysVisible = true;
                }

                if (homeRect.top < fixedOffset && scrollDirection == "up") {
                    setFixed(true);
                } else {
                    setFixed(false);
                }
            }

            if (scrollDirection === prevScrollDirection) {
                totalScrollDiff += currentScrollPos - prevScrollPos;
            } else {
                totalScrollDiff = 0;
                prevScrollDirection = scrollDirection;
            }

            if (Math.abs(totalScrollDiff) > scrollOffset || alwaysVisible) {
                setVisible(scrollDirection === "up" ? true : alwaysVisible);
            }

            prevScrollPos = currentScrollPos;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <Nav fixed={fixed} open={open} visible={visible}>
                {showMenu && (
                    <>
                        <NavHeader>
                            <NavLink id={"#Contact"} title="Contact" subtitle="OUR DETAILS" text="AND WHO TO REACH"></NavLink>
                            <HamburgerMenu setOpen={handleOpen} open={open}></HamburgerMenu>
                        </NavHeader>
                        <Menu setOpen={handleOpen} open={open}></Menu>
                    </>
                )}
            </Nav>
        </>
    );
}

export default Navbar;

const NavHeader = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;

    ${mq["sm"]} {
        display: none;
    }
`;

const Nav = styled.nav<{ fixed: boolean; open: boolean; visible: boolean }>`
    position: absolute;
    top: auto;
    z-index: 10;
    background: ${(props) => (props.open ? "black" : "transparent")};
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;

    justify-content: flex-start;
    padding: ${(props) => props.theme.spacing.sm};
    transition: opacity 0.2s linear;
    opacity: ${(props) => (props.visible ? "1" : "0")};

    ${(props) =>
        props.fixed &&
        css`
            position: fixed;
            top: 0;
            background: black;
        `}

    ${(props) =>
        props.open &&
        css`
            position: fixed;
            top: 0;
            width: 100%;
            height: 100%;
            background-image: url("/heading.svg");
            background-position: bottom;
            background-repeat: no-repeat;
            background-size: contain;
            background-origin: content-box;

            ${mq["sm"]} {
                height: auto;
                background-image: none;
            }
        `}
`;
