

import styled from "@emotion/styled";
import NavLink from "./NavLink";
import { mq } from "../theme";

function Menu() {
    return (
        <StyledMenu>
            <NavLink id={"test"} title="Vision" subtitle="We are sprout" text="Lorum ipsum" ></NavLink>
            <NavLink id={"test"} title="About" subtitle="We are sprout" text="Lorum ipsum" ></NavLink>
            <NavLink id={"test"} title="Cases" subtitle="We are sprout" text="Lorum ipsum" ></NavLink>
            <NavLink id={"test"} title="Gallery"></NavLink>
        </StyledMenu>
    );
}

export default Menu;

const StyledMenu = styled.div`
    display : none;
    justify-content : space-between;
    align-items : center;
    background : transparent;
    width : 100%;
    height: ${(props) => props.theme.navbarHeight};
    padding-left : 5rem;
    padding-right : 5rem;
    ${mq["xs"]} { 
        display : flex;
    }

`;