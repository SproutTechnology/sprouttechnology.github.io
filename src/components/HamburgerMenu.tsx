import styled from "@emotion/styled";
import { mq } from "../theme";

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faBars } from '@fortawesome/free-solid-svg-icons';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
}

function HamburgerMenu({ open, setOpen }: Props) {
    return (
        <Button onClick={() => setOpen(!open)} open={open}>
            {open ? "Close" : "Menu"}
            {/*<FontAwesomeIcon icon={faBars} />*/}
        </Button>
    );
}

export default HamburgerMenu;

const Button = styled.button<{ open: boolean }>`
    all: unset;
    color: white;
    cursor: pointer;
    font-size: ${(props) => props.theme.fontSize.md};
    text-transform: uppercase;
    ${mq["sm"]} {
        display: none;
    }
`;
