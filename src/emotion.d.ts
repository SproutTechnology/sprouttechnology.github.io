import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme {
    color: {
      charcoal: string
    }, 
    fontSize: {
      h1 : string,
      h2: string,
    }
  }
}