import theme from "./theme";
import { ThemeProvider } from "@emotion/react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Navbar></Navbar>
            <Hero></Hero>
        </ThemeProvider>
    );
}

export default App;

