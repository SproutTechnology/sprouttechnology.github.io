import '@emotion/react'
import CardSize from './enums/CardSize'
declare module '@emotion/react' {
  export interface Theme {
    backgroundColors: {
      charcoal: string,
      livingRoom: string
    },
    borderRadius : string,
    cardSizes: {
      width: {
        [size : string]: string,

      },
      height: {
        [size : string]: string,
      }
    },
    cardColors: {
      beige: string,
      brown: string,
      green: string,
      grey: string
    },
    fontSize: {
      h1: string,
      h2: string,
    },
    spacing: {
      small: string
      medium: string
      large: string
      xl: string
      xxl: string
      xxxl: string
    }
  }
}

export default {
    backgroundColors: {
        charcoal: '#1D1D1D',
        livingRoom: "#E5DBD1",
    },
    borderRadius : "2rem",
    cardSizes: {
        width: {
            [CardSize.Large]: "21.5rem",
            [CardSize.Medium]: "12rem",
            [CardSize.Small]: "10.25rem"
        },
        height : {
            [CardSize.Large]: "30rem",
            [CardSize.Medium]: "18rem",
            [CardSize.Small]: "16.5rem"
        }

    },
    cardColors: {
        beige: "#D7D0C2",
        brown: "#C8B9AB",
        green: "#AAB495",
        grey: "#6E686D"
    },
    fontSize: {
        h1: "clamp(1rem, 20cqi, 96px)",
        h2: "24px"
    },
    spacing: {
        small: "0.5rem",
        medium: "1rem",
        large: "1.5rem",
        xl: "3rem",
        xxl: "5rem",
        xxxl: "8rem",

    }
}