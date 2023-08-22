import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { StartPage } from "./StartPage";
import theme from "./emotion.d";
import { ThemeProvider } from "@emotion/react";
import { SproutIsUs } from "./SproutIsUs";
import { TheVision } from "./TheVision";
import { useLayoutEffect } from "react";
import Nav from "./components/nav/Nav";

import { AnimatePresence } from "framer-motion";
import { AnimatedRoute } from "./AnimatedRoute";

function App() {
    const location = useLocation();

    // Scroll to top if path changes
    useLayoutEffect(() => {
        if (location.hash === "#bottom") {
            window.scrollTo(0, document.documentElement.scrollHeight);
        } else {
            window.scrollTo(0, 0);
        }
    }, [location.pathname, location.hash]);

    return (
        <ThemeProvider theme={theme}>
            <Nav />

            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route
                        path="/"
                        element={
                            <AnimatedRoute>
                                <Outlet />
                            </AnimatedRoute>
                        }
                    >
                        <Route
                            index
                            element={
                                <AnimatedRoute>
                                    <StartPage />
                                </AnimatedRoute>
                            }
                        />
                        <Route
                            path="sprout-is-us"
                            element={
                                <AnimatedRoute>
                                    <SproutIsUs />
                                </AnimatedRoute>
                            }
                        />
                        <Route
                            path="the-vision"
                            element={
                                <AnimatedRoute>
                                    <TheVision />
                                </AnimatedRoute>
                            }
                        />
                        <Route
                            path="*"
                            element={
                                <AnimatedRoute>
                                    <StartPage />
                                </AnimatedRoute>
                            }
                        />
                    </Route>
                </Routes>
            </AnimatePresence>
        </ThemeProvider>
    );
}

export default App;

// <Routes>
// <Route path="/" element={<Outlet />}>
//     <Route index element={<StartPage />} />
//     <Route path="sprout-is-us" element={<SproutIsUs />} />
//     <Route path="the-vision" element={<TheVision />} />

//     {/* Using path="*"" means "match anything", so this route
// acts like a catch-all for URLs that we don't have explicit
// routes for. */}
//     <Route path="*" element={<StartPage />} />
// </Route>
// </Routes>
