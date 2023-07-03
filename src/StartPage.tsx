import theme from "./emotion.d";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HeadingWithSubheading from "./components/HeadingWithSubheading";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import {Global, ThemeProvider, css} from "@emotion/react";
import CardsMenu from "./components/CardsMenu";
import GetInTouch from "./components/GetInTouch";
import {Gap10} from "./components/Gap";

export function StartPage() {

    return (
        <ThemeProvider theme={theme}>
            <Global
                styles={css`
                    body {
                        background-color: ${theme.backgroundColors.charcoal};
                    }
                `}
            />
            <Navbar backgroundColor={theme.backgroundColors.charcoal}/>
            <Hero />
            <HeadingWithSubheading
                backgroundColor={theme.backgroundColors.charcoal}
                textColor={theme.backgroundColors.livingRoom}
                text="We are Sprout"
                subheading="Welcome to our universe. A growing ecosystem of collaborating people, ideas and initiatives"
            />
            <MainContent backgroundColor={theme.backgroundColors.livingRoom}/>
            <Footer light={false}>
                <Gap10/>
                <GetInTouch/>
            </Footer>
        </ThemeProvider>

    );
}