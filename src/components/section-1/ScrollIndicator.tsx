import { css } from "@emotion/react";
import styled from "@emotion/styled";

export default function ScrollIndicator() {
    return (
        <ScrollWrapper>
            <a
                onClick={(e) => {
                    window.scroll({
                        behavior:'smooth',
                        top: 1100
                    });
                    e.preventDefault();
                }}
                className="scroll-down"
            ></a>
        </ScrollWrapper>
    );
}

const ScrollWrapper = styled.div(() => [
    css`
        display: flex;
        justify-content: center;
        background: black;

        p {
            color: white;
            font-family: arial;
            display: table-cell;
            text-align: center;
            vertical-align: middle;
        }

        .scroll-down {
            opacity: 1;
            -webkit-transition: all 0.5s ease-in 3s;
            transition: all 0.5s ease-in 3s;
        }

        .scroll-down {
            display: block;
            width: 32px;
            height: 32px;
            border: 2px solid #fff;
            background-size: 14px auto;
            border-radius: 50%;
            z-index: 2;
            -webkit-animation: bounce 2s infinite 2s;
            animation: bounce 2s infinite 2s;
            -webkit-transition: all 0.2s ease-in;
            transition: all 0.2s ease-in;
            transform: scale(1);

            opacity: 0.5;

            :hover {
                opacity: 1 !important;
            }
        }

        .scroll-down:before {
            position: absolute;
            top: calc(50% - 8px);
            left: calc(50% - 6px);
            transform: rotate(-45deg);
            display: block;
            width: 12px;
            height: 12px;
            content: "";
            border: 2px solid white;
            border-width: 0px 0 2px 2px;
        }

        @keyframes bounce {
            0%,
            100%,
            20%,
            50%,
            80% {
                -webkit-transform: translateY(0);
                -ms-transform: translateY(0);
                transform: translateY(0);
            }
            40% {
                -webkit-transform: translateY(-10px);
                -ms-transform: translateY(-10px);
                transform: translateY(-10px);
            }
            60% {
                -webkit-transform: translateY(-5px);
                -ms-transform: translateY(-5px);
                transform: translateY(-5px);
            }
        }
    `,
]);
