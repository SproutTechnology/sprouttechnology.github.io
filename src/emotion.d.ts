import "@emotion/react";

declare module "@emotion/react" {
    export interface Theme {
        breakpoints: {
            xs: string;
            sm: string;
            md: string;
            lg: string;
            xl: string;
            xxl: string;
        },
        fontFamily: {
            bayon: string;
            azeretMono: string;
        },
        fontSize: {
            xs: string;
            sm: string;
            md: string;
            lg: string;
        },
        colors: {
            summerCurtains: string;
            blueWhale: string;
            oldTypewriter: string;
            nightSky: string;
        },
        lineHeight: {
            xs: string;
            sm: string;
            md: string;
        }
        spacing: {
            xs: string;
            sm: string;
            md: string;
            lg: string;
            xl: string;
        }
    }
}

