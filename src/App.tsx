import theme from "./theme";
import { ThemeProvider } from "@emotion/react";
import { useState, useEffect, } from "react";
import Hero from "./views/Hero";
import Navbar from "./components/Navbar";
import WeAreSprout from "./views/WeAreSprout"
import Wave from "./views/Wave";
import OurVision from "./views/OurVision"


function App() {

    const [introVisited, setIntroVisited] = useState(false);
    const [scrollPassed100vh, setScrolledPass100Vh] = useState(false);

    const handleScroll = () => {
        if(!scrollPassed100vh && window.scrollY >= window.innerHeight) {
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
            <Navbar showMenu={introVisited || scrollPassed100vh }></Navbar>
              <Wave setIntroVisited={setIntroVisited}></Wave>
            <Hero></Hero>
            <WeAreSprout></WeAreSprout>
            <OurVision></OurVision>
        </ThemeProvider>
    );
}

export default App;

