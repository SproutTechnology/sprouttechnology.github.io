import theme from "./theme";
import { ThemeProvider } from "@emotion/react";
import Hero from "./views/Hero";
import Navbar from "./components/Navbar";
import WeAreSprout from "./views/WeAreSprout";
import Wave from "./views/Wave";
import OurVision from "./views/OurVision";
//import OurCases from "./views/OurCases";
import Contact from "./views/Contact";
import { useCurrentView } from "./hooks";

function App() {
    useCurrentView();

    return (
        <ThemeProvider theme={theme}>
            <Wave />
            <Navbar showMenu={true}></Navbar>
            <Hero />
            <WeAreSprout />
            <OurVision />
            {/*<OurCases></OurCases>*/}
            <Contact />
        </ThemeProvider>
    );
}

export default App;
