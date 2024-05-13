/* eslint-disable no-undef */
import React from "react";

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

            Not currently necessary to activate
            Splitting();
        */

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
    });

    return null;
}

export default ScriptInit;
