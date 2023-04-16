import Logo from "../components/Logo"

function Footer() {
  return (
    <footer className="bg-stone-900 w-full flex h-96 flex-col p-4 gap-2">
        <div className="flex sm:ml-auto mt-auto flex-col">
            <Logo/>
            <p className="text-center">© Copyright 2023 Sprout Technology AB</p>
        </div>
    </footer>
  );
}

export default Footer;
