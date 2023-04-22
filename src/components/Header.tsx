import Navbar from "../components/Navbar";
import Showcase from "./Showcase";
function Header() {
  return (
    <div className="header relative h-[45rem] sm:h-[155vw] text-living-room">
      <Navbar />
      <div className="mr-20 ml-20 mt-1">
        <div className="h-[45rem]">
          <Showcase />
        </div>
        <div className="mr-10">
          <h1 className="text-left fluid-h1 whitespace-nowrap">We are Sprout.</h1>
          <p className="text-right">
            Welcome to our universe. A growing ecosystem of collaborationg
            people, ideas and initiatives
          </p>
        </div>
      </div>
    </div>
  );
}

export default Header;
