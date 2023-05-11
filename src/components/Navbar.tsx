import Logo from "../components/Logo"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'


function Navbar() {
  return (
    <nav className="w-full h-34 flex items-center">
      <Logo/>
      <FontAwesomeIcon size="lg" className="ml-auto mr-2 cursor-pointer" icon={faBars} />
    </nav>
  );
}

export default Navbar;
