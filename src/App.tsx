import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { StartPage } from "./StartPage";
import theme from "./emotion.d";
import { ThemeProvider } from "@emotion/react";
import { SproutIsUs } from "./SproutIsUs";
import { TheVision } from "./TheVision";
import { AnimatePresence } from "framer-motion";
import {AnimatedRoute} from "./AnimatedRoute"
import { useLayoutEffect } from "react";


function App() {
    const location = useLocation();
    // Scroll to top if path changes
    useLayoutEffect(() => {
        if(location.hash === "#bottom") {
            window.scrollTo(0, document.documentElement.scrollHeight);
        } else {
            window.scrollTo(0, 0);
        }
    }, [location.pathname, location.hash]);

    return (
        <ThemeProvider theme={theme}>
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<AnimatedRoute><Outlet /></AnimatedRoute>}>
                        <Route index element={<AnimatedRoute><StartPage /></AnimatedRoute>} />
                        <Route path="sprout-is-us" element={<AnimatedRoute><SproutIsUs /></AnimatedRoute>} />
                        <Route path="the-vision" element={<AnimatedRoute><TheVision /></AnimatedRoute>} />
                        <Route path="*" element={<AnimatedRoute><StartPage /></AnimatedRoute>} />
                    </Route>
                </Routes>
            </AnimatePresence>
        </ThemeProvider>
    );
}



export default App;
