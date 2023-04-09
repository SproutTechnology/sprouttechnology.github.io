import { ReactNode } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header"
interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className="flex flex-col w-full bg-clean-sheets">  
      <Header/>
      <main className="basis-full pr-10 pl-10 flex-col gap-y-24">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
