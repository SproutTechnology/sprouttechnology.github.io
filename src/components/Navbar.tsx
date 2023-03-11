import Logo from "../components/Logo"

function Navbar() {
  return (
    <nav className="fixed top-0 w-full h-16 bg-gray-400 flex items-center p-2 shadow-xl">
       <Logo/>
    </nav>
  );
}

export default Navbar;
