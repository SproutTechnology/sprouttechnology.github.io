import { Theme } from "@emotion/react";

const theme: Theme = {
    breakpoints: {
        xxl: "2565",
        xl: "1920",
        lg: "1280",
        md: "1024",
        sm: "640",
        xs: "450",
    },
    fontFamily: {
        inter: "Inter",
        bayon: "Bayon",
        azeretMono: "AzeretMono",
    },
    fontSize: {
        /*
        xxs: "0.5rem",
        xs: "1rem",
        sm: "clamp(0.5rem, 5vw, 1.5rem)",
        md: "clamp(1.5rem, 8vw, 4rem)",
        lg: "clamp(4rem, 10vw, 6rem)",
        xl: "clamp(6rem, 12vw, 8rem)",
        */
        xxs: "0.5rem" /* 8px */,
        xs: "1rem" /* 16px */,
        sm: "1.125rem" /* 18px */,
        md: "1.5rem" /* 24px */,
        lg: "2.625rem" /* 42px */,
        xl: "4.5rem" /* 72px */,
    },
    spacing: {
        xs: "0.5rem",
        sm: "1rem",
        md: "2rem",
        lg: "4rem",
        xl: "8rem",
    },
    lineHeight: {
        /*
        xs: "1.5rem",
        sm: "3.5rem",
        md: "4rem",        
        */
        xxs: "0.525rem",
        xs: "1.4rem",
        sm: "1.75rem",
        md: "2.8rem",
        lg: "3.51rem",
        xl: "4.5rem",
    },
    colors: {
        blueWhale: "#3457A5",
        summerCurtains: "#FDFDFD",
        oldTypewriter: "#5E5E5E",
        nightSky: "#0E0E0E",
    },
};

const indexedBreakpoints = theme.breakpoints as { [id in string]: string };

export const mq = Object.keys(theme.breakpoints)
    .map((key) => [key, indexedBreakpoints[key]])
    .reduce(
        (prev, [key, breakpoint]) => {
            prev[key] = `@media (width >= ${breakpoint}px)`;
            return prev;
        },
        {} as { [index: string]: string },
    );

export default theme;
