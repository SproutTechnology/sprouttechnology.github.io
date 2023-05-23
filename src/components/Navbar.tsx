import Logo from "../components/Logo"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { css, Theme } from "@emotion/react"
const navbar = (theme : Theme )=> css`
  background-color : ${theme.color.charcoal};
  display : flex;
  align-items : center;
  height : 10vh;
  
`

function Navbar() {
  return (
    <nav css={navbar}>
      <Logo/>
      <FontAwesomeIcon size="lg" className="ml-auto mr-2 cursor-pointer" icon={faBars} />
    </nav>
  );
}

export default Navbar;
