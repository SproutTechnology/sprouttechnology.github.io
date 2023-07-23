import theme from "./emotion.d";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HeadingWithSubheading from "./components/HeadingWithSubheading";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import { Global, ThemeProvider, css } from "@emotion/react";
import GetInTouch from "./components/GetInTouch";
import { Gap10 } from "./components/Gap";
// import Test from "./components/Test";
import scrollHandler from "./components/scripts/scroll";
import React from "react";
import styled from "@emotion/styled";
import Test2 from "./components/Test2";

const MainDiv = styled.div(() => [
    css`
        // display: inline-block;
        // position: absolute;
        // width: 90%;
        // height: 100vh;
        // margin: 0px;
        // padding: 0px;
        // overflow: scroll;
        // background-color: blue;
        // border: solid 0px purple;
        // top: 0px;

        #dd1 {
            display: block;
            position: fixed;
            height: 100vh;
            width: 100%;

            top: 0vh;
            transition: all 900ms ease;
            text-align: center;
        }

        #dd2 {
            display: block;
            position: fixed;
            height: 100vh;
            width: 100%;
            top: 100vh;

            transition: all 900ms ease;
            text-align: center;
        }

        #dd3 {
            display: block;
            position: fixed;
            height: 100vh;
            width: 100%;

            top: 200vh;
            transition: all 900ms ease;
            text-align: center;
        }
        .scroll-section-2 {
            transform: translateY(-105vh);
            transition: all 900ms ease;
        }
        .scroll-section-3 {
            transform: translateY(-205vh);
            transition: all 900ms ease;
        }
        #dude {
            display: block;
            position: fixed;
            top: 0px;
            height: 20px;
            background-color: white;
            width: 100%;
        }

        .sp1 {
            font-size: 60px;
            line-height: 160px;
            color: white;
            margin-top: 30px;
        }
    `,
]);

const AppWrapper = styled.div(() => [
    css`
        #section-1 {
            position: relative;
            top: -80px;
        }
    `,
]);

export function StartPage() {
    window.onscroll = function () {
        // scrollHandler();
    };

    return (
        // <MainDiv id="maindiv">
        <AppWrapper>
            <ThemeProvider theme={theme}>
                <Global
                    styles={css`
                        body {
                            background-color: ${theme.backgroundColors.charcoal};
                        }
                    `}
                />

                <div id="section-1">
                    <Test2 />
                    <Navbar backgroundColor={theme.backgroundColors.charcoal} />
                    <Hero />
                    <HeadingWithSubheading
                        backgroundColor={theme.backgroundColors.charcoal}
                        textColor={theme.backgroundColors.livingRoom}
                        text="We are Sprout"
                        subheading="Welcome to our universe. A growing ecosystem of collaborating people, ideas and initiatives"
                    />
                </div>

                <div id="section-2">
                    <MainContent backgroundColor={theme.backgroundColors.livingRoom} />
                </div>
                <div id="section-3">
                    <Footer light={false}>
                        <Gap10 />
                        <GetInTouch />
                    </Footer>
                </div>
            </ThemeProvider>
        </AppWrapper>
    );
}

{
    /* <Test /> */
}
