import theme from "./theme";
import { ThemeProvider } from "@emotion/react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import WeAreSprout from "./components/WeAreSprout"
import Wave from "./components/Wave";
function App() {
    return (
        <ThemeProvider theme={theme}>
            <Navbar></Navbar>
            <Wave></Wave>
            <Hero></Hero>
            <WeAreSprout></WeAreSprout>
        </ThemeProvider>
    );
}

export default App;

