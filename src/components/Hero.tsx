import Container from "./Container";
import Showcase from "./Showcase";
function Hero() {
  return (
    <div>
    <div className="@container  bg-charcoal  flex flex-col h-[100vh] ">
     <Container>  
      <div className="min-h-0 basis-2/5 ">
        <Showcase />
      </div>
      <div className="p-10 min-h-0">
        <h1 className="whitespace-nowrap">We are Sprout.</h1>
        <h2 className=" text-right">
          Welcome to our universe. A growing ecosystem of collaborationg people,
          ideas and initiatives
        </h2>
      </div>
      </Container>
      
    </div>
    <div className="bg-hero-pattern h-[20vw] bg-no-repeat bg-contain"> </div>
    </div>
  );
}

export default Hero;
