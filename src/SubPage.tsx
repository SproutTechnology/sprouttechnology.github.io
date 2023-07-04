import theme from "./emotion.d";
import HeadingWithSubheading from "./components/HeadingWithSubheading";
import Footer from "./components/Footer";
import styled from "@emotion/styled";
import CardsMenu from "./components/CardsMenu";
import HeroSubPage from "./components/HeroSubPage";
import {ReactNode} from "react";
import {Global, ThemeProvider, css} from "@emotion/react";


interface Props {
    heroImage: string
    title: string
    children: ReactNode
}

export function SubPage({heroImage, title, children} : Props) {

    return (
        <ThemeProvider theme={theme}>
            <Global
                styles={css`
                    body {
                        background-color: ${theme.backgroundColors.livingRoom};
                    }
                `}
            />

            <HeroSubPage image={heroImage}/>

            <ContentSubPage>

                <ContentInner>
                    <Title>{title}</Title>
                    <BodyTextHolder>
                        {children}
                        <Gap5/>
                    </BodyTextHolder>
                </ContentInner>

            </ContentSubPage>

            <Footer light={true}>
                <Gap10/>
                <HeadingWithSubheading
                    backgroundColor={"#0000"}
                    textColor={theme.backgroundColors.charcoal}
                    text="Next up"
                    subheading="What would you like to know"
                />
                <CardsMenu/>
            </Footer>
        </ThemeProvider>

    );
}


const ContentSubPage = styled.div`
  background-color: ${props => props.theme.backgroundColors.charcoal};
  color: ${props => props.theme.backgroundColors.livingRoom};
  padding-left: clamp(1rem, 2vw, 2rem);
  padding-right: clamp(1rem, 2vw, 2rem);
`

const ContentInner = styled.div`
  max-width : 40rem;
  margin: auto;
`

const Title = styled.h1`
  font-size: ${props => props.theme.fontSize.h1};
  color : ${props => props.color};
  margin : unset;
`

const BodyTextHolder = styled.div`
    font-size: ${(props) => props.theme.fontSize.p};
    padding-left: clamp(1rem, 6vw, 8rem);
`

const Gap5 = styled.div`
    height: 5rem;
`


const Gap10 = styled.div`
    height: 10rem;
`

