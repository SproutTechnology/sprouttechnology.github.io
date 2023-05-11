import Navbar from "../components/Navbar";
import Showcase from "./Showcase";
function Header() {
  return (
    <div className="@container bg-hero-pattern pr-10 pl-10 pb-10 pt-10 flex flex-col h-[160vh]">
      <Navbar />

      <div className="min-h-0 basis-2/5 my-40">
        <Showcase />
      </div>

      <div className="flex flex-col">
        <h1 className="whitespace-nowrap text-center">We are Sprout.</h1>
        <h2 className="max-w-2xl ml-[50%]">
          Welcome to our universe. A growing ecosystem of collaborationg people,
          ideas and initiatives
        </h2>
      </div>
    </div>
  );
}

export default Header;
