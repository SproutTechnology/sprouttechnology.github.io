import FluidCenterContainer from "./FluidCenterContainer";
import Showcase from "./Showcase";
import { Theme, css } from "@emotion/react";

const hero = (theme: Theme) => css`
    background-color: ${theme.backgroundColors.charcoal};

    height: 90vh;
    position: relative;
    width: 100%;
    height: 100vh;
    // background-image: url(https://raw.githubusercontent.com/oscicen/oscicen.github.io/master/img/depth-3.png),
    //     url(https://raw.githubusercontent.com/oscicen/oscicen.github.io/master/img/depth-2.png),
    //     url(https://raw.githubusercontent.com/oscicen/oscicen.github.io/master/img/depth-1.png);
    // background-repeat: no-repeat;
    // background-position: center;
    // background-position: 50% 50%;
`;

// (function () {
//     // Add event listener
//     document.addEventListener("mousemove", parallax);
//     const elem = document.getElementById("hero");
//     // Magic happens here
//     function parallax(e: any) {
//         let _w = window.innerWidth / 2;
//         let _h = window.innerHeight / 2;
//         let _mouseX = e.clientX;
//         let _mouseY = e.clientY;
//         let _depth1 = `${50 - (_mouseX - _w) * 0.01}% ${50 - (_mouseY - _h) * 0.01}%`;
//         let _depth2 = `${50 - (_mouseX - _w) * 0.02}% ${50 - (_mouseY - _h) * 0.02}%`;
//         let _depth3 = `${50 - (_mouseX - _w) * 0.06}% ${50 - (_mouseY - _h) * 0.06}%`;
//         let x = `${_depth3}, ${_depth2}, ${_depth1}`;

//         if (elem) elem.style.backgroundPosition = x;
//     }
// })();

// (function () {
//     // Add event listener
//     document.addEventListener("mousemove", parallax);
//     const elem = document.getElementById("hero");
//     // Magic happens here
//     function parallax(e: any) {
//         let _w = window.innerWidth / 2;
//         let _h = window.innerHeight / 2;
//         let _mouseX = e.clientX;
//         let _mouseY = e.clientY;
//         let _depth1 = `${50 - (_mouseX - _w) * 0.01}% ${50 - (_mouseY - _h) * 0.01}%`;
//         let _depth2 = `${50 - (_mouseX - _w) * 0.02}% ${50 - (_mouseY - _h) * 0.02}%`;
//         let _depth3 = `${50 - (_mouseX - _w) * 0.06}% ${50 - (_mouseY - _h) * 0.06}%`;
//         let x = `${_depth3}, ${_depth2}, ${_depth1}`;

//         if (elem) elem.style.backgroundPosition = x;
//     }
// })();

// document.addEventListener("mousemove", parallax);
// function parallax(event: any) {
//     document.querySelectorAll(".parallax-wrap span").forEach((shift) => {
//         const position: any = shift.getAttribute("value");
//         const x = (window.innerWidth - event.pageX * position) / 90;
//         const y = (window.innerHeight - event.pageY * position) / 90;

//         shift.style.transform = `translateX(${x}px) translateY(${y}px)`;
//     });
// }

function Hero() {
    return (
        <div css={hero}>
            {/* <FluidCenterContainer light={false} padTop={false} centerContent={true}> */}
            <Showcase />
            {/* </FluidCenterContainer> */}
        </div>
    );
}

export default Hero;
