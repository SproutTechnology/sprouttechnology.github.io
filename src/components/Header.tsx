import Navbar from "../components/Navbar";
import Showcase from "./Showcase";
function Header() {
  return (
    <div className="@container bg-hero-pattern flex flex-col h-[230vh]">
     
      <Navbar />
    
      <div className="min-h-0 basis-2/5">
        <Showcase />
      </div>
      <div className="p-10 pr-40 pl-40 min-h-0">
        <h1 className="whitespace-nowrap">We are Sprout.</h1>
        <h2 className="text-right">
          Welcome to our universe. A growing ecosystem
        </h2>
        <h2 className="text-right">
            of collaborating people, ideas and initiatives
        </h2>
      </div>
    </div>
  );
}

export default Header;
