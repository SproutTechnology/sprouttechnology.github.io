

import styled from "@emotion/styled";
import NavLink from "./NavLink";
import { mq } from "../theme";

interface Props {
    inverted: boolean;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Menu({inverted, open, setOpen} : Props) {
    return (
        <StyledMenu inverted={inverted} open={open} onClick={() => setOpen(false)}>
            <NavLink id={"#OurVision"} title="Vision" subtitle="We are sprout" text="Lorum ipsum" ></NavLink>
            <NavLink id={"#About"} title="About" subtitle="We are sprout" text="Lorum ipsum" ></NavLink>
            <NavLink id={"#OurCases"} title="Cases" subtitle="We are sprout" text="Lorum ipsum" ></NavLink>
            <NavLink id={"#Gallery"} title="Gallery"></NavLink>
        </StyledMenu>
    );
}

export default Menu;

const StyledMenu = styled.div<{inverted: boolean, open: boolean}>`
    display : ${(props) => props.open ? "block" : "none"};
    justify-content : space-between;
    align-items : center;
    background: black;
    transition: all .5s ease-out;
    width : 100%;
    padding-left : 5rem;
    padding-right : 5rem;
    ${mq["sm"]} { 
        background: ${(props) => props.inverted ? "#d9d9d9" : "transparent"};
        display : flex;
    }
`;