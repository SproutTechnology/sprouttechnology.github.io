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
        };
        fontFamily: {
            inter: string;
            bayon: string;
            azeretMono: string;
        };
        fontSize: {
            xxs: string;
            xs: string;
            sm: string;
            md: string;
            lg: string;
            xl: string;
        };
        colors: {
            summerCurtains: string;
            blueWhale: string;
            oldTypewriter: string;
            nightSky: string;
        };
        lineHeight: {
            xxs: string;
            xs: string;
            sm: string;
            md: string;
            lg: string;
            xl: string;
        };
        spacing: {
            xs: string;
            sm: string;
            md: string;
            lg: string;
            xl: string;
        };
    }
}
