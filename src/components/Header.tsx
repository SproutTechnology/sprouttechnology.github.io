import Navbar from "../components/Navbar";
import Showcase from "./Showcase";
function Header() {
  return (
    <div className="header h-[80rem]">
      <Navbar />
      <div className="mr-20 ml-20 mt-1">
        <Showcase />
        <div className="mr-10">
        <h1 className="text-left">We are Sprout.</h1>
        <p className="text-right">Welcome to our universe. A growing ecosystem of collaborationg people, ideas and initiatives</p>
        </div>
       
      </div>
    </div>
  );
}

export default Header;
