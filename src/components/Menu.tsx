import styled from "@emotion/styled";
import { css } from "@emotion/react";
import NavLink from "./NavLink";
import { mq } from "../theme";

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
}

function Menu({ open, setOpen }: Props) {
    return (
        <StyledMenu open={open} onClick={() => setOpen(false)}>
            <NavLink id={"#Home"} title="Home" subtitle="THE STARTING POINT" text="AND WHERE TO GO"></NavLink>
            <NavLink id={"#About"} title="About" subtitle="OUR ORIGINS" text="AND WHAT WE DO"></NavLink>
            <NavLink id={"#OurVision"} title="Vision" subtitle="OUR DESTINATION" text="AND WHERE WE CAN TAKE YOU"></NavLink>
            {/*<NavLink id={"#OurCases"} title="Cases" subtitle="OUR COLLABORATIONS" text="AND HOW THEY HAPPENED"></NavLink>*/}
            <NavLink id={"#Contact"} title="Contact" subtitle="OUR DETAILS" text="AND WHO TO REACH"></NavLink>
        </StyledMenu>
    );
}

export default Menu;

const StyledMenu = styled.div<{ open: boolean }>`
    display: none;
    width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    padding: 0;

    ${mq["sm"]} {
        display: flex;
        position: static;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        padding: 0 3rem;
    }

    ${mq["lg"]} {
        padding: 0 5rem;
    }

    ${(props) =>
        props.open &&
        css`
            display: flex;
        `}
`;
