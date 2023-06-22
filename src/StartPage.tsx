import theme from "./emotion.d";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HeadingWithSubheading from "./components/HeadingWithSubheading";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import {Global, ThemeProvider, css} from "@emotion/react";
import CardsMenu from "./components/CardsMenu";
import {useEffect, useRef} from "react";

export function StartPage() {

    useEffect(() => {
        window.scrollTo(0,0)
    }, []);

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
            <MainContent backgroundColor={theme.backgroundColors.livingRoom}/>
            <HeadingWithSubheading
                backgroundColor={theme.backgroundColors.livingRoom}
                textColor={theme.backgroundColors.charcoal}
                text="Next up"
                subheading="What would you like to know"
            />
            <Footer light={false}>
                <CardsMenu/>
            </Footer>
        </ThemeProvider>

    );
}