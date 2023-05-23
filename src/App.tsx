import MainContent from "./components/MainContent";
import { Theme, ThemeProvider, css } from '@emotion/react'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
const theme : Theme = {
  color: {
    charcoal: '#1D1D1D'
  },
  fontSize : {
    h1 :  "clamp(1rem, 20cqi, 96px)",
    h2 : "32px"
  }
}


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar/> 
      <Hero/>
      <MainContent/>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
