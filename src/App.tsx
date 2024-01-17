import theme from "./theme";
import { ThemeProvider } from "@emotion/react";
import { useState, useEffect, } from "react";
import Hero from "./views/Hero";
import Navbar from "./components/Navbar";
import WeAreSprout from "./views/WeAreSprout"
import Wave from "./views/Wave";
import OurVision from "./views/OurVision"
import OurCases from "./views/OurCases"
import { useCurrentView } from "./hooks";

function App() {

    const currentView = useCurrentView();
    
    const [introVisited, setIntroVisited] = useState(false);
    const [scrollPassed100vh, setScrolledPass100Vh] = useState(false);

    const handleScroll = () => {
        if (!scrollPassed100vh && window.scrollY >= window.innerHeight) {
            setScrolledPass100Vh(true)
            window.removeEventListener('scroll', handleScroll)
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <ThemeProvider theme={theme}>
            <Wave setIntroVisited={setIntroVisited}></Wave>
            <Navbar showMenu={introVisited || scrollPassed100vh} currentView={currentView}></Navbar>
            <Hero></Hero>
            <WeAreSprout></WeAreSprout>
            <OurVision></OurVision>
            <OurCases></OurCases>
        </ThemeProvider>
    );
}

export default App;

