import React from "react";
import ButtonAnimation from "./buttonscript";

function useOnceCall(cb, condition = true) {
    const isCalledRef = React.useRef(false);

    React.useEffect(() => {
        if (condition && !isCalledRef.current) {
            isCalledRef.current = true;
            cb();
        }
    }, [cb, condition]);
}

function ScriptInit() {
    useOnceCall(() => {
        /* 
            Splitting will split words into individual letters which can then 
            be animated separately.
        */
        Splitting();

        /*  
            ScrollOut will make sure to start the animation when in scroll view 
            on a div with className="text--karaoke" includes letters. 
        */
        ScrollOut({
            targets: ".word",
            once: true,
        });

        /*  
            Activate startpage smooth scroll for elements inside className="rellax".
        */
        if (window.location.pathname === "/") {
            new Rellax(".rellax");
        }

        /*  
            Activate button animation for pages with buttons.
        */
        ButtonAnimation();
    });

    return null;
}

export default ScriptInit;
