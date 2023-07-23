import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { StartPage } from "./StartPage";
import theme from "./emotion.d";
import { ThemeProvider } from "@emotion/react";
import { SproutIsUs } from "./SproutIsUs";
import { TheVision } from "./TheVision";
import { AnimatePresence } from "framer-motion";
import {AnimatedRoute} from "./AnimatedRoute"


function App() {
    const location = useLocation();
    return (
        <ThemeProvider theme={theme}>
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<AnimatedRoute><Outlet /></AnimatedRoute>}>
                        <Route index element={<AnimatedRoute><StartPage /></AnimatedRoute>} />
                        <Route path="sprout-is-us" element={<AnimatedRoute><SproutIsUs /></AnimatedRoute>} />
                        <Route path="the-vision" element={<AnimatedRoute><TheVision /></AnimatedRoute>} />

                        {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
                        <Route path="*" element={<StartPage />} />
                    </Route>
                </Routes>
            </AnimatePresence>
        </ThemeProvider>
    );
}



export default App;
