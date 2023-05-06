import Navbar from "../components/Navbar";
import Showcase from "./Showcase";
function Header() {
  return (
    <div className="@container bg-hero-pattern flex flex-col h-[130vh]">
     
      <Navbar />
    
      <div className="min-h-0 basis-2/5">
        <Showcase />
      </div>
      <div className="p-10 min-h-0">
        <h1 className="whitespace-nowrap">We are Sprout.</h1>
        <h2 className=" text-right">
          Welcome to our universe. A growing ecosystem of collaborationg people,
          ideas and initiatives
        </h2>
      </div>
    </div>
  );
}

export default Header;
