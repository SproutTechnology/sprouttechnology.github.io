

import styled from "@emotion/styled";
import { css } from '@emotion/react'
import Menu from "./Menu";
import HamburgerMenu from "./HamburgerMenu"
import { mq } from "../theme";

interface Props {
    showMenu: boolean,
    currentView: string
}

function isInverted(currentView: string): boolean {
    return currentView !== '';
}

//TODO - Change the img to correct icon
function Navbar({ showMenu, currentView }: Props) {
    return (
        <Nav inverted={isInverted(currentView)}>
            {showMenu && (
                <>
                    <img src="/favicon.ico"></img>
                    <HamburgerMenu></HamburgerMenu>
                    <Menu inverted={isInverted(currentView)}></Menu>
                </>
            )}
        </Nav>
    );
}

export default Navbar;

const Nav = styled.nav<{ inverted?: boolean; }>`
    position : absolute;
    top: auto;
    background: transparent;

    display : flex;
    align-items : center;
    width : 100%;
    height : 5rem;
    justify-content : flex-end;
    transition: all .5s ease-out;

    ${mq["xs"]} { 
        height: 10rem;
    }

    & a {
        color : ${(props) => props.theme.colors.summerCurtains};
        transition: all .5s ease-out;
    }

    ${props => props.inverted && css`
        position: fixed;
        top: 0;
        /*background: #d9d9d9;*/

        & a {
            color : #000;
        }        
    `}    

    & img {
        display : block;
        justify-self : flex-start;
        margin-right : auto;
        margin-left : ${(props) => props.theme.spacing.xs};
        ${mq["sm"]} { 
            display : none;
        }
    }
`;