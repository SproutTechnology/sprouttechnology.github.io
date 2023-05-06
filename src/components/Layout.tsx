import {ReactNode} from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

interface Props {
    children: ReactNode;
}

function Layout({children}: Props) {
    return (
        <main className="flex flex-col gap-12 sm:gap-48 main">
            <Header/>
            <div className="basis-full pr-20 pl-20 flex flex-col sm:gap-48">
                {children}
            </div>
            <Footer/>
        </main>
    );
}

export default Layout;
