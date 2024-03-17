import theme from "./theme";
import { ThemeProvider } from "@emotion/react";
import { useState, useRef, useEffect } from "react";
import Hero from "./views/Hero";
import Navbar from "./components/Navbar";
import WeAreSprout from "./views/WeAreSprout";
import Wave from "./views/Wave";
import OurVision from "./views/OurVision";
import OurCases from "./views/OurCases";
import Contact from "./views/Contact";
import { useCurrentView } from "./hooks";
import styled from "@emotion/styled";
function App() {
    useCurrentView();

    const [introVisited, setIntroVisited] = useState(false);
    const scrollContainer = useRef(null);

    return (
        <ThemeProvider theme={theme}>
            <ScrollSnapContainer ref={scrollContainer} >
                {!introVisited && <Wave setIntroVisited={setIntroVisited}></Wave>}
                <Navbar introVisited={introVisited} scrollContainer={scrollContainer}></Navbar>
                <Hero></Hero>
                <WeAreSprout></WeAreSprout>
                <OurVision></OurVision>
                <OurCases></OurCases>
                <Contact></Contact>
            </ScrollSnapContainer>
        </ThemeProvider>
    );
}

const ScrollSnapContainer = styled.div`
    position : relative;
    scroll-snap-type: y mandatory;
    height : 100%;
    scroll-behavior: smooth;
    overflow : auto;
    > *  {
        scroll-snap-align: start;
    }
`;


export default App;
