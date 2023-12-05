

import styled from "@emotion/styled";
import { mq } from "../theme";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


function HamburgerMenu() {
    return (
        <Button>   
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
    ${mq["xs"]} { 
        display : none;
    }

`;