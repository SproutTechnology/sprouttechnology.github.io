import Logo from "../components/Logo"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import styled from "@emotion/styled"

const Nav = styled.nav`
  display : flex;
  background-color : ${(props) => props.theme.backgroundColors.charcoal};
  padding-left :  ${(props) => props.theme.spacing.large};
  padding-right : ${(props) => props.theme.spacing.large};
  align-items : center;
  justify-content : space-between;
  height : 10vh;
`


function Navbar() {
  return (
    <Nav>
      <Logo></Logo>
      <FontAwesomeIcon size="lg" color="white" className="ml-auto mr-2 cursor-pointer" icon={faBars} />
    </Nav>
  );
}

export default Navbar;
