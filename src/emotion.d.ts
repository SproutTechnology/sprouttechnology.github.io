import "@emotion/react";


declare module "@emotion/react" {
    export interface Theme {
        breakpoints : {
            [lg in string]: string;
            [md in string]: string;
            [sm in string]: string;
            [xs in string]: string;
        },
        navbarHeight : string; 
    }
}

