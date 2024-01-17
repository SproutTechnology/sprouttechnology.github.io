import { Theme } from "@emotion/react";


const theme : Theme = {
    breakpoints : {
        xxl : "2565",
        xl : "1920",
        lg : "1280",
        md : "1024",
        sm : "640",
        xs : "450"
    },
    fontFamily : {
      bayon : "Bayon",
      azeretMono : "AzeretMono",
    },
    fontSize : {
      xs : "1rem",
      sm : "clamp(0.5rem, 5vw, 1.5rem)",
      md : "clamp(0.5rem, 8vw, 4rem)",
      lg : "clamp(4rem, 10vw, 6rem)"
    },
    spacing : {
      xs : "0.5rem",
      sm : "1rem",
      md: "2rem",
      lg : "4rem",
      xl : "8rem",
    },
    lineHeight : {
      xs : "1.5rem",
      sm : "3.5rem",
      md : "4rem"
    },
    colors : {
      blueWhale : "#435D96",
      summerCurtains : "#FDFDFD",
      oldTypewriter: "#5E5E5E",
      nightSky: "#0E0E0E"
    },
} 

const indexedBreakpoints = theme.breakpoints as {[id in string] : string}


export const mq = Object.keys(theme.breakpoints)
  .map((key) => [key, indexedBreakpoints[key]])
  .reduce((prev, [key, breakpoint]) => {
    prev[key] = `@media (min-width: ${breakpoint}px)`;
    return prev;
  }, {} as { [index: string]: string });
  
export default theme;