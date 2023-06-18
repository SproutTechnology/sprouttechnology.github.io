import {Outlet, Route, Routes} from "react-router-dom";
import {StartPage} from "./StartPage";
import theme from "./emotion.d";
import {ThemeProvider } from "@emotion/react";
import {SproutIsUs} from "./SproutIsUs";
import {TheVision} from "./TheVision";

function App() {
    return (
        <ThemeProvider theme={theme}>

        <Routes>
            <Route path="/" element={<Outlet/>}>
                <Route index element={<StartPage/>}/>
                <Route path="sprout-is-us" element={<SproutIsUs/>}/>
                <Route path="the-vision" element={<TheVision/>}/>

                {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
                <Route path="*" element={<StartPage/>}/>
            </Route>
        </Routes>
        </ThemeProvider>
    );
}



export default App;
