import { Theme } from "@emotion/react";


const theme : Theme = {
    breakpoints : {
        lg : "1920",
        md : "1280",
        sm : "1024",
        xs : "640"
    },
   
    navbarHeight : "10rem",
   
} 

export const mq = Object.keys(theme.breakpoints)
  .map((key) => [key, theme.breakpoints[key]])
  .reduce((prev, [key, breakpoint]) => {
    prev[key] = `@media (min-width: ${breakpoint}px)`;
    return prev;
  }, {} as { [index: string]: string });
  
export default theme;