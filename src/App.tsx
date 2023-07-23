import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { StartPage } from "./StartPage";
import theme from "./emotion.d";
import { ThemeProvider } from "@emotion/react";
import { SproutIsUs } from "./SproutIsUs";
import { TheVision } from "./TheVision";
import { useLayoutEffect } from "react";
import { gsap } from "gsap";

function App() {
    // function lerp(start: any, end: any, amount: any) {
    //     return (1 - amount) * start + amount * end;
    // }

    // const cursor = document.createElement("div");
    // cursor.className = "cursor";

    // const cursorF = document.createElement("div");
    // cursorF.className = "cursor-f";

    // let cursorX = 0;
    // let cursorY = 0;
    // let pageX = 0;
    // let pageY = 0;
    // let size = 8;
    // let sizeF = 36;
    // let followSpeed = 0.16;

    // document.body.appendChild(cursor);
    // document.body.appendChild(cursorF);

    // if ("ontouchstart" in window) {
    //     cursor.style.display = "none";
    //     cursorF.style.display = "none";
    // }

    // cursor.style.setProperty("--size", size + "px");
    // cursorF.style.setProperty("--size", sizeF + "px");

    // window.addEventListener("mousemove", function (e) {
    //     pageX = e.clientX;
    //     pageY = e.clientY;
    //     cursor.style.left = e.clientX - size / 2 + "px";
    //     cursor.style.top = e.clientY - size / 2 + "px";
    // });

    // function loop() {
    //     cursorX = lerp(cursorX, pageX, followSpeed);
    //     cursorY = lerp(cursorY, pageY, followSpeed);
    //     cursorF.style.top = cursorY - sizeF / 2 + "px";
    //     cursorF.style.left = cursorX - sizeF / 2 + "px";
    //     requestAnimationFrame(loop);
    // }

    // loop();

    // let startY: any;
    // let endY: any;
    // let clicked = false;

    // function mousedown(e: any) {
    //     gsap.to(cursor, { scale: 4.5 });
    //     gsap.to(cursorF, { scale: 0.4 });

    //     clicked = true;
    //     startY = e.clientY || e.touches[0].clientY || e.targetTouches[0].clientY;
    // }

    // function mouseup(e: any) {
    //     gsap.to(cursor, { scale: 1 });
    //     gsap.to(cursorF, { scale: 1 });

    //     endY = e.clientY || endY;
    //     if (clicked && startY && Math.abs(startY - endY) >= 40) {
    //         // go(!Math.min(0, startY - endY) ? 1 : -1);
    //         clicked = false;
    //         startY = null;
    //         endY = null;
    //     }
    // }

    // window.addEventListener("mousedown", mousedown, false);
    // window.addEventListener("touchstart", mousedown, false);
    // window.addEventListener(
    //     "touchmove",
    //     function (e) {
    //         if (clicked) {
    //             endY = e.touches[0].clientY || e.targetTouches[0].clientY;
    //         }
    //     },
    //     false,
    // );
    // window.addEventListener("touchend", mouseup, false);
    // window.addEventListener("mouseup", mouseup, false);

    const location = useLocation();
    // Scroll to top if path changes
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <ThemeProvider theme={theme}>
            <div id="dot">
                <svg viewBox="0 0 150 150" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path d="M75,100 C88.8071187,100 100,88.8071187 100,75 C100,61.1928813 88.8071187,50 75,50 C61.1928813,50 50,61.1928813 50,75 C50,88.8071187 61.1928813,100 75,100 Z"></path>
                </svg>
            </div>

            <Routes>
                <Route path="/" element={<Outlet />}>
                    <Route index element={<StartPage />} />
                    <Route path="sprout-is-us" element={<SproutIsUs />} />
                    <Route path="the-vision" element={<TheVision />} />

                    {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
                    <Route path="*" element={<StartPage />} />
                </Route>
            </Routes>
        </ThemeProvider>
    );
}

export default App;
