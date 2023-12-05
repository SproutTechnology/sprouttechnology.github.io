import "@emotion/react";


declare module "@emotion/react" {
    export interface Theme {
        breakpoints : {
            [lg in string]: string;
            [md in string]: string;
            [sm in string]: string;
            [xs in string]: string;
        },
        headline : {
            font : string,
            fontSize : string,
            color : string,
        }
        emphasizedHeadline : {
            font : string,
            fontSize : string,
            color : string,
        }
        logo : {
            font : string,
            fontSize : string,
            color : string,
        },
        link : {
            font : string,
            fontSize : string,
            color : string,
        },
        colors : {
            summerCurtains : string,
            blueWhale : string,
        }
        spacing : {
            [xs in string]: string;
            [sm in string]: string;
            [md in string]: string;
        }
        navbarHeight : string; 
    }
}

