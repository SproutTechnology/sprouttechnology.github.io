

import styled from "@emotion/styled";
import Menu from "./Menu";
import HamburgerMenu from "./HamburgerMenu"
import { mq } from "../theme";

interface Props {
    showMenu : boolean
}

//TODO - Change the img to correct icon
function Navbar({showMenu } : Props) {
    return (
        <Nav>
            {showMenu && ( 
            <>
                <img src="/favicon.ico"></img> 
                <HamburgerMenu></HamburgerMenu>
                <Menu></Menu> 
            </>
            )} 
        </Nav>
    );
}

export default Navbar;

const Nav = styled.nav`
    position : fixed;
    display : flex;
    align-items : center;
    background : transparent;
    width : 100%;
    height : 5rem;
    justify-content : flex-end;
    ${mq["xs"]} { 
        height: 10rem;
    }

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