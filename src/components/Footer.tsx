import Logo from "../components/Logo";
import CardsMenu from "./CardsMenu";
import Container from "./Container";
function Footer() {
  return (
    <footer >
       <div className="bg-footer bg-bottom h-[20vw] bg-no-repeat bg-contain"> </div>
      <div className="bg-charcoal  w-full flex h-[75vh] flex-col justify-around gap-2 footer">
      <Container>
      <div className="mt-40 basis-full">
        <CardsMenu></CardsMenu>
      </div>
      <div className="flex justify-end">
      <div className="flex p-4 flex-col">
        <Logo />
        <p className="text-center">© Copyright 2023 Sprout Technology AB</p>
      </div>
      </div>
      </Container>
      </div>
     
    
    </footer>
  );
}

export default Footer;
