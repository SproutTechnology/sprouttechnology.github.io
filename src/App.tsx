import MainContent from "./components/MainContent";
import { Global, ThemeProvider, css } from "@emotion/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import theme from "./emotion.d";
import HeadingWithSubheading from "./components/HeadingWithSubheading";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Global
                styles={css`
                    body {
                        background-color: ${theme.backgroundColors.charcoal};
                    }
                `}
            />
            <Navbar />
            <Hero />
            <HeadingWithSubheading
                backgroundColor={theme.backgroundColors.charcoal}
                textColor={theme.backgroundColors.livingRoom}
                text="We are Sprout"
                subheading="Welcome to our universe. A growing ecosystem of collaborating people, ideas and initiatives"
            />
            <MainContent />
            <HeadingWithSubheading
                backgroundColor={theme.backgroundColors.livingRoom}
                textColor={theme.backgroundColors.charcoal}
                text="Next up"
                subheading="What would you like to know"
            />
            <Footer />
        </ThemeProvider>
    );
}

export default App;
