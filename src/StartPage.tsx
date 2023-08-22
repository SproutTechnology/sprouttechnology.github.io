import theme from "./emotion.d";
import Hero from "./components/section-1/Hero";
import MainContent from "./components/MainContent";
import Footer from "./components/section-3/Footer";
import { ThemeProvider, css } from "@emotion/react";
import GetInTouch from "./components/GetInTouch";
import { Gap10, Gap20, Gap3 } from "./components/helpers/Gap";
import styled from "@emotion/styled";
import BackgroundWaves from "./components/section-1/BackgroundWaves";
import ScrollIndicator from "./components/section-1/ScrollIndicator";
import SectionDividerWaves from "./components/section-1/SectionDividerWaves";
import OneLine from "./components/text-components/OneLine";
import ScriptInit from "./components/scripts/ScriptInit";
import MainContent2 from "./components/section-2/MainContent2";

const AppWrapper = styled.div(() => [
    css`
        #section-2 {
            position: relative;
            z-index: 2;
        }
    `,
]);

export function StartPage() {
    return (
        <AppWrapper>
            <ScriptInit />

            <ThemeProvider theme={theme}>
                <div id="section-1">
                    <div className="strong-fade">
                        <BackgroundWaves />
                        <Hero />
                    </div>

                    <ScrollIndicator />
                    <Gap10 />

                    <OneLine label="We are Sprout. A growing ecosystem of collaborating people, ideas and initiatives." />
                    <Gap3 />

                    <SectionDividerWaves />
                </div>

                <div id="section-2">
                    <MainContent2 />
                    {/* <MainContent /> */}
                </div>

                <div id="section-3">
                    <Footer light={false}>
                        <Gap20 />
                        <GetInTouch />
                    </Footer>
                </div>
            </ThemeProvider>
        </AppWrapper>
    );
}
