

import styled from "@emotion/styled";
import { mq } from "../theme";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function HamburgerMenu({ open, setOpen }: Props) {
    return (
        <Button onClick={() => setOpen(!open)}>
            <FontAwesomeIcon icon={faBars} />
        </Button>
    );
}

export default HamburgerMenu;

const Button = styled.button`
    all : unset;
    color : white;
    cursor : pointer;
    font-size : 2.5rem;
    margin-right :  ${(props) => props.theme.spacing.sm};
    ${mq["sm"]} { 
        display : none;
    }

`;