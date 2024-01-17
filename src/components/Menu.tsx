

import styled from "@emotion/styled";
import NavLink from "./NavLink";
import { mq } from "../theme";

interface Props {
    inverted: boolean;
}

function Menu({inverted} : Props) {
    return (
        <StyledMenu inverted={inverted}>
            <NavLink id={"#OurVision"} title="Vision" subtitle="We are sprout" text="Lorum ipsum" ></NavLink>
            <NavLink id={"#About"} title="About" subtitle="We are sprout" text="Lorum ipsum" ></NavLink>
            <NavLink id={"#OurCases"} title="Cases" subtitle="We are sprout" text="Lorum ipsum" ></NavLink>
            <NavLink id={"#Gallery"} title="Gallery"></NavLink>
        </StyledMenu>
    );
}

export default Menu;

const StyledMenu = styled.div<{inverted: boolean}>`
    display : none;
    justify-content : space-between;
    align-items : center;
    background: ${(props) => props.inverted ? "#d9d9d9" : "transparent"};
    width : 100%;
    padding-left : 5rem;
    padding-right : 5rem;
    ${mq["sm"]} { 
        display : flex;
    }
`;