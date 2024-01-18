import { useState, useEffect } from 'react';
import styled from "@emotion/styled";
import { css } from '@emotion/react'
import Menu from "./Menu";
import HamburgerMenu from "./HamburgerMenu"
import { mq } from "../theme";

interface Props {
    showMenu: boolean,
    currentView: string
}

type ScrollDirection = 'up' | 'down';

function isInverted(currentView: string): boolean {
    return currentView !== '' && currentView !== 'Home';
}

//TODO - Change the img to correct icon
function Navbar({ showMenu, currentView }: Props) {
    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const scrollOffset = 30;
        let prevScrollPos = window.scrollY;
        let totalScrollDiff = 0;
        let prevScrollDirection: ScrollDirection = 'down';
    
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            const scrollDirection = (prevScrollPos > currentScrollPos) ? 'up' : 'down';
    
            if (scrollDirection === prevScrollDirection) {
                totalScrollDiff += (currentScrollPos - prevScrollPos);
            } else {
                totalScrollDiff = 0;
                prevScrollDirection = scrollDirection;
            }
    
            if (Math.abs(totalScrollDiff) > scrollOffset) {
                setVisible(scrollDirection === 'up' ? true : false);
            }
    
            prevScrollPos = currentScrollPos;
        };    

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <Nav inverted={isInverted(currentView)} open={open} visible={visible}>
            {showMenu && (
                <>
                    <SproutLogo href="#Home"><img src="/favicon.ico"></img></SproutLogo>
                    <HamburgerMenu setOpen={setOpen} open={open}></HamburgerMenu>
                    <Menu inverted={isInverted(currentView)} setOpen={setOpen} open={open}></Menu>
                </>
            )}
        </Nav>
    );
}

export default Navbar;

const SproutLogo = styled.a`
    display : block;
    justify-self : flex-start;
    margin-right : auto;
    margin-left : ${(props) => props.theme.spacing.xs};
    ${mq["sm"]} { 
        display : none;
    }
`;

const Nav = styled.nav<{ inverted?: boolean; open: boolean; visible: boolean; }>`
    position : absolute;
    top: auto;
    z-index: 10;
    background: ${(props) => props.open ? "black" : "transparent"};

    display : flex;
    align-items : center;
    flex-wrap: wrap;
    width : 100%;
    justify-content : flex-end;

    & a {
        color : ${(props) => props.theme.colors.summerCurtains};
    }

    ${mq["sm"]} { 
        height: 10rem;
    }

    ${props => props.inverted && css`
        position: fixed;
        top: 0;
        background: black;
        visibility: ${props.visible ? "visible" : "hidden"};

        & a {
            color : ${props.open ? "white" : "black"};
        }        

        ${mq["sm"]} { 
            background: white;

            & a {
                color : black;
            }        
        }
    `}    
`;