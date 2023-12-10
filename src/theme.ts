import { Theme } from "@emotion/react";

const theme : Theme = {
    breakpoints : {
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
      md : "clamp(0.5rem, 10vw, 4rem)",
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
      sm : "3.5rem",
      md : "4rem"
    },
    colors : {
      blueWhale : "#435D96",
      summerCurtains : "#FDFDFD"
    },
   
 
   
} 

export const mq = Object.keys(theme.breakpoints)
  .map((key) => [key, theme.breakpoints[key]])
  .reduce((prev, [key, breakpoint]) => {
    prev[key] = `@media (min-width: ${breakpoint}px)`;
    return prev;
  }, {} as { [index: string]: string });
  
export default theme;