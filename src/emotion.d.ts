import "@emotion/react";

declare module "@emotion/react" {
    export interface Theme {
        breakpoints : {
            [xs in string]: string;
            [sm in string]: string;
            [md in string]: string;
            [lg in string]: string;
        },
        fontFamily : {
            bayon : string, 
            azeretMono : string},
        fontSize : { 
            [xs in string]: string;
            [sm in string]: string;
            [md in string]: string;
            [lg in string]: string;
        },
        colors : {
            summerCurtains : string,
            blueWhale : string,
        },
        lineHeight : {
            sm : string,
            md : string,
        }
        spacing : {
            [xs in string]: string;
            [sm in string]: string;
            [md in string]: string;
            [lg in string]: string;
            [xl in string]: string;
        }
    }
}

