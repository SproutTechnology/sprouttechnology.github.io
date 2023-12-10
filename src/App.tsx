import theme from "./theme";
import { ThemeProvider } from "@emotion/react";
import { useState } from "react";
import Hero from "./views/Hero";
import Navbar from "./components/Navbar";
import WeAreSprout from "./views/WeAreSprout"
import Wave from "./views/Wave";


function App() {
    
    const [introVisited, setIntroVisited] = useState(false);

    return (
        <ThemeProvider theme={theme}>
            <Navbar></Navbar>
            {!introVisited && <Wave setIntroVisited={setIntroVisited}></Wave>}
            <Hero></Hero>
            <WeAreSprout></WeAreSprout>
        </ThemeProvider>
    );
}

export default App;

