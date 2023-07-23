import { css } from "@emotion/react";
import styled from "@emotion/styled";

const Background = styled.div(({ theme }) => [
    css`
        position: absolute;
        z-index: 1;

        height: 100vh;

        overflow: hidden;
        background: -webkit-linear-gradient(0, black 5%, #3b3b3b 35%);
        background: linear-gradient(0, black 5%, #3b3b3b 35%);
        width: 100%;

        .wave1 {
            overflow: hidden;
            position: absolute;
            top: 50%;
            left: 40%;
            width: 800%;
            transform: translateY(-50%);
            margin-left: -20%;
            animation: 7s ease-in-out infinite alternate waveAnimateA;
            width: 200%;
            opacity: 0.1;
        }

        .wave2 {
            overflow: hidden;
            position: absolute;
            top: 70%;
            right: -50%;
            width: 300%;
            transform: translateY(-50%);
            animation: 7s ease-in-out infinite alternate waveAnimateB;
            opacity: 0.2;
        }
        .wave3 {
            overflow: hidden;
            position: absolute;
            top: 40%;
            right: -20%;
            width: 1200%;
            transform: translateY(-50%);
            animation: 5s ease-in-out infinite alternate waveAnimateB;
            opacity: 0.1;
        }

        .wave4 {
            overflow: hidden;
            position: absolute;
            top: 40%;
            left: -20%;
            width: 1200%;
            transform: translateY(-50%);
            margin-left: -20%;
            animation: 7s ease-in-out infinite alternate waveAnimateB;
            width: 200%;
            opacity: 0.1;
        }

        .flipwave2 {
            -moz-transform: scaleX(-1);
            -o-transform: scaleX(-1);
            -webkit-transform: scaleX(-1);
            transform: scaleX(-1);
            filter: FlipH;
            -ms-filter: "FlipH";

            -moz-transform: scaleY(-1);
            -o-transform: scaleY(-1);
            -webkit-transform: scaleY(-1);
            transform: scaleY(-1);
            filter: FlipV;
            -ms-filter: "FlipV";
        }

        svg path {
            fill: black;
        }

        @keyframes waveAnimateA {
            0% {
                transform: translate(-10%, -70%);
            }

            100% {
                transform: translate(-12%, -60%);
            }
        }

        @keyframes waveAnimateB {
            0% {
                transform: translate(0, -40%);
            }

            100% {
                transform: translate(5%, -50%);
            }
        }
    `,
]);

export default function Test2() {
    return (
        <Background>
            <div className="wave1">
                <svg className="flipwave2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1170 193">
                    <path d="M1175 131.2c0 0-81-89.4-224.3-103.4S713 72 665 97c-86 46-148 63-271 7C221.7 25.5 56 104.5-4 197.4 -4 58.7-3.3 0.3-3.3 0.3L1175 0V131.2z"></path>
                </svg>
            </div>
            <div className="wave2">
                <svg className="flipwave2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1170 193">
                    <path d="M1175 131.2c0 0-81-89.4-224.3-103.4S713 72 665 97c-86 46-148 63-271 7C221.7 25.5 56 104.5-4 197.4 -4 58.7-3.3 0.3-3.3 0.3L1175 0V131.2z"></path>
                </svg>
            </div>
            <div className="wave3">
                <svg className="flipwave2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1170 193">
                    <path d="M1175 131.2c0 0-81-89.4-224.3-103.4S713 72 665 97c-86 46-148 63-271 7C221.7 25.5 56 104.5-4 197.4 -4 58.7-3.3 0.3-3.3 0.3L1175 0V131.2z"></path>
                </svg>
            </div>
            <div className="wave4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1170 193">
                    <path d="M1175 131.2c0 0-81-89.4-224.3-103.4S713 72 665 97c-86 46-148 63-271 7C221.7 25.5 56 104.5-4 197.4 -4 58.7-3.3 0.3-3.3 0.3L1175 0V131.2z"></path>
                </svg>
            </div>
        </Background>
    );
}
