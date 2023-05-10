import { ReactNode } from "react";
import Footer from "../components/Footer";
import Hero from "./Hero";
import Navbar from "./Navbar"
import Container  from "./Container";
interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div >
      <Navbar/>
      <div className=" flex flex-col gap-12">
        <Hero />
        <Container>
        <main className="basis-full flex pr-10 pl-10 flex-col gap-12 sm:gap-48 main">
        
        {children} 
       
        </main>
        </Container>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
