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
            h3 : string,
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
            [CardSize.Large]: "26.5rem",
            [CardSize.Medium]: "16.5rem",
            [CardSize.Small]: "10.25rem",
        },
        height: {
            [CardSize.Large]: "35rem",
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
        p : "clamp(0.75rem, 4cqw, 1rem)",
        h1: "clamp(3rem, 16vw, 6rem)",
        h2: "clamp(1.5rem, 6cqw, 1rem)",
        h3: "clamp(2rem, 8cqw, 4rem)",
        button : "16px"
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
