import theme from "./emotion.d";
import Footer from "./components/section-3/Footer";
import styled from "@emotion/styled";
import CardsMenu from "./components/CardsMenu";
import HeroSubPage from "./components/HeroSubPage";
import { ReactNode } from "react";
import { Global, ThemeProvider, css } from "@emotion/react";
import { Gap10 } from "./components/helpers/Gap";
import TitleWithIngress from "./components/text-components/TitleWithIngress";
import ScriptInit from "./components/scripts/ScriptInit";

interface Props {
    heroImage: string;
    title: string;
    children: ReactNode;
}

export function SubPage({ heroImage, title, children }: Props) {
    return (
        <ThemeProvider theme={theme}>
            <ScriptInit />

            <Global
                styles={css`
                    body {
                        background-color: ${theme.backgroundColors.livingRoom};
                    }
                `}
            />

            <HeroSubPage image={heroImage} />
            <ContentSubPage>
                <TitleWithIngress title={title} canGoBack>
                    {children}
                </TitleWithIngress>
            </ContentSubPage>

            <Footer light={true}>
                <Gap10 />
                <TitleWithIngress color={theme.backgroundColors.charcoal} title="Next up">
                    What would you like to know
                </TitleWithIngress>
                <CardsMenu />
            </Footer>
        </ThemeProvider>
    );
}

const ContentSubPage = styled.div`
    background-color: ${(props) => props.theme.backgroundColors.charcoal};
    color: ${(props) => props.theme.backgroundColors.livingRoom};
    padding-left: clamp(1rem, 2vw, 2rem);
    padding-right: clamp(1rem, 2vw, 2rem);
`;
