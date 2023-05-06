import Logo from "../components/Logo";
import CardsMenu from "./CardsMenu";
function Footer() {
  return (
    <footer className="bg-footer w-full flex h-[75vh] flex-col justify-around gap-2 footer">
      <div className="mt-40 basis-full">
        <CardsMenu></CardsMenu>
      </div>
      <div className="flex justify-end">
      <div className="flex p-4 flex-col">
        <Logo />
        <p className="text-center">© Copyright 2023 Sprout Technology AB</p>
      </div>
      </div>
     
    </footer>
  );
}

export default Footer;
