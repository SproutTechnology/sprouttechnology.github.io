

import styled from "@emotion/styled";
import NavLink from "./NavLink";

function Navbar() {
    return (
        <Nav>   
            <NavLink id={"test"} title="Vision" subtitle="We are sprout" text="Lorum ipsum" ></NavLink>
            <NavLink id={"test"} title="About" subtitle="We are sprout" text="Lorum ipsum" ></NavLink>
            <NavLink id={"test"} title="Cases" subtitle="We are sprout" text="Lorum ipsum" ></NavLink>
            <NavLink id={"test"} title="Gallery"  ></NavLink>
        </Nav>
    );
}

export default Navbar;

const Nav = styled.nav`
    position : fixed;
    display : flex;
    justify-content : space-between;
    align-items : center;
    background : transparent;
    width : 100%;
    height: ${(props) => props.theme.navbarHeight};
    padding-left : 5rem;
    padding-right : 5rem;

`;