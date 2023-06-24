import "@emotion/react";
import CardSize from "./enums/CardSize";
import Colors from "./enums/Colors";

declare module "@emotion/react" {
    export interface Theme {
        backgroundColors: {
            charcoal: string;
            livingRoom: string;
        };
        borderRadius: string;
        cardSizes: {
            width: {
                [size: string]: string;
            };
            height: {
                [size: string]: string;
            };
        };
        buttonColors: {
            hover: string;
        };
        cardColors: {
            beige: string;
            brown: string;
            green: string;
            grey: string;
        };
        fontSize: {
            p: string;
            h1: string;
            h2: string;
            button: string;
        };
        spacing: {
            small: string;
            medium: string;
            large: string;
            xl: string;
            xxl: string;
            xxxl: string;
        };
    }
}

export default {
    backgroundColors: {
        charcoal: "#1D1D1D",
        livingRoom: "#E5DBD1",
    },
    borderRadius: "2rem",
    cardSizes: {
        width: {
            [CardSize.Large]: "21.5rem",
            [CardSize.Medium]: "16.5rem",
            [CardSize.Small]: "10.25rem",
        },
        height: {
            [CardSize.Large]: "30rem",
            [CardSize.Medium]: "25rem",
            [CardSize.Small]: "16.5rem",
        },
    },
    buttonColors: {
        hover: "#48413A",
    },
    cardColors: {
        beige: Colors.beige,
        brown: Colors.brown,
        green: Colors.green,
        grey: Colors.grey,
    },
    fontSize: {
        p: "16px",
        h1: "96px",
        h2: "32px",
        button: "16px",
    },
    spacing: {
        small: "0.5rem",
        medium: "1rem",
        large: "1.5rem",
        xl: "3rem",
        xxl: "5rem",
        xxxl: "8rem",
    },
};
