import theme from "./theme";
import { ThemeProvider } from "@emotion/react";
import { useState } from "react";
import Hero from "./views/Hero";
import Navbar from "./components/Navbar";
import WeAreSprout from "./views/WeAreSprout";
import Wave from "./views/Wave";
import OurVision from "./views/OurVision";
import OurCases from "./views/OurCases";
import { useCurrentView } from "./hooks";

function App() {
    useCurrentView();

    const [introVisited, setIntroVisited] = useState(false);

    return (
        <ThemeProvider theme={theme}>
            {!introVisited && <Wave setIntroVisited={setIntroVisited}></Wave>}
            <Navbar showMenu={true}></Navbar>
            <Hero></Hero>
            <WeAreSprout></WeAreSprout>
            <OurVision></OurVision>
            <OurCases></OurCases>
        </ThemeProvider>
    );
}

export default App;
