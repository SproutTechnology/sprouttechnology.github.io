import { ReactNode } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className="flex flex-col w-full gap-12">
      <Header />
      <main className="basis-full flex pr-10 pl-10 flex-col gap-12 sm:gap-48 main">
       {children} 
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
