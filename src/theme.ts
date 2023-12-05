import { Theme } from "@emotion/react";

const colors = {
  blueWhale : "#435D96",
  summerCurtains : "#FDFDFD"
}

const theme : Theme = {
    breakpoints : {
        lg : "1920",
        md : "1280",
        sm : "1024",
        xs : "640"
    },
    headline : {
      font : "Bayon",
      fontSize : 'clamp(0.5rem, 10vw, 3rem)',
      color : colors.blueWhale
    },
    emphasizedHeadline : {
      font : "Bayon",
      fontSize : 'clamp(4rem, 10vw, 5rem)',
      color : colors.blueWhale
    },
    logo : {
      font : "Arial",
      fontSize :  "clamp(2rem,20vw,15rem)",
      color : colors.summerCurtains
    },
    link : {
      font : "AzeretMono",
      fontSize : "1rem",
      color : colors.summerCurtains,

    },
    spacing : {
      xs : "0.5rem",
      sm : "1rem",
      md: "2rem",
    },
    colors : {
      ...colors
    },
   
 
   
} 

export const mq = Object.keys(theme.breakpoints)
  .map((key) => [key, theme.breakpoints[key]])
  .reduce((prev, [key, breakpoint]) => {
    prev[key] = `@media (min-width: ${breakpoint}px)`;
    return prev;
  }, {} as { [index: string]: string });
  
export default theme;